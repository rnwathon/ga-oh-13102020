import React from 'react';
import axios from 'axios';
import {
  Label,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from 'reactstrap';
import Swal from 'sweetalert2';

function Login(props){

  let [username, setUsername] = React.useState("")
  let [password, setPassword] = React.useState("")

  const loginHandler = async () => {
    // Axios Return Promise

    // Versi Promise
    axios({
      // End Point
      url: "https://pacific-mountain-56035.herokuapp.com/login",
      // Method
      method: "POST",
      // Body
      data: {
        username: username,
        password: password
      }
    })
    .then((res) => {
      if(res.status === 200){
        const token = res.data.access_token
        // GET USER CREDENTIALS
        axios({
          url: "https://pacific-mountain-56035.herokuapp.com/user/find",
          method: "GET",
          // Ini Pake Headers untuk access TOKEN
          headers: {
            access_token: res.data.access_token
          }
        })
        .then((res) => {
           // Save Token ke localStorage
          localStorage.setItem("token", token)
          localStorage.setItem("user", JSON.stringify(res.data))

          // Kasih User pop up feedback
          Swal.fire({
            icon: "success",
            text: "Login Berhasil"
          })
          // Redirect user ke Home
          props.history.replace("/")
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: err
          })
        })
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        text: err
      })
    })

    // === VERSI ASYNC AWAIT === //
    // try {
    //   let res1 =  await axios({
    //     // End Point
    //     url: "https://pacific-mountain-56035.herokuapp.com/login",
    //     // Method
    //     method: "POST",
    //     // Body
    //     data: {
    //       username: username,
    //       password: password
    //     }
    //   })
    //   let res2 =  await axios({
    //     url: "https://pacific-mountain-56035.herokuapp.com/user/find",
    //     method: "GET",
    //     // Ini Pake Headers untuk access TOKEN
    //     headers: {
    //       access_token: res1.data.access_token
    //     }
    //   })
    //   // Save Token ke localStorage
    //   localStorage.setItem("token", res1.data.access_token)
    //   localStorage.setItem("user", JSON.stringify(res2.data))

    //   // Kasih User pop up feedback
    //   Swal.fire({
    //   icon: "success",
    //   text: "Login Berhasil"
    //   })
    //   // Redirect user ke Home
    //   props.history.replace("/")
    // } catch (err) {
    //   Swal.fire({
    //     icon: "error",
    //     text: err
    //   })
    // }
    
  }

  return (
    <div className="App">
     <Container>
       <Row>
         <Col md={{offset: 4, size: 4}}>
          <Card>
            <CardHeader>Login</CardHeader>
            <CardBody>
              <Label for="username">Username</Label>
              <Input id="username" type="text" value={username} onChange={e => setUsername(e.target.value) }/>
              <Label for="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value) }/>
              <Button color="primary" block className="mt-2" onClick={loginHandler}>Login</Button>
            </CardBody>
          </Card>
         </Col>
       </Row>
     </Container>
    </div>
  )
}

export default Login;