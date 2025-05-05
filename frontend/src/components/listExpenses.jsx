import api from "../services/api"
import { useState, useEffect, use } from "react"
import axios from "axios"

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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta despesa?")
        if(confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/api/despesas/${id}/`)
                setDespesas(despesas.filter(despesa => despesa.id !== id))
            } catch (error) {
                console.log("Erro ao deletar despesa: ", error)
            }
        } else {
            console.log("Cancelouu")
        }
    }

    return (
        <>

            <h1>Lista de Despesas</h1>

            <ul>
                {despesas.map((despesa) => (
                    <li key={despesa.id}> - {despesa.descricao} - R${despesa.valor} - <button onClick={() => handleDelete(despesa.id)}>Excluir</button></li>
                ))}
            </ul>

        </>
    )
}

export default ListExpenses
