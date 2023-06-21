import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Events } from './pages/Events';
import { Collections } from './pages/Collections';
import { connectWallet } from './api/web3';
import { Tokens } from './pages/Tokens';

const WalletComponent: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    connectWallet().then((account) => {
      setAccount(account);
    }).catch((error) => {
      console.error('Error connecting to wallet:', error);
    });
  }, [(window as any).ethereum.selectedAddress]);

  const handleConnect = async () => {
    if (isConnecting) {
      console.log('Wallet connection already in progress');
      return;
    }

    setIsConnecting(true);

    try {
      const accounts = await connectWallet();
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          {/* Use web3 to interact with the connected wallet */}
        </div>
      ) : (
        <div>
          <button onClick={handleConnect} disabled={isConnecting}>
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <nav>
          <ul style={{ display: 'flex', listStyleType: 'none', gap: '1rem' }}>
            <li>
              <Link to="/">Events</Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li>
              <Link to="/tokens">Tokens</Link>
            </li>
          </ul>
        </nav>
        <WalletComponent />
      </header>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/tokens" element={<Tokens />} /> 
      </Routes>
    </Router>
  );
}

export default App;
