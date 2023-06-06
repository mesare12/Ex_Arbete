const config = require('./sqlconfig'),
    SQL = require('mssql');

const getEncounters = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = await pool.request()
            .query('SELECT * FROM [Encounters] left join Monster on Encounters.MonsterFK = Monster.MonsterID' +
                ' left JOIN Actions on Encounters.ActionsFK = Actions.ActionID');
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const login = async (username, password) => {
    try {
        let pool = await SQL.connect(config);
        let user = await pool.request()
            .query(`SELECT Token FROM [dbo].[Users] WHERE UserName = '${username}' AND PasswordHash = '${password}'`);
        if (user) {
            return user;
        }
        else {
            return { Token: 'No User Found' }
        }
    }
    catch (error) {
        console.log(error);
    }
}
const getOneEncounter = async (encounterID) => {
    try {
        let pool = await SQL.connect(config);
        let Encounter = pool.request()
            .query(`  SELECT
	*
  FROM [dbo].[Encounters] 
  left join Monster on Encounters.MonsterFK = Monster.MonsterID
left JOIN Actions on Encounters.ActionsFK = Actions.ActionID
WHERE EncounterID = ${encounterID}`);

        return Encounter;
    } catch (e) {
        console.log(e)
    }
}
const getSkills = async (SkillFK) => {
    try {
        let pool = await SQL.connect(config);
        let skills = pool.request().
            query(`SELECT
	*
  FROM [dbo].[SkillSet]
left JOIN Actions on SkillSet.SkillFK = Actions.ActionID
WHERE SkillSet.ID = ${SkillFK}`)
        return skills
    } catch (e) {
        console.log(e);
    }
}


const getMonsters = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query('SELECT * FROM [dbo].[Monster]');
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}

const getItems = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query('SELECT * FROM [dbo].[Items]');
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const getLoot = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query('SELECT * FROM [dbo].[Loot]');
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const getMonsterAction = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query(`SELECT * FROM [dbo].[Actions] WHERE Category = 'Monster'`);
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const getActions = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query(`SELECT * FROM [dbo].[Actions]`);
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const getSpeed = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query(`SELECT * FROM [dbo].[Speed]`);
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const getSkillSets = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query(`SELECT DISTINCT [ID] FROM [dbo].[SkillSet]`);
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const AddSkillSet = async (id, skill) => {
    try {
        let pool = await SQL.connect(config);
        let string = 'INSERT INTO [dbo].[SkillSet] (ID, SkillFK) ';
        let values = 'VALUES ';
        let querystring = string + values;
        let s = `(${id}, ${skill})`
        querystring = querystring + s;
        pool.request().query(querystring);
        return 'OK'
    } catch (e) {
        console.log(e);
    }
}
const createEncounter = async (encounter) => {
    try {
        let pool = await SQL.connect(config);
        let string = 'INSERT INTO [dbo].[Encounters] (';
        let values = 'VALUES (';
        console.log(encounter);
        string = string + 'SkillFK, MonsterFK, ClassRating) ';
        values = values + `${encounter.SkillFK},${encounter.MonsterFK}, ${encounter.ClassRating})`

        let encounters = pool.request().query(string + values);
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const createMonster = async (monster) => {
    try {
        let pool = await SQL.connect(config);
        let string = `INSERT INTO [dbo].[Monster] ([Title]
            , [Alignement]
            , [Sense]
            , [Armor_Class]
            , [Languages]
            , [HP]
            , [Strength]
            , [Dexterity]
            , [Constitution]
            , [Intelligence]
            , [Wisdom]
            , [Charisma]
            , [SpeedFK]
            , [SpeedFK2]
            , [IMG]
            , [Description])`;
        let values = `VALUES ('${monster.Title}', '${monster.Alignement}', '${monster.Sense}', ${monster.Armor_Class},
'${monster.Languages}', ${monster.HP}, ${monster.Strength}, ${monster.Dexterity} , ${monster.Constitution}
, ${monster.Intelligence}, ${monster.Wisdom}, ${monster.Charisma}, ${monster.SpeedFK}
, ${monster.SpeedFK2}, '${monster.IMG}', '${monster.Description}')`;
        let queryString = string + values;
        console.log(queryString);
        pool.request().query(queryString);
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    login,
    getSkills,
    getSpeed,
    getLoot,
    getEncounters,
    createEncounter,
    getMonsters,
    getItems,
    getActions,
    getMonsterAction,
    getOneEncounter,
    getSkillSets,
    AddSkillSet,
    createMonster
}