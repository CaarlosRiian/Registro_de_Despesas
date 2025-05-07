import api from "../services/api"
import { useState, useEffect, use } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from "../styles/listExpense.module.css"

function ListExpenses(){
    const [despesas, setDespesas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add(styles.customBody)
            return () => {
                document.body.classList.remove(styles.customBody)
            }
    }, [])

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

    const handleEdit = async (id) => {
        navigate(`editar/${id}`)
    }

    return (
        <>
            <div className={styles["div-list-expenses"]}>
                <h1 className={styles["h1-list-expenses"]}>Lista de Despesas</h1>
                <ul>
                    {despesas.map((despesa) => (
                        <li key={despesa.id}>
                            <div className={styles["item-info"]}>
                                {despesa.categoria.nome} | {despesa.descricao} - R${despesa.valor}
                            </div> 
                            <div className={styles["item-buttons"]}>
                            <button onClick={() => handleEdit(despesa.id)} className={styles["button-edit-in-list-form"]}>Editar</button>
                            <button onClick={() => handleDelete(despesa.id)} className={styles["button-delete-in-list-form"]}>Excluir</button>
                        </div>
                      </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ListExpenses
