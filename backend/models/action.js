const Sequelize = require('sequelize');

module.exports = class Action extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                action_name: {
                    type: Sequelize.STRING(200),
                },
            }, {
                sequelize,
                underscored: false,
                charset: "utf8", 
                collate: "utf8_bin", 
                tableName: "action", 
                timestamps: false, 
                paranoid: false, 
            },
        );
    }

    static associate(db) {
        
    }
};