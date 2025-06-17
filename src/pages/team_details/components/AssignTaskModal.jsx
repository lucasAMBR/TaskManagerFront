import style from "./AssignTaskModal.module.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useState } from "react";
import api from "../../../api/Api";

export const AssignTaskModal = ({ fetchTasks, teamId, setModal, memberList, taskId, setTaskId }) => {

    const [ choosedMember, setChoosedMember ] = useState("none")

    const handleChoosedMemberInput = (e) => {
        setChoosedMember(e.target.value);
    }

    const handleSuccess = () => {
        fetchTasks();
        setModal(false);
    }

    const handleClose = () => {
        setModal(false);
        setTaskId(null);
    }

    const handleAddAction = async(e) => {
        e.preventDefault()

        if(choosedMember == "none"){
            handleClose()
            return
        }

        try{
            const response = await api.put(`/task/${taskId}/assign/${choosedMember}`);
            
            handleSuccess();
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Assign this task</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <AccountCircleIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <select type="text" placeholder="invite max usages" value={choosedMember} onChange={handleChoosedMemberInput}>
                            <option>Choose a member...</option>
                            {memberList.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleAddAction}>Assign</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}