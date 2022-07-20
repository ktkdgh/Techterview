const Sequelize = require('sequelize');

module.exports = class LikeCnt extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {

                like_cnt: {
                    type: Sequelize.INTEGER
                }
            }, {
            sequelize,
            primarykey: false,
            underscored: false,
            charset: "utf8",
            collate: "utf8_bin",
            tableName: "likecnt",
            timestamps: false,
            paranoid: false,
        });
    }

    static associate(db) {
        db.LikeCnt.belongsTo(db.Member);
        db.LikeCnt.belongsTo(db.Feedback);
    }
};