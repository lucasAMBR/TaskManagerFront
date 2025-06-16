import style from "./UpdateTeamModal.module.css"

import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from "react";
import api from "../../../api/Api";

export const UpdateTeamModal = ({ fetchTeams, setModal, teamId, leaderId, departament, description }) => {

    const [ leaderInput, setLeaderInput ] = useState(leaderId);
    const [ departamentInput, setDepartamentInput ] = useState(departament)
    const [ descriptionInput, setDescriptionInput ] = useState(description);

    const handleLeaderChange = (e) => {
        setLeaderInput(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescriptionInput(e.target.value)
    }

    const handleDepartamentChange = (e) => {
        setDepartamentInput(e.target.value)
    }

    const handleSuccess = () => {
        fetchTeams();
        setModal(false);
    }

    const handleCreateProject = async(e) => {
        e.preventDefault();

        const updatedFields = {};

        if(leaderInput != leaderId){
            updatedFields.leaderId = leaderInput;
        }

        if(descriptionInput != description){
            updatedFields.description = descriptionInput;
        }

        if(departamentInput != departament){
            updatedFields.departament = departamentInput;
        }

        try{
            const response = await api.put(`/equip/${teamId}`, updatedFields);

            handleSuccess();
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Update team data</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Leader ID" value={leaderInput} onChange={handleLeaderChange} />
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <EditIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Description" value={descriptionInput} onChange={handleDescriptionChange}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <FlagIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <select type="text" placeholder="Departament" value={departamentInput} onChange={handleDepartamentChange}>
                            <option value={"Development - Backend"}>Development - Backend</option>
                            <option value={"Development - Frontend"}>Development - Frontend</option>
                            <option value={"Testing"}>Testing</option>
                            <option value={"Design"}>Design</option>
                            <option value={"HR"}>HR</option>
                        </select>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleCreateProject}>Edit</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}