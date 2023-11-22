import React, { useState, useEffect } from 'react'
import Menu from '@mui/material/Menu';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import { sortNames } from '../utils/compareMtehods';
import { COLORS } from '../utils/colors';

const SortByMenu = ({ onSortingMethodChange }) => {
    const [sortByMenuOpen, setSortByMenuOpen] = useState(null);
    const open = Boolean(sortByMenuOpen);
    const [selected, setSelected]=useState(sortNames[0])

    useEffect(()=> {
        onSortingMethodChange(selected)
    },[selected])

    const handleClick = (e) => {
        setSortByMenuOpen(e.currentTarget);
      };
      const handleClose = () => {
        setSortByMenuOpen(null);
      };
        return (
            <>
                <button className='path-btn sort-btn'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{ marginBottom:'15px', whiteSpace: 'nowrap'}}>
                    <SortIcon style ={{ paddingRight: '10px'}} />
                    Sort By
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={sortByMenuOpen} 
                    open={open}
                    onClose={handleClose}>
                    {sortNames.map((sortName) => (
                        <MenuItem key={sortName} style={{color: selected === sortName ? COLORS.filterElements : '' }} onClick={() => {
                            handleClose()
                            setSelected(sortName)
                        }}>{sortName}</MenuItem>
                    ))}
                </Menu>
            </>
        )
    }


export default SortByMenu