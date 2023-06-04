import React, { useRef, useState,useEffect } from "react";
import styles from "./Encounter.module.css"

function Encounter(props)  {
    const modalRef = useRef();
    const [encounter, setEncounter] = useState();
    const Item = props.Encounter;
    async function fetchData(credentials) {
        return await fetch('http://localhost:5000/GetEncounterID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json()
            )
    }


    useEffect(() => {
        const data =  fetchData(Item);
        console.log(data);
    }, []);
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            props.setShowModal(false);
        }
    };
    return (
        <div className={styles.container} ref={modalRef} onClick={closeModal}>
            <div className={styles.modal}>
                <h2></h2>
                <button onClick={() => props.setShowModal(false)}>X</button>
            </div>
        </div>
    );
};

export default Encounter;