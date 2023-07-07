import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <BrowserRouter>
        {/* {location.pathname !== '/' ? <HomeHeader /> : ""} */}
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Nav />}/>
          <Route element="">
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
