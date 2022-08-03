const Sequelize = require('sequelize');

module.exports = class Questions extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                questions_name: {
                    type: Sequelize.STRING(50)
                },
                questions_url: {
                    type: Sequelize.STRING(200)
                },
                questions_keyword: {
                    type: Sequelize.STRING(200)
                },
                questions_tail: {
                    type: Sequelize.STRING(500)
                }
            }, {
                sequelize,
                underscored: false,
                charset: "utf8",
                collate: "utf8_bin",
                tableName: "questions",
                timestamps: false,
                paranoid: false,
            },
        );
    }

    static associate(db) {
        db.Questions.belongsTo(db.SubCategory, { onDelete: "CASCADE" });
        db.Questions.hasMany(db.Feedback, { onDelete: "CASCADE" });
    }
};