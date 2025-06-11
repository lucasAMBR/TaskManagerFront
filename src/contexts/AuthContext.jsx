import { createContext, useContext, useEffect, useState } from "react"
import api from "../api/Api";

const STORAGE_KEYS = {
    userId: "auth_userId",
    userToken: "auth_userToken",
    userRole: "auth_userRole"
}

export const AuthContext = createContext();

export function AuthProvider({ children }){

    const [ userId, setUserId ] = useState(() => localStorage.getItem(STORAGE_KEYS.userId) || "");
    const [ userToken, setUserToken ] = useState(() => localStorage.getItem(STORAGE_KEYS.userToken) || "");
    const [ userRole, setUserRole ] = useState(() => localStorage.getItem(STORAGE_KEYS.userRole) || "");

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEYS.userId, userId);
    }, [userId]);

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEYS.userToken, userToken);
    }, [userToken]);

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEYS.userRole, userRole);
    }, [userRole]);

    const clearAuth = () => {
        setUserId("");
        setUserToken("");
        setUserRole("");
        localStorage.removeItem(STORAGE_KEYS.userId);
        localStorage.removeItem(STORAGE_KEYS.userToken);
        localStorage.removeItem(STORAGE_KEYS.userRole);
    };

    const isAuthenticated = () => {
        return !!userId && !!userToken && !!userRole;
    }

    const isTokenValid = async() => {
        if(!userToken){
            return false
        }

        try{
            const response = await api.get("/auth/validate_token");

            return response.status === 204;
        }catch(error){
            console.error("Erro ao validar o token: " + error);
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{userId, setUserId, userToken, setUserToken, userRole, setUserRole, clearAuth, isAuthenticated, isTokenValid}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}