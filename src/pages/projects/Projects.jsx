import { useLocation, useNavigate, useParams } from "react-router-dom";

export const Projects = () => {

    const { projectId } = useParams();

    const navigate = useNavigate()
    const location = useLocation();

    return(
        <p>{projectId}</p>
    );
}