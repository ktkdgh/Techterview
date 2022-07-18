const Sequelize = require('sequelize');

module.exports = class Member extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                sns_id: {
                    type: Sequelize.STRING(50)
                },
                provider: {
                    type: Sequelize.STRING(50)
                },
                name: {
                    type: Sequelize.STRING(50),
                },
            }, {
                sequelize,
                underscored: false,
                charset: "utf8", 
                collate: "utf8_bin", 
                tableName: "member", 
                timestamps: false, 
                paranoid: false, 
            },
        );
    }

    static associate(db) {
        db.Member.hasMany(db.Recording);
    }
};