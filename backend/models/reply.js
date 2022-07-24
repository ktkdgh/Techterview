const Sequelize = require('sequelize');

module.exports = class Reply extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                reply_comment: {
                    type: Sequelize.STRING(200),
                },
            }, {
                sequelize,
                underscored: false,
                charset: "utf8", 
                collate: "utf8_bin", 
                tableName: "reply", 
                timestamps: true, 
                paranoid: false, 
            },
        );
    }

    static associate(db) {
        db.Reply.belongsTo(db.Member, { onDelete: "CASCADE" });
        db.Reply.belongsTo(db.Feedback, { onDelete: "CASCADE" });
        
    }
};