import axios from "axios"

 const AUT_BASE_API_URL = "http://localhost:8282/api/admin/login"

class AdminService{

    async loginUser(cred){
        try {
            const response = await axios.post(`${AUT_BASE_API_URL}?username=${cred.username}&password=${cred.password}`,{
                username: cred.username,
                password: cred.password
            },{
                headers:{
                    'Content-Type': 'aplication/jason'
                }
            });
            return response.data;
        } catch(error){
            throw new Error(error.response ? error.response.data.message: 'Login failed')
        }
    }
}

export default new AdminService();