import React, { useState, useEffect } from "react";
import { getBlogs, deleteSingleBlog, createBlog } from "../api";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({});
  const history = useHistory();

  const updateData = (e) => {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;
    let obj = { ...formData };
    obj[key] = value;
    setFormData(obj);
  };

  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data);
    });
  }, []);

  const mapBlogs = () => {
    console.log("blogs", blogs);
    return blogs.map((blog, index) => {
      return (
        <div>
          <Card bg="dark" text="white" style={{ width: "18rem" }}>
            <Card.Header key={index}>
              <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>{blog.body}</p>
                <footer className="blockquote-footer">
                  {blog.author} <cite title="Source Title">{blog.date}</cite>
                </footer>
              </blockquote>
            </Card.Body>
            <Card.Footer className="text-muted">
              <Button
                variant="danger"
                onClick={() => deleteSingleBlog(blog.id)}
              >
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </div>
      );
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log("form data", formData);
    const response = await createBlog(formData).catch((error) => {
      console.log(error);
    });
    history.push("/blogs");
    setFormData({
      "title": " ",
      "body": " ",
      "author": " ",
      "date": " "
    });
    window.location.reload(true);
  };

  return (
    <>
      <h1>Blog page</h1>
      <ListGroup flush>{mapBlogs()}</ListGroup>

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
  );
};

export default Blogs;
