const config = require('./sqlconfig'),
    SQL = require('mssql');

const getEncounters = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query('SELECT * FROM [dbo].[Encounters]');
        console.log(encounters);
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
const getOneEncounter = async (encounterID) => {
    try {
        let pool = await SQL.connect(config);
        let Encounter = pool.request()
            .query(`SELECT
	Encounters.MonsterFK,
	Monster.Title,
	Monster.Alignement,
	Encounters.LootFK,
	Encounters.SkillFK,
	Encounters.ClassRating,
	Encounters.ActionsFK
  FROM [Examen].[dbo].[Encounters]
  left join Monster on Encounters.MonsterFK = Monster.MonsterID
left JOIN Actions on Encounters.ActionsFK = Actions.ActionID
left JOIN SkillSet on Encounters.SkillFK = SkillSet.ID
WHERE EncounterID = ${encounterID}`);
        return Encounter;
    } catch (e) {
        console.log(e)
    }
}
const createEncounter = async (encounter) => {
    try {
        let pool = await SQL.connect(config);
        let string = 'INSERT INTO [dbo].[Encounters] (';
        let values = 'VALUES (';
        if (encounter.Skill != null)
        {
            string = string + 'SkillFK, ';
            values = values + `${encounter.SkillFK}, `;
        }
        if (encounter.Actions != null)
        {
            string = string + 'ActionsFK, ';
            values = values + `${encounter.ActionsFK}, `;
        }
        string = string + 'MonsterFK, ClassRating, LootFK) ';
        values = values + `${encounter.MonsterFK}, ${encounter.ClassRating}, ${encounter.LootFK})`

        let encounters = pool.request().query(string + values);
        console.log(encounters);
        return encounters
    }
    catch (error) {
        console.log(error);
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
const getActions = async () => {
    try {
        let pool = await SQL.connect(config);
        let encounters = pool.request()
            .query('SELECT * FROM [dbo].[Actions]');
        return encounters
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {

    getEncounters,
    createEncounter,
    getMonsters,
    getItems,
    getActions,
    getOneEncounter
}