import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Qrscanner from './pages/Qrscanner';
import Imagescanner from './pages/Imagescanner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/component1' element={<Qrscanner />} />
        <Route path='/component2' element={<Imagescanner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
