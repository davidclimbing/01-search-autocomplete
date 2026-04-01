import { useState } from 'react';
import './App.css';

import { searchProducts, Product } from './api/products';

function App() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleSearch = async (word: string) => {
    setLoading(true);

    try {
      const response = await searchProducts(word)
      setResult(response);

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
          onChange={(e) => setQuery(e.target.value)}
          placeholder="상품을 검색하세요"
          className="search-input"
        />
        <button 
          className="search-button" 
          onClick={() => handleSearch(query)}>검색</button>
        {/* {
          isLoading ? (
            <>
              <div>Loading 중</div>
            </>
          ) : (
            <>
              <div>
                {
                  result ? <>{result}</> : <>검색결과가 없습니다.</>
                }
              </div>
            </>
          )
        } */}
      </div>


      {/* TODO: 자동완성 목록 구현 */}
      {/* TODO: 최근 검색어 구현 */}
    </div>
  );
}

export default App;
