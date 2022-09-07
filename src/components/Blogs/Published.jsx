import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentBlog } from "../../actions/blog";
import { connect } from "react-redux";
import propTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Published = ({ blog: { blog, loading }, currentBlog }) => {
  useEffect(() => {
    currentBlog();
  }, []);
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: 40, marginLeft: 40 }}>
      {blog?.length > 0 && !loading ? (
        <h6>Number of Blog Published {blog.length}</h6>
      ) : (
        <h6>No Blog Published</h6>
      )}
      <h7>Your Blogs</h7>
      <Grid container spacing={4}>
        {blog.map((x) => {
          const value = x?.difficulty;
          return (
            <Grid item xs={10} md={3}>
              <Card sx={{ maxWidth: 345 }} style={{ marginTop: 20 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={x?.mainImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {x?.experimentName}
                    </Typography>
                    <Typography gutterBottom variant="p" component="div">
                      {x?.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {x?.description}
                    </Typography>
                    <div style={{ width: 40, height: 40, marginTop: 20 }}>
                      <CircularProgressbar
                        value={value === undefined ? 0 : value}
                        maxValue={5}
                        text={`${value === undefined ? 0 : value}/5`}
                      />
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
Published.propTypes = {
  blog: propTypes.object.isRequired,
  // auth:propTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  blog: state.blogs,
});

export default connect(mapStateToProps, { currentBlog })(Published);
