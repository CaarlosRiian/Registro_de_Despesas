// import react from "react"
import ListExpenses from "./components/listExpenses"
import { Link } from "react-router-dom"
import styles from "../src/styles/app.module.css";


function App() {

  return (
    <>
      <nav>
        <Link to="/categorias" className={styles["cadastrar-categoria-button"]}>Cadastrar Categoria</Link>
        <Link to="/listar_categoria" className={styles["listar-categoria-button"]} >Listar Categoria</Link>
        <Link to="/cadastrar_despesa" className={styles["cadastrar-despesa-button"]}>Cadastrar Despesa</Link>
      </nav>
      <ListExpenses />
    </>
  )
}

export default App
