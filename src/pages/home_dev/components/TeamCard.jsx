import { useState } from "react";
import style from "./TeamCard.module.css"

import { useNavigate } from "react-router-dom";
// import { UpdateProjectModal } from "./UpdateProjectModal";

export const TeamCard = ({ id, name, description, goals, onClick, projectId, fetchProjectList}) => {

    const navigate = useNavigate();

    const [ updateProjectModalIsOpen, setUpdateProjectModalIsOpen ] = useState(false);

    return(
        <div className={style.card} onClick={() => navigate(`/home/team/${id}`)}>
            <div className={style.card_box}>
                <p className={style.proj_id}>{projectId}</p>
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}