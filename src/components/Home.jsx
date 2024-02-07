import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); //pagination
  const [itemsPerPage] = useState(6); //pagination
  const [searching, setSearching] = useState(""); //search
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        //search
        const formattedData = jsonData.map((item) => ({
          image: item.image,
          title: item.title,
          price: item.price,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }; //pagination

  const startIndex = (page - 1) * itemsPerPage; //pagination
  const endIndex = startIndex + itemsPerPage; //pagination

  //search
  const [copyList, setCopyList] = useState(data);
  const requestSearch = (searched) => {
    setSearching(searched);
    setPage(1);
    setCopyList(
      data.filter((item) => {
        const values = Object.values(item).map((value) =>
          String(value).toLowerCase()
        );
        return values.some((value) => value.includes(searched.toLowerCase()));
      })
    );
  };

  //search
  const rows = copyList.length > 0 ? copyList : data;

  return (
    <div>
      <h1>Home</h1>
      <br />
      {/* search */}
      &nbsp; Search:&nbsp;
      <input
        type="search"
        name="search"
        id="search"
        onInput={(e) => requestSearch(e.target.value)}
      />
      <button
        onClick={() => {
          localStorage.removeItem("LoginDetails");
          navigate("/");
        }}
      >
        Logout
      </button>
      <br />
      <br />
      {copyList.length === 0 && searching && <h1>No Similar Results Found</h1>}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* pagination */}
          {rows?.slice(startIndex, endIndex).map((item, index) => (
            <Grid xs={4} key={index}>
              <Item>
                <img
                  src={item.image}
                  alt={item.image}
                  width="200px"
                  height="200px"
                />
                <br />
                <br />
                <b>{item.title}</b>

                <p>USD: {item.price}</p>

                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Add Product
                </Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(rows.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Home;
