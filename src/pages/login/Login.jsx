import { Email, Password } from "@mui/icons-material";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/Api";
import { use, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Login = () => {

    const { setUserId, setUserToken, setUserRole, userRole, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage ] = useState(null);
    const [loading, setLoading ] = useState(false);

    const [ emailInput, setEmailInput ] = useState("");
    const [ passwordInput, setPasswordInput ] = useState("");

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value);
    }

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value);
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        try{
             const response = await api.post("auth/login", {
                "email": emailInput,
                "password": passwordConfirmInput
            })

            const {id, token, role} = login.data;

            setUserId(id);
            setUserToken(token);
            setUserRole(role);

        }catch(error){
            console.error("erro no login: ", error);
        }
    }

    useEffect(()=>{
        if(userRole == "MNG"){
            navigate("/home/mng");
        }else{
            navigate("/home/dev")
        }
    }, [userRole])

    return(
        <div className={style.login_area}>
            <div className={style.logo_wrapper}>
                <img src="/Group.svg" />
                <p>TaskManager</p>
            </div>
            <form>
                <div className={style.input_wrapper}>
                    <div className={style.input_icon}> <Email sx={{fill: "#ffffff", width: "20px"}} /> </div>
                    <input type="email" placeholder="example@example.com" value={emailInput} onChange={handleEmailInput}/>
                </div>
                <div className={style.input_wrapper}>
                    <div className={style.input_icon}> <Password sx={{fill: "#ffffff", width: "20px"}} /></div>
                    <input type="password" placeholder="Password" value={passwordInput} onChange={handlePasswordInput}/>
                </div>
                <div className={style.button_wrapper}>
                    <button className={style.login_submit}>Login</button>
                    <p>Forgot your password? <span>Click here</span></p>
                </div>
            </form>
            <p className={style.register_text}>Doesn't have an account? <span onClick={() => navigate("/register")}>Register here</span></p>
        </div>
    )
}