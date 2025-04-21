import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const NavBar = ({userInfo}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login")
  };

  const handleSearch = () =>{
    console.log('Search query:', searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2>Contact Manager</h2>
      <SearchBar
        value={searchQuery}
        onChange={({target}) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
      <ProfileInfo userInfo= {userInfo} onLogout={onLogout} />
    </nav>
  );
};

export default NavBar;