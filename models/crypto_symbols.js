module.exports = function(sequelize, DataTypes) {
    var crypto_symbols = sequelize.define("crypto_symbols", {
        symbol: DataTypes.STRING,
        company_name: DataTypes.STRING
    });

    return crypto_symbols;
};