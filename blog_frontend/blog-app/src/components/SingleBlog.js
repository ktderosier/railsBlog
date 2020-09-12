import React, {useState, useEffect} from "react";
import {getSingleBlog, editSingleBlog} from '../api';
import {useParams, useLocation} from "react-router-dom";
import { Form, FormGroup, Label, Input, FormText, Button } from 'react-bootstrap';



const SingleBlog = () => {
    const [blog, setBlog] = useState({});
    const[edit, setEdit] = useState({});
 
    const {id} = useParams();

    useEffect(()=>{
        getSingleBlog(id).then(data => {
            console.log('single blog', data);
            setBlog(data);
        })
    },[])
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
      <Form>
      <Form.Label>Title:</Form.Label>
      <Form.Group controlId="exampleForm.ControlTextarea1">
      <textarea name="description" defaultValue={blog.title} />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>Body:</Form.Label>
      <Form.Control as="textarea" rows="3">
      <textarea name="description" defaultValue={blog.body} />
      </Form.Control>
      </Form.Group>
      </Form>
      </div>

    </div>
  );
};

export default SingleBlog;