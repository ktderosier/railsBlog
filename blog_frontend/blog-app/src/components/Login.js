import React, {useState} from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import {useHistory} from 'react-router-dom';
import {loginApi} from '../api';

const Login = () => {
    const [formData, setFormData] = useState({});
    const history = useHistory();

    const updateData = (e) =>{
        const key = e.currentTarget.name;
        console.log("key", key)
        console.log("form data", formData)

        const value = e.currentTarget.value;
        let obj = {...formData}
        obj[key] = value;
        console.log("obj", obj)
        setFormData(obj);
    }


const submit = async (e) => {
    e.preventDefault();

    const response = await loginApi(formData).catch((error) =>{
        console.log(error);
    })
    console.log('response', response);
    window.localStorage.setItem('user', JSON.stringify(response.user));
    window.localStorage.setItem('token', response.user.token);
    history.push('/');
}

  return (
    <div>
      <h1>login page</h1>

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
    </div>
  );
};

export default Login;
