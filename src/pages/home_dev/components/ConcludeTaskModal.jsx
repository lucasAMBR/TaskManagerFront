import style from "./ConcludeTaskModal.module.css"
import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';
import { useState } from "react";
import api from "../../../api/Api";

export const ConcludeTaskModal = ({ fetchProjects, setModal, taskId }) => {

    const [ hoursSpend, setHours ] = useState("");
    const [ report, setReport ] = useState("");
    const [ status, setStatus ] = useState("none")

    const handleHoursSpend = (e) =>  {
        setHours(e.target.value)
    }

    const handleReport = (e) => {
        setReport(e.target.value);
    }

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    const handleSuccess = () => {
        fetchProjects();
        setModal(false);
    }

    const handleInviteUse = async(e) => {
        e.preventDefault();

        if(status == "none"){
            return
        }

        try{
            const response = await api.put(`/task/conclude/${taskId}`, {
                "type": status,
                "note": report,
                "hoursSpend": hoursSpend
            });
            handleSuccess();
        handleSuccess();
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Write the conclusion report</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="number" placeholder="Hours spend" value={hoursSpend} onChange={handleHoursSpend}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Report" value={report} onChange={handleReport}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <select type="text" placeholder="Insert invite code" value={status} onChange={handleStatus}>
                            <option value={"none"}>Choose the conclusion type...</option>
                            <option value={"Sucess"}>Success</option>
                            <option value={"With_remarks"}>With Remarks</option>
                            <option value={"Failed"}>Failed</option>
                        </select>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleInviteUse}>Send</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}