const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const Member = require('./member');
const Questions = require('./questions');
const MainCategory = require('./mainCategory');
const SubCategory = require('./subCategory');
const Recording = require('./recording');
const Feedback = require('./feedback');
const LikeCnt = require('./likeCnt')
const Reply = require('./reply');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Member = Member;
db.Questions = Questions;
db.MainCategory = MainCategory;
db.SubCategory = SubCategory;
db.Recording = Recording;
db.Feedback = Feedback;
db.LikeCnt = LikeCnt;
db.Reply = Reply;

Member.init(sequelize);
Questions.init(sequelize);
MainCategory.init(sequelize);
SubCategory.init(sequelize);
Recording.init(sequelize);
Feedback.init(sequelize);
LikeCnt.init(sequelize);
Reply.init(sequelize);

Member.associate(db);
Questions.associate(db);
MainCategory.associate(db);
SubCategory.associate(db);
Recording.associate(db);
Feedback.associate(db);
LikeCnt.associate(db);
Reply.associate(db);

module.exports = db;