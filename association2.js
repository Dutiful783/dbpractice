const Sequelize = require('sequelize');
const { DataTypes, Op } = Sequelize;


const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql'
});


const Customer = sequelize.define('customer', {
    customerName: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

const Product = sequelize.define('product', {
    productName: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false
})

const CustomerProduct = sequelize.define('customerproduct', {
    customerproductId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
})


Customer.belongsToMany(Product, {
    through: CustomerProduct
})

Product.belongsToMany(Customer, {
    through: CustomerProduct
})

let customer, product;

sequelize.sync({ altar: true }).then(() => {
    return Customer.findOne({ where: { customerName: 'dutiful' }});

}).then((data) => {
    customer = data;
    return Product.findAll()

}).then((data) => {
    product = data;
    return customer.addProducts(product)

}).catch((err) => {
    console.log(err)
})


// Customer.bulkCreate([
//     {
//         customerName: 'Dutiful'
//     },
//     {
//         customerName: 'Patricia'
//     },
//     {
//         customerName: 'Sunday'
//     },
//     {
//         customerName: 'Godwin'
//     },
//     {
//         customerName: 'Felix'
//     }
// ])

// Product.bulkCreate([
//     {
//         productName: 'Television'
//     },
//     {
//         productName: 'Computer'
//     },
//     {
//         productName: 'Desktop'
//     },
//     {
//         productName: 'Fridge'
//     },
//     {
//         productName: 'Speaker'
//     }
// ])