import React from "react";
import door from "../img/door.jpg";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { useState } from "react";

export default function Navbar() {
    const [open, isOpen] = useState(false)

    const dropdown = () => {
        isOpen(!open)
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <div className={styles.header}>
                        <img className={styles.image} src={door} alt="door"></img>
                        <h3 className={styles.title}>Dungeon Control</h3>
                    </div>
                </NavLink>
                <button
                    onClick={dropdown}
                    className="navbar-toggler position-absolute end-0 m-5"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create">
                                Create new Adventure
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="/itemCreate">
                                Create Item
                            </NavLink>
                        </li>
                    </ul>
                </div>
                {open ?
                    <div className={styles.dropdown} id="navbarSupportedContent">
                        <ul className={styles.menu}>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/create">
                                    Create new Adventure
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/itemCreate">
                                    Create Item
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    :
                    null
                }

            </nav>
        </div>
    );
}
