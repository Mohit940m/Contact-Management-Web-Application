import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const EmptyCard = () => {
  return (
    <Card
      sx={{
        margin: 2,
        padding: 2,
        backgroundColor: '#f9f9f9',
        border: '1px solid #e0e0e0',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardContent>
        <Typography variant="body1" color="textSecondary">
          No Contacts Found
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EmptyCard;
