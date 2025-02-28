import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CategoryContextProvider } from './contexts/CategoryContext.jsx'
import { AppContextProvider } from './contexts/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <CategoryContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CategoryContextProvider>
  </AppContextProvider>
)
