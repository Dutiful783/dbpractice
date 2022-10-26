const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize
const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql'
})

const Country = sequelize.define('country', {
    countryName: {
        type:DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: false
})

const Capital = sequelize.define('capital', {
    capitalName: {
        type: DataTypes.STRING,
        unique: true
    }
}, {
    timestamps: true
})

Country.hasOne(Capital, {onDelete: 'CASCADE'});
Capital.belongsTo(Country, {onUpdate: 'CASCADE'});

let country, capital;


sequelize.sync({ altar:true }).then(() => {
    return Country.findOne({where: {countryName: 'Spain'}})

}).then((data) => {
    country = data;
    return Capital.findOne({where: {capitalName: 'London'}})

}).then((data) => {
    capital = data
    return country.setCapital(capital)

}).catch((err) => {
    console.log(err);
})

// sequelize.sync({altar: true}).then(() =>{
//     // return Country.findOne({ where: {countryName: 'Spain'}})
//     return Country.distroy({where: { countryName: 'Spain' }})

// }).then((data) => {
//     // country = data;
//     // return country.getCapital();
//     // return country.setCountry(country)
//     console.log(data)

// }).then((data) => {
//     console.log(data.toJSON());

// }). catch((err) => {
//     console.log(err)
// })



