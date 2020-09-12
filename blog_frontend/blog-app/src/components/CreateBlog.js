import React, { useState, useEffect } from "react";
import { createBlog } from "../api";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";

const CreateBlog = () => {
  const [formData, setFormData] = useState({});
  const history = useHistory();

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
    const response = await createBlog(formData).catch((error) => {
      console.log(error);
    });
    history.push("/blogs");
    // setFormData({
    //   "title": " ",
    //   "body": " ",
    //   "author": " ",
    //   "date": " "
    // });
  
  };

  return (
    <>
      <h2>Create blog</h2>
      <Form onSubmit={submit}>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input type="text" name="title" onChange={updateData} />
        </FormGroup>
        <FormGroup>
          <Label for="body">Body</Label>
          <Input type="text" name="body" onChange={updateData} />
        </FormGroup>
        <FormGroup>
          <Label for="author">Author</Label>
          <Input type="text" name="author" onChange={updateData} />
        </FormGroup>
        <FormGroup>
          <Label for="body">Date</Label>
          <Input type="date" name="date" onChange={updateData} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    </>
  )
};

export default CreateBlog;
