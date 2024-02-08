import React, { useEffect } from "react";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Unstable_Grid2";
// import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  setPage,
  setLoad,
  setCategoryList,
  setCategoryData,
  setSearching,
  setCategory,
  setCopyList,
  fetchData,
} from "../store/slice/FakeStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const {
    data,
    searching,
    itemsPerPage,
    page,
    load,
    categoryList,
    categoryData,
    category,
    copyList,
  } = useSelector((state) => state.fakeStore);

  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      try {
        dispatch(fetchData());
        setTimeout(() => {
          dispatch(setLoad(false));
        }, 1000);

        const objarr = data.map((item) => ({
          cat: item.category,
        }));

        const arr = objarr.map((item) => item.cat);
        const uniqueArray = Array.from(new Set(arr));

        dispatch(setCategoryList(uniqueArray));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [dispatch, data]);

  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   margin: theme.spacing(4),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));

  const handleChangePage = (event, newPage) => {
    dispatch(setLoad(true));
    dispatch(setPage(newPage));
    setTimeout(() => {
      dispatch(setLoad(false));
    }, 1000);
  }; //pagination

  const startIndex = (page - 1) * itemsPerPage; //pagination
  const endIndex = startIndex + itemsPerPage; //pagination

  //search

  const requestSearch = (searched) => {
    dispatch(setSearching(searched));
    dispatch(setPage(1));
    const filterRows = (items) => {
      return items.filter((item) => {
        const values = Object.values(item).map((value) =>
          String(value).toLowerCase()
        );
        return values.some((value) => value.includes(searched.toLowerCase()));
      });
    };
    dispatch(
      setCopyList(category ? filterRows(categoryData) : filterRows(data))
    );
  };

  const requestCategory = (cat) => {
    dispatch(setCategory(cat));
    dispatch(setSearching(""));
  };

  useEffect(() => {
    dispatch(setPage(1));
    const catdata = data.filter((item) => {
      const rawdata = String(item.category);
      return rawdata.includes(category);
    });
    dispatch(setCopyList(catdata));
    dispatch(setCategoryData(catdata));
  }, [category, data, dispatch]);

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
            value={searching}
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {rows?.slice(startIndex, endIndex).map((item, index) => (
              <Card
                sx={{ width: "400px", m: 1, p: 5, marginBottom: "30px" }}
                key={index}
              >
                <CardActionArea sx={{ height: "590px" }}>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.image}
                    sx={{ height: "400px", objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "left", mt: 3 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "left" }}
                    >
                      USD: {item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button color="primary" variant="contained" fullWidth>
                    View
                  </Button>
                </CardActions>
              </Card>
            ))}
            ;
          </Box>
          <Stack
            spacing={2}
            sx={{
              m: 4,
              mb: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
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
