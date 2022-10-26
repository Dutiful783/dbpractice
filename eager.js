const Sequelize = require('sequelize');

const { DataTypes, Op } = Sequelize

const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql'
});

const Client = sequelize.define('client', {
    name: DataTypes.STRING
}, {
    timestamps: false
});

const Task = sequelize.define('task', {
    name: DataTypes.STRING
}, {
    timestamps: false
});

const Tool = sequelize.define('tool', {
    name: DataTypes.STRING,
    size: DataTypes.STRING
}, {
    timestamps: false
});

Client.hasMany(Task);
Task.belongsTo(Client);
Client.hasMany(Tool, { as: 'Instruments'});
Tool.belongsTo(Client)

let clients, tasks, tool

(async () => {
    await sequelize.sync({alter : true})
    
    const tool = await Client.findAll({
     where: {
        '$Instruments.size$' : { [Op.ne]: 'small' }
     },
     include: {
        model: Tool,
        as: 'Instruments',
        required: true
     }
    })
    console.log(JSON.stringify(tool, null, 2))
    })()









    // const tool = await Client.findAll({
    //     where: {
    //         '$Instruments.size$': { [Op.ne] : 'small' }
    //     },
    //     include: [{
    //         model: Tool,
    //         as: 'Instruments',
    //         required: true
    //     }]
        
    // })
//     console.log(JSON.stringify(tool, null, 2))
// })();



// (async () => {
//     await sequelize.sync({ alter : true });

//     try {

//         const tool = await Client.findAll({
//             where: {
//                 '$Instruments.size$' : {[Op.ne] : 'small'}
//             },
//             include: [{
//                 model: Tool,
//                 as: 'Instruments'
//             }]
//         });
//         console.log(JSON.stringify(tool, null, 2));

//     } catch (error) {
//         console.log(error)
//     }
// })();



        // Client.findAll({ include: 'Instruments' }); // Also works
        // Client.findAll({ include: { association: 'Instruments' } }); // Also works
        // const tool = await Tool.findAll({ include: Client});
        

        // const tool = await Client.findAll({
        //     include: {
        //         model: Tool, 
        //         as: 'Instruments',
        //         where:{
        //             size: {
        //                 [Op.ne]: 'small'
        //             }
        //         }
        //     }
        // });
        // console.log(JSON.stringify(tool, null, 2));





// sequelize.sync({ alter : true}).then(() => {
//     return Client.findOne({ where: {name: 'Dutiful'}})

// }).then((data) => {
//     clients = data;
//    return Tool.findOne({ where: {name: 'Stenless'}})

// }).then((data) => {
//     tool = data;
//     return tool.setClient(clients)

// }).catch((err) => {
//     console.log(err)
// })

// sequelize.sync({ alter: true}).then(() => {
//     return Client.findOne({ where: { name: 'Godwin' }})

// }).then((data) => {
//     clients = data;
//     return Task.findOne({ where: { name: 'Task Four'}})

// }).then((data) => {
//     tasks = data
//     return tasks.setClient(clients)

// }).catch((err) => {
//     console.log(err)
// })


// let m = async () => {
//     try {
//         const tasks = await Task.findAll({ include: Client});
//         console.log(JSON.stringify(tasks, null, 2));
//     } catch (error) {
//         console.log(error)
//     }
// }
// m();

// sequelize.sync({ alter: true}).then(() => {
//     return Client.findAll({ include: Task });
   
// }).then((data) => {
//     console.log(JSON.stringify(data, null, 2))

// }).catch((err) => {
//     console.log(err)
// })

// Tool.bulkCreate([
//     {
//         name: 'Scissor',
//         size: 'small'
//     },
//     {
//         name: 'Iron',
//         size: 'medium'
//     },
//     {
//         name: 'Stenless',
//         size: 'large'
//     },
//     {
//         name: 'Razor',
//         size: 'small'
//     },
//     {
//         name: 'Diamond',
//         size: 'lage'
//     }
    
// ])

// }).catch((err) => {
//     console.log(err)
// })


// sequelize.sync({ alter: true}).then(() => {
//     return Client.findOne({ where: {name: 'Comfort'}})    

// }).then((data) =>{
//     clients = data
//     return Task.findOne({ where: {name: 'Task Four'}})

// }).then((data) => {
//     tasks = data
//     tasks.setClient(clients)

// }).catch((err) => {
//     console.log(err)
// })