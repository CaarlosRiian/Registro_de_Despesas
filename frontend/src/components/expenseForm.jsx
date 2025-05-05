import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import styles from "../styles/expenseForm.module.css"

function ExpenseForm() {
    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [categoriaId, setCategoriaId] = useState("")
    const [categorias, setCategorias] = useState([])
    const [mensagem, setMensagem] = useState("")
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
            } catch (error) {
                console.log("Erro ao Buscar categorias:", error)
            }
        }
        fetchCategorias()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            await axios.post("http://localhost:8000/api/despesas/", {
                descricao,
                valor: parseFloat(valor),
                categoria_id: categoriaId
              })
            setMensagem("Despesa Cadastrada com Sucesso!")
            setDescricao("")
            setValor("")
            setCategoriaId("")
            navigate("/") 
        } catch (error) {
            if (error.response) {
              console.log("Erro da API:", error.response.data); 
            } else {
              console.log("Erro:", error.message);
            }
            setMensagem("Erro ao cadastrar a despesa!");
          }
        
    }

    const handleBack = () => {
        navigate("/")
    }

    return (
        <>
            <div className={styles["div-form-expense"]}>

                <h2 className={styles["h2-form-expense"]}>Cadastrar Despesa</h2>

                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    className={styles["description-input-form-expense"]}
                    placeholder="Descrição da Despesa"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    required
                    />
                    <input
                    type="number"
                    className ={styles["value-input-form-expense"]}
                    placeholder="Valor"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    required
                    />
                    <select
                    value={categoriaId}
                    className={styles["select-category-form-expense"]}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    required
                    >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                    </select>

                    <button className={styles["button-expense-form"]} type="submit">Cadastrar</button>
                </form>
                <button className={styles["button-back-home-form-expense"]} onClick={handleBack}>Voltar</button>

            </div>

            {/* <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
                />
                <input
                type="number"
                placeholder="Valor"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
                />
                <select
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
                >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))}
                </select>
                <button type="submit">Cadastrar</button>
            </form> */}
            {mensagem && <p>{mensagem}</p>}
        </>
    )
}

export default ExpenseForm