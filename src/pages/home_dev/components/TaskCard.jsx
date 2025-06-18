import { useState } from "react";
import style from "./TaskCard.module.css"

import SendIcon from '@mui/icons-material/Send';

import { useNavigate } from "react-router-dom";
import { ConcludeTaskModal } from "./ConcludeTaskModal";

export const TaskCard = ({ id, description, finalDate, equipDepartament, equipId, priority, isActive, fetchData}) => {

    const navigate = useNavigate();

    const formatDate = (date) => {
        const data = new Date(date);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    }

    const [ concludeTaskModal, setConcludeTaskModal ] = useState(false);

    return(
        <div className={style.card}>
            {priority == 1 &&
            <div className={style.card_box} onClick={() => navigate(`/home/team/${id}`)}>
                <p className={style.proj_id}>{equipId}</p>
                <h3>{equipDepartament}</h3>
                <p>{description}</p>
               {isActive ? "feita" : "pendente"}
                <p className={style.date_title}>Expected conclusion: </p>
                <p className={style.due_date}>{formatDate(finalDate)}</p>
            </div>
            }
            {priority == 2 &&
            <div className={style.card_box_medium} onClick={() => navigate(`/home/team/${id}`)}>
                <p className={style.proj_id}>{equipId}</p>
                <h3>{equipDepartament}</h3>
                <p>{description}</p>
                {isActive ? "feita" : "pendente"}
                <p className={style.date_title}>Expected conclusion: </p>
                <p className={style.due_date}>{formatDate(finalDate)}</p>
            </div>
            }
            {priority >= 3 &&
            <div className={style.card_box_high} onClick={() => navigate(`/home/team/${id}`)}>
                <p className={style.proj_id}>{equipId}</p>
                <h3>{equipDepartament}</h3>
                <p>{description}</p>
                {isActive ? "feita" : "pendente"}
                <p className={style.date_title}>Expected conclusion: </p>
                <p className={style.due_date}>{formatDate(finalDate)}</p>
            </div>
            }
            <div className={style.edit_button} onClick={() => setConcludeTaskModal(true)}>
                <SendIcon />
            </div>
            {concludeTaskModal &&
                <ConcludeTaskModal setModal={setConcludeTaskModal} taskId={id} fetchProjects={fetchData} />
            }
        </div>
    )
}