import React from "react";
import { getInitals } from "../../utils/helper";
import { 
  Avatar, 
  Box, 
  Typography, 
  Button 
} from "@mui/material";

const ProfileInfo = ({ userInfo, onLogout }) => {
  const { name = "User", email = "" } = userInfo || {}; // Destructure user info with default values

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "8px 16px" 
      }}
    >
      {/* Left section: Avatar and user name */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar 
          sx={{ 
            bgcolor: "primary.main", 
            marginRight: 2 
          }} 
          title={name} 
        >
          {getInitals(name)}
        </Avatar>
        <Box>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {email}
          </Typography>
        </Box>
      </Box>

      {/* Right section: Logout button */}
      <Button 
        variant="outlined" 
        color="error" 
        onClick={onLogout} 
        sx={{ 
          textTransform: "capitalize", 
          fontSize: 14, 
          padding: "4px 16px" 
        }}
        aria-label="Logout"
      >
        Logout
      </Button>
    </Box>
  );
};

export default ProfileInfo;
