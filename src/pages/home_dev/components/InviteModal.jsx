import style from "./InviteModal.module.css"
import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from "react";
import api from "../../../api/Api";

export const InviteModal = ({ fetchProjects, setModal }) => {

    const [ inviteCode, setInviteCode ] = useState("");

    const handleInviteCodeChange = (e) => {
        setInviteCode(e.target.value);
    }

    const handleSuccess = () => {
        fetchProjects();
        setModal(false);
    }

    const handleInviteUse = async(e) => {
        e.preventDefault();

        try{
            const response = await api.put(`/invitecode/enter/${inviteCode}`);
            handleSuccess();
        handleSuccess();
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Use invite code</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Insert invite code" value={inviteCode} onChange={handleInviteCodeChange}/>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleInviteUse}>Use</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}