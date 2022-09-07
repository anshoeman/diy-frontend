/*Create actions for getting my blogs*/
import axios from 'axios'
import { GET_BLOG, GET_BLOGS } from './types'

/*get my profile*/
export const currentBlog = () => async dispatch => {
    try {
        const res = await axios.get('https://diy-blog-backend.herokuapp.com/publishblog/me');
        console.log(res.data);
        dispatch({
            type: GET_BLOG,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}

/*Publish Blogs using post api*/

export const postBlog = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('https://diy-blog-backend.herokuapp.com/publishblog', formData, config);
        dispatch({
            type: GET_BLOG,
            payload: res.data
        })
    } catch (error) {
        console.log(error);
    }
}
/*get blog by id*/
export const getBlogById = blogId =>async dispatch=>{
    try {
        const res = await axios.get(`https://diy-blog-backend.herokuapp.com/publishblog/${blogId}`);
        dispatch({
            type:GET_BLOGS,
            payload:res.data
        })
    } catch (error) {
        console.log(error);
    }
}

