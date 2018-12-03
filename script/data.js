const userData = [
    { email: 'wen@email.com' },
];

function holdingData(userId1) {
    return [
        { symbol: 'GOOG', shares: 100, userId: userId1 },
        { symbol: 'AMZN', shares: 200, userId: userId1 },
        { symbol: 'BAC', shares: 150, userId: userId1 },
        { symbol: 'MSFT', shares: 300, userId: userId1 }
    ];
}


module.exports = {
    userData,
    holdingData
};
