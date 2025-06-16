import { useState } from "react";
import style from "./TeamCard.module.css"
import EditIcon from '@mui/icons-material/Edit';
import { UpdateTeamModal } from "./UpdateTeamModal";
import { useNavigate } from "react-router-dom";

export const TeamCard = ({id, leaderId, departament, description, fetchEquips}) => {

    const navigate = useNavigate();

    const [ updateModalIsOpen, setUpdateModalIsOpen ] = useState(false);

    return(
        <div className={style.card}>
            <div className={style.card_box} onClick={() => navigate(`/home/team/${id}`)}>
                <h2>{departament}</h2>
                <p>{description}</p>
                <p className={style.leaderId}>Leader: {leaderId}</p>
            </div>
            <div className={style.edit_button} onClick={() => setUpdateModalIsOpen(true)}>
                <EditIcon />
            </div>
            {updateModalIsOpen && 
                <UpdateTeamModal setModal={setUpdateModalIsOpen} fetchTeams={fetchEquips} leaderId={leaderId} departament={departament} description={description} teamId={id} />
            }
        </div>
    )
}