const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {DataTypes, Op} = Sequelize

const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql'
})

const Students = sequelize.define( 'student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    studentName: {
        type: DataTypes.STRING,
    },

    department: {
        type: DataTypes.STRING,
    },

    course: {
        type: DataTypes.STRING
    },

    level: {
        type: DataTypes.INTEGER,
        validate: {
            set(value){
                if (value < 300) {
                    console.log('You are undergraduate!!!')
                } else {
                    console.log('You will soon graduate... work hard')
                }
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            set(value){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(value, salt);
                this.setDataValue('password', hash)
            }
        }
    }
}, { 
    
    timestamps: true,
    freezeTypeName: true,
    paranoid: true,
    deletedAt: 'timeDestroyed'
})

sequelize.sync({ alter: true }).then(() => {
    return Students.destroy({ where: {
        student_id: 16,
        
    }})
}).then((data) => {
    console.log(data)

}).catch((e) => {
    console.log(e)
})