import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MoviesSearch from "./components/MoviesSearch";
import "./index.css";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MoviesSearch />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
