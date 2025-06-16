import { useEffect, useState } from "react";
import style from "./Team.module.css";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/Api";
import AddBoxIcon from '@mui/icons-material/AddBox';

export const Team = () => {

    const { teamId } = useParams();

    const [loading, setLoading] = useState(false);

    const [ projectList, setProjectList ] = useState([]);

    const [ createProjectModalOpen, setCreateProjectModalOpen ] = useState(false);

    const navigate = useNavigate();

    const fetchProjectList = async() => {
        try{
            const response = await api.get(`/project/all-my-projects`);

            setProjectList(response.data);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        
    }, [])

    return(
        <div className={style.page_content}>
            <h2>Departamento da equipe</h2>
            <p className={style.project_desc}>Detalhes do projeto</p>
            <div className={style.button_wrapper}>
                <button>Create Task</button>
                <button>Generate Invite code</button>
            </div>
            <h2>Tarefas</h2>
            <div className={style.project_list} style={projectList.length == 0 ? {display: "flex", justifyContent: "center", alignItems: "center"} : {}}>
                <div className={style.projects}>
                    <div className={style.task_table_header}>...</div>
                </div>
                <div className={style.devs}>
                    {teamId}
                </div>
        </div>
        </div>
    )
}