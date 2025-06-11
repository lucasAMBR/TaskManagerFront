import { Email, Password } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ComputerIcon from '@mui/icons-material/Computer';
import WorkIcon from '@mui/icons-material/Work';
import style from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api";
import { use, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Register = () => {
        
    const { setUserId, setUserToken, setUserRole, userRole, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage ] = useState(null);
    const [loading, setLoading ] = useState(false);

    const [ nameInput, setNameInput ] = useState("");
    const [ emailInput, setEmailInput ] = useState("");
    const [ passwordInput, setPasswordInput ] = useState("");
    const [ passwordConfirmInput, setPasswordConfirmInput ] = useState("");
    const [ roleInput, setRoleInput ] = useState("DEV");

    const handleNameInput = (e) => {
        setNameInput(e.target.value);
    }

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value);
    }

    const handlePasswordConfirmInput = (e) => {
        setPasswordConfirmInput(e.target.value);
    }

    const handleRoleChange = (e) => {
        setRoleInput(e.target.value);
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        if(passwordInput.length < 6){
            setErrorMessage("Password too short, minimum of 6 characters!");
            setLoading(false);
            return;
        }

        if(passwordInput != passwordConfirmInput){
            setErrorMessage("Passwords doesn't match!");
            setLoading(false);
            return;
        }

        if(roleInput == "DEV"){
            try{
                const response = await api.post("/dev", {
                    "name": nameInput,
                    "email": emailInput,
                    "password": passwordConfirmInput 
                });

                const login = await api.post("auth/login", {
                    "email": emailInput,
                    "password": passwordConfirmInput
                })

                const {id, token, role} = login.data;

                setUserId(id);
                setUserToken(token);
                setUserRole(role);

                navigate("/home/dev");
            }catch(error){
                setErrorMessage(error.msg);
                setLoading(false);
                console.error(error);
            }
        }

        if(roleInput == "MNG"){
            try{
                const response = await api.post("/manager", {
                    "name": nameInput,
                    "email": emailInput,
                    "password": passwordConfirmInput 
                });

                const login = await api.post("auth/login", {
                    "email": emailInput,
                    "password": passwordConfirmInput
                })

                
                const {id, token, role} = login.data;

                setUserId(id);
                setUserToken(token);
                setUserRole(role);
                
                navigate("/home/dev");
            }catch(error){
                setErrorMessage(error.msg);
                setLoading(false);
                console.error(error);
            }
        }
    }
    
    useEffect(() => {
        if(isAuthenticated()){
            if(userRole == "DEV"){
                navigate("/home/dev")
            }else{
                navigate("/home/mng")
            }
        };
    }, [])

    return(
        <div className={style.login_area}>
            <div className={style.logo_wrapper}>
                <img src="/Group.svg" />
                <p>TaskManager</p>
            </div>
            <form>
                <div className={style.input_wrapper}>
                    <div className={style.input_icon}> <AccountCircleIcon sx={{fill: "#ffffff", width: "20px"}} /> </div>
                    <input type="text" placeholder="Full name" value={nameInput} onChange={handleNameInput}/>
                </div>
                <div className={style.input_wrapper}>
                    <div className={style.input_icon}> <Email sx={{fill: "#ffffff", width: "20px"}} /> </div>
                    <input type="email" placeholder="example@example.com" value={emailInput} onChange={handleEmailInput}/>
                </div>
                <div className={style.input_wrapper}>
                    <div className={style.input_icon}> <Password sx={{fill: "#ffffff", width: "20px"}} /></div>
                    <input type="password" placeholder="Password" value={passwordInput} onChange={handlePasswordInput}/>
                </div>
                <div className={style.input_wrapper}>
                    <div className={style.input_icon}> <Password sx={{fill: "#ffffff", width: "20px"}} /></div>
                    <input type="password" placeholder="Confirm password" value={passwordConfirmInput} onChange={handlePasswordConfirmInput}/>
                </div>
                <div className={style.input_wrapper}>
                    <div className={style.input_icon}> 
                        {roleInput == "DEV" ?
                            <ComputerIcon sx={{fill: "#ffffff", width: "20px"}} />       
                            :
                            <WorkIcon sx={{fill: "#ffffff", width: "20px"}} />  
                        }
                    </div>
                    <select type="text" value={roleInput} onChange={handleRoleChange}>
                        <option value="DEV">Developer</option>
                        <option value="MNG">Manager</option>
                    </select>
                </div>
                <div className={style.button_wrapper}>
                    <button className={style.login_submit} onClick={handleRegister}>{loading ? "Loading..." : "Register"}</button>
                </div>
            </form>
            <p className={style.register_text}>Already have an account? <span onClick={() => navigate("/login")}>Click here</span></p>
        </div>
    )
}