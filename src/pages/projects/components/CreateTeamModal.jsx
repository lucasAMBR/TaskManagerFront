import style from "./CreateTeamModal.module.css"

import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from "react";
import api from "../../../api/Api";

export const CreateTeamModal = ({ fetchTeams, setModal, projectId }) => {

    const [ leaderInput, setLeaderInput ] = useState("");
    const [ departamentInput, setDepartamentInput ] = useState("Development - Backend")
    const [ descriptionInput, setDescriptionInput ] = useState("");

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

        try{
            const response = await api.post(`/equip`, {
                "leaderId": leaderInput,
                "projectId": projectId,
                "departament": departamentInput,
                "description": descriptionInput
            });

            handleSuccess();
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Create a team</h2>
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
                        <button className={style.login_submit} onClick={handleCreateProject}>Create</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}