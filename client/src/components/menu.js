import React, { useState, useEffect } from "react";
import styles from "./menu.module.css";
import Encounter from "./Encounter";


export default function Menu() {
    const [encounters, setEncounters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [randomNumber, setRandomNumber] = useState();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const openModal = () => {
        const rnd = Math.floor(Math.random() * encounters.recordset.length);
        setRandomNumber(encounters.recordset[rnd]);
        setShowModal(true);
    };



    useEffect(() => {
        function fetchData() {
            setIsLoading(true);
             fetch('http://localhost:5000/GetEncounters').then(res => res.json())
                .then((result) => {
                    setEncounters(result)
                }, (error) => {
                    setError(error);
                })
        }
        fetchData();
        if (encounters.length !== 0) {
            setIsLoading(false);
        }
    }, [encounters.length, randomNumber]);


    return (
        <div className={styles.background} >
            <section className={styles.grid}>
                <div>
                    <h2>Past adventures</h2>
                </div>

                <div>
                    {!isLoading && (
                        <ul>
                            {encounters.recordset.map(encounter => (
                                <li key={encounter.EncounterID}>{encounter.EncounterID}</li>
                            ))}
                        </ul>
                    )}
                </div>
                <div>
                    <h2>Monster Encounter </h2>
                    <div>
                        <button onClick={openModal}>Generate Encounter</button>
                        {showModal ? <Encounter setShowModal={setShowModal} randomNumber={randomNumber} /> : null}
                    </div>
                </div>
            </section>
        </div>
    );
}
