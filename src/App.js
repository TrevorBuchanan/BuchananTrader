import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <h1>Buchanan Trader</h1>

      <div>
        <button>Start Trading Machine</button> 
        <button>Stop Trading Machine</button>
      </div>
      <div>
        <h2>Graphs</h2>
        <div>
          <p>Profit and loss graph here</p>
        </div>
        <div>
          <p>Profit and loss graph here</p>
        </div>
      </div>
    </div>
  );
}

export default App;
