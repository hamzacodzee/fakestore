import React, { useEffect } from "react";
import DashboardLayout from "../DashboardFunctions/DashboardLayout";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
// import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Button, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpen,
  getData,
  // setEdit,
  setOpenEdit,
} from "../../store/slice/EventSlice";
import EditProduct from "../DashboardFunctions/EditProduct";
// import { toast } from "react-toastify";
import AddEvent from "./AddEvent";

const EventManager = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  // const deleteEvent = (id) => {
  //   const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
  //   existingEvents.splice(id, 1);
  //   localStorage.setItem("events", JSON.stringify(existingEvents));
  //   dispatch(getData());
  //   toast.success("Deleted Successfully");
  // };

  // const handleOpenEdit = (product) => {
  //   dispatch(setOpenEdit(true));
  //   dispatch(setEdit({ product }));
  // };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const AddModal = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.event.open);
    const handleOpen = () => dispatch(setOpen(true));
    const handleClose = () => dispatch(setOpen(false));

    return (
      <div>
        <Button onClick={handleOpen}>+ Add Event</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <AddEvent />
          </Box>
        </Modal>
      </div>
    );
  };
  const EditModal = () => {
    const dispatch = useDispatch();
    const openEdit = useSelector((state) => state.addModal.openEdit);

    const handleCloseEdit = () => dispatch(setOpenEdit(false));

    return (
      <div>
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <EditProduct />
          </Box>
        </Modal>
      </div>
    );
  };

  const Display = () => {
    return events.map((event, index) => (
      <div key={index}>
        <pre
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "1rem",
          }}
        >
          ID: {index + 1} Name: {event.name} Date: {event.dates}{" "}
          <i
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DeleteIcon />
          </i>
        </pre>
      </div>
    ));
  };

  return (
    <DashboardLayout>
      <div>
        <h1>Event</h1>
        <AddModal />
        <EditModal />
        <Display />
      </div>
    </DashboardLayout>
  );
};

export default EventManager;
