import { useEffect, useState } from "react";
import style from "./Team.module.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/Api";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAuth } from "../../contexts/AuthContext";
import { InsertManuallyModal } from "./components/InsertManuallyModal";

export const Team = () => {

    const { teamId } = useParams();

    const { userId, userRole } = useAuth();

    const [loading, setLoading] = useState(false);

    const [ taskList, setTaskList ] = useState([]);
    const [ teamData, setTeamData ] = useState({});
    const [ membersData, setMembersData ] = useState([]);

    const [ addManuallyModalIsOpen, setAddManuallyModalIsOpen ] = useState(false);

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
                    <button className={style.button_task}>Create Task</button>
                    <button className={style.button_task} onClick={() => setAddManuallyModalIsOpen(true)}>Insert member manually</button>
                    <button className={style.button_task}>Generate Invite code</button>
                </div>
            }

            {userRole == "MNG" &&
                <div>
                    <button className={style.button_task}>Create Task</button>
                    <button className={style.button_task} onClick={() => setAddManuallyModalIsOpen(true)}>Insert member manually</button>
                    <button className={style.button_task}>Generate Invite code</button>
                </div>
            }
            <h2>Tarefas</h2>
            <div className={style.project_list}>
                <div className={style.projects}>
                    <div className={style.task_table_header} onClick={() => console.log(teamData)}>Tasks</div>
                    {taskList.map((item, index) => (
                        <div className={style.task_table_item}>
                            <p>{item.description}</p>
                            <p>{formatDate(item.initialDate)}</p>
                            <p>{formatDate(item.finalDate)}</p>
                            <p>{item.assigneeId == null ? "Free" : item.assigneeName}</p>
                            {userRole == "MNG" && 
                                <>
                                    <button className={style.assign_button}>Atribuir</button>
                                </>
                            }
                            {userId == teamData.leaderId && userRole == "DEV" && 
                                <div>
                                    <button className={style.assign_button}>Pegar tarefa</button>
                                    <button className={style.assign_button}>Atribuir</button>
                                </div>
                            }
                            {item.assigneeId == null &&
                                <>
                                    {userId != teamData.leaderId && userRole != "MNG" &&
                                        <button className={style.assign_button}>Pegar tarefa</button>
                                    }
                                </>
                            }
                        </div>
                    ))}
                </div>
                <div className={style.devs}>
                    <div className={style.devs_table_header}>
                        Members
                    </div>
                    {membersData.map((item,index)=> (
                        <div className={style.dev_table_item}>
                            <p className={style.devId}>{item.id}</p>
                            <p>{item.name}</p>
                        </div>
                    ))
                        
                    }
                </div>
        </div>
        {addManuallyModalIsOpen &&
            <InsertManuallyModal fetchTasks={fetchTaskListAndTeamData} teamId={teamId} setModal={setAddManuallyModalIsOpen}/>
        }
        </div>
    )
}