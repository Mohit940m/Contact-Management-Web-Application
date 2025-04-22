import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    _id,
    firstName = 'Mohit',
    lastName = 'Saha Chowdhury',
    email = 'sahachowdhurymohit@gmail.com',
    phone = '',
    company = '',
    jobTitle = '',
  } = contact;

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(_id);
    }
    handleCloseDialog();
  };

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
        <Button variant="outlined" color="error" onClick={handleOpenDialog}>
          <MdDelete size={24} />
        </Button>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this contact?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ContactCard;
