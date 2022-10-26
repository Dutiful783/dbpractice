const { DataTypes, Op } = Sequelize
const Sequelize = require('sequelize');


const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql'
});

const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;


class Image extends Model {}
Image.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
}, { sequelize, modelName: 'image' });


class Video extends Model {}
Video.inti({
    title: DataTypes.STRING,
    text: DataTypes.STRING
}, { sequelize, modelName: 'video' });


class Comment extends Model {}
Comment.inti({
    getCommentable(options) {
        if (!this.commentTable) return Promise.resolve(null);
        const mixinMethodName = `get${uppercaseFirst(this.commentableType)}`;
        return this[mixinMethodName](options);
    }
})
Comment.init({
    title: DataTypes.STRING,
    commentTableId: DataTypes.INTEGER,
    commentTableType: DataTypes.STRING
}, { sequelize, modelName: 'comment' });

Image.hasMany(Comment, {
    foreignKey: 'commentableId',
    constraints: false,
    scope: {
        commentableType: 'video'
    }
});
Comment.belongsTo(Video, { foreignKey: 'commentableId', constraints: false });

Comment.addHook('afterFind', findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];  
    
})

Image.hasMany(Comment);
Comment.belongsTo(Image);

Video.hasMany(Comment);
Comment.belongsTo(video);

(async () => {
    await sequelize.sync({ alter : true});
    try {
        

    } catch (error) {
        console.log(error)
    }
})()