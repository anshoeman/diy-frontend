import React,{useState,useEffect} from 'react'
import axios from 'axios';
export const Heading = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchBlogs = async () => {
        const response = await axios.get('https://diy-blog-backend.herokuapp.com/publishBlog');
        console.log(response.data)
        setBlogs(response.data);
        setLoading(false);
    }
    useEffect(() => {
        fetchBlogs();
    }, [])
  return (
    <div style={{textAlign:'center'}}>
        <h1>Total Number Of Blogs Published {blogs?.length}</h1>
    </div>
  )
}
