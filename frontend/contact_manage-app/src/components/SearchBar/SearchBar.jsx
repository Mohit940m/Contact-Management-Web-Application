import React from 'react';
import { InputBase, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  if (typeof value !== 'string' || typeof onChange !== 'function' 
    || typeof handleSearch !== 'function' || typeof onClearSearch !== 'function') {
    throw new Error('Invalid props');
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          ml: 1,
          flex: 1,
          border: '1px solid #ccc',
          borderRadius: 4,
          padding: '10px',
        }}
      >
        <InputBase
          placeholder="Search Notes"
          value={value}
          onChange={onChange}
        />
      </Box>
      {value && (
        <IconButton onClick={onClearSearch}>
          <CloseIcon />
        </IconButton>
      )}
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;