import { useEffect, useState } from "react";
import { TeamCard } from "./components/TeamCard";
import style from "./Projects.module.css";
import AddBoxIcon from '@mui/icons-material/AddBox';

import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../api/Api";
import { CreateTeamModal } from "./components/CreateTeamModal";

export const Projects = () => {

    const { projectId } = useParams();

    const navigate = useNavigate();
    const location = useLocation();

    const [ createTeamModalIsOpen, setCreateTeamModalIsOpen ] = useState(false);

    const [ equipList, setEquipList ] = useState([]);
    const [ projectData, setProjectData] = useState({});

    const fetchProjectDetails = async() => {
        try{
            const response = await api.get(`/project/${projectId}`)

            setProjectData(response.data)
        }catch(error){
            console.log(error)
        }
    }
    
    const fetchEquips = async() => {
        try{
        const response = await api.get(`/equip/project/${projectId}`);

        console.log(response.data)
        setEquipList(response.data);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        fetchProjectDetails();
        fetchEquips()
    }, [])

    return(
    <div className={style.page_content}>
            <h2>{projectData.name}</h2>
            <h3>{projectData.description}</h3>
            <p className={style.goals}>{projectData.goals}</p>
            <h2>Teams:</h2>
            <div className={style.project_list} style={equipList.length == 0 ? {display: "flex", justifyContent: "center", alignItems: "center"} : {}}>
                <div className={style.projects}>
                    {equipList.length == 0 &&
                        <div className={style.no_projects}>
                            <p>It seems that project doesn't have any team yet...</p>
                            <button className={style.no_project_button} onClick={() => setCreateTeamModalIsOpen(true)}>Create a new Team</button>
                        </div>
                    }
                    {equipList.length > 0 && equipList.map((project, index) => (
                        <TeamCard key={index} fetchEquips={fetchEquips} id={project.id} departament={project.departament} description={project.description} leaderId={project.leaderId} onClick={() => navigate(`/home/project/${project.id}`)}/>
                    ))}
                    {equipList.length > 0 && 
                        <div className={style.card}>
                            <div className={style.card_box} onClick={() => setCreateTeamModalIsOpen(true)}>
                                <AddBoxIcon sx={{fill: "#ffffff", fontSize: 60}} />
                            </div>
                        </div>
                    }
                </div>
                {createTeamModalIsOpen &&
                    <CreateTeamModal setModal={setCreateTeamModalIsOpen} fetchTeams={fetchEquips} projectId={projectId}/>
                }
        </div>
        </div>
    );
}