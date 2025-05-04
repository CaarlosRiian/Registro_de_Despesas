import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import App from './App.jsx'
import CategoryForm from './components/categoryForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categorias" element={<CategoryForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
