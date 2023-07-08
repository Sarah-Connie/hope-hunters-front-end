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
          <Route path="/" element={<Nav />}/>
          <Route element={<PageLayout />}>
            <Route path="/report" element={<Nav />} />
            <Route path="/login" element={<Nav />} />
            <Route path="/signup" element="" />
            <Route path="/dashboard" element="" />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
