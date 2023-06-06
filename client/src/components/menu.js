import React, { useState, useEffect } from "react";
import styles from "./menu.module.css";
import Encounter from "./Encounter";


export default function Menu() {
    const [encounters, setEncounters] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [randomNumber, setRandomNumber] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const openModal = () => {
        const rnd = Math.floor(Math.random() * encounters.length);
        setRandomNumber(encounters[rnd]);
        setShowModal(true);
    };



    useEffect(() => {
        function fetchData() {
            setIsLoading(true);
             fetch('http://localhost:5000/GetEncounters').then(res => res.json())
                .then((result) => {
                    setEncounters(result)
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
                    <h2>Adventure</h2>
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
