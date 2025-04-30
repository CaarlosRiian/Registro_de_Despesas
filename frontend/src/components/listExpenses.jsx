import api from "../services/api"
import { useState, useEffect, use } from "react"

function ListExpenses(){
    const [despesas, setDespesas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() =>{
        async function fetchDespesas() {
            try {
                const response = await api.get("/")
                setDespesas(response.data)
            } catch (err){
                setError("Erro ao carregar as despesas")
            } finally {
                setLoading(false)
            }
        }

        fetchDespesas()
    }, [])

    if(loading) {
        return <div>Carregando....</div>
    }
    if(error) {
        return <div>{error}</div>
    }

    return (
        <>

            <h1>Lista de Despesas</h1>

            <ul>
                {despesas.map((despesa) => (
                    <li key={despesa}>{despesa}</li>
                ))}
            </ul>

        </>
    )
}

export default ListExpenses
