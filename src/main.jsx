import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// import react-bootstrap styles 
import 'bootstrap/dist/css/bootstrap.min.css';
// import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <ChakraProvider>
    <App />
  </ChakraProvider>,
)
