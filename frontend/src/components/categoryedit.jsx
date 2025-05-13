import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import styles from "../styles/editCategory.module.css"

function EditCategory() {
    const { id } = useParams()
    const [nome, setNome] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        document.body.classList.add(styles.customBody)
            return () => {
                document.body.classList.remove(styles.customBody)
            }
    }, [])

    useEffect(() => {
        async function fetchCategoria() {
            try {
                const response = await axios.get(`http://localhost:8000/api/categorias/${id}/`)
                setNome(response.data.nome)
            } catch (err) {
                setError("Erro ao carregar categoria.")
            } finally {
                setLoading(false)
            }
        }
        fetchCategoria()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`http://localhost:8000/api/categorias/${id}/`, {
                nome
            })
            navigate("/listar_categoria")
        } catch (err) {
            alert("Erro ao atualizar categoria.")
        }
    }

    if (loading) return <p>Carregando...</p>
    if (error) return <p>{error}</p>

    const handleBackedit = () => {
        navigate("/listar_categoria")
        // navigate("/")
    }

    return (
        <>
            <div className={styles["div-edit-categoory"]}>
                <h2 className={styles["h2-edit-category"]}>Editar Categoria</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        id="nome"
                        className={styles["input-edit-category"]}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles["button-form-category-edit"]}>Salvar</button>
                    <button className={styles["button-back-home-edit-category"]} onClick={handleBackedit}>Voltar</button>
                </form>
            </div>
        </>
    )
}

export default EditCategory
