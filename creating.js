const Sequelize = require('sequelize');

const { DataTypes, Op, Model } = Sequelize;

const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

class Product extends Model{}
Product.init({
    title: Sequelize.STRING
}, { sequelize, modelName: 'product' });


class User extends Model {}
User.init({
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
}, { sequelize, modelName: 'user' });


class Address extends Model {}
Address.init({
    type: DataTypes.STRING,
    line1: Sequelize.STRING,
    line2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
}, { sequelize, modelName: 'address' });


class Tag extends Model {}
Tag.init({
    name: Sequelize.STRING
}, { sequelize, modelName: 'tag'});


Product.User = Product.belongsTo(User);
User.Addresses = User.hasMany(Address);
const Creator = Product.belongsTo(User, { as: 'creator' });
Product.hasMany(Tag);
const Categories = Product.hasMany(Tag, { as: 'categories' });


sequelize.sync({alter : true}).then(function () {

    Product.create({
        id: 1,
        title: 'Chair',
        categories: [
            { name: 'Alpha' },
            { name: 'Beta' }
        ]
    }, {
        include: [{
            association: Categories,
            as: 'categories'
        }]
    }).catch((err) => {
        console.log(err)
    })
})

    // Product.create({
    //     id: 1,
    //     title: 'Chair', 
    //     tags: [
    //         { name: 'Prince'},
    //         { name: 'Beta'}
    //     ]
    // }, {
    //     include: [ Tag ]
    // })

    // return Product.create({
    //     title: 'Chair',
    //     creator: {
    //         firstName: 'Bassey',
    //         lastName: 'Moses'
    //     }
    // }, {
    //     include: [ Creator ]
    // })

    // return Product.create({
    //     title: 'Chair',
    //     user: {
    //         firstName: 'Felix',
    //         lastName: 'Michael',
    //         Addresses: [{
    //             type: 'home',
    //             line1: '100 Main St.',
    //             city: 'Ikeja',
    //             state: 'Lagos',
    //             zip: '10001'
    //         }]
    //     }
    // }, {
    //     include: [{
    //         association: Product.User,
    //         include: [User.Addresses]
    //     }]
    // })
//   }).catch((err) => {
//     console.log(err)
//   })