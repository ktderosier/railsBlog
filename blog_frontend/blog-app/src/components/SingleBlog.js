import React, { useState, useEffect } from "react";
import { getSingleBlog, editSingleBlog } from "../api";
import { useParams, useLocation } from "react-router-dom";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SingleBlog = () => {
  const [blog, setBlog] = useState({});
  const [formData, setFormData] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getSingleBlog(id).then((data) => {
      console.log("single blog", data);
      setBlog(data);
    });
  }, []);

  const updateData = (e) => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    let obj = { ...formData };
    obj[key] = value;
    setFormData(obj);
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    const response = await editSingleBlog(id, formData).catch((error) => {
      console.log(error);
    });
    history.push("/blogs");
    setFormData({
      title: " ",
      body: " ",
      author: " ",
      date: " ",
    });
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <Form onSubmit={submit}>
          <Form.Label>Title:</Form.Label>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <textarea name="title" defaultValue={blog.title} onChange={updateData}/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Body:</Form.Label>
            <textarea name="body" defaultValue={blog.body} onChange={updateData} />
          </Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <textarea name="author" defaultValue={blog.author} onChange={updateData} />
          </Form.Group>
          <Form.Label>Date:</Form.Label>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <textarea name="date" defaultValue={blog.date} onChange={updateData} />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default SingleBlog;
