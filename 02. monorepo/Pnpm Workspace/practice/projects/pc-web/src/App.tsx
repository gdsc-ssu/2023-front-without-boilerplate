import reactLogo from './assets/react.svg';
import './App.css';

import { COLORS } from '@pnpm-monorepo/common';

function App() {
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 style={{ color: COLORS.primary }}>this is pc-web</h1>
    </div>
  );
}

export default App;
