function calculateFuBase(
    isMenzen,
    winType,
    waitType
) {

    let fu = 20;

    if (
        isMenzen &&
        winType === 'ron'
    ) {
        fu += 10;
    }

    if (winType === 'tsumo') {
        fu += 2;
    }

    if (
        ['kanchan', 'penchan', 'tanki']
            .includes(waitType)
    ) {
        fu += 2;
    }

    return fu;
}


function calculatePairFu(pairType) {

    const valuePairs = [
        'haku',
        'hatsu',
        'chun',
        'jikaze',
        'bakaze',
        'renpu'
    ];

    return valuePairs.includes(pairType)
        ? 2
        : 0;
}


function calculateMeldFu(
    meldType,
    tileType
) {

    const terminal =
        tileType === 'terminalOrHonor';

    const table = {

        openTriplet:
            terminal ? 4 : 2,

        closedTriplet:
            terminal ? 8 : 4,

        openKan:
            terminal ? 16 : 8,

        closedKan:
            terminal ? 32 : 16,

        sequence: 0
    };

    return table[meldType] || 0;
}


function calculateMeldsFu(melds) {

    return melds.reduce(
        (sum, m) =>
            sum +
            calculateMeldFu(
                m.meldType,
                m.tileType
            ),
        0
    );
}


function calculateFuDetails({
    isMenzen,
    winType,
    waitType,
    pairType,
    melds,
    isChiitoitsu,
    isPinfu
}) {

    if (isChiitoitsu) {

        return {
            fu: 25,
            rawFu: 25,
            items: [
                ['七対子', 25]
            ]
        };
    }


    if (
        isPinfu &&
        isMenzen &&
        winType === 'tsumo'
    ) {

        return {
            fu: 20,
            rawFu: 20,
            items: [
                ['平和ツモ', 20]
            ]
        };
    }


    const items = [
        ['副底', 20]
    ];


    if (
        isMenzen &&
        winType === 'ron'
    ) {
        items.push([
            '門前ロン',
            10
        ]);
    }


    if (winType === 'tsumo') {

        items.push([
            'ツモ',
            2
        ]);
    }


    if (
        ['kanchan', 'penchan', 'tanki']
            .includes(waitType)
    ) {

        items.push([
            '待ち',
            2
        ]);
    }


    const pairFu =
        calculatePairFu(pairType);


    if (pairFu) {

        items.push([
            '雀頭',
            pairFu
        ]);
    }


    melds.forEach((m, i) => {

        const f = calculateMeldFu(
            m.meldType,
            m.tileType
        );

        if (f) {

            items.push([
                `面子${i + 1}`,
                f
            ]);
        }
    });


    let rawFu = items.reduce(
        (s, x) => s + x[1],
        0
    );


    if (
        !isMenzen &&
        winType === 'ron' &&
        rawFu === 20
    ) {

        return {
            fu: 30,
            rawFu: 20,
            items: [
                ...items,
                [
                    '副露平和形ロン補正',
                    10
                ]
            ]
        };
    }


    return {
        fu:
            Math.ceil(rawFu / 10) * 10,

        rawFu:
            rawFu,

        items:
            items
    };
}


function calculateFu(
    isMenzen,
    winType,
    waitType,
    pairType,
    melds,
    isChiitoitsu,
    isPinfu
) {

    return calculateFuDetails({
        isMenzen: isMenzen,
        winType: winType,
        waitType: waitType,
        pairType: pairType,
        melds: melds,
        isChiitoitsu: isChiitoitsu,
        isPinfu: isPinfu
    }).fu;
}