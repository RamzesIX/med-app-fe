import ReactDOM from 'react-dom/client'
import { App } from './app'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('app')

if (!rootElement) {
    throw new Error('Root element with id: "app" is missing.')
}

ReactDOM.createRoot(rootElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
