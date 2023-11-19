import React, { useState, useEffect } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const FilterBy = ({ onTagsListChange, filterType, tagsList, singleChoice}) => {
    const [menuOpen, setMenuOpen] = useState(null);
    const open = Boolean(menuOpen);
    const [tags, setTags]=useState(singleChoice ? [tagsList[0]] :tagsList)


    useEffect(()=> {
        onTagsListChange(tags)
    },[tags])

    const handleClick = (e) => {
        setMenuOpen(e.currentTarget);
      };
      const handleClose = () => {
        setMenuOpen(null);
      };

        return (
            <>
                <button className='path-btn sort-btn'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{ marginBottom:'15px', whiteSpace: 'nowrap'}}

                ><FilterAltIcon style ={{ paddingRight: '10px'}} />
                    Filter by {filterType}
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={menuOpen} 
                    open={open}
                    onClose={handleClose}
                
                >
                    {tagsList.map((tagName) => {

                        const isSelected = tags.includes(tagName)
                        return (
                            <MenuItem key={tagName} style={{color:'#ADA0A6'}} onClick={() => {
                                if (!singleChoice) {
                                    if (isSelected) {
                                        setTags((tags) => tags.filter((tag) => tag !== tagName))
                                    } else {
                                        setTags((tags) => tags.concat(tagName).toSorted())
                                    }
                                } else {
                                    setTags([tagName]) 
                                    handleClose()
                                }
                                //TODO ikona wyboru ma byc zalena od singleChoice - radio button zamiast check
                            }}>{isSelected ? <CheckBoxIcon sx={{pr:'6px'}}/> : <CheckBoxOutlineBlankIcon sx={{pr:'6px'}}/> }{tagName}</MenuItem>
                        )
                    }
                )}
                </Menu>
            </>
        )
    }


export default FilterBy