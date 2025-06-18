import { useState, useEffect } from "react";
import style from "./HomeDev.module.css";
import { useNavigate } from "react-router-dom";
import { TeamCard } from "../home_dev/components/TeamCard";
import QrCodeIcon from '@mui/icons-material/QrCode';
import { InviteModal } from "./components/InviteModal";
import api from "../../api/Api";
import { TaskCard } from "./components/TaskCard";

export const HomeDev = () => {

    const [ teamList, setTeamList ] = useState([]);
    const [ taskList, setTaskList ] = useState([]);

    const [ createTeamModalOpen, setCreateTeamModalOpen ] = useState(false);

    const [ orderType, setOrderType ] = useState("date");

    const navigate = useNavigate();

    const fetchTeamList = async() => {
        try{
            const response = await api.get(`/equip/dev`);
            const tasks = await api.get(`/task/my-tasks`);

            setTeamList(response.data);
            console.log(tasks.data)
            setTaskList(tasks.data);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTeamList();
    }, [])


    return(
        <div className={style.page_content}>
            <h2 onClick={() => console.log(teamList)}>Welcome to TaskManager</h2>
            <h3>Your Teams</h3>
            <div className={style.project_list} style={teamList.length == 0 ? {display: "flex", justifyContent: "center", alignItems: "center"} : {}}>
                <div className={style.projects}>
                    {teamList.length == 0 &&
                        <div className={style.no_projects}>
                            <p>It seems that you don't have any team yet...</p>
                            <button className={style.no_project_button} onClick={() => setCreateTeamModalOpen(true)}>Create a new team</button>
                        </div>
                    }
                    {teamList.length > 0 && teamList.map((project, index) => (
                        <TeamCard key={index} fetchProjectList={fetchTeamList} id={project.id} name={project.departament} description={project.description} projectId={project.projectId} onClick={() => navigate(`/home/project/${project.id}`)}/>
                    ))}
                    {teamList.length > 0 && 
                        <div className={style.card}>
                            <div className={style.card_box} onClick={() => setCreateTeamModalOpen(true)}>
                                <QrCodeIcon sx={{fill: "#ffffff", fontSize: 60}} />
                                <p>Use invite code</p>
                            </div>
                        </div>
                    }
                </div>
                <div className={style.recent_tasks}>
                    <h3>Recent tasks</h3>
                    <div className={style.filters}>
                        <button onClick={() => setOrderType("date")} className={orderType == "date" ? style.active : ""}>Order by date</button>
                        <button onClick={() => setOrderType("priority")} className={orderType == "priority" ? style.active : ""}>Order by priority</button>
                    </div>
                    <div className={style.task_list}>
                    {orderType == "date" &&
                        <>
                            {taskList.filter(task => task.isDone === false).slice().sort((a, b) => new Date(a.finalDate) - new Date(b.finalDate)).map((task, index) => (
                                <TaskCard isActive={task.isDone} fetchData={fetchTeamList} id={task.id} description={task.description} equipId={task.equipId} equipDepartament={task.equipDepartament} finalDate={task.finalDate} priority={task.priority}/>
                            ))}
                        </>
                    }
                    {orderType == "priority" &&
                        <>
                            {taskList.filter(task => task.isDone === false).slice().sort((a, b) => b.priority - a.priority).map((task, index) => (
                                <TaskCard isActive={task.isDone} fetchData={fetchTeamList} id={task.id} description={task.description} equipId={task.equipId} equipDepartament={task.equipDepartament} finalDate={task.finalDate} priority={task.priority}/>
                            ))}
                        </>
                    }
                    </div>
                </div>
            {createTeamModalOpen &&
                <InviteModal setModal={setCreateTeamModalOpen} fetchProjects={fetchTeamList}/>
            }
        </div>
        </div>
    )
}