import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import PeopleIcon from "@mui/icons-material/People";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LayersIcon from "@mui/icons-material/Layers";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useNavigate } from "react-router-dom";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import TagIcon from "@mui/icons-material/Tag";

export const MainListItems = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/viewallproducts");
        }}
      >
        <ListItemIcon>
          <CardGiftcardIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
      </ListItemButton>

      <ListItemButton
        onClick={() => {
          navigate("/category");
        }}
      >
        <ListItemIcon>
          <TagIcon />
        </ListItemIcon>
        <ListItemText primary="Category" />
      </ListItemButton>
      
    </React.Fragment>
  );
};

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Saved reports
//     </ListSubheader>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItemButton>
//     <ListItemButton>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItemButton>
//   </React.Fragment>
// );
