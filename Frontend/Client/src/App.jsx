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
    setResults([])
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

  const getClassName = (trend) => { // 'neutral', 'positive', 'negative' for item price trends.
    return trend === 'neutral' ? 'trend-neutral' :
      trend === 'positive' ? 'trend-positive' :
        'trend-negative';
  };

  return (
    <div className='content'>

      {/* Search Bar */}
      <form className='search-bar' onSubmit={handleSearch}>
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
      {loading && <p className='loading'>Loading...</p>}

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
        {item && (
          <div className='item-details'>
            <div className='flex justify-between'>
              <div>
                <h3 className='item-title'>{item.name}</h3>
                <p className='item-description'>{item.description}</p>
              </div>
              <img className='item-icon' src={item.icon} alt={item.name} />
            </div>
            <table className='item-table'>
              <thead>
                <tr>
                  <th>Current</th>
                  <th>1 Month</th>
                  <th>3 Month</th>
                  <th>6 Month</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={getClassName(item.current.trend)}>{item.current.price}</td>
                  <td className={getClassName(item.day30.trend)}>{item.day30.change}</td>
                  <td className={getClassName(item.day90.trend)}>{item.day90.change}</td>
                  <td className={getClassName(item.day180.trend)}>{item.day180.change}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Item Details */}



    </div>
  )
}

export default App
