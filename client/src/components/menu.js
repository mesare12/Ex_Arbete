import React, { useState, useEffect } from "react";
import styles from "./menu.module.css";
import Encounter from "./Encounter"

export default function Menu() {
    const [encounters, setEncounters] = useState();
    const [showModal, setShowModal] = useState(false);
    const [randomNumber, setRandomNumber] = useState();


    const openModal = () => {
        const randomNumber = Math.floor(Math.random() * encounters.length);
        setRandomNumber(randomNumber);
        setShowModal(true);
        console.log(showModal);
        console.log(encounters);
    };
    const fetchData = async () => {
        const newData = await fetch('/GetEncounters', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json());
        setEncounters(newData.result)
    }

    useEffect(() => {
    
        fetchData();
        console.log(encounters);
    }, [encounters]);


    return (
        <div className={styles.background} >
            <section className={styles.grid}>
                <div>
                    <h2>Past aventures</h2>
                </div>

                <div>
                </div>
                <div>
                    <h2>Monster Encounter </h2>
                    <div>
                        <button onClick={openModal}>Generate Encounter</button>
                        {showModal ? <Encounter setShowModal={setShowModal} /> : null}
                    </div>
                </div>
            </section>
        </div>
    );
}
