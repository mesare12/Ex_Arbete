import React, { useRef, useState, useEffect } from "react";
import ReactDom from "react-dom";

function Encounter({ setShowModal })  {
    const modalRef = useRef();
    const [encounter, setEncounter] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const Data = await (
                await fetch('/GetEncounter')).json();
            setEncounter(Data);
        };
        fetchData();
    }, []);
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };

    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                <h2>{encounter}</h2>
                <button onClick={() => setShowModal(false)}>X</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default Encounter;