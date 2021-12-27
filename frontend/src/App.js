import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withRouter } from './utils/withRouter';
import Home from './pages/Home';

const HomeRouter = withRouter(Home)

function App() {
  return (
    <div className="container-all">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRouter />}/>
          <Route path="/Profile" element={<HomeRouter />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
