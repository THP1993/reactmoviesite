import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from "./Pages/Home"
import Movies from "./Pages/Movies"
import Movie from "./Pages/Movie"

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Movies" element={<Movies />} />
          <Route path='/Movie/:imdbID' element={<Movie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
