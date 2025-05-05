import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import App from './App.jsx'
import CategoryForm from './components/categoryForm'
import ExpenseForm from './components/expenseForm'
import EditExpense from './components/editExpense'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categorias" element={<CategoryForm />} />
        <Route path="/cadastrar_despesa" element={<ExpenseForm/>} />
        <Route path="/editar/:id" element={<EditExpense/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
