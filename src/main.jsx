import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './Redux/store.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import App from './App.jsx'
import './index.css'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <React.StrictMode></React.StrictMode> */}
        <App />
      
    </QueryClientProvider>
  </Provider>,
)