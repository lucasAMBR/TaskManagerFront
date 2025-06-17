import style from "./GenerateInviteCodeModal.module.css"
import ComputerIcon from '@mui/icons-material/Computer';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

import { useState } from "react";
import api from "../../../api/Api";

export const GenerateInviteCodeModal = ({ fetchTasks, teamId, setModal }) => {

    const [maxUsages, setMaxUsages ] = useState("");

    const [ generatedCode, setGeneratedCode ] = useState(null)

    const handleMaxUsagesInput = (e) => {
        setMaxUsages(e.target.value);
    }

    const handleSuccess = () => {
        fetchTasks();
        setModal(false);
    }

    const handleAddAction = async(e) => {
        e.preventDefault()
        try{
            const response = await api.post(`/invitecode/generate/${teamId}?maxUsages=${maxUsages}`);
            setGeneratedCode(response.data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Generate invite code to this team</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ConfirmationNumberIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="number" placeholder="invite max usages" value={maxUsages} onChange={handleMaxUsagesInput}/>
                    </div>
                    <div className={style.invite_code_area}>
                        {generatedCode == null && <p>Your invite code will appears here</p>}
                        {generatedCode != null &&
                            <>
                                <p>Your invite code is:</p>
                                <h3>{generatedCode}</h3>
                            </>
                        }
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleAddAction}>Generate</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}