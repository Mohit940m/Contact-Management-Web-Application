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
        borderRadius: '16px',
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 18px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
          {firstName} {lastName}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Email:</strong> {email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Phone:</strong> {phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Company:</strong> {company}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Job Title:</strong> {jobTitle}
          </Typography>
        </Box>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          pb: 1,
        }}
      >
        <IconButton
          color="primary"
          onClick={() => onEdit(contact)}
          sx={{
            borderRadius: '10px',
            backgroundColor: '#e3f2fd',
            '&:hover': {
              backgroundColor: '#bbdefb',
            },
          }}
        >
          <Edit />
        </IconButton>
        <>
          <IconButton
            onClick={handleOpenDialog}
            sx={{
              borderRadius: '10px',
              backgroundColor: '#ffebee',
              '&:hover': {
                backgroundColor: '#ffcdd2',
              },
            }}
          >
            <MdDelete color="#d32f2f" size={22} />
          </IconButton>

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
        </>

      </Box>
    </Card>

  );
};

export default ContactCard;
