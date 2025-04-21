import React from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const {
    firstName = 'Mohit',
    lastName = 'Saha Chowdhury',
    email = 'sahachowdhurymohit@gmail.com',
    phone = '',
    company = '',
    jobTitle = '',
  } = contact;

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
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {firstName} {lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Email:</strong> {email}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Phone:</strong> {phone}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Company:</strong> {company}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          <strong>Job Title:</strong> {jobTitle}
        </Typography>
      </CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
          marginTop: 1,
        }}
      >
        <IconButton color="primary" onClick={() => onEdit(contact)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={() => onDelete(contact.id)}>
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ContactCard;
