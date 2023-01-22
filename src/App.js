import logo from './logo.svg';
import './App.css';
import AllRoutes from './components/Routes/AllRoutes';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />

      <AllRoutes />
    </div>
  );
}

export default App;
