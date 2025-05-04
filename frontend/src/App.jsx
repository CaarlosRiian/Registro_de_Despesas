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
      </nav>
    </>
  )
}

export default App
