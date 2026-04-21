import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LinktreePage } from './pages/linktree/LinktreePage';
import { CardapioPage } from './pages/cardapio/CardapioPage';
import { CarrinhoPage } from './pages/carrinho/CarrinhoPage';
import './App.css';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Raleway:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #2A0A0A;
    font-family: 'Raleway', sans-serif;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(201,169,110,0.3); border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes shimmer {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes modalIn {
    from { transform: translateY(60px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.06; }
    50% { transform: translateY(-30px) scale(1.04); opacity: 0.1; }
  }
`;

function App() {
  return (
    <>
      <style>{globalStyles}</style>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LinktreePage />} />
          <Route path="/cardapio" element={<CardapioPage />} />
          <Route path="/carrinho" element={<CarrinhoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
