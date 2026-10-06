const state = {
    dealer: 'child',
    win: 'ron',
    menzen: 'closed'
};

const selectedYaku = new Set();
const selectedYakuman = new Set();

const $ = s => document.querySelector(s);


function renderYaku() {

    const area = $('#yakuArea');
    area.innerHTML = '';

    [...new Set(YAKU_LIST.map(y => y.group))].forEach(group => {

        const title = document.createElement('div');
        title.className = 'group-title';
        title.textContent = group;
        area.appendChild(title);

        const box = document.createElement('div');
        box.className = 'chips';

        YAKU_LIST
            .filter(y => y.group === group)
            .forEach(y => {

                const b = document.createElement('button');

                b.className = 'chip';
                b.textContent = y.name;
                b.dataset.id = y.id;

                b.onclick = () => toggleYaku(y.id, b);

                box.appendChild(b);
            });

        area.appendChild(box);
    });

    YAKUMAN_LIST.forEach(y => {

        const b = document.createElement('button');

        b.className = 'chip';
        b.textContent = y.name;

        b.onclick = () => {

            if (selectedYakuman.has(y.id)) {
                selectedYakuman.delete(y.id);
            } else {
                selectedYakuman.add(y.id);
            }

            b.classList.toggle('active');
        };

        $('#yakumanArea').appendChild(b);
    });

    syncYakuAvailability();
}


function toggleYaku(id, b) {

    const exclusive = [
        ['riichi', 'doubleRiichi'],
        ['iipeikou', 'ryanpeikou'],
        ['chanta', 'junchan'],
        ['honitsu', 'chinitsu'],
        ['haitei', 'houtei'],
        ['rinshan', 'chankan']
    ];

    if (selectedYaku.has(id)) {

        selectedYaku.delete(id);

    } else {

        exclusive.forEach(pair => {

            if (pair.includes(id)) {

                pair
                    .filter(x => x !== id)
                    .forEach(x => selectedYaku.delete(x));
            }
        });

        selectedYaku.add(id);
    }

    document
        .querySelectorAll('#yakuArea .chip')
        .forEach(x => {
            x.classList.toggle(
                'active',
                selectedYaku.has(x.dataset.id)
            );
        });
}


function syncYakuAvailability() {

    const menzen = state.menzen === 'closed';
    const win = state.win;

    document
        .querySelectorAll('#yakuArea .chip')
        .forEach(b => {

            const y = YAKU_LIST.find(
                x => x.id === b.dataset.id
            );

            const disabled =
                (!menzen && y.menzenOnly) ||
                (y.id === 'menzenTsumo' && win !== 'tsumo') ||
                (y.id === 'haitei' && win !== 'tsumo') ||
                (y.id === 'rinshan' && win !== 'tsumo') ||
                (
                    ['houtei', 'chankan'].includes(y.id) &&
                    win !== 'ron'
                );

            b.disabled = disabled;

            if (disabled) {
                selectedYaku.delete(y.id);
                b.classList.remove('active');
            }
        });

    if (
        !selectedYaku.has('riichi') &&
        !selectedYaku.has('doubleRiichi')
    ) {
        selectedYaku.delete('ippatsu');

        document
            .querySelector('[data-id="ippatsu"]')
            ?.classList.remove('active');
    }
}


document
    .querySelectorAll('[data-radio]')
    .forEach(group => {

        group.addEventListener('click', e => {

            if (e.target.tagName !== 'BUTTON') {
                return;
            }

            group
                .querySelectorAll('button')
                .forEach(b => b.classList.remove('active'));

            e.target.classList.add('active');

            state[group.dataset.radio] =
                e.target.dataset.value;

            syncYakuAvailability();
        });
    });


function addMeld() {

    const row = document.createElement('div');

    row.className = 'meld-row';

    row.innerHTML = `
        <select class="meldType">
            <option value="openTriplet">明刻</option>
            <option value="closedTriplet">暗刻</option>
            <option value="openKan">明槓</option>
            <option value="closedKan">暗槓</option>
        </select>

        <select class="tileType">
            <option value="simple">2〜8</option>
            <option value="terminalOrHonor">1・9・字牌</option>
        </select>

        <button class="remove">削除</button>
    `;

    row.querySelector('.remove').onclick = () => {
        row.remove();
    };

    $('#melds').appendChild(row);
}


$('#addMeld').onclick = addMeld;


function num(id) {

    return Math.max(
        0,
        Number($(id).value) || 0
    );
}


