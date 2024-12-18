import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home/Home";
import PersistRoute from "../utils/ProtectedRoute/PersistRoute";
import Book from "../pages/Book/Book";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";

function App() {

    const ROLES = {
        User: "USER",
        Admin: "ADMIN"
    }

    return (
    <Router>
      <Routes>
          <Route  element={<PersistRoute/>}>
              {/* public routes */}
              <Route path={'/'} element={<Home/>}/>
              <Route path={'/book/:id'} element={<Book/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/registration" element={<Registration/>}/>
              {/* user routes */}


              {/* admin routes */}
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
