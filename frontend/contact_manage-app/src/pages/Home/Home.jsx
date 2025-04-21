import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ContactCard from "../../components/Cards/ContactCard";
import AddEditContact from "./AddEditContact";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { Box, Button, Grid, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [allContacts, setAllContacts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        // toast.success("Login successful!");
        // localStorage.removeItem("loginSuccess");
        
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };


  const getAllContacts = async () => {
    try {
      const response = await axiosInstance.get("/get-all-contacts");
      if (response.data && response.data.contacts) {
        setAllContacts(response.data.contacts);
      }
    } catch (error) {
      toast.error("Failed to fetch contacts!");
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axiosInstance.delete(`/delete-contact/${contactId}`);
      getAllContacts();
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error("Error deleting contact.");
    }
  };

  const handleOpenModal = (type, data = null) => {
    setOpenAddEditModal({ isShown: true, type, data });
  };

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  // This will be passed to modal and used when contact is added/edited
  const handleToastOnSave = (type) => {
    if (type === "add") toast.success("Contact added successfully!");
    if (type === "edit") toast.info("Contact updated successfully!");
  };

  useEffect(() => {
    getAllContacts();
    getUserInfo();
  }, []);

  return (
    <>
      <NavBar userInfo={userInfo} />

      <Box sx={{ padding: 2 }}>
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

      {/* Add Contact FAB Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => handleOpenModal("add")}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      {openAddEditModal.isShown && (
        <AddEditContact
          modalType={openAddEditModal.type}
          contactData={openAddEditModal.data}
          onClose={handleCloseModal}
          refreshContacts={getAllContacts}
          onSuccessToast={handleToastOnSave}
        />
      )}

      <ToastContainer position="bottom-left" autoClose={3000} />
    </>
  );
};

export default Home;
