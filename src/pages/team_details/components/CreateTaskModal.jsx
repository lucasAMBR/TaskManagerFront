import style from "./CreateTaskModal.module.css"
import ComputerIcon from '@mui/icons-material/Computer';

import { useState } from "react";
import api from "../../../api/Api";

export const CreateTaskModal = ({ fetchTasks, teamId, setModal, teamMembers }) => {

    const [ descriptionInput, setDescriptionInput ] = useState("");
    const [ priorityInput, setPriorityInput ] = useState("");
    const [ initialDateInput, setInitialDateInput ] = useState("")
    const [ finalDateInput, setFinalDateInput ] = useState("")
    const [ assigneeInput, setAssigneeInput ] = useState("none");

    const handleDescriptionInput = (e) => {
        setDescriptionInput(e.target.value);
    }

    const handlePriorityInput = (e) => {
        setPriorityInput(e.target.value);
    }

    const handleInitialDateInput = (e) => {
        setInitialDateInput(e.target.value);
    }

    const handleFinalDateInput = (e) => {
        setFinalDateInput(e.target.value);
    }

    const handleAssigneeInput = (e) => {
        setAssigneeInput(e.target.value);
    }

    const handleSuccess = () => {
        fetchTasks();
        setModal(false);
    }

    const handleAddAction = async() => {
        const taskData = {};

        taskData.description = descriptionInput;
        taskData.priority = priorityInput;
        taskData.initialDate = initialDateInput;
        taskData.finalDate = finalDateInput;
        if(assigneeInput != "none"){
            taskData.assigneeId = assigneeInput;
        }
        
        try{
            const response = await api.post(`/task/${teamId}/create`, taskData);

            handleSuccess()
        }catch(error){
            console.log(error)
        }
    }

    return(
        <div className={style.modal_area}>
            <div className={style.modal_content}>
                <h2>Create a task</h2>
                <form>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="text" placeholder="Description" value={descriptionInput} onChange={handleDescriptionInput}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="number" placeholder="Priority" value={priorityInput} onChange={handlePriorityInput}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="datetime-local" placeholder="Initial date" value={initialDateInput} onChange={handleInitialDateInput}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <input type="datetime-local" placeholder="Final date" value={finalDateInput} onChange={handleFinalDateInput}/>
                    </div>
                    <div className={style.input_wrapper}>
                        <div className={style.input_icon}> <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                        <select type="datetime-local" placeholder="Assignee" value={assigneeInput} onChange={handleAssigneeInput}>
                        <option value={"none"}>Assignee (Optional)</option>
                        {teamMembers.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                        </select>
                    </div>
                    <div className={style.button_wrapper}>
                        <button className={style.login_submit} onClick={handleAddAction}>Create</button>
                        <button className={style.alt_button} onClick={()=> setModal(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}