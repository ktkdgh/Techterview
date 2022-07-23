const Sequelize = require('sequelize');

module.exports = class MainCategory extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                mainCategory_name: {
                    type: Sequelize.STRING(50),
                },
            }, {
                sequelize,
                underscored: false,
                charset: "utf8",
                collate: "utf8_bin", 
                tableName: "mainCategory", 
                timestamps: false,
                paranoid: false,
            },
        );
    }

    static associate(db) {
        db.MainCategory.hasMany(db.SubCategory, { onDelete: "CASCADE" });
    }
};