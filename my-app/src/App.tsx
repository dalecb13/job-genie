import { Link } from 'react-router';
import './App.css';

function App() {
  return (
    <>
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/job-descriptions">Job Descriptions</Link>
        <Link to="/applications">Applications</Link>
      </nav>

      
    </>
  )
}

export default App;
