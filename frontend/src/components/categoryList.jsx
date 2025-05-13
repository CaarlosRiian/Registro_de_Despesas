import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from "../styles/categoryList.module.css"

function CategoryList() {
    const [categorias, setCategorias] = useState([])
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
        async function fetchCategorias() {
            try {
                const response = await axios.get("http://localhost:8000/api/categorias/")
                setCategorias(response.data)
            } catch (err) {
                setError("Erro ao carregar as categorias.")
            } finally {
                setLoading(false)
            }
        }

        fetchCategorias()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm("Deseja excluir esta categoria?")) {
            try {
                await axios.delete(`http://localhost:8000/api/categorias/${id}/`)
                setCategorias(categorias.filter(categoria => categoria.id !== id))
            } catch (err) {
                alert("Erro ao excluir a categoria.")
            }
        }
    }

    if (loading) return <p>Carregando categorias...</p>
    if (error) return <p>{error}</p>

    const handleBack = async () => {
        navigate("/")
    }
    

    return (
        <>

            <button onClick={handleBack} className={styles["button-back-in-list-category"]}>Voltar</button>
            <div className={styles["div-list-category"]}>
                <h1 className={styles["h1-list-category"]}>Lista de Categorias</h1>
                <ul className={styles.list}>
                    {categorias.map(categoria => (
                        <li key={categoria.id} className={styles.item}>
                            <div className={styles["item-info-category"]}>
                                {categoria.nome}
                            </div>
                                <div className={styles["item-buttons-category"]}>
                                    <button onClick={() => navigate(`/editar_categoria/${categoria.id}`)} className={styles["button-edit-in-list-form-category"]}>
                                    Editar</button>
                                    <button
                                        onClick={() => handleDelete(categoria.id)}
                                        className={styles["button-delete-in-list-form-category"]}
                                    >Excluir</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default CategoryList