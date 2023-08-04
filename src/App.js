import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PageLayout } from './pages/PageLayout';
import Home from './pages/Home';
import { ReportPage } from './pages/ReportPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Dashboard } from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import EmailVerification from './components/SignupVerification';
import SupportPage from './pages/Support';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/report" element={<ReportPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/dashboard" element=
            {<PrivateRoute>
              <Dashboard />
            </PrivateRoute>} 
            />
            <Route path ="/verified/:userEmail" element={<EmailVerification/>}/>          
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;