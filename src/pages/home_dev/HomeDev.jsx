import { useState, useEffect } from "react";
import style from "./HomeDev.module.css";
import { useNavigate } from "react-router-dom";
import { TeamCard } from "../home_dev/components/TeamCard";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CreateTeamModal } from "../projects/components/CreateTeamModal";
import { InviteModal } from "./components/InviteModal";

export const HomeDev = () => {

    const [ teamList, setTeamList ] = useState([]);

    const [ createTeamModalOpen, setCreateTeamModalOpen ] = useState(false);

    const navigate = useNavigate();

    const fetchTeamList = async() => {
        try{
            const response = await api.get(`/equip/dev`);

            setTeamList(response.data);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(() => {
        fetchTeamList();
    }, [])


    return(
        <div className={style.page_content}>
            <h2>Welcome to TaskManager</h2>
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
                        <TeamCard key={index} fetchProjectList={fetchProjectList} id={project.id} name={project.name} description={project.description} goals={project.goals} onClick={() => navigate(`/home/project/${project.id}`)}/>
                    ))}
                    {teamList.length > 0 && 
                        <div className={style.card}>
                            <div className={style.card_box} onClick={() => setCreateTeamModalOpen(true)}>
                                <AddBoxIcon sx={{fill: "#ffffff", fontSize: 60}} />
                            </div>
                        </div>
                    }
                </div>
            {createTeamModalOpen &&
                <InviteModal setModal={setCreateTeamModalOpen} fetchProjects={fetchTeamList}/>
            }
        </div>
        </div>
    )
}