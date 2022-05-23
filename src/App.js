import logo from './logo.svg';
import './App.css';

function App() {
  const onClick = (good) => {
    return good.map(x => x * 2)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          onClick={e => onClick()}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
