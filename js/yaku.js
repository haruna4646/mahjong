const YAKU_LIST = [

    {
        id: 'menzenTsumo',
        name: '門前清自摸和',
        closedHan: 1,
        openHan: 0,
        menzenOnly: true,
        group: '1翻'
    },

    {
        id: 'riichi',
        name: '立直',
        closedHan: 1,
        openHan: 0,
        menzenOnly: true,
        group: '1翻'
    },

    {
        id: 'ippatsu',
        name: '一発',
        closedHan: 1,
        openHan: 0,
        menzenOnly: true,
        group: '1翻'
    },

    {
        id: 'haku',
        name: '役牌・白',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'hatsu',
        name: '役牌・發',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'chun',
        name: '役牌・中',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'jikaze',
        name: '役牌・自風',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'bakaze',
        name: '役牌・場風',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'pinfu',
        name: '平和',
        closedHan: 1,
        openHan: 0,
        menzenOnly: true,
        group: '1翻'
    },

    {
        id: 'tanyao',
        name: '断么九',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'iipeikou',
        name: '一盃口',
        closedHan: 1,
        openHan: 0,
        menzenOnly: true,
        group: '1翻'
    },

    {
        id: 'haitei',
        name: '海底摸月',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'houtei',
        name: '河底撈魚',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'chankan',
        name: '搶槓',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'rinshan',
        name: '嶺上開花',
        closedHan: 1,
        openHan: 1,
        menzenOnly: false,
        group: '1翻'
    },

    {
        id: 'doubleRiichi',
        name: 'ダブル立直',
        closedHan: 2,
        openHan: 0,
        menzenOnly: true,
        group: '2翻'
    },

    {
        id: 'toitoi',
        name: '対々和',
        closedHan: 2,
        openHan: 2,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'sanankou',
        name: '三暗刻',
        closedHan: 2,
        openHan: 2,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'sanshokuDoukou',
        name: '三色同刻',
        closedHan: 2,
        openHan: 2,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'sankantsu',
        name: '三槓子',
        closedHan: 2,
        openHan: 2,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'shousangen',
        name: '小三元',
        closedHan: 2,
        openHan: 2,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'honroutou',
        name: '混老頭',
        closedHan: 2,
        openHan: 2,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'sanshokuDoujun',
        name: '三色同順',
        closedHan: 2,
        openHan: 1,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'ikkitsuukan',
        name: '一気通貫',
        closedHan: 2,
        openHan: 1,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'chanta',
        name: '混全帯么九',
        closedHan: 2,
        openHan: 1,
        menzenOnly: false,
        group: '2翻'
    },

    {
        id: 'chiitoitsu',
        name: '七対子',
        closedHan: 2,
        openHan: 0,
        menzenOnly: true,
        group: '2翻'
    },

    {
        id: 'ryanpeikou',
        name: '二盃口',
        closedHan: 3,
        openHan: 0,
        menzenOnly: true,
        group: '3翻以上'
    },

    {
        id: 'honitsu',
        name: '混一色',
        closedHan: 3,
        openHan: 2,
        menzenOnly: false,
        group: '3翻以上'
    },

    {
        id: 'junchan',
        name: '純全帯么九',
        closedHan: 3,
        openHan: 2,
        menzenOnly: false,
        group: '3翻以上'
    },

    {
        id: 'chinitsu',
        name: '清一色',
        closedHan: 6,
        openHan: 5,
        menzenOnly: false,
        group: '3翻以上'
    }
];


const YAKUMAN_LIST = [

    {
        id: 'tenhou',
        name: '天和'
    },

    {
        id: 'chiihou',
        name: '地和'
    },

    {
        id: 'kokushi',
        name: '国士無双'
    },

    {
        id: 'suuankou',
        name: '四暗刻'
    },

    {
        id: 'daisangen',
        name: '大三元'
    },

    {
        id: 'ryuuiisou',
        name: '緑一色'
    },

    {
        id: 'tsuuiisou',
        name: '字一色'
    },

    {
        id: 'shousuushii',
        name: '小四喜'
    },

    {
        id: 'daisuushii',
        name: '大四喜'
    },

    {
        id: 'chinroutou',
        name: '清老頭'
    },

    {
        id: 'suukantsu',
        name: '四槓子'
    },

    {
        id: 'chuuren',
        name: '九蓮宝燈'
    }

].map(x => ({

    ...x,

    yakumanCount: 1
}));


function getYakuHan(
    yaku,
    isMenzen
) {

    if (
        yaku.menzenOnly &&
        !isMenzen
    ) {
        return 0;
    }

    return isMenzen
        ? yaku.closedHan
        : yaku.openHan;
}


function calculateTotalHan(
    ids,
    isMenzen
) {

    return ids.reduce(
        (sum, id) => {

            const y = YAKU_LIST.find(
                y => y.id === id
            );

            return sum + (
                y
                    ? getYakuHan(
                        y,
                        isMenzen
                    )
                    : 0
            );
        },
        0
    );
}


function calculateHan(
    ids,
    isMenzen,
    dora = 0,
    redDora = 0,
    uraDora = 0
) {

    return (
        calculateTotalHan(
            ids,
            isMenzen
        ) +
        dora +
        redDora +
        uraDora
    );
}


function calculateYakumanCount(ids) {

    return ids.reduce(
        (sum, id) => {

            const yakuman = YAKUMAN_LIST.find(
                y => y.id === id
            );

            return sum + (
                yakuman?.yakumanCount || 0
            );
        },
        0
    );
}