import { useState, KeyboardEvent } from 'react';
import './App.css';

import { searchProducts, Product } from './api/products';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSearch(query)
    }
  };

  const handleSearch = async (word: string) => {
    setLoading(true);

    try {
      const response = await searchProducts(word)
      setResult(response);
      console.log(response)
    } catch(e) {
      console.error(e)
    } finally {
      console.log('yes')
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>상품 검색</h1>

      <div className="search-container">
        <input
          type="text"
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="상품을 검색하세요"
          className="search-input"
        />
        <button 
          className="search-button"          
          onClick={() => handleSearch(query)}>{
            isLoading ? 
              <div className='loading'></div> : 
              <span>검색</span>
          }
        </button>
      </div>
      {/* TODO: 자동완성 목록 구현 */}
      <div >

      </div>
      {/* TODO: 최근 검색어 구현 */}
      <div>

      </div>
    </div>
  );
}

export default App;
