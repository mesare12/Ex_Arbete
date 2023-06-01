import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   MonsterFK: null,
   ClassRating: null,
   LootFK: null,
   SkillFK: null,
   ActionsFK: null,
 });
 const navigate = useNavigate();

    const [monsters, setMonsters] = useState();
    const [loot, setLoot] = useState();
    const [skills, setSkills] = useState();
    const [items, setItems] = useState();
    const [encounters, setEncounters] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const dataM = await (
                await fetch('/GetMonsters')).json();
            const dataL = await (
                await fetch('/GetLoot')).json();
            const dataS = await (
                await fetch('/GetActions')).json();
            const dataItems = await (
                await fetch('/GetItems')).json();
            const dataEncounters = await (
                await fetch('/GetEncounters')).json();
            setMonsters(dataM);
            setLoot(dataL);
            setSkills(dataS);
            setItems(dataItems);
            setEncounters(dataEncounters);
        };
        fetchData();
    }, []);

 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
    }

 

 async function onSubmit(e) {
   e.preventDefault();
 
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ name: "", position: "", level: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Encounter</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
                 <label htmlFor="Monster">Monster</label>
                 {/*<Select onChange={(e) => updateForm({ name: e.target.value })}>*/}
               
                 {/*    <option className="form-control"*/}
                 {/*        id="Monster" value={form.name}>*/}
                 {/*    </option>*/}
                 {/*</Select>*/}
         <input
           type=""
           className="form-control"
           id="Monster"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Position</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Intern"
             checked={form.level === "Intern"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Intern</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Junior"
             checked={form.level === "Junior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Junior</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionSenior"
             value="Senior"
             checked={form.level === "Senior"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionSenior" className="form-check-label">Senior</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}