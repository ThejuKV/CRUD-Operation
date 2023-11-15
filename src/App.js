import React from 'react'
import {BrowserRouter as Router, Routes,Route, Outlet} from 'react-router-dom'
import New from './component/New'
import Userlist from './component/Userlist'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<New/>} />
        <Route path='/Userlist' element={<Userlist/>} />
      </Routes>
      <Outlet/>
    </Router>  
  );
}

export default App;
