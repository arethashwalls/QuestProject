// import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import joint from 'jointjs/index';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import API from '../../utils/api';
import Container from 'react-bootstrap/Container';
import SaveModal from '../SaveModal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './style.css';

let uml = joint.shapes.uml;

class Chart extends Component {
  constructor(props) {
    super(props);
    this.graph = new joint.dia.Graph();
  }

  state = {
    questID: '',
    title: '',
    adventures: [],
    isOpen: false
  };

  toggleModal = () => {
    console.log("")
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  //When the page loads
  componentDidMount() {
    this.props.setTheme(this.props.loggedInUserClass);
    //Creates the paper our quests will be contained in
    this.paper = new joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.refs.placeholder),
      width: 930,
      height: 1500,
      gridSize: 1,
      drawGrid: true,
      model: this.graph,
      background: {
        color: 'rgba(0, 255, 0, 0.3)'
      }
    });

    //Our initial Quest Tree Starting point.
    let start = new joint.shapes.basic.Rect({
      position: { x: 398, y: 83 },
      size: { width: 150, height: 90 },
      attrs: {
        rect: { fill: 'orange' },
        text: { text: 'Start Campaign', fill: 'white' }
      }
    });

    this.graph.addCell(start);
  }

  getAdventureList = user => {

    API.getAdventures(user)
      .then(res => {
        this.setState({ adventures: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }



  //Wraps the text so that it can stay contained in the cell. Otherwise, it just goes out without abandon
  sentenceWrapped = (sentence, lineSize, maxSize) => {
    var descriptionTrim = '';
    if (sentence.length + 3 > maxSize) {
      descriptionTrim = sentence.substring(0, maxSize - 3);
      descriptionTrim = descriptionTrim + '...';
    } else {
      descriptionTrim = sentence;
    }

    var splitSentence = descriptionTrim.match(
      new RegExp('.{1,' + lineSize + '}', 'g')
    );
    var sentenceWrapped = '';
    for (let i = 0; i < splitSentence.length; i++) {
      sentenceWrapped = sentenceWrapped + splitSentence[i] + '\n';
    }
    return sentenceWrapped;
  };

  //Adds the link between quest elements. User will currently have to manually link the cells after adding it
  addLink = () => {
    let link = new joint.dia.Link({
      source: { x: 75, y: 175 },
      target: { x: 150, y: 200 }
    });
    this.graph.addCell(link);
  };

  //Create a quest with a title and text. Once it's formed, the user can position it anywhere on the graph
  addQuest = event => {
    event.preventDefault();

    let rectangle = new uml.Class({
      position: { x: 150, y: 300 },
      name: this.sentenceWrapped(
        $('#add-quest')
          .val()
          .trim(),
        20,
        30
      ),
      attributes: [
        this.sentenceWrapped(
          $('#quest-description')
            .val()
            .trim(),
          40,
          500
        )
      ],
      size: { width: 250, height: 200 },
      attrs: {
        '.uml-class-name-rect': {
          fill: '#feb662',
          stroke: '#ffffff',
          'stroke-width': 0.5
        },
        '.uml-class-attrs-rect': {
          fill: '#fdc886',
          stroke: '#fff',
          'stroke-width': 0.5
        },
        '.uml-class-methods-rect': {
          fill: '#fdc886',
          stroke: '#fff',
          'stroke-width': 0.5
        }
      }
    });

    //Translate it so the quest element isn't on top of the starter element
    rectangle.translate(100);
    this.graph.addCell(rectangle);
    $('#add-quest').val('');
    $('#quest-description').val('');
  };

  //Saves the current incarnation of a quest in our database
  saveQuest = (title, userId) => {
    let graphJSON = this.graph.toJSON();
    this.setState({title: title})
    if (this.state.questID === '') {
      API.saveQuest(this.state.title, graphJSON, userId)
        .then(res => {
          this.setState({ questID: res.data._id });
        })
        .catch(err => console.log(err));
    } /*else {
      API.updateQuest(graphJSON, this.state.questID);
    }*/
  };

  //Grabs the quest from the database. Eventually we will try to pull up specific versions
  getQuest = userId => {
    API.getQuest(userId)
      .then(res => {
        debugger;
        console.log(res.data);
        console.log(this.graph.fromJSON(JSON.parse(res.data[0].chart)));
      })
      .catch(err => console.log(err));
  };

  handleOnChange = event =>{
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  //Make it WORK!
  render() {
    return (
      <Container as='section'>
        <Row className='mt-3 mb-4'>
          <Col>
            <div id='paper' ref='placeholder' className='scroller' />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <Form>
              <Form.Group>
                <Form.Label>Quest name: </Form.Label>
                <Form.Control id='add-quest' type='text' />
                <Form.Label className='mt-1'>Quest description: </Form.Label>
                <Form.Control id='quest-description' type='text' />
                <Button
                  id='add-quest'
                  type='submit'
                  onClick={this.addQuest}
                  className='mt-2'
                  style={this.props.theme.buttons}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
          <Col xs={12} lg={6} className='text-lg-right'>
            <Button
              id='add-link'
              onClick={this.addLink}
              className='mb-1 mr-1'
              style={this.props.theme.buttons}
            >
              Add Link
            </Button>
            <br className='d-none d-lg-block' />
            <Button
              id='save-btn'
              onClick={() => { this.toggleModal(); this.getAdventureList(this.props.loggedInUserId); }}
              className='mb-1 mr-1'
              style={this.props.theme.buttons}
            >
              Save New
            </Button>
            <br className='d-none d-lg-block' />
            <Button
              id='retrieve-btn'
              onClick={() => this.getQuest(this.props.loggedInUserId)}
              style={this.props.theme.buttons}
            >
              Retrieve Quest
            </Button>
            <SaveModal
              className="modal"
              show={this.state.isOpen}
              close={this.toggleModal}
              saveQuest={()=>this.saveQuest(this.state.title, this.props.loggedInUserId)}>
              <Form.Label>Name Your Adventure: </Form.Label>
              <Form.Control id='add-title' type='text' name='title' value={this.state.title} onChange ={this.handleOnChange}/>
            </SaveModal>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    loggedInUserId: state.auth.user.id,
    loggedInUserClass: state.auth.user.class
  };
};
export default connect(
  mapStateToProps,
  null
)(Chart);
