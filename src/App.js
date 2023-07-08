import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import { PageLayout } from './pages/PageLayout';

function App() {
  return (
    <BrowserRouter>
        {/* {location.pathname !== '/' ? <HomeHeader /> : ""} */}
        {/* <Header /> */}
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element=""/>
            <Route path="/report" element="" />
            <Route path="/login" element="" />
            <Route path="/signup" element="" />
            <Route path="/dashboard" element="" />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
