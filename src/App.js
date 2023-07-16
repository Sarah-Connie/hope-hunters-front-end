import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PageLayout } from './pages/PageLayout';
import { ReportPage } from './pages/ReportPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UpdateUserForm from './components/UpdateUserDetailsForm';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element=""/>
            <Route path="/report" element={<ReportPage />}/>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
