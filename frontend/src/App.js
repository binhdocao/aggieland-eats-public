import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './routes/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './routes/About';
import SearchResults from './routes/SearchResults';


function App() {
  return (
      <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>} />
            <Route path="/search-results/:query" element={<SearchResults/>} />
          </Routes>
      </Router>
  );
}

export default App;
