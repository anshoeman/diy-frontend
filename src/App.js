import './App.css';
import { useEffect } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import ButtonAppBar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/layout/Login';
import PrivateRoute from './Routes/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import  Published  from './components/Blogs/Published';
import { HomeScreen } from './components/Blogs/HomeScreen';
import PublishBlogs  from './components/Blogs/PublishBlogs';
import BlogById from './components/Blogs/BlogById';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => { 
    store.dispatch(loadUser())
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ButtonAppBar />
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/blog/:id' element={<BlogById/>}/>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/publishblogs" element={<PublishBlogs />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/published" element={<Published />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
