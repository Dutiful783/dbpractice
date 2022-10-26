const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql',
})

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
});

const Post = sequelize.define('post', {
    message: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});

User.hasMany(Post, { onDelete: 'CASCADE'});
Post.belongsTo(User, { onDelete: 'CASCADE'});

let user, posts

sequelize.sync({ alter: true }).then(() => {
    return User.findOne();

}).then((data) => {
    user = data
    return Post.findOne();

}).then((data) => {
    posts = data
    posts.setUser(user)
})
.catch((err) => {
    console.log(err)

})
    
    // return User.destroy({ where: { username: 'Comfort'}}

//     return User.findOne({where: {username: 'dutiful'}})

// }).then((data) => {
//     user= data
//     // return Post.findAll()
//     return Post.findOne()

// })
// //.then((data) => {
// //     posts = data
// //     return user.addPosts(posts)

// // })
// .then((data) => {
//     // console.log(data)
//     posts = data
//     return user.removePost(posts);

// }).then((data) => {
//     console.log(data)


    