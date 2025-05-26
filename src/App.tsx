import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <BrowserRouter basename="/movie-surfer-app/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page/:pageNumber" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
