import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ContactCard from "../../components/Cards/ContactCard";
import AddEditContact from "./AddEditContact";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Box, Button, Grid } from "@mui/material";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allContacts, setAllContacts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();

  // Fetch user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Fetch all contacts
  const getAllContacts = async () => {
    try {
      const response = await axiosInstance.get("/get-all-contacts");
      if (response.data && response.data.contacts) {
        setAllContacts(response.data.contacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Handle delete contact
  const handleDeleteContact = async (contactId) => {
    try {
      await axiosInstance.delete(`/delete-contact/${contactId}`);
      getAllContacts(); // Refresh contacts after deletion
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Open modal for add/edit
  const handleOpenModal = (type, data = null) => {
    setOpenAddEditModal({ isShown: true, type, data });
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  useEffect(() => {
    getAllContacts();
    getUserInfo();
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />
      <Box sx={{ padding: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal("add")}
          sx={{ marginBottom: 2 }}
        >
          Add New Contact
        </Button>
        <Grid container spacing={2}>
          {allContacts.map((contact) => (
            <Grid item xs={12} sm={6} md={4} key={contact.id}>
              <ContactCard
                contact={contact}
                onEdit={() => handleOpenModal("edit", contact)}
                onDelete={() => handleDeleteContact(contact.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      {openAddEditModal.isShown && (
        <AddEditContact
          modalType={openAddEditModal.type}
          contactData={openAddEditModal.data}
          onClose={handleCloseModal}
          refreshContacts={getAllContacts}
        />
      )}
    </>
  );
};

export default Home;
