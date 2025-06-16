import { useState } from "react";
import style from "./ProjectCard.module.css"

import EditIcon from '@mui/icons-material/Edit';
import api from "../../../api/Api";
import { UpdateProjectModal } from "./UpdateProjectModal";

export const ProjectCard = ({ id, name, description, goals, onClick, fetchProjectList}) => {

    const [ updateProjectModalIsOpen, setUpdateProjectModalIsOpen ] = useState(false);

    return(
        <div className={style.card}>
            <div className={style.card_box} onClick={onClick}>
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
            <div className={style.edit_button} onClick={() =>setUpdateProjectModalIsOpen(true)}><EditIcon /></div>
            {updateProjectModalIsOpen &&
                <UpdateProjectModal fetchProjects={fetchProjectList} id={id} name={name} description={description} goals={goals} setModal={setUpdateProjectModalIsOpen}/>
            }
        </div>
    )
}