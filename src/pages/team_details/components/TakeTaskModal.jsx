import style from "./TakeTaskModal.module.css"
import ComputerIcon from '@mui/icons-material/Computer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import { useState } from "react";
import api from "../../../api/Api";
import { useAuth } from "../../../contexts/AuthContext";

export const TakeTaskModal = ({ fetchTasks, setModal, taskId }) => {

    const { userId } = useAuth();

    const handleSuccess = () => {
        fetchTasks();
        setModal(false);
    }

    const handleAddAction = async(e) => {
        e.preventDefault()
        try{
            const response = await api.put(`/task/${taskId}/assign/${userId}`);
            handleSuccess()
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Are you sure that you want get this task?</h2>
                <form>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleAddAction}>Yes</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>No</button>
                    </div>
                </form>
            </div>
        </div>
    )
}