import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoute';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {

  return (
   <Provider store={store}>
     <BrowserRouter>
       <AppRoutes />
     </BrowserRouter>
   </Provider>  
  )
}

export default App
