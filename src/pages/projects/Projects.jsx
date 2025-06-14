import { TeamCard } from "./components/TeamCard";
import style from "./Projects.module.css";

import { useLocation, useNavigate, useParams } from "react-router-dom";

export const Projects = () => {

    const { projectId } = useParams();

    const navigate = useNavigate()
    const location = useLocation();

    return(
        <div className={style.page_content}>
            <div className={style.project_details}>
                <h2>{"nome do projeto"}</h2>
                <h3>{"Descrição do projeto bem grande e completa"}</h3>
                <p>{"Metas do projeto a serem batidas, como se fosse as condições de aceitação"}</p>
                <div className={style.equip_list}>
                    <TeamCard />
                </div>
            </div>
        </div>
    );
}