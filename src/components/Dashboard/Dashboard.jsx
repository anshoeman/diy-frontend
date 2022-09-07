import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../actions/auth';
import store from '../../store';
const Dashboard = ({ auth: { user,loading } ,blog:{blog}}) => { 
    const navigate = useNavigate();
    useEffect(()=>{
      store.dispatch(loadUser());
    },[])
    return (
        <Card sx={{ maxWidth: 385 }} style={{margin:50,padding:36}}>
          <CardMedia
            component="img"
            height="180"
            image={user?.avatar}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" style={{fontWeight:'bolder'}}>
              Welcome {user && user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
             Let's create blog together
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={()=>navigate('/publishblogs')}>Publish a DIY Blog</Button>
            <Button onClick={()=>navigate('/published')}>Check Published Blog</Button>
          </CardActions>
      </Card>
    )
}
Dashboard.propTypes = {
    auth: propTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    blog:state.blogs
})
export default connect(mapStateToProps)(Dashboard)
