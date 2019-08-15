import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import EventCard from "../components/EventCard";
import API from "../utils/API";
import { Header, Portada, InfoONG, Footer } from "../components/ORGheader";
import firebase from '@firebase/app';
import '@firebase/storage';


class Detail extends Component {
  state = {
    orgId: null,
    orgDetails: {},
    orgLogoUrl: null,
    orgHeaderUrl: null,
    orgPosts: [],
    isOwner: false
  };

  componentDidMount() {
    this.setState({ 
      orgId: this.props.match.params.id
    } , () => {
      this.retrieveDetails();
      this.retrieveLogo();
      this.retrieveHeader();
      this.retrievePosts();
    });   
  }

  retrieveDetails = () => {
    API.getOrgDetails(this.state.orgId)
    .then(res =>
      this.setState({ 
        orgDetails: res.data 
      }, () => {
        firebase.auth().onAuthStateChanged(user => {
          if (user.uid === this.state.orgDetails.userId){
            this.setState({
              isOwner: true
            }, () => {
              console.log(this.state)
            })
          }
          else{
            console.log(this.state)
          }
        })  
      }))
    .catch(err => console.log(err));   
  }

  retrieveLogo = () => {
    const storage = firebase.storage();
    storage
      .ref(`/logos/${this.state.orgId}.jpg`)
      .getDownloadURL()
      .then( url => {
        this.setState({ 
          orgLogoUrl: url 
        }, () => {
          //console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  retrieveHeader = () => {
    const storage = firebase.storage();
    storage
      .ref(`/headers/${this.state.orgId}.jpg`)
      .getDownloadURL()
      .then( url => {
        this.setState({ 
          orgHeaderUrl: url 
        }, () => {
          //console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  retrievePosts = () => {
    API.getPosts({
      organization: this.state.orgId
    }).then(res => {
      this.setState({ 
        orgPosts: res.data 
      }, () => {
        console.log(this.state)
      })
    })  
  }

  render() {
    return (
      <Container fluid>
        <Header 
          nombre={this.state.orgDetails.nombre}
          logoUrl={this.state.orgLogoUrl}>
        </Header>
        <Row>
          <Col size="md-12">
            <Portada
            headerUrl={this.state.orgHeaderUrl}>
              <p>"ONG Information"</p>
            </Portada>
          </Col>  
        </Row>

        <hr></hr>

        <InfoONG 
          descripcion={this.state.orgDetails.descripcion}
          mision={this.state.orgDetails.mision}
          vision={this.state.orgDetails.vision}
          objetivo={this.state.orgDetails.objetivo}
          necesidades={this.state.orgDetails.necesidades}>
        </InfoONG>

          <hr></hr>
        <Row>
        {this.state.orgPosts.map(post => (
              <EventCard
                  guessCard="1"
                  id={post._id}
                  key={post._id}
                  nombre={post.nombre}
                  fecha={post.fechaInicial}
                  lugar={post.lugar}
                  imagen={post.imagen}
                  organization={post.organization}
                  page="ONG"
                >
              </EventCard>
        ))}
        </Row>
        <Footer
          direccion={this.state.orgDetails.direccion}
          telefono={this.state.orgDetails.telefono}
          email={this.state.orgDetails.email}
          paginaweb={this.state.orgDetails.paginaweb}>
        </Footer>
      </Container>
    );
  }
}

export default Detail;
