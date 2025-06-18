import { useEffect, useState } from "react";
import style from "./Team.module.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/Api";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAuth } from "../../contexts/AuthContext";
import { InsertManuallyModal } from "./components/InsertManuallyModal";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { GenerateInviteCodeModal } from "./components/GenerateInviteCodeModal";
import { AssignTaskModal } from "./components/AssignTaskModal";
import { TakeTaskModal } from "./components/TakeTaskModal";
import { ConcludeTaskModal } from "./components/ConcludeTaskModal";
import { ViewConclusionNoteModal } from "./components/ViewConclusionNoteModal";

export const Team = () => {

    const { teamId } = useParams();

    const { userId, userRole } = useAuth();

    const [loading, setLoading] = useState(false);

    const [ taskList, setTaskList ] = useState([]);
    const [ teamData, setTeamData ] = useState({});
    const [ membersData, setMembersData ] = useState([]);

    const [ filterType, setFilterType ] = useState("all");

    const [ addManuallyModalIsOpen, setAddManuallyModalIsOpen ] = useState(false);
    const [ createTaskModalIsOpen, setCreateTaskModalIsOpen ] = useState(false);
    const [ generateInviteCodeModalIsOpen, setGenerateInviteCodeModalIs ] = useState(false);
    const [ assignTaskModalIsOpen, setAssignTaskModalIsOpen ] = useState(false);
    const [ takeTaskModalIsOpen, setTakeTaskModalIsOpen ] = useState(false);
    const [ concludeTaskModal, setConcludeTaskModal ] = useState(false);
    const [ viewConclusionNotesModal, setViewConclusionNotesModal ] = useState(false);

    const [ choosedTask, setChoosedTask] = useState(null)

    const handleAssignOpen = (id) => {
        setChoosedTask(id);
        setAssignTaskModalIsOpen(true)   
    }

    const handleTakeTask = (id) => {
        setChoosedTask(id);
        setTakeTaskModalIsOpen(true);
    }

    const handleConcludeOpen = (id) => {
        setChoosedTask(id);
        setConcludeTaskModal(true)
    }

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

    const fetchTaskListAndTeamData = async() => {
        try{
            const response = await api.get(`/task/equip/${teamId}`);
            const teamData = await api.get(`/equip/${teamId}`);
            const membersData = await api.get(`/dev/equip/${teamId}/all`);

            setTaskList(response.data);
            setTeamData(teamData.data);
            setMembersData(membersData.data)
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTaskListAndTeamData()
    }, [])

    return(
        <div className={style.page_content}>
            <h2>Departamento da equipe</h2>
            <p className={style.project_desc}>Detalhes do projeto</p>
            {userId == teamData.leaderId && 
                <div>
                    <button className={style.button_task} onClick={() => setCreateTaskModalIsOpen(true)}>Create Task</button>
                    <button className={style.button_task} onClick={() => setAddManuallyModalIsOpen(true)}>Insert member manually</button>
                    <button className={style.button_task} onClick={() => setGenerateInviteCodeModalIs(true)}>Generate Invite code</button>
                    <button className={style.button_task} onClick={() => setViewConclusionNotesModal(true)}>View Conclusion Notes</button>
                </div>
            }

            {userRole == "MNG" &&
                <div>
                    <button className={style.button_task} onClick={() => setCreateTaskModalIsOpen(true)}>Create Task</button>
                    <button className={style.button_task} onClick={() => setAddManuallyModalIsOpen(true)}>Insert member manually</button>
                    <button className={style.button_task} onClick={() => setGenerateInviteCodeModalIs(true)}>Generate Invite code</button>
                    <button className={style.button_task} onClick={() => setViewConclusionNotesModal(true)}>View Conclusion Notes</button>
                </div>
            }
            <h2>Tarefas</h2>
            <div className={style.project_list}>
                <div className={style.projects}>
                    <div className={style.filter_button_wrapper}>
                        <button onClick={() => setFilterType("all")} className={filterType == "all" ? style.active : ""}>All active tasks by priority</button>
                        {userRole != "MNG" &&
                            <button onClick={() => setFilterType("mine")} className={filterType == "mine" ? style.active : ""}>My tasks by priority</button>
                        }
                        <button onClick={() => setFilterType("free")} className={filterType == "free" ? style.active : ""}>Free tasks by priority</button>
                    </div>
                    <div className={style.task_table_header} onClick={() => console.log(teamData)}>Tasks</div>
                    {filterType == "all" && 
                        <>
                        {taskList.filter(task => task.isDone === false).slice().sort((a, b) => b.priority - a.priority).map((item, index) => (
                        <div className={style.task_table_item}>
                            <p className={[style.task_item_part, style.task_desc].join(" ")}>{item.description}</p>
                            <p className={style.task_item_part}>{formatDate(item.initialDate)}</p>
                            <p className={style.task_item_part}>{formatDate(item.finalDate)}</p>
                            <p className={style.task_item_part}>{item.assigneeId == null ? "Free" : item.assigneeName}</p>
                            <div className={style.action_button_wrapper}>
                            {userRole == "MNG" && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleAssignOpen(item.id)}>{item.assigneeId != null ? "Change Assignee" : "Assign"}</button>
                                </div>
                            }
                            {userId == teamData.leaderId && userRole == "DEV" && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleAssignOpen(item.id)}>{item.assigneeId != null ? "Change Assignee" : "Assign"}</button>
                                    {item.assigneeId != userId &&
                                        <button className={style.assign_button} onClick={() => handleTakeTask(item.id)}>Take task</button>
                                    }
                                </div>
                            }
                            {item.assigneeId == null && userId != teamData.leaderId && userRole != "MNG" &&
                                <div className={style.task_item_part}>
                                        <button className={style.assign_button} onClick={() => handleTakeTask(item.id)}>Take task</button>
                                </div>
                            }
                            {item.assigneeId == userId && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleConcludeOpen(item.id)}>Conclude Task</button>
                                </div>
                            }
                            {userId != teamData.leaderId && userRole == "DEV" && item.assigneeId != userId && item.assigneeId != null &&
                                <div className={style.task_item_part}>
                                    <button className={style.blocked_assign_button}>Blocked</button>
                                </div>
                            }
                            </div>
                        </div>
                        ))}
                        </>
                    }
                    {filterType == "mine" && 
                        <>
                        {taskList.filter(task => task.isDone === false && task.assigneeId == userId).slice().sort((a, b) => b.priority - a.priority).map((item, index) => (
                        <div className={style.task_table_item}>
                            <p className={[style.task_item_part, style.task_desc].join(" ")}>{item.description}</p>
                            <p className={style.task_item_part}>{formatDate(item.initialDate)}</p>
                            <p className={style.task_item_part}>{formatDate(item.finalDate)}</p>
                            <p className={style.task_item_part}>{item.assigneeId == null ? "Free" : item.assigneeName}</p>
                            <div className={style.action_button_wrapper}>
                            {userRole == "MNG" && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleAssignOpen(item.id)}>{item.assigneeId != null ? "Change Assignee" : "Assign"}</button>
                                </div>
                            }
                            {userId == teamData.leaderId && userRole == "DEV" && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleAssignOpen(item.id)}>{item.assigneeId != null ? "Change Assignee" : "Assign"}</button>
                                    {item.assigneeId != userId &&
                                        <button className={style.assign_button} onClick={() => handleTakeTask(item.id)}>Take task</button>
                                    }
                                </div>
                            }
                            {item.assigneeId == null && userId != teamData.leaderId && userRole != "MNG" &&
                                <div className={style.task_item_part}>
                                        <button className={style.assign_button} onClick={() => handleTakeTask(item.id)}>Take task</button>
                                </div>
                            }
                            {item.assigneeId == userId && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleConcludeOpen(item.id)}>Conclude Task</button>
                                </div>
                            }
                            {userId != teamData.leaderId && userRole == "DEV" && item.assigneeId != userId && item.assigneeId != null &&
                                <div className={style.task_item_part}>
                                    <button className={style.blocked_assign_button}>Blocked</button>
                                </div>
                            }
                            </div>
                        </div>
                        ))}
                        </>
                    }
                    {filterType == "free" && 
                        <>
                        {taskList.filter(task => task.isDone === false && task.assigneeId == null).slice().sort((a, b) => b.priority - a.priority).map((item, index) => (
                        <div className={style.task_table_item}>
                            <p className={[style.task_item_part, style.task_desc].join(" ")}>{item.description}</p>
                            <p className={style.task_item_part}>{formatDate(item.initialDate)}</p>
                            <p className={style.task_item_part}>{formatDate(item.finalDate)}</p>
                            <p className={style.task_item_part}>{item.assigneeId == null ? "Free" : item.assigneeName}</p>
                            <div className={style.action_button_wrapper}>
                            {userRole == "MNG" && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleAssignOpen(item.id)}>{item.assigneeId != null ? "Change Assignee" : "Assign"}</button>
                                </div>
                            }
                            {userId == teamData.leaderId && userRole == "DEV" && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleAssignOpen(item.id)}>{item.assigneeId != null ? "Change Assignee" : "Assign"}</button>
                                    {item.assigneeId != userId &&
                                        <button className={style.assign_button} onClick={() => handleTakeTask(item.id)}>Take task</button>
                                    }
                                </div>
                            }
                            {item.assigneeId == null && userId != teamData.leaderId && userRole != "MNG" &&
                                <div className={style.task_item_part}>
                                        <button className={style.assign_button} onClick={() => handleTakeTask(item.id)}>Take task</button>
                                </div>
                            }
                            {item.assigneeId == userId && 
                                <div className={style.task_item_part}>
                                    <button className={style.assign_button} onClick={() => handleConcludeOpen(item.id)}>Conclude Task</button>
                                </div>
                            }
                            {userId != teamData.leaderId && userRole == "DEV" && item.assigneeId != userId && item.assigneeId != null &&
                                <div className={style.task_item_part}>
                                    <button className={style.blocked_assign_button}>Blocked</button>
                                </div>
                            }
                            </div>
                        </div>
                        ))}
                        </>
                    }
                </div>
                <div className={style.devs}>
                    <div className={[style.filter_button_wrapper, style.special].join(" ")}>
                        <button onClick={() => setFilterType("all")} className={filterType == "all" ? style.active : ""}>All active tasks by priority</button>
                    </div>
                    <div className={style.devs_table_header}>
                        Members
                    </div>
                    {membersData.map((item,index)=> (
                        <div className={style.dev_table_item}>
                            <p className={style.devId}>{item.id}</p>
                            <p>{item.name} {item.id == teamData.leaderId ? " - Leader" : ""}</p>
                        </div>
                    ))   
                    }
                </div>
        </div>
        {addManuallyModalIsOpen &&
            <InsertManuallyModal fetchTasks={fetchTaskListAndTeamData} teamId={teamId} setModal={setAddManuallyModalIsOpen}/>
        }
        {createTaskModalIsOpen &&
            <CreateTaskModal teamMembers={membersData} setModal={setCreateTaskModalIsOpen} fetchTasks={fetchTaskListAndTeamData} teamId={teamId}/>
        }
        {generateInviteCodeModalIsOpen &&
            <GenerateInviteCodeModal setModal={setGenerateInviteCodeModalIs} teamId={teamId}/>
        }
        {assignTaskModalIsOpen &&
            <AssignTaskModal memberList={membersData} setModal={setAssignTaskModalIsOpen} fetchTasks={fetchTaskListAndTeamData} taskId={choosedTask} setTaskId={setChoosedTask}/>
        }
        {takeTaskModalIsOpen &&
            <TakeTaskModal taskId={choosedTask} setModal={setTakeTaskModalIsOpen} fetchTasks={fetchTaskListAndTeamData}/>
        }
        {concludeTaskModal &&
            <ConcludeTaskModal setModal={setConcludeTaskModal} taskId={choosedTask} fetchProjects={fetchTaskListAndTeamData} />
        }
        {viewConclusionNotesModal &&
            <ViewConclusionNoteModal setModal={setViewConclusionNotesModal} teamId={teamId}/>
        }
        </div>
    )
}