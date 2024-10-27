import LoginForm from './pages/LoginForm';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  
  return (
    <>
        <Routes>
          <Route path = "/" element = {<LoginForm/>} />
          <Route path = "/home" element = {<Home/>} />
        </Routes>
    </>
  );
}

export default App;