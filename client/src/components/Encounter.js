import React, { useRef, useState, useEffect } from "react";
import styles from "./Encounter.module.css"

function Encounter(props) {
    const modalRef = useRef();
    const [skill, setSkill] = useState([]);
    async function fetchData(credentials) {
        return await fetch('http://localhost:5000/GetSkills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json()
                .then((result) => {
                    setSkill(result)
                }
                ))
    }
    useEffect(() => {
        const number = { id: props.randomNumber.SkillFK }
        fetchData(number);
    }, [props])

    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            props.setShowModal(false);
        }
    };
    return (
        <div className={styles.container} ref={modalRef} onClick={closeModal}>

            <div className={styles.modal}>
                <div className={styles.card}>
                    <div className={styles.toppart}>
                        <img width="80%" src={props.randomNumber.IMG} />
                        <section>
                            <div>
                                <h2>{props.randomNumber.Title}</h2>
                                <p>{props.randomNumber.Description} {props.randomNumber.Alignement}</p>
                                <p>Rating: {props.randomNumber.ClassRating}</p>
                            </div>

                            <div>
                                <p>Armor Class: {props.randomNumber.Armor_Class} </p>
                                <p>Hit Points: {props.randomNumber.HP} </p>
                                <p>Language: {props.randomNumber.Language} </p>
                                <p>Sense: {props.randomNumber.Sense} </p>
                            </div>
                        </section>
                    </div>
                    <section className={styles.stats}>
                        <div><h2>STR</h2>{props.randomNumber.Strength}</div>
                        <div><h2>DEX</h2>{props.randomNumber.Dexterity}</div>
                        <div><h2>CON</h2>{props.randomNumber.Constitution}</div>
                        <div><h2>INT</h2>{props.randomNumber.Intelligence}</div>
                        <div><h2>WIS</h2>{props.randomNumber.Wisdom}</div>
                        <div><h2>CHA</h2>{props.randomNumber.Charisma}</div>
                    </section>
                    <section className={styles.skills}>
                        <section>
                            <h1>Actions</h1>
                            {
                                skill.map(s => (
                                    <div key={s.ActionID}>
                                        <h3>{s.ActionTitle}</h3>
                                        <p>{s.ActionText}</p>
                                    </div>
                                ))
                            }
                        </section>
                    </section>
                </div>

                <button onClick={() => props.setShowModal(false)}>X</button>
            </div>
        </div>
    );
};

export default Encounter;