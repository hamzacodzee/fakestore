import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(6); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div>
      <h1>Home</h1>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {data.slice(startIndex, endIndex).map((item, index) => (
            <Grid key={index} xs={4}>
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
                <Button color="primary" variant="contained" fullWidth type="submit">
                  Add Product
                </Button>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default Home;
