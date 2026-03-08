import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Reset browser defaults
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.boxSizing = 'border-box';

createRoot(document.getElementById('root')!).render(<App />)
