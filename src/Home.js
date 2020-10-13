import { render } from '@testing-library/react';
import React from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardFooter
} from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';

function Home(){

  let [movies, setMovies] = React.useState([])

  React.useEffect(() => {
    axios({
      url: "https://pacific-mountain-56035.herokuapp.com/movie/?page=1&limit=10",
      method: "GET"
    })
    .then(res => {
      if(res.status === 200){
        console.log(res.data, "DATA")
        setMovies(res.data)
      }
    })
    .catch(err => {
      Swal.fire({
        icon: "error",
        text: err
      })
    })
  }, [])

  return(
    <Container>
      <Row>
        {movies.map(movie => {
          return(
            <Col md="4">
              <Card>
                <CardHeader>{movie.title}</CardHeader>
                <CardImg top width="100%" src={movie.poster} alt="Card image cap" />
                <CardBody>{movie.synopsis}</CardBody>
                <CardFooter>
                  <a href={movie.trailer} target="_blank" className="btn btn-link">View Trailer</a>
                </CardFooter>
              </Card>
            </Col>
          )
        })
          
        }
      </Row>
    </Container>
  )
}

export default Home;