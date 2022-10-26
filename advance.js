const Sequelize = require('sequelize');

const { DataTypes, Op } = Sequelize;

const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const User = sequelize.define('user', {
    username: DataTypes.STRING,
    points: DataTypes.INTEGER
});

const Profile = sequelize.define('profile', {
    name: DataTypes.STRING
})

const Grant = sequelize.define('grant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    selfGranted: DataTypes.BOOLEAN
})

User.belongsToMany(Profile, { through: Grant });
Profile.belongsToMany(User, { through: Grant });
User.hasMany(Grant);
Grant.belongsTo(User);
Profile.hasMany(Grant);
Grant.belongsTo(Profile);

(async () => {
    await sequelize.sync({ alter : true});
    try {
        User.findAll({ include: Grant });
    } catch (error) {
        
        console.log(error)
    }

})()


//  try {
//         const user = await User.create({
//             username: 'Wonders11',
//             points: 1000,
//             profiles: [{
//                 name: 'Rebecca',
//                 grant: {
//                     selfGranted: true
//                 }
//             }]
//         }, {
//             include: Profile
//         });
        
//         const result = await User.findOne({
//             where: {
//                 username: 'Wonders11',
//             },
//             include: Profile
//         })
//         console.log(JSON.stringify(result, null, 2))

//     }