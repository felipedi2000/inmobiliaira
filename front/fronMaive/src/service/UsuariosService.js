import axios from "axios"

 const US_BASE_API_URL = "http://localhost:8282/api/usuarios"

 class UsuariosService{

    listarUsuarios(){
        return axios.get(US_BASE_API_URL)
        .then(response => response.data)
        .catch(error => {
            console.error(error.response);
        });
    }

    actualizarUsuario(id, data){
        return axios.put(`${US_BASE_API_URL}/${id}`, data)
        .then(response => response.data)
        .catch(error => {
            return error.response.data;
        });
    }

    guardarUsuario(data){
        return axios.post(`${US_BASE_API_URL}/save`, data)
        .then(response => response.data)
        .catch(error =>{
            return error.response.data;
        });
    }

    eliminarUsuario(id){
        return axios.delete(`${US_BASE_API_URL}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error:", error.response)
            return error.response.data;
        });
    }
 }

 export default new UsuariosService();