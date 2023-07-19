import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PageLayout } from './pages/PageLayout';
import { ReportPage } from './pages/ReportPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Dashboard } from './pages/Dashboard';
import PersistLogin from './components/PersistLogin';

function App() {
  return (
    <BrowserRouter>
      
        <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<PageLayout />}>
            <Route path="/" element="" />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;