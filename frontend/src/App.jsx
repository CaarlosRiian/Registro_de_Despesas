import react from "react"
import Header from "./components/header"
import ListExpenses from "./components/listExpenses"
import { Link } from "react-router-dom"


function App() {

  return (
    <>
      <Header />
      <ListExpenses />
      <nav>
        <Link to="/categorias">Cadastrar Categoria</Link>
        <Link to="/cadastrar_despesa">Cadastrar Despesa</Link>
      </nav>
    </>
  )
}

export default App
