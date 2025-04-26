import React, { useState } from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { toast } from 'react-toastify';
import '../../App.css';




const NavBar = ({ userInfo, onSearchContacts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    toast.info("You have been logged out.");
    localStorage.removeItem("token");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleSearchContacts = () => {
    if(searchQuery){
      onSearchContacts(searchQuery);
    }
    console.log('Search query:', searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <nav style={styles.navbar}>
      <h2 className="navbar-title" onClick={() => navigate("/dashboard")}>Contact Manager</h2>
      
      <div style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          onSearchContacts={handleSearchContacts}
          onClearSearch={handleClearSearch}
        />
      </div>

      <div style={styles.profileContainer}>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </nav>
  );
};



const styles = {
  navbar: {
    backgroundColor: 'white',
    padding: '10px 20px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    gap: '10px'
  },
  title: {
    margin: 0,
    color: '#1976d2',
    fontSize: '1.8rem',
    transition: '0.3s',
    cursor: 'pointer',
  },
  searchContainer: {
    flex: 1,
    minWidth: '200px',
    display: 'flex',
    justifyContent: 'center',
  },
  profileContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'box-shadow 0.3s ease-in-out',
  },
};

// Add this CSS in your global styles or App.css if you're not using styled-components or Tailwind:
const styleTag = document.createElement('style');
styleTag.innerHTML = `
  nav h2:hover {
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
  }

  .profile-container:hover {
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
  }

  @media screen and (max-width: 768px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
    }

    nav h2 {
      margin-bottom: 10px;
    }

    nav .search-container {
      width: 100%;
      margin-bottom: 10px;
    }

    nav .profile-container {
      width: 100%;
      justify-content: flex-end;
    }
  }
`;
document.head.appendChild(styleTag);

export default NavBar;
