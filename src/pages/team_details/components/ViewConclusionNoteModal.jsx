import style from "./ViewConclusionNoteModal.module.css"
import ComputerIcon from '@mui/icons-material/Computer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import { useEffect, useState } from "react";
import api from "../../../api/Api";

export const ViewConclusionNoteModal = ({ teamId, setModal }) => {

    const [ conclusionNoteList, setConclusionNoteList ] = useState([])

    const handleAddAction = async() => {

        try{
            const response = await api.get(`/conclusion_note/${teamId}`);
            console.log(response.data)
            setConclusionNoteList(response.data)
        }catch(error){
            console.log(error)
        }
    }

    const formatDate = (date) => {
        const data = new Date(date);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        const hora = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');

        return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
    }

    useEffect(()=>{
        handleAddAction()
    }, [])

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2 onClick={() => console.log(conclusionNoteList)}>View task conclusion report's from this team</h2>
                <div className={style.note_list}>
                    {conclusionNoteList.length == 0 &&
                        <p>No conclusion reports at this moment...</p>
                    } 
                    {conclusionNoteList.length > 0 && 
                        <>
                            {conclusionNoteList.map((item, index) => (
                                <div className={style.conclusion_item}>
                                    <p><span className={style.note_title}>TaskId:</span> {item.taskId}</p>
                                    <p><span className={style.note_title}>Task Description:</span> {item.task.description}</p>
                                    <p><span className={style.note_title}>Concluded by:</span> {item.task.assigneeId}</p>
                                    <p><span className={style.note_title}>Conclusion Status:</span> {item.status}</p>
                                    <p><span className={style.note_title}>Conclusion report:</span> {item.note}</p>
                                    <p><span className={style.note_title}>Hours spend:</span> {item.hoursSpend}</p>
                                    <p><span className={style.note_title}>Conclusion date:</span> {formatDate(item.createdAt)}</p>
                                </div>
                            ))}
                        </>
                    }
                </div>
                <button className={style.alt_button} onClick={()=> setModal(false)}>Close</button>
            </div>
        </div>
    )
}