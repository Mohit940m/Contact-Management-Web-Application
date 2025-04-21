import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const AddEditContact = ({ modalType, contactData, onClose, refreshContacts, onSuccessToast }) => {
  const [contact, setContact] = useState(
    contactData || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      jobTitle: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (modalType === "edit") {
        // Update existing contact
        await axiosInstance.put(`/edit-contacts/${contact._id}`, contact);
        onSuccessToast("edit");
      } else {
        // Add new contact
        await axiosInstance.post("/contacts", contact);
        onSuccessToast("add");
      }
      refreshContacts(); // Refresh the contact list
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error saving contact:", error);
      toast.error("Error saving contact.");
    }
  };

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{modalType === "edit" ? "Edit Contact" : "Add Contact"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="First Name"
          name="firstName"
          value={contact.firstName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Last Name"
          name="lastName"
          value={contact.lastName}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={contact.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Company"
          name="company"
          value={contact.company}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Job Title"
          name="jobTitle"
          value={contact.jobTitle}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditContact;
