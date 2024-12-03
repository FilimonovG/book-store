import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "../pages/Home/Home";
import PersistRoute from "../utils/ProtectedRoute/PersistRoute";

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

              {/* user routes */}


              {/* admin routes */}
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
