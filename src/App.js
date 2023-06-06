// import logo from './logo.svg';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './Componets/Home.js';
import Single from './Componets/Single.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Form from './Componets/Form';

function App() {
  return (
 <>
  
   
  <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movie/:movieId' element={<Single/>}/>
        <Route path='/form/:movieId' element={<Form/>}/>


        
  </Routes>

 </>
  );
}

export default App;
