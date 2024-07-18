import './App.css'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [item, setItem] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('searching...')
    setLoading(true)
    setItem(null)
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

  const handleClick = (e) => {
    console.log(`Clicked on item with id ${e.currentTarget.id}`)
    setLoading(true)
    setResults([])
    axios.post('http://localhost:5000/api/ge/item/details', { item: e.currentTarget.id })
      .then((response) => {
        console.log(response.data.item)
        setItem(response.data.item)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching item details:', error)
        setLoading(false)
      })
  }

  return (
    <div className='background'>
      <div className='content-container'>
        <div className='content'>

          {/* Search Bar */}
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

          {/* Loading */}
          {loading && <p>Loading...</p>}

          {/* Search Results */}
          <div className='search-results'>
            {results && results.map((result, index) => (
              <div key={index} id={result.id} className='result' onClick={handleClick}>
                <img src={result.icon} alt={result.name} />
                <div>
                  <h3>{result.name}</h3>
                  <p>{result.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Item Details */}
          <div>
            {item && (
              <div className='item-details'>
                <img src={item.icon} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default App
