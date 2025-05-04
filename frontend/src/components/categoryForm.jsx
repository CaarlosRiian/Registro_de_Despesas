import { use, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from "../styles/categoryForm.module.css"

function CategoryForm () {
    const [nome, setNome] = useState("")
    const [mensagem, setMensagem] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add(styles.customBody)
        return () => {
            document.body.classList.remove(styles.customBody)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:8000/api/categorias/", {nome})
            navigate("/")
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
        
            <div className={styles["container-div"]}>
                <h1 className={styles["h2-form-category"]}>Cadastrar Categoria</h1>
                <div className={styles["form-category-style"]}>
                    <form onSubmit={handleSubmit}>
                        <input
                        type="text"
                        className={styles["input-form-category"]}
                        placeholder="Nome da categoria"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        />
                        <button className={styles["button-form-category-register"]} type="submit">Cadastrar</button>
                    </form>
                </div>
                <button className={styles["button-back-home-form-category"]} onClick={handleBack}>Voltar</button>
            </div>
        </>
    )
}

export default CategoryForm;