import './App.css';
//importing react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
//importing components
import Spotifylogin from './components/Spotifylogin';
import Dashboard from './components/Dashboard';

//spotify-web-api-node NPM Package -> code for backend
const code=new URLSearchParams(window.location.search).get('code')

function App() {
  return (
    code?<Dashboard code={code}/>:<div className="App"><Spotifylogin/></div>
    
    
  );
}

export default App;
