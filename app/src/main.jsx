import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '@fontsource/caveat-brush'
import '@fontsource/caveat/500.css'
import '@fontsource/caveat/700.css'
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource/dm-mono/400.css'
import './index.css'

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
