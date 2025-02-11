import axios from "axios"

 const ARR_BASE_API_URL = "http://localhost:8282/api/arriendos"

 class ArriendosService{

    listarArriendos(){
        return axios.get(ARR_BASE_API_URL)
        .then(response => response.data)
        .catch(error => {
            console.error(error.response)
        });
    }

    guardarArriendo(data){
        return axios.post(`${ARR_BASE_API_URL}/save`, data)
        .then(response => response.data)
        .catch(error => {
            console.error("Error:", error.response)
            throw error;
        });
    }

    eliminarArriendo(id){
        return axios.delete(`${ARR_BASE_API_URL}/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error:", error.response)
            throw error;
        });
    }

    actualizarArriendoUsuario(id, data){
        return axios.put(`${ARR_BASE_API_URL}/${id}`, data)
        .then(response => response.data)
        .catch(error => {
            console.error(error.response);
        });
    }
 }

 export default new ArriendosService();