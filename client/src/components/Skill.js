import React, { useState } from "react";



export default function Skill(props) {
    const [text, setText] = useState();


    function onchange(e) {
        if (e !== null) {
            let index = props.skills.findIndex(x => x.ActionID == e.SkillFK)
            if (index === -1) {
                index++
            }
            setText(props.skills[index])
            let array = props.SkillGroup;
            array.push(e)
            props.setSkillGroup(array);
            props.AddMore(true)
        }
        if (props.setForm) {
            updateForm(JSON.parse(`{ "SkillFK" : "${e.ID}" }`))

        }
        else {
            props.AddMore(false)
        }
    }
    function updateForm(value) {
        return props.setForm((prev) => {
            return { ...prev, ...value };
        })
    }

    return (
        <div className="form-group">
            <select onChange={(e) => onchange({ SkillFK: e.target.value, ID: props.ID })}>
                <option value="null"></option>
                {
                    props.skills.map(mon => (
                        <option className="form-control"
                            key={mon.ActionID} value={mon.ActionID}>
                            {mon.ActionTitle}
                        </option>
                    ))
                }
            </select>
            {text && (
                    <p>{text.ActionText}</p>
                )
            }
        </div>
    )
}