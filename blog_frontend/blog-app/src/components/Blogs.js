import React, { useState, useEffect } from "react";
import { getBlogs, deleteSingleBlog, createBlog } from "../api";
import { ListGroup, ListGroupItem } from "reactstrap";
import {
  Card,
  Button,
  CardDeck,
  CardColumns,
  CardGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);

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
            <Card bg="dark" text="white" style={{ width: "18rem", flex: 1 }}>
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

  return (
    <>
      <h1>Blogs</h1>
      <Link to="/api/blogs">
        <Button variant="success">Create new blog</Button>
      </Link>
      {mapBlogs()}

    </>
  );
};

export default Blogs;
