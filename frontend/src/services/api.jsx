import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:8000/api/despesas"
})

export default api