import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setData } from "../store/slice/FakeStoreSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.fakeStore);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1); //pagination
  const [itemsPerPage] = useState(6); //pagination
  const [searching, setSearching] = useState(""); //search
  const [load, setLoad] = useState(true);
  const [category, setCategory] = useState("");
  const [copyList, setCopyList] = useState(data);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        //search

        const formattedData = jsonData.map(
          ({ image, title, price, category }) => ({
            image,
            title,
            price,
            category,
          })
        );
        dispatch(setData(formattedData));
        setTimeout(() => {
          setLoad(false);
        }, 1000);

        const objarr = jsonData.map((item) => ({
          cat: item.category,
        }));

        const arr = objarr.map((item) => item.cat);
        const uniqueArray = Array.from(new Set(arr));

        setCategoryList(uniqueArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const handleChangePage = (event, newPage) => {
    setLoad(true);
    setPage(newPage);
    setTimeout(() => {
      setLoad(false);
    }, 1000);
  }; //pagination

  const startIndex = (page - 1) * itemsPerPage; //pagination
  const endIndex = startIndex + itemsPerPage; //pagination

  //search

  const requestSearch = (searched) => {
    setSearching(searched);
    setPage(1);
    const filterRows = (items) => {
      return items.filter((item) => {
        const values = Object.values(item).map((value) =>
          String(value).toLowerCase()
        );
        return values.some((value) => value.includes(searched.toLowerCase()));
      });
    };
    setCopyList(category ? filterRows(categoryData) : filterRows(data));
  };

  const requestCategory = (cat) => {
    setCategory(cat);
  };

  useEffect(() => {
    setPage(1);
    const catdata = () =>
      data.filter((item) => {
        const rawdata = String(item.category);
        return rawdata.includes(category);
      });
    setCopyList(catdata);
    setCategoryData(catdata);
  }, [category, data]);

  //search
  const rows = copyList.length > 0 ? copyList : data;

  return (
    <>
      {load ? (
        <Loader />
      ) : (
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
          &nbsp; &nbsp;
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
          <div>
            <FormControl sx={{ m: 1, minWidth: 130 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={category}
                onChange={(e) => requestCategory(e.target.value)}
                autoWidth
                label="category"
              >
                <MenuItem value="">All</MenuItem>
                {categoryList.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          {copyList.length === 0 && searching && (
            <h1>No Similar Results Found</h1>
          )}
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
                      variant="outlined"
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
      )}
    </>
  );
};

export default Home;
