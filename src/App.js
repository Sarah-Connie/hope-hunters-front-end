import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { PageLayout } from './pages/PageLayout';
import { ReportPage } from './pages/ReportPage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { Dashboard } from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PersistLogin from './components/PersistLogin';
import EmailVerification from './components/SignupVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route element={<PersistLogin />} /> */}
        <Route element={<PageLayout />}>
          <Route path="/" element="" />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element=
            {<PrivateRoute>
              <Dashboard />
            </PrivateRoute>} 
          />
          <Route element={<EmailVerification/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;