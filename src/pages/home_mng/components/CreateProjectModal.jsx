import style from "./CreateProjectModal.module.css"

import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from "react";
import api from "../../../api/Api";

export const CreateProjectModal = ({ fetchProjects, setModal }) => {

    const [ nameInput, setNameInput ] = useState("")
    const [ descriptionInput, setDescriptionInput ] = useState("");
    const [ goalsInput, setGoalsInput ] = useState("");

    const handleNameChange = (e) => {
        setNameInput(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescriptionInput(e.target.value)
    }

    const handleGoalsChange = (e) => {
        setGoalsInput(e.target.value)
    }

    const handleSuccess = () => {
        fetchProjects();
        setModal(false);
    }

    const handleCreateProject = async(e) => {
        e.preventDefault();

        try{
            const response = await api.post("/project", {
            "name": nameInput,
            "description": descriptionInput,
            "goals": goalsInput
        });

        handleSuccess();
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Creating a project</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Project name" value={nameInput} onChange={handleNameChange}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <EditIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Description" value={descriptionInput} onChange={handleDescriptionChange}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <FlagIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Project goals" value={goalsInput} onChange={handleGoalsChange}/>
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