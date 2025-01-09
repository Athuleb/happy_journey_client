import instance from "../../services";
import authenticationApi from "../apis";

export const login = async (body)=>{
    try {
        const result = (await instance.post(authenticationApi.login, body)).data;
        return result
    } catch (error) {
        console.error("Login error:", error, {message:result.response.message});
        return {
            response:{data:null,message:result.response.message,},
            responseStatus:"fail"
        }
    }
}