import './App.css'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('searching...')
    setLoading(true)
    const substring = e.target[0].value
    axios.post(`http://localhost:5000/api/ge/items`, {
      substring: substring
    })
      .then((response) => {
        console.log(response.data)
        setResults(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching search results:', error)
        setLoading(false)
      })
  }

  return (
    <div className='background'>
      <div className='content-container'>
        <div className='content'>
          <form id='search' onSubmit={handleSearch}>
            <input
              type="text"
              placeholder='cabbage'
            />
            <button
              type="submit"
            >
              Search
            </button>
          </form>
          {loading && <p>Loading...</p>}
          <div id='search-results'>
            {results && results.map((result, index) => (
              <div key={index} className='result'>
                <img src={result.icon} alt={result.name} />
                <div>
                  <h3>{result.name}</h3>
                  <p>{result.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
