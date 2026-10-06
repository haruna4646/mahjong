function ceil100(n) {

    return Math.ceil(n / 100) * 100;
}


function getLimit(
    han,
    fu
) {

    // Mリーグ公式:
    // 30符4翻・60符3翻は切り上げ満貫

    if (han >= 11) {

        return {
            name: '三倍満',
            base: 6000
        };
    }


    if (han >= 8) {

        return {
            name: '倍満',
            base: 4000
        };
    }


    if (han >= 6) {

        return {
            name: '跳満',
            base: 3000
        };
    }


    if (
        han >= 5 ||
        (han === 4 && fu >= 30) ||
        (han === 3 && fu >= 60)
    ) {

        return {
            name: '満貫',
            base: 2000
        };
    }


    return null;
}


function calculateScore({
    han,
    fu,
    isDealer,
    winType,
    yakumanCount = 0
}) {

    let base;
    let limitName = '';


    if (yakumanCount > 0) {

        base =
            8000 * yakumanCount;

        limitName =
            yakumanCount === 1
                ? '役満'
                : `${yakumanCount}倍役満`;

    } else {

        const limit =
            getLimit(
                han,
                fu
            );


        if (limit) {

            base =
                limit.base;

            limitName =
                limit.name;

        } else {

            base =
                fu *
                Math.pow(
                    2,
                    han + 2
                );
        }
    }


    if (winType === 'ron') {

        const ron = ceil100(
            base *
            (isDealer ? 6 : 4)
        );

        return {
            base: base,
            limitName: limitName,
            ron: ron,
            total: ron
        };
    }


    if (isDealer) {

        const each =
            ceil100(base * 2);

        return {
            base: base,
            limitName: limitName,
            childPay: each,
            total: each * 3
        };
    }


    const childPay =
        ceil100(base);

    const dealerPay =
        ceil100(base * 2);


    return {
        base: base,
        limitName: limitName,
        childPay: childPay,
        dealerPay: dealerPay,
        total:
            childPay * 2 +
            dealerPay
    };
}