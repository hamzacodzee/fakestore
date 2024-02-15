import React, { useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpen,
  getData,
  setEdit,
  setOpenEdit,
  setDelete,
} from "../../store/slice/CategorySlice";

import EditCategory from "./EditCategory";
import AddCategory from "./AddCategory";

const Category = () => {
  const dispatch = useDispatch();
  const { categorys, deleteId } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpenConfirm(true);
    dispatch(setDelete(id));
  };

  const handleClose = () => {
    setOpenConfirm(false);
  };

  const handleAgree = () => {
    const existingCategory =
      JSON.parse(localStorage.getItem("categorys")) || [];
    const deletedCategory = existingCategory.splice(deleteId, 1); // Use slice instead of splice
    localStorage.setItem("categorys", JSON.stringify(existingCategory));

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = existingProducts.filter((product) => {
      return product.category !== deletedCategory[0].name;
    }); // Compare with category

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    dispatch(getData());
    handleClose();
  };

  const handleOpenEdit = (category) => {
    dispatch(setOpenEdit(true));
    dispatch(setEdit({ category }));
  };

  const columnsName = ["name"];
  const columns = columnsName.map((item) => ({
    field: item,
    headerName: item[0].toUpperCase() + item.slice(1),
  }));
  columns.push({
    field: "Action",
    headerName: "Action",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <>
        <i>
          <EditNoteIcon onClick={() => handleOpenEdit(params.row)} />
        </i>
        <i>
          <DeleteIcon onClick={() => handleClickOpen(params.row.id)} />
        </i>
        &nbsp;
      </>
    ),
  });

  const rows = categorys.map((category, index) => ({
    id: index,
    name: category.name,
  }));

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
    const open = useSelector((state) => state.category.open);
    const handleOpen = () => dispatch(setOpen(true));
    const handleClose = () => dispatch(setOpen(false));

    return (
      <div>
        <Button onClick={handleOpen}>+ Add Category</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <AddCategory />
          </Box>
        </Modal>
      </div>
    );
  };
  const EditModal = () => {
    const dispatch = useDispatch();
    const openEdit = useSelector((state) => state.category.openEdit);

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
            <EditCategory />
          </Box>
        </Modal>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div>
        <h1>Categories</h1>
        <AddModal />
        <EditModal />
        <div style={{ width: "100%", textAlign: "center" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            sx={{
              boxShadow: 2,

              m: 5,
              textAlign: "center",

              // '& MuiTablePagination-displayedRows': {
              //   backgroundColor: 'white',
              //   color:'black',
              // },
            }}
          />
        </div>
      </div>
      <Dialog
        open={openConfirm}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ m: 5 }}
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All Products With This Category Will Be Deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
};

export default Category;
