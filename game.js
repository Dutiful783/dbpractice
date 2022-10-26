const { DataTypes, Sequelize, Op, Model} = require('sequelize');

const sequelize = new Sequelize('demo', 'root', 'Sunday40@', {
    dialect: 'mysql',
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

const Player = sequelize.define('Player', {
    username: DataTypes.STRING
});

const Team = sequelize.define('Team', {
    name: DataTypes.STRING
});

const Game = sequelize.define('Game', {
    name: DataTypes.STRING
});

// We apply a Super Many-to-Many relationship between Game and Team
const GameTeam = sequelize.define('GameTeam', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
})

Team.belongsToMany(Game, { through: GameTeam });
Game.belongsToMany(Team, { through: GameTeam });
GameTeam.belongsTo(Game);
GameTeam.belongsTo(Team);
Game.hasMany(GameTeam);
Team.hasMany(GameTeam);

// We apply a Super Many-to-Many relationship between Player and GameTeam

const PlayerGameTeam = sequelize.define('PlayerGameTeam', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }
});

Player.belongsToMany(GameTeam, { through: PlayerGameTeam });
GameTeam.belongsToMany(Player, { through: PlayerGameTeam });
PlayerGameTeam.belongsTo(Player);
PlayerGameTeam.belongsTo(GameTeam);
Player.hasMany(PlayerGameTeam);
GameTeam.hasMany(PlayerGameTeam);

(async () => {
    await sequelize.sync({ alter : true });
    try {
        const game = await Game.findOne({
            where: {
                name: 'Winter Showdown'
            },
            include: {
                model: GameTeam,
                include: [
                    {
                        model: Player,
                        through: { attributes: [] }
                    },
                    Team
                ]
            }
        });

        console.log(`Found game: "${game.name}"`);
        for (let i = 0; i < game.GameTeams.length; i++) {
            const team = game.GameTeams[i].Team;
            const players = game.GameTeams[i].Players;
            console.log(`- Team "${team.name}" played game "${game.name}" with the following players:`);
            console.log(players.map(p => `---${p.username}`).join('\n'));
        }

    } catch (error) {
        console.log(error)
    }

})()

    // await Player.bulkCreate([
    //     { username: 'SomeOne' },
    //     { username: 'Empty' },
    //     { username: 'GreenHead' },
    //     { username: 'not_spoke' },
    //     { username: 'Shokky' }
    // ]);

    // await Game.bulkCreate([
    //     { name: 'The big Clash' },
    //     { name: 'Winter Showdown' },
    //     { name: 'Summer Beatdown' },
    // ]);

    // await Team.bulkCreate([
    //     { name: 'The Martins' },
    //     { name: 'The Earthlings' },
    //     { name: 'The Plutonians' },
    // ]);

    // await GameTeam.bulkCreate([
    //     { GameId: 1, TeamId: 1 },
    //     { GameId: 1, TeamId: 2 },
    //     { GameId: 2, TeamId: 1 },
    //     { GameId: 2, TeamId: 3 },
    //     { GameId: 3, TeamId: 2 },
    //     { GameId: 3, TeamId: 3 }
    // ]);

    // await PlayerGameTeam.bulkCreate([
    //     { PlayerId: 1, GameTeamId: 3 },
    //     { PlayerId: 3, GameTeamId: 3 },
    //     { PlayerId: 4, GameTeamId: 4 },
    //     { PlayerId: 5, GameTeamId: 4 }
    // ]);
 