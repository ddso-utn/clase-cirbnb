import React from 'react'
import './AccomodationSearchBar.css';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import {Button, TextField} from "@mui/material";
import {useEffect, useState} from "react";

const AccomodationSearchBar = (filtrarProductos) => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);

  return (
    <div className="accommodation-search">
      <div className='search-field'>
        <label className='field-label'>DESTINO</label>
        <div className='input-wrapper'>
          <FaMapMarkerAlt className='search-icon' />
          <TextField
            value={searchText}
            onChange={(e) => {setSearchText(e.target.value)}}
            fullWidth
            variant="standard"
            placeholder="¿A dónde quieres ir?"
          />
        </div>
      </div>
      
      <Button variant="outlined" onClick={() => filtrarProductos(searchText)}>
        <FaSearch className='button-icon' />
        Buscar
      </Button>
    </div>
  )
}

export default AccomodationSearchBar

