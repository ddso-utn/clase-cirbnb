import React from 'react'
import './AccomodationSearchBar.css';
import { FaBed } from 'react-icons/fa';

const AccomodationSearchBar = () => {
  return (
    <div className="accommodation-search">
        <div className='accommodation-search-bar'>
          <FaBed color="gray" className='search-bar-icon'></FaBed>
          <input type="text" className='search-bar-acc-input' placeholder="¿A dónde vas?" />
        </div>
        <button className='search-bar-button'>
          Buscar
        </button>
    </div>
  )
}

export default AccomodationSearchBar
