import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Mainpage/main.jsx';
import Admindasboard from './pages/admin/Daasboard/Admindasboard.jsx';
import Adminhero from './pages/admin/Hero/Adminhero.jsx';
import Adminabout from './pages/admin/About/Adminabout.jsx';
import Admin from './pages/admin/Admin.jsx';
import Admincertificates from './pages/admin/Certificates/Admincertificates.jsx';
import Adminproject from './pages/admin/Project/Adminproject.jsx';
import AdminLogin from './pages/admin/Adminlogin.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/Admin/*" element={<Admin />}>
          <Route index element={<Admindasboard />} />
          <Route path="Hero" element={<Adminhero />} />
          <Route path="About" element={<Adminabout />} />
          <Route path="Certificates" element={<Admincertificates />} />
          <Route path="Project" element={<Adminproject />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;