import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { PageLayout } from './pages/PageLayout';
import { ReportPage } from './pages/ReportPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element=""/>
            <Route path="/report" element={<ReportPage />}/>
            <Route path="/login" element="" />
            <Route path="/signup" element="" />
            <Route path="/dashboard" element="" />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
