import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home'
import Qrscanner from './pages/Qrscanner';
import Imagescanner from './pages/Imagescanner';
import OCRComponent from './pages/OCRComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/component1' element={<Qrscanner />} />
        <Route path='/component2' element={<Imagescanner />} />
        <Route path='/component3' element={<OCRComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
