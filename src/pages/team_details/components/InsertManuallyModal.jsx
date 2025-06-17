import style from "./InsertManuallyModal.module.css"
import ComputerIcon from '@mui/icons-material/Computer';

import { useState } from "react";
import api from "../../../api/Api";

export const InsertManuallyModal = ({ fetchTasks, teamId, setModal }) => {

    const [devIdInput, setDevIdInput ] = useState("");

    const handleDevIdInput = (e) => {
        setDevIdInput(e.target.value);
    }

    const handleSuccess = () => {
        fetchTasks();
        setModal(false);
    }

    const handleAddAction = async() => {
        try{
            const response = await api.post(`/equip/${teamId}/add/${devIdInput}`);

            handleSuccess()
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Add a member</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Member Id" value={devIdInput} onChange={handleDevIdInput}/>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleAddAction}>Add</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}