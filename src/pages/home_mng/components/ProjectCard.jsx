import { useState } from "react";
import style from "./ProjectCard.module.css"

import EditIcon from '@mui/icons-material/Edit';
import api from "../../../api/Api";

export const ProjectCard = ({ id, name, description, onClick}) => {

    const [ projectData, setProjectData ] = useState(null);

    const [ loading, setLoading ] = useState(true);

    return(
        <div className={style.card}>
            <div className={style.card_box} onClick={onClick}>
                <h2>{name}</h2>
                <p>{description}</p>
            </div>
            <div className={style.edit_button}><EditIcon /></div>
        </div>
    )
}