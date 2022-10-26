const { get } = require('dottie');
const Sequelize = require('sequelize');
const {DataTypes, Op } = Sequelize;
const bcrypt = require('bcrypt');
const zlib = require('zlib');
const { userInfo } = require('os');

const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql'
    
})


const Male = sequelize.define('male', {
    male_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    malename: {
        type: DataTypes.STRING,
        defaultValue: 'Dutiful',
        // validate: {
        //     len: [8, 9]
        // },
        // get() {
        //     const rawvalue = this.getDataValue('malename');
        //     return rawvalue.toUpperCase();
        // }
    },

    password: {
        type: DataTypes.STRING,
        // set(value) {
        //     const salt = bcrypt.genSaltSync(10);
        //     const hash = bcrypt.hashSync(value, salt);
        //     this.setDataValue('password', hash);
        // }    
    },

    age: {
        type: DataTypes.INTEGER,
        defaultValue: 23,
        // validate: {
        //     isOldEnough(value) {
        //         if (value < 21) {
        //             throw new Error("Too young!");
        //         }
        //     }
        // }

        validate: {
            // isNumeric: {
            //     msg: 'You provide a number or age'
            // }
            isNumeric: true
        }
    }, 

    description: {
        type: DataTypes.STRING,

        // set(value) {
        //     const compressed = zlib.deflateSync(value).toString('base64');
        //     this.setDataValue('description', compressed);
        // },

        // get() {
        //     const value = this.getDataValue('description');
        //     const uncompressed = zlib.inflateSync(Buffer. from(value, 'base64'));
        //     return uncompressed.toString;
        // }

    },
    aboutUser: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.malename} ${this.description}`
        }
    },

    email: {
        type: DataTypes.STRING,
        unique: true, 
        allowNull: true,
        // validate: {
        //     // isEmail: true
        //     isIn: [ 'me@succer.org', 'me@succer.com' ]
        // }

        // validate: {
        //     isIn: {
        //         args: [ 'me@succer.org', 'me@succer.com' ],
        //         msg: 'The provided email must be one of the following...'
        //     }
        // }

        myEmailValidator(value) {
            if (value === null) {
                throw new Error('Please enter an email!!')
            }
        }
    }

}, { 
    timestamps: false,
    freezeTypeName: true,
    validate: {
        malenamePassMatch(){
            if (this.malename === this.password) {
                throw new Error('Password cannot be your username!');
            } else {
                console.log('succer')
            }
        }
    }  
})

const Female = sequelize.define('female', {
    female_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    femalename: {
        type: DataTypes.STRING,
        defaultValue: 'Blessing',
        
    },

    password: {
        type: DataTypes.STRING,
        allowNull: true
    },

    age: {
        type: DataTypes.INTEGER
    }
}, { 
    
    timestamps: false,
    freezeTypeName: true 
})

sequelize.sync({ alter: true }).then(() => {
    return Male.create({
        malename: 'mike',
        password: 'mike',
        age: '31'
    })


    // return Male.create({
    //     malename: 'Rechard',
    //     age: '32',
    //     // email: null
    // })


    // return Male.create({
    //     malename: 'Sunday',
    //     age: '32gi',
    //     email: 'me@12succer.org'
    // })

    // return Male.create({
    //     malename: 'Tommy',
    //     age: 14
    // })

    // const male = Male.build({ email: 'tom'});
    // return male.validate()

    // return Male.findOne({ where: {malename: 'Wire'}})

    // return Male.create({
    //     malename: 'Mark',
    //     password: 'mk23',
    //     email: 'hello'
    // })
    
}).then((data) => {
    // console.log(data.aboutUser)
    console.log(data.toJSON());

}).catch((e) => {
    console.log(e)
})



    
    // console.log(data.malename)
    // console.log(data.password)
    // console.log(data.description)

    // const { count, rows } = data;
    // console.log(count);
    // console.log(rows)

    // data.forEach((element) => {
        // console.log(element.toJSON())
    // })

    // return Male.findOne();

    // return Male.create({
    //     malename: 'Wire',
    //     password: 'wi212',
    //     age: 26,
    //     description: 'This is my description it could be really long'
    // })

    // return Male.findAll({ attributes: [ ['malename', 'myName'], ['password','pwd']]})
    
    // return Male.findAll({ 
        // attributes: [[ sequelize.fn('SUM', sequelize.col('age')), 'oldage']]})

    // return Male.findAll({ attributes: {exclude: ['password'] }})

    // return Male.findAll({
    //     where: {
    //         age: 45
    //     }
    // })
    // return Male.findAll([ sequelize.fn('max', sequelize.col('age'))])

    // return Male.findAll({
    //     where: {
    //         male_id: {
    //             [Op.eq]: 1
    //         }
    //     }
    // })

    // return Male.findAll({
    //     where: {
    //         [Op.and] : [
    //             {male_id : 4}
                
    //         ]
    //     }
    // })

    // return Male.destroy({
    //     where: {
    //         male_id: {
    //             [Op.or]: [2,5]
    //         }
                
    //     }
    // })


    // return Male.findOrCreate({
    //     where: {
    //         malename: 'Emem',
    //         password: 1122,
    //         age: 14
    //     }
    // })

    // return Female.findOrCreate({
    //     where: {
    //         femalename:'Imaobong'
    //     },
    //     defaults: {
    //         password: 1999,
    //         age: 23
    //     }
    // })

    // return Female.findAndCountAll({
    //     where: {
    //         femalename: 'Glory'
    //     },
    //     raw: true
    // })

