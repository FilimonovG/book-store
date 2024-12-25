import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home/Home";
import PersistRoute from "../utils/ProtectedRoute/PersistRoute";
import Book from "../pages/Book/Book";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import Category from "../pages/Category/Category";
import Cart from "../pages/Cart/Cart";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../utils/ProtectedRoute/ProtectedRoute";
import Admin from "../pages/Admin/Admin";

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
              <Route path={'/category/:id'} element={<Category/>}/>
              <Route path={'/cart'} element={<Cart/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/registration" element={<Registration/>}/>
              {/* user routes */}
              <Route element={<ProtectedRoute allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
                  <Route path={'/profile'} element={<Profile/>}/>
              </Route>
              {/* admin routes */}
              <Route element={<ProtectedRoute allowedRoles={[ROLES.Admin]}/>}>
                  <Route path={'/admin/category'} element={<Admin/>}/>
                  <Route path={'/admin/book'} element={<Admin/>}/>
              </Route>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
