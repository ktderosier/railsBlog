import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { signupApi, setToken } from "../api";

const SignupPage = () => {
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

    const response = await signupApi(formData).catch((error) => {
      console.log(error);
    });
    history.push("/login");
  };

  return (
    <Container>
      <Row>
        <Col>
        <h1>Create a new account</h1>
          <Form onSubmit={submit}>
            <FormGroup>
              <Label for="name">Username</Label>
              <Input type="text" name="name" onChange={updateData} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" onChange={updateData} />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>

    </Container>
  );
};

export default SignupPage;
