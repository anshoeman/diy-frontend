import React, { useEffect, useState } from "react";
import axios from "axios";
import { Provider, ClapButton, LikeButton } from "@lyket/react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid, Button } from "@mui/material";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export const HomeScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const fetchBlogs = async () => {
    const response = await axios.get("https://diy-blog-backend.herokuapp.com/publishBlog");
    console.log(response.data);
    setBlogs(response.data);
    setLoading(false);
  };
  const countViews = () => {
    setViews(views + 1);
    console.log(views);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <Grid container spacing={4}>
      {blogs?.map((blog) => {
        const value = blog?.difficulty;
        const url = `https://diy-frontend.vercel.app/blog/${blog?._id}`;
        return (
          <Grid item xs={10} md={3}>
            <Card
              sx={{ maxWidth: 345 }}
              style={{ marginTop: 20, marginLeft: 10 }}
            >
              <CardHeader
                avatar={<Avatar alt="Remy Sharp" src={blog?.user?.avatar} />}
                title={blog?.subject}
                subheader={blog?.experimentName}
              />
              <CardMedia component="img" height="194" image={blog?.mainImage} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Author {blog?.user?.name}
                </Typography>
              </CardContent>
              <Button
                style={{ marginLeft: 10 }}
                onClick={() => {
                  countViews();
                  navigate(`/blog/${blog?._id}`);
                }}
              >
                Read Blog
              </Button>
              <div style={{ width: 40, height: 40, marginLeft: 15 }}>
                <CircularProgressbar
                  value={value === undefined ? 0 : value}
                  maxValue={5}
                  text={`${value === undefined ? 0 : value}/5`}
                />
              </div>

              <CardActions disableSpacing>
                <Provider
                  apiKey="pt_690bd04337cc8ea156fcba0ccb67cf"
                  theme={{
                    colors: {
                      background: "#b8fff3",
                      text: "violet",
                      primary: "rgba(255, 224, 138, 0.4)",
                    },
                  }}
                >
                  <ClapButton namespace="my-blog-post" id={blog?._id} />
                </Provider>
                {/* <IconButton aria-label="share" style={{marginLeft:19}}>
                                    <ShareIcon />
                                    <FacebookShareCount/>
                                </IconButton> */}
                <div style={{ display: "flex", marginLeft: 150 }}>
                  <EmailShareButton url={url}>
                    <EmailIcon round={true} size={32} />
                  </EmailShareButton>
                  <WhatsappShareButton url={url}>
                    <WhatsappIcon
                      round={true}
                      size={32}
                      style={{ marginLeft: 8 }}
                    />
                  </WhatsappShareButton>
                </div>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
