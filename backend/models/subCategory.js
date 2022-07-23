const Sequelize = require('sequelize');

module.exports = class SubCategory extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                subCategory_name: {
                    type: Sequelize.STRING(50),
                },
            }, {
                sequelize,
                underscored: false,
                charset: "utf8", 
                collate: "utf8_bin", 
                tableName: "subCategory", 
                timestamps: false, 
                paranoid: false, 
            },
        );
    }

    static associate(db) {
        db.SubCategory.belongsTo(db.MainCategory);
        db.SubCategory.hasMany(db.Questions, { onDelete: "CASCADE" });
    }
};