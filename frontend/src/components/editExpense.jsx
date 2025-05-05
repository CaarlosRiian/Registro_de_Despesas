import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";  

function EditExpense() {
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [categorias, setCategorias] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await axios.get("http://localhost:8000/api/categorias/");
                setCategorias(response.data);
            } catch (error) {
                console.log("Erro ao buscar categorias", error);
            }
        }

        async function fetchDespesa() {
            try {
                const response = await axios.get(`http://localhost:8000/api/despesas/${id}/`);
                const despesa = response.data;
                setDescricao(despesa.descricao);
                setValor(despesa.valor);
                setCategoriaId(despesa.categoria.id);
            } catch (error) {
                console.log("Erro ao buscar despesa para edição", error);
            }
        }

        fetchCategorias();
        fetchDespesa();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/api/despesas/${id}/`, {
                descricao,
                valor: parseFloat(valor),
                categoria_id: categoriaId
            });
            navigate("/");
        } catch (error) {
            console.log("Erro ao editar despesa", error);
        }
    };

    return (
        <div>
            <h1>Editar Despesa</h1>
            <form onSubmit={handleSubmit}>
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
                        <option key={cat.id} value={cat.id}>
                            {cat.nome}
                        </option>
                    ))}
                </select>
                <button type="submit">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default EditExpense;
