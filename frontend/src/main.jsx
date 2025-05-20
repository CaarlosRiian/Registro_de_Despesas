import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import App from './App.jsx'
import CategoryForm from './components/categoryForm'
import ExpenseForm from './components/expenseForm'
import EditExpense from './components/editExpense'
import CategoryList from './components/categoryList.jsx'
import CategoryEdit from './components/categoryedit.jsx'
import ExpenseTrackerSPA from './components/SPA_despesas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categorias" element={<CategoryForm />} />
        <Route path="/listar_categoria" element={<CategoryList/>} />
        <Route path="/editar_categoria/:id" element={<CategoryEdit/>} />
        <Route path="/cadastrar_despesa" element={<ExpenseForm/>} />
        <Route path="/editar/:id" element={<EditExpense/>} />
        <Route path="/teste/:id" element={<ExpenseTrackerSPA/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
