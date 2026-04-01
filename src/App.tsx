import { useState, KeyboardEvent, useEffect } from 'react';
import './App.css';

import { searchProducts, Product } from './api/products';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(query, 300);

  const fetchResults = async (keyword: string) => {
    setLoading(true);
    try {
      const response = await searchProducts(query);
      setResults(response);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await fetchResults(query)
    }
  };

  const handleSearch = async (word: string) => {
    await fetchResults(word)
  }

  useEffect(() => {
    const autoComplete = async () => {
      if (debouncedSearchTerm) {
        await fetchResults(query)
      }
    };

    autoComplete();
  }, [debouncedSearchTerm, query]);

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
      <div className=''>
        {
          results.map((r, i) => (
            <ul key={i}>
              <li>{r.name}</li>
            </ul>
          ))
        }
      </div>
      {/* TODO: 최근 검색어 구현 */}
      <div>

      </div>
    </div>
  );
}

export default App;
