import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./create.module.css";
import Skill from "./Skill"
import MonsterStats from "./MonsterStats"

export default function Create() {
    const [form, setForm] = useState({
        MonsterFK: null,
        ClassRating: null,
        LootFK: null,
        SkillFK: null,
        ActionsFK: null,
    });
    const [monsterForm, setMonsterForm] = useState({
        Title: null,
        Alignement: null,
        Sense: null,
        Armor_Class: null,
        Languages: null,
        HP: null,
        Strength: null,
        Dexterity: null,
        Constitution: null,
        Intelligence: null,
        Wisdom: null,
        Charisma: null,
        SpeedFK: null,
        SpeedFK2: null,
        Description: null,
        IMG: null
    });
    const [SkillGroup, setSkillGroup] = useState([])

    const navigate = useNavigate();

    const [monsters, setMonsters] = useState([]);
    const [IMG, setIMG] = useState();
    const [loot, setLoot] = useState([]);
    const [skills, setSkills] = useState([]);
    const [items, setItems] = useState([]);
    const [speed, setSpeed] = useState([]);
    const [skillSet, setSkillSet] = useState([])
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [message, setMessage] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            fetch('http://localhost:5000/GetMonsters').then(res => res.json())
                .then((result) => {
                    setMonsters(result)
                });
            fetch('http://localhost:5000/GetLoot').then(res => res.json())
                .then((result) => {
                    setLoot(result);
                });
            fetch('http://localhost:5000/GetSkillSets').then(res => res.json())
                .then((result) => {
                    setSkillSet(result)
                });
            fetch('http://localhost:5000/GetMonsterActions').then(res => res.json())
                .then((result) => {
                    setSkills(result)
                });
            fetch('http://localhost:5000/GetItems').then(res => res.json())
                .then((result) => {
                    setItems(result)
                });
            fetch('http://localhost:5000/GetSpeed').then(res => res.json())
                .then((result) => {
                    setSpeed(result)
                });
        };
        fetchData();
    }, [items.length, monsters.length, skills.length, loot.length, skillSet.length]);

    function updateForm(value) {
        if (value.MonsterFK) {
            let index = monsters.findIndex(x => x.MonsterID == value.MonsterFK)
            if (index === -1) {
                index++
            }
            setIMG(monsters[index])
            let imgstring = `{ "IMG" : "${monsters[index].IMG}" }`;
            let IMG = JSON.parse(imgstring);
            value.MonsterFK++;

            setMonsterForm((prev) => {
                return { ...prev, ...IMG }
            })

            let monsterString = `{ "MonsterFK" : "${monsters.length + 1}" }`;
            let mon = JSON.parse(monsterString)
            setForm((prev) => {
                return {...prev, ...mon}
            })
        }
        else {
            return setForm((prev) => {
                return { ...prev, ...value };
            });
        }
    
    }
    function updateMon(value) {
        return setMonsterForm((prev) => {
            return { ...prev, ...value };
        })
    }

    //Not working as intended so it is scrapped
    const deleteById = (id) => {
        const filtered = SkillGroup.filter(item => item.SkillFK !== id);
        setSkillGroup(filtered)
    }

    async function onSubmit(e) {
        e.preventDefault();

        const newEncounter = { ...form };
        const newSkillset = [...SkillGroup];
        const newMonster = { ...monsterForm };
        console.log(newEncounter.SkillFK);
        async function PostSkillset(items) {
            await fetch("http://localhost:5000/AddSkillSet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(items),
            })
                .catch(error => {
                    window.alert(error);
                })
        };
        newSkillset.map(item => PostSkillset(item));
        await fetch("http://localhost:5000/AddEncounter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEncounter),
        })
            .catch(error => {
                window.alert(error);
            });
        await fetch("http://localhost:5000/AddMonster", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMonster),
        })
            .catch(error => {
                window.alert(error);
            });


        setForm({ MonsterFK: "", Description: "", ClassRating: "", LootFK: "", SkillFK: "", ActionsFK: "" });
        navigate("/");
    }




    return (
        <div className={styles.background}>
            <div className={styles.container}>
                {IMG ? (
                    <div className={styles.centre}>
                        <img width="150px" height="150px" src={IMG.IMG} alt="MonsterIMG"></img>
                    </div>
                )
                    :
                    (<div className={styles.centre}>
                        <svg height="150px" width="150px">
                            <circle
                                cx="75"
                                cy="75"
                                r="70"
                                stroke="black"
                                stroke-width="3"
                                fill="black"
                            />
                        </svg>
                    </div>)
                }

                <h3>Create New Encounter</h3>
                <form onSubmit={onSubmit}>
                    <div >
                        <div className={styles.grid}>
                            <div className={styles.centre}>
                                <div className="form-group">
                                    <h3 htmlFor="Monster">Monster</h3>
                                    <select onChange={(e) => updateForm({ MonsterFK: e.target.value })}>
                                        <option value="Null"></option>
                                        {monsters.map(mon => (
                                            <option className="form-control"
                                                key={mon.MonsterID} value={mon.MonsterID}>
                                                {mon.Title}
                                            </option>
                                        ))}
                                    </select>
                                    <div>
                                        <label htmlFor="Title">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Title"
                                            placeholder="example: Aragorn..."
                                            value={monsterForm.Title}
                                            onChange={(e) => updateMon({ Title: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="Alignement">Alignement</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Title"
                                            placeholder="example: Unaligned, Neutral evil..."
                                            value={monsterForm.Alignement}
                                            onChange={(e) => updateMon({ Alignement: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="positionOptions"
                                                id="ClassRating 1"
                                                value="1"
                                                checked={form.ClassRating === "1"}
                                                onChange={(e) => updateForm({ ClassRating: e.target.value })}
                                            />
                                            <label htmlFor="Class 1" className="form-check-label">Class 1</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="positionOptions"
                                                id="ClassRating 2"
                                                value="2"
                                                checked={form.ClassRating === "2"}
                                                onChange={(e) => updateForm({ ClassRating: e.target.value })}
                                            />
                                            <label htmlFor="Class 2" className="form-check-label">Class 2</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="positionOptions"
                                                id="ClassRating 3"
                                                value="3"
                                                checked={form.ClassRating === "3"}
                                                onChange={(e) => updateForm({ ClassRating: e.target.value })}
                                            />
                                            <label htmlFor="Class 3" className="form-check-label">Class 3</label>
                                        </div>
                                    </div>
                                </div>
                                <h3 htmlFor="Skills">Actions</h3>
                                <Skill skills={skills} setSkillGroup={setSkillGroup} SkillGroup={SkillGroup} ID={skillSet.length + 1} deleteById={deleteById} AddMore={setSecond} setForm={setForm}></Skill>
                                {second && (
                                    <Skill skills={skills} setSkillGroup={setSkillGroup} SkillGroup={SkillGroup} ID={skillSet.length + 1} deleteById={deleteById} AddMore={setThird}></Skill>
                                )}
                                {third && (
                                    <Skill skills={skills} setSkillGroup={setSkillGroup} SkillGroup={SkillGroup} ID={skillSet.length + 1} deleteById={deleteById} AddMore={setMessage}></Skill>
                                )}
                                {message ? <p className={styles.Error}>Can't add more</p> : null}

                            </div>
                            <div>
                                <h2>Stats</h2>
                                <label htmlFor="Languages">Languages</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Languages"
                                    value={monsterForm.Languages}
                                    onChange={(e) => updateMon({ Languages: e.target.value })}
                                />
                                <div className={styles.grid}>
                                    <MonsterStats stat="Armor_Class" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />
                                    <div>
                                        <label htmlFor="Sense">Sense</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="Sense"
                                            placeholder="example: DarkVision 50ft..."
                                            value={monsterForm.Sense}
                                            onChange={(e) => updateMon({ Sense: e.target.value })}
                                        />
                                    </div>
                                    <div className={styles.grid}>
                                        <label htmlFor="Speed1">Speed 1</label>
                                        <select onChange={(e) => updateMon({ SpeedFK: e.target.value })}>
                                            <option value="Null"></option>
                                            {speed.map(mon => (
                                                <option className="form-control"
                                                    key={mon.SpeedID} value={mon.SpeedID}>
                                                    {mon.SpeedText}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className={styles.grid}>
                                        <label htmlFor="Speed2">Speed 2</label>
                                        <select onChange={(e) => updateMon({ SpeedFK2: e.target.value })}>
                                            <option value="Null"></option>
                                            {speed.map(mon => (
                                                <option className="form-control"
                                                    key={mon.SpeedID} value={mon.SpeedID}>
                                                    {mon.SpeedText}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                                <div className={styles.Stats}>
                                    <MonsterStats stat="HP" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />
                                    <div></div>
                                    <div></div>
                                    <MonsterStats stat="Strength" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />
                                    <MonsterStats stat="Dexterity" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />
                                    <MonsterStats stat="Constitution" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />
                                    <MonsterStats stat="Intelligence" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />
                                    <MonsterStats stat="Wisdom" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />
                                    <MonsterStats stat="Charisma" setMonsterForm={setMonsterForm} monsterForm={monsterForm} />

                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Description"
                                value={monsterForm.Description}
                                onChange={(e) => updateMon({ Description: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                value="Create Encounter"
                                className="btn btn-primary"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}