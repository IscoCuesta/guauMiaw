import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import EventCard from "../components/EventCard";
import API from "../utils/API";
import { Header, Portada, InfoONG } from "../components/ORGpage";


class Detail extends Component {
  state = {
    book: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    // API.getBook(this.props.match.params.id)
    //   .then(res => this.setState({ book: res.data }))
    //   .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Header 
          nombre="NOMBRE ONG">
        </Header>

        <Row>
          <Col size="md-12">
            <Portada>
              <p>"ONG Information"</p>
            </Portada>
          </Col>  
        </Row>

        <InfoONG 
          descripcion="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
          mision="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
          vision="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
          objetivo="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries" 
          necesidades="ICONOS ICONOS ICONOS">
        </InfoONG>




        <hr></hr>
        <Row>
      
        <Col size="col-5 offset-1">
            <Link to="/Event/1">
              <EventCard
                  guessCard="1"
                  id="1"
                  key="1"
                  name='"Event"'
                  image="https://blogmedia.evbstatic.com/wp-content/uploads/wpmulti/sites/8/2018/01/15155312/iStock-667709450.jpg"
                  location="in your mind"
                  >
              </EventCard>
            </Link>
          </Col>
          <Col size="col-5 offset-1">
            <Link to="/Event/1">
              <EventCard
                  guessCard="2"
                  id="2"
                  key="2"
                  name='"Donation"'
                  image="https://www.csc.gov.sg/images/default-source/ethos-images/ethos-digital-issue-3/charity_754x556px.jpg?sfvrsn=c26d54c4_0"
                  location="in your mind"
                  />
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
