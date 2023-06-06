import React, { useState, useEffect } from "react";


export default function Create(props) {
    const [textStat, setText] = useState()


    function updateStat(value) {
 
        let newValue = value;
        if (value === `{ "${textStat}":  }`) {
            newValue = `{ "${textStat}": 0 }`
        } 
        const s = JSON.parse(newValue);
        return props.setMonsterForm((prev) => {
            return { ...prev, ...s };
        });
    }

    useEffect(() => {
        setText(props.stat);
    }, [props])

    return (
        <div>
            <div className="form-group">
                <label htmlFor="Stat">{textStat}</label>
                <input
                    type="number"
                    className="form-control"
                    id="stats"
                    value={props.monsterForm.textStat}
                    min={0}
                    onChange={(e) => updateStat(`{ "${textStat}": ${e.target.value} }`)}
                />
            </div>
        </div>
        )
}