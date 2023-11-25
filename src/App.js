import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import MoviesSearch from "./components/MoviesSearch";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Movies search</h1>
      </div>
      <Routes>
        <Route path="/" element={<MoviesSearch />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
