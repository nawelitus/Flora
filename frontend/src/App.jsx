import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/usuarios" element={<UsersPage />} />
            </Routes>
        </Router>
    );
}

export default App;
