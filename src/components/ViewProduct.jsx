import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../store/slice/ViewProductSlice";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { status, product } = useSelector((state) => state.viewProduct);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (!status || !product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>View Product Details</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:"3%"
        }}
      >
        <Card sx={{ maxWidth: "600px", m: 1, p: 5, marginBottom: "30px", padding:"2rem" }}>
          <CardActionArea sx={{padding:"2rem"}}>
            <CardMedia
              component="img"
              image={product?.image}
              alt={product?.image}
              sx={{ height: "400px", objectFit: "contain", marginTop:"2rem",marginBottom:"2rem" }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "left", mt: 3 }}
              >
                {product?.title}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ textAlign: "left" }}
              >
                USD: {product?.price}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "left", marginTop:"0.5rem" }}
              >
                {product?.description}
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "left", marginTop:"0.5rem" }}
              >
                Rating: {product?.rating?.rate} (Reviews: {product?.rating?.count})
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: "left", marginTop:"0.5rem" }}
              >
                #{product?.category}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></CardActions>
        </Card>
      </div>
    </div>
  );
};

export default ViewProduct;
