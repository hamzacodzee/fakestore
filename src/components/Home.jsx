import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
  setFiltering,
  setFilter,
} from "../store/slice/FakeStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    filtering,
    filter,
  } = useSelector((state) => state.fakeStore);

  useEffect(() => {
    const getData = async () => {
      setLoad(true);
      try {
        dispatch(fetchData());
        setTimeout(() => {
          dispatch(setLoad(false));
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Component will unmount"); //Unmount
  //   dispatch(setSearching(""));
  // }, []);

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
      return items?.filter((item) => {
        const values = Object?.values(item)?.map((value) =>
          String(value)?.toLowerCase()
        );
        return values?.some((value) => value?.includes(searched.toLowerCase()));
      });
    };
    dispatch(
      setCopyList(
        category && category !== "All"
          ? filterRows(categoryData)
          : filterRows(data)
      )
    );
  };

  const requestCategory = (cat) => {
    dispatch(setCategory(cat));
    dispatch(setSearching(""));
  };

  useEffect(() => {
    dispatch(setPage(1));
    const catdata = data?.filter((item) => {
      const rawdata = String(item?.category);
      return rawdata?.includes(category);
    });
    dispatch(setCopyList(catdata));
    dispatch(setCategoryData(catdata));

    const objarr = data?.map((item) => ({
      cat: item?.category,
    }));

    const arr = objarr?.map((item) => item.cat);
    const uniqueArray = Array.from(new Set(arr));
    dispatch(setCategoryList(uniqueArray));
  }, [category, data, dispatch]);

  const filterData = (data, property, filterValue) => {
    return data?.filter((item) => {
      const rawdata = String(item?.[property]).toLowerCase();
      dispatch(setFiltering(property ? property : ""));
      return rawdata?.includes(filterValue?.toLowerCase() || "");
    });
  };
  const requestFilter = ({ id, title, price, minprice, maxprice }) => {
    dispatch(setFilter({ id, title, price, minprice, maxprice }));
    // console.log(id, title, price, minprice, maxprice);

    let filteredData = data;

    if (id) {
      filteredData = filterData(filteredData, "id", id);
    }

    if (title) {
      filteredData = filterData(filteredData, "title", title);
    }

    if (price) {
      filteredData = filterData(filteredData, "price", price);
    }

    if (minprice) {
      const priceFunc = () => {
        return filteredData?.filter((item) => {
          const itemPrice = parseFloat(item?.["price"]);
          const maxPrice = parseFloat(maxprice) || 1000000;
          const minPrice = parseFloat(minprice) || 0;
          return itemPrice < maxPrice && itemPrice > minPrice;
        });
      };

      filteredData = priceFunc();
      dispatch(setFiltering(minprice ? minprice : ""));
    }

    if (maxprice) {
      const priceFunc = () => {
        return filteredData?.filter((item) => {
          const itemPrice = parseFloat(item?.["price"]);
          const maxPrice = parseFloat(maxprice) || 0;
          const minPrice = parseFloat(minprice) || 0;
          // console.log("itemPrice:", itemPrice);
          // console.log("maxPrice:", maxPrice);
          // console.log("minPrice:", minPrice);
          // console.log(
          //   "Comparison result:",
          //   itemPrice < maxPrice && itemPrice > minPrice
          // );
          return itemPrice < maxPrice && itemPrice > minPrice;
        });
      };

      filteredData = priceFunc();
      dispatch(setFiltering(maxprice ? maxprice : ""));
    }

    dispatch(setCopyList(filteredData));
  };

  //search
  const rows = copyList.length > 0 ? copyList : data;
  const searchIn = ["id", "title", "price", "minprice", "maxprice"];

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div>
          <br />
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* search */}
            &nbsp; Search:&nbsp;
            <input
              type="search"
              name="search"
              id="search"
              value={searching}
              onInput={(e) => requestSearch(e.target.value)}
              style={{ fontSize: "1rem" }}
            />
            &nbsp; &nbsp;
            <FormControl sx={{ minWidth: 130 }}>
              <InputLabel
                id="demo-simple-select-autowidth-label"
                sx={{ fontSize: "0.6rem", fontWeight: "1000" }}
              >
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={category}
                onChange={(e) => requestCategory(e.target.value)}
                autoWidth
                label="category"
                sx={{
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {categoryList.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {searchIn.map((field) => (
              <div style={{ margin: "1rem" }} key={field}>
                <label
                  style={{
                    margin: "0.5rem",
                    display: field === "price" ? "none" : "block",
                  }}
                  htmlFor={field + "val"}
                >
                  {field}:
                </label>
                <input
                  type="search"
                  name={field + "val"}
                  id={field + "val"}
                  value={filter?.[field] || ""}
                  onInput={(e) =>
                    requestFilter({ ...filter, [field]: e.target.value })
                  }
                  style={{
                    fontSize: "1rem",
                    display: field === "price" ? "none" : "block",
                  }}
                />
              </div>
            ))}
          </div>

          {copyList?.length === 0 && searching && (
            <h1>No Similar Results Found</h1>
          )}
          {copyList?.length === 0 && filtering && (
            <h1>No Similar Results Found</h1>
          )}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
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
                    image={item?.image}
                    alt={item?.image}
                    sx={{ height: "400px", objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "left", mt: 3 }}
                    >
                      {item?.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "left" }}
                    >
                      USD: {item?.price}
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
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      navigate(`/viewproduct/${item?.id}`);
                    }}
                    fullWidth
                  >
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
              count={Math?.ceil(rows?.length / itemsPerPage)}
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
