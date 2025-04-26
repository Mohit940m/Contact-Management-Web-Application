import React, { useRef } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const SearchBar = ({ value, onChange, onSearchContacts, onClearSearch }) => {
  const inputRef = useRef(null);

  const handleClear = async (e) => {
    e.preventDefault();
    onClearSearch(); // this should clear the search state in parent
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // IMPORTANT: call onSearchContacts with empty string
    onSearchContacts("");
    setSearchQuery("");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchContacts(value);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        inputRef={inputRef}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Contacts"
        inputProps={{ "aria-label": "search contacts" }}
        value={value}
        onChange={onChange}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <IconButton
        sx={{ p: "10px" }}
        aria-label="clear"
        onClick={handleClear}
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
