import { useEffect, useState } from "react";
import { ProjectCard } from "./components/ProjectCard";
import style from "./HomeMng.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api";
import { CreateProjectModal } from "./components/CreateProjectModal";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { UpdateProjectModal } from "./components/UpdateProjectModal";

export const HomeMng = () => {

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
        fetchProjectList();
    }, [])

    return(
        <div className={style.page_content}>
            <h2>Welcome to TaskManager</h2>
            <h3>Your projects</h3>
            <div className={style.project_list} style={projectList.length == 0 ? {display: "flex", justifyContent: "center", alignItems: "center"} : {}}>
                <div className={style.projects}>
                    {projectList.length == 0 &&
                        <div className={style.no_projects}>
                            <p>It seems that you don't have any projects yet...</p>
                            <button className={style.no_project_button} onClick={() => setCreateProjectModalOpen(true)}>Create a new project</button>
                        </div>
                    }
                    {projectList.length > 0 && projectList.map((project, index) => (
                        <ProjectCard key={index} fetchProjectList={fetchProjectList} id={project.id} name={project.name} description={project.description} goals={project.goals} onClick={() => navigate(`/home/project/${project.id}`)}/>
                    ))}
                    {projectList.length > 0 && 
                        <div className={style.card}>
                            <div className={style.card_box} onClick={() => setCreateProjectModalOpen(true)}>
                                <AddBoxIcon sx={{fill: "#ffffff", fontSize: 60}} />
                            </div>
                        </div>
                    }
                </div>
            {createProjectModalOpen &&
                <CreateProjectModal setModal={setCreateProjectModalOpen} fetchProjects={fetchProjectList}/>
            }
        </div>
        </div>
    )
}