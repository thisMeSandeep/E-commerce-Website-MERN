import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CategoryContextProvider } from './contexts/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(
  <CategoryContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CategoryContextProvider>

)
