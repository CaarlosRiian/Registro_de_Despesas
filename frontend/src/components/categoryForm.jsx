import { use, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from "../styles/categoryForm.css"

function CategoryForm () {
    const [nome, setNome] = useState("")
    const [mensagem, setMensagem] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:8000/api/categorias/", {nome})
            setMensagem("Categoria Cadastrada com Sucesso!")
            setNome("")
        } catch (error) {
            setMensagem("Erro ao cadastrar a Categoria!")
            console.log(error)
        }
    }

    const handleBack = () => {
        navigate("/") 
      }

    return (
        <>
            <div style={{ padding: "1rem" }}>
            <h2>Cadastrar Categoria</h2>

            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Nome da categoria"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                />
                <button type="submit">Cadastrar</button>
            </form>

            {mensagem && <p>{mensagem}</p>}
            </div>
            <button onClick={handleBack}>Voltar</button>
        </>
    )
}

export default CategoryForm;