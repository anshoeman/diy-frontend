import React, { useEffect } from "react";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { getBlogById } from "../../actions/blog";
import { useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  CardActions,
  Button,
} from "@mui/material";

import "react-circular-progressbar/dist/styles.css";
const labels = {
  1: "Useless+",
  2: "Poor+",
  3: "Ok+",
  4: "Good+",
  5: "Excellent+",
};
const BlogById = ({ getBlogById, blog: { blogs } }) => {
  const { id } = useParams();
  useEffect(() => {
    getBlogById(id);
  }, [getBlogById, id]);
  const value = blogs?.difficulty;
  return (
    <div>
      <div style={{ padding: 20, display: "flex" }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={blogs?.mainImage}
              alt="green iguana"
            />
            <CardContent>
              <h5>You are reading a blog on {blogs?.subject}</h5>
              <div style={{ display: "flex" }}>
                <h8 style={{ marginTop: 10 }}>Author {blogs?.user?.name}</h8>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: 20,
                    marginTop: 5,
                  }}
                >
                  <CircularProgressbar
                    value={value === undefined ? 0 : value}
                    maxValue={5}
                    text={`${value === undefined ? 0 : value}/5`}
                  />
                </div>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
        <div style={{ marginLeft: 30 }}>
          <h4 style={{ marginLeft: 20 }}>Instructions for the experiment</h4>
          {blogs?.instructions?.map((blog) => {
            return (
              <Card sx={{ maxWidth: 345,margin:4}}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={blog?.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Step Number {blog?.stepNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                   {blog?.stepDescription}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <React.Fragment>
          <CardContent>
            <h4>Experiment Name</h4>
            <p>{blogs?.experimentName}</p>
          </CardContent>
          <CardContent>
            <h4>Experiment Description</h4>
            <p>{blogs?.description}</p>
          </CardContent>
          <CardContent>
            <h4>MaterialList</h4>
            {blogs?.materialList?.map((x) => {
              return (
                <div>
                  <p>
                    <b>Name</b> {x?.Name}
                  </p>
                  <p>
                    <b>Quantity</b> {x?.quantity}
                  </p>
                </div>
              );
            })}
          </CardContent>
          <CardContent>
            <h4>Safety Precautions</h4>
            <p>{blogs?.safetyPrecautions}</p>
          </CardContent>
        </React.Fragment>
      </div>
    </div>
  );
};
BlogById.propTypes = {
  getBlogById: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  blog: state.blogs,
});
export default connect(mapStateToProps, { getBlogById })(BlogById);
