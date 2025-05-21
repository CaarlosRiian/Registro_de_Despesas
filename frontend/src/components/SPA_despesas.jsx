import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/spaExpenseTracker.module.css";

function ExpenseTrackerSPA() {
  // State para despesas e categorias
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("expenses"); // 'expenses' ou 'categories'
  const [showForm, setShowForm] = useState(null); // null, 'expense' ou 'category'
  const [formData, setFormData] = useState({
    id: "",
    descricao: "",
    valor: "",
    categoriaId: "",
    nome: ""
  });
  const [message, setMessage] = useState("");

  // Buscar dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:8000/api/despesas/"),
          axios.get("http://localhost:8000/api/categorias/")
        ]);
        setExpenses(expensesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Manipuladores para despesas
  const handleDeleteExpense = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
      try {
        await axios.delete(`http://localhost:8000/api/despesas/${id}/`);
        setExpenses(expenses.filter(expense => expense.id !== id));
        setMessage("Despesa excluída com sucesso!");
      } catch (error) {
        setMessage("Erro ao excluir despesa");
      }
    }
  };

  const handleEditExpense = (expense) => {
    setFormData({
      id: expense.id,
      descricao: expense.descricao,
      valor: expense.valor,
      categoriaId: expense.categoria.id,
      nome: ""
    });
    setShowForm("expense");
  };

  // Manipuladores para categorias
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Deseja excluir esta categoria?")) {
      try {
        await axios.delete(`http://localhost:8000/api/categorias/${id}/`);
        setCategories(categories.filter(category => category.id !== id));
        setMessage("Categoria excluída com sucesso!");
      } catch (err) {
        setMessage("Erro ao excluir categoria");
      }
    }
  };

  const handleEditCategory = (category) => {
    setFormData({
      id: category.id,
      nome: category.nome,
      descricao: "",
      valor: "",
      categoriaId: ""
    });
    setShowForm("category");
  };

  // Manipuladores de formulário
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8000/api/despesas/${formData.id}/`, {
          descricao: formData.descricao,
          valor: parseFloat(formData.valor),
          categoria_id: formData.categoriaId
        });
        setMessage("Despesa atualizada com sucesso!");
      } else {
        await axios.post("http://localhost:8000/api/despesas/", {
          descricao: formData.descricao,
          valor: parseFloat(formData.valor),
          categoria_id: formData.categoriaId
        });
        setMessage("Despesa cadastrada com sucesso!");
      }
      
      // Atualizar dados
      const response = await axios.get("http://localhost:8000/api/despesas/");
      setExpenses(response.data);
      resetForm();
    } catch (error) {
      setMessage("Erro ao processar despesa");
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8000/api/categorias/${formData.id}/`, {
          nome: formData.nome
        });
        setMessage("Categoria atualizada com sucesso!");
      } else {
        await axios.post("http://localhost:8000/api/categorias/", {
          nome: formData.nome
        });
        setMessage("Categoria cadastrada com sucesso!");
      }
      
      const response = await axios.get("http://localhost:8000/api/categorias/");
      setCategories(response.data);
      resetForm();
    } catch (error) {
      setMessage("Erro ao processar categoria");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      descricao: "",
      valor: "",
      categoriaId: "",
      nome: ""
    });
    setShowForm(null);
  };

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gerenciador de Despesas</h1>
      </header>

      {message && (
        <div className={`${styles.message} ${
          message.includes("sucesso") ? styles.messageSuccess : styles.messageError
        }`}>
          {message}
        </div>
      )}

      <nav className={styles.navTabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "expenses" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("expenses")}
        >
          Despesas
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "categories" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          Categorias
        </button>
      </nav>

      <div>
        {showForm === "expense" && (
          <div className={styles.formContainer}>
            <div className={styles["div-new-expense-form"]}>
              <h2 className={styles["h2-subtitle-new-expense"]}>
                {formData.id ? "Editar Despesa" : "Nova Despesa"}
              </h2>

                <form onSubmit={handleExpenseSubmit}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    className={styles["description-input-form-expense"]}
                    value={formData.descricao}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <input
                    type="number"
                    name="valor"
                    placeholder="Valor"
                    className={styles["value-input-form-expense"]}
                    value={formData.valor}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                  />
                </div>
                
                <div className={styles.formGroup}>
                  {/* <label>Categoria</label> */}
                  <select
                    name="categoriaId"
                    placeholder="Categoria"
                    className={styles["select-category-form-expense"]}
                    value={formData.categoriaId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
              
                
                <div className={styles.formActions}>
                  <button type="submit" className={styles["button-expense-form"]}>
                    {formData.id ? "Atualizar" : "Cadastrar"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className={styles["button-back-home-form-expense"]}
                  >
                    Cancelar
                  </button>
                </div>
              </form>

            </div>
          
          </div>
        )}
      </div>
      <main className={styles.mainContent}>
        {/* Formulários */}

        {showForm === "category" && (
          <div className={styles.formContainer}>
            <h2 className={styles["h2-title-category"]}>
              {formData.id ? "Editar Categoria" : "Nova Categoria"}
            </h2>
            <form onSubmit={handleCategorySubmit}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="nome"
                  placeholder="Nome da Categoria"
                  className={styles["input-edit-category"]}
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formActions}>
                <button type="submit" className={styles["button-register-category"]}>
                  {formData.id ? "Atualizar" : "Cadastrar"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className={styles["button-back-to-home-category"]}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Listas */}
        {!showForm && (
          <>
            {/* Lista de Despesas */}
            {activeTab === "expenses" && (
              <div className={styles.listSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.subtitle}>Lista de Despesas</h2>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowForm("expense");
                    }}
                    className={styles["button_new_expense"]}
                  >
                    + Nova Despesa
                  </button>
                </div>
                
                <ul className={styles.list}>
                  <div className={styles["div-list-expensee"]}>
                    {expenses.map(expense => (
                      <li key={expense.id} className={styles.listItem}>
                        <div className={styles.itemInfo}>
                          <span className={styles.categoryBadge}>
                            {expense.categoria.nome} |
                          </span>
                          <span> {expense.descricao}</span> -
                          <span className={styles["styles-value"]}> R$ {expense.valor}</span>
                        </div>
                        <div className={styles["item-buttons-expense"]}>
                          <button
                            onClick={() => handleEditExpense(expense)}
                            className={styles["button-edit-expensee"]}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className={styles["button-delete-in-spa-expense"]}
                          >
                            Excluir
                          </button>
                        </div>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            )}

            {activeTab === "categories" && (
              <div className={styles.listSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.subtitle}>Lista de Categorias</h2>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowForm("category");
                    }}
                    className={styles["button_new_category"]}
                  >
                    + Nova Categoria
                  </button>
                </div>
                  <div className={styles["div-of-list-category"]}>
                    <ul className={styles.list}>
                      {categories.map(category => (
                        <li key={category.id} className={styles.listItem}>
                          <div className={styles.itemInfo}>
                            <span>{category.nome}</span>
                          </div>
                          <div className={styles["item-buttons-category"]}>
                            <button
                              onClick={() => handleEditCategory(category)}
                              className={styles["button-edit-in-spa"]}
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className={styles["button-delete-in-spa"]}
                            >
                              Excluir
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default ExpenseTrackerSPA;