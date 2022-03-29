import React, {useState} from 'react'
import { fetchPlace } from './fetchPlaces'
import './SearchPlaces.css'

export const SearchPlaces = ({getCity}) => {

    const [autocompleteCities, setAutocompleteCities] = useState([]);

    const handleCityChange = async (e) => {
        const res = await fetchPlace(e.target.value);
        (!autocompleteCities.includes(e.target.value) &&
        setAutocompleteCities(res.features.map((place) => place.text)));
      };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            getCity(e.target.value)
        }
    }

  return (
    <form>
      <div className="search">
          <input
            className='search-bar'
            list="places"
            type="text"
            onChange={handleCityChange}
            onKeyDown = {handleKeyDown}
          />
          <datalist id="places">
            {autocompleteCities.map((city, i) => (
              <option key={i}>{city}</option>
            ))}
          </datalist>
      </div>
    </form>
  )
}