function validate(
    ids,
    isMenzen,
    win,
    yakumanCount
) {

    if (yakumanCount) {
        return '';
    }

    const yakuHan = calculateTotalHan(
        ids,
        isMenzen
    );

    if (yakuHan === 0) {
        return '役がありません。ドラだけでは和了できません。';
    }

    if (
        ids.includes('ippatsu') &&
        !ids.includes('riichi') &&
        !ids.includes('doubleRiichi')
    ) {
        return '一発は立直またはダブル立直と一緒に選んでください。';
    }

    if (
        ids.includes('pinfu') &&
        $('#waitType').value !== 'ryanmen'
    ) {
        return '平和を選んだ場合、待ちは両面を選んでください。';
    }

    if (
        ids.includes('pinfu') &&
        $('#pairType').value !== 'normal'
    ) {
        return '平和を選んだ場合、雀頭は役牌以外を選んでください。';
    }

    return '';
}


$('#calculate').onclick = () => {

    const ids = [...selectedYaku];
    const yakumanIds = [...selectedYakuman];

    const isMenzen =
        state.menzen === 'closed';

    const win = state.win;

    const isDealer =
        state.dealer === 'dealer';

    const yakumanCount =
        calculateYakumanCount(yakumanIds);

    const error = validate(
        ids,
        isMenzen,
        win,
        yakumanCount
    );

    $('#error').hidden = !error;
    $('#error').textContent = error;

    if (error) {
        return;
    }


    const melds = [
        ...document.querySelectorAll('.meld-row')
    ].map(r => ({

        meldType:
            r.querySelector('.meldType').value,

        tileType:
            r.querySelector('.tileType').value
    }));


    const isChiitoitsu =
        ids.includes('chiitoitsu');

    const isPinfu =
        ids.includes('pinfu');


    const details = calculateFuDetails({

        isMenzen: isMenzen,

        winType: win,

        waitType:
            $('#waitType').value,

        pairType:
            $('#pairType').value,

        melds: melds,

        isChiitoitsu: isChiitoitsu,

        isPinfu: isPinfu
    });


    const yakuHan = calculateTotalHan(
        ids,
        isMenzen
    );

    const han = calculateHan(
        ids,
        isMenzen,
        num('#dora'),
        num('#redDora'),
        num('#uraDora')
    );


    const result = calculateScore({

        han: han,

        fu: details.fu,

        isDealer: isDealer,

        winType: win,

        yakumanCount: yakumanCount
    });


    $('#limit').textContent =
        result.limitName || '通常計算';


    if (win === 'ron') {

        $('#score').textContent =
            `${result.ron.toLocaleString()}点`;

    } else if (isDealer) {

        $('#score').textContent =
            `${result.childPay.toLocaleString()}点 オール`;

    } else {

        $('#score').textContent =
            `${result.childPay.toLocaleString()} / ` +
            `${result.dealerPay.toLocaleString()}点`;
    }


    $('#hanFu').textContent =
        yakumanCount
            ? `${result.limitName}`
            : `${han}翻 ${details.fu}符`;


    const names = yakumanCount
        ? yakumanIds.map(id =>
            YAKUMAN_LIST.find(
                y => y.id === id
            )?.name
        )
        : ids.map(id =>
            YAKU_LIST.find(
                y => y.id === id
            )?.name
        );


    const doraText = yakumanCount
        ? ''
        : `ドラ ${num('#dora')}・` +
          `赤 ${num('#redDora')}・` +
          `裏 ${num('#uraDora')}`;


    $('#selectedResult').textContent = [
        names
            .filter(Boolean)
            .join(' / '),

        doraText

    ]
        .filter(Boolean)
        .join(' ｜ ');


    $('#fuDetails').hidden =
        !!yakumanCount;


    $('#fuBreakdown').innerHTML =
        details.items
            .map(x => `
                <div class="break-row">
                    <span>${x[0]}</span>
                    <strong>+${x[1]}符</strong>
                </div>
            `)
            .join('') +

        `
            <div class="break-row">
                <span>最終</span>
                <strong>${details.fu}符</strong>
            </div>
        `;


    $('#result').hidden = false;


    $('#result').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
};


$('#reset').onclick = () => {
    location.reload();
};


renderYaku();

//サーバー接続

if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {

        navigator.serviceWorker
            .register('./service-worker.js')
            .then(() => {
                console.log('Service Worker 登録成功');
            })
            .catch(error => {
                console.error(
                    'Service Worker 登録失敗:',
                    error
                );
            });
    });
}