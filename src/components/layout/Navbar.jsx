import * as React from 'react';
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import { logout } from '../../actions/auth';
import {useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';;

function ButtonAppBar({auth:{isAuthenticated,loading},logout}) {
    const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{backgroundColor:'#800000'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Science DIY Blog
          </Typography>
          {isAuthenticated?<Button color="inherit" onClick={()=>navigate('/dashboard')}>Dashboard</Button>:<></>}
          <Button color="inherit" onClick={()=>navigate('/')}>Blogs</Button>
          {!loading && isAuthenticated?<Button color="inherit" onClick={logout}>Logout</Button>:<Button color="inherit" onClick={()=>navigate('/login')}>Login</Button> }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

ButtonAppBar.propTypes = {
    logout:propTypes.func.isRequired,
    auth:propTypes.object.isRequired,
  }
  const mapStateToProps = state=>({
    auth:state.auth
  })

  export default connect(mapStateToProps,{logout})(ButtonAppBar)