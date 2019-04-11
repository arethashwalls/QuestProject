// import axios from 'axios';
import { connect } from "react-redux";
import React, { Component } from "react";
import joint from "jointjs/index";
import ReactDOM from "react-dom";
import $ from "jquery";
import API from "../../utils/api";
import Container from "react-bootstrap/Container";
import SaveModal from "../SaveModal";
import DeleteModal from "../DeleteModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";
import "./joint.css";

//Link attributes
let questLink = new joint.dia.Link({


  attrs: {

    '.marker-source': {
      fill: 'none',
      stroke: 'none'

    },
    ".connection-wrap": {
      fill: "none"
    },

    '.connection': {
      stroke: '#0000ff',

      strokeWidth: 4,
      strokeDasharray: "0",
      fill: "none"
    },
    ".marker-target": {
      fill: "#0000ff",
      stroke: "#0000ff",
      d: "M 10 0 L 0 5 L 10 10 z"
    }
  }
});


let paperStyle = {
  width: '90%',
  height: '90%',
  overflow: 'scroll'
}



class Chart extends Component {
  constructor(props) {
    super(props);
    this.graph = new joint.dia.Graph();
  }

  state = {
    questID: "",
    title: "",
    adventures: [],
    isOpenSave: false,
    isOpenDelete: false,
    questIndex: ""
  };

  toggleSaveModal = () => {
    this.setState({
      isOpenSave: !this.state.isOpenSave
    });
  };

  toggleDeleteModal = () => {
    this.setState({
      isOpenDelete: !this.state.isOpenDelete
    });
  };

  //When the page loads
  componentDidMount() {
    //Creates the paper our quests will be contained in
    this.paper = new joint.dia.Paper({
      el: ReactDOM.findDOMNode(this.refs.placeholder),
      width: 1200,
      height: 1200,
      gridSize: 1,
      drawGrid: true,
      model: this.graph,
      background: {
        color: "#fefdd7"
      },
      defaultLink: questLink,

      


      validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {

        // Prevent linking from input ports.
        if (magnetS && magnetS.getAttribute("port-group") === "in")
          return false;
        // Prevent linking from output ports to input ports within one element.
        if (cellViewS === cellViewT) return false;
        // Prevent linking to input ports.
        return magnetT && magnetT.getAttribute("port-group") === "in";
      },

      validateMagnet: function(cellView, magnet) {
        // Note that this is the default behaviour. Just showing it here for reference.
        // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
        return magnet.getAttribute("magnet") !== "passive";
      }
    });


    //If you want to remove an element from the paper, simply double click.
    this.paper.on('element:pointerdblclick', function (elementView) {

      var currentElement = elementView.model;
      currentElement.remove();
    });

    //Our initial Quest Tree Starting point.
    let start = new joint.shapes.devs.Model({
      position: { x: 398, y: 83 },
      size: { width: 150, height: 90 },
      attrs: {
        rect: { fill: "orange", stroke: "none" },
        text: { text: "Start Campaign", fill: "white", "font-size": 15 }
      },

  

      outPorts: [''],

      ports: {
        groups: {
          out: {
            attrs: {
              ".port-body": {
                fill: "#E74C3C"
              }
            },
            position: "bottom"
          }
        }
      }
    });

    this.graph.addCell(start);
  }



  createNew = () => {
    window.location.reload();
  }

  //User no want the quest? They get rid of da quest
  deleteQuest = () => {
    API.deleteQuest(this.state.questID)
      .then(window.location.reload())
      .catch(err => console.log(err));
  };

  //Grab the list of adventures the user has saved to their account
  getAdventureList = user => {
    API.getAdventures(user)
      .then(res => {
        this.setState({ adventures: res.data });
      })
      .catch(err => console.log(err));
  };

  //Wraps the text so that it can stay contained in the cell. Otherwise, it just goes out without abandon
  sentenceWrapped = (sentence, lineSize, maxSize) => {
    var descriptionTrim = "";
    if (sentence.length + 3 > maxSize) {
      descriptionTrim = sentence.substring(0, maxSize - 3);
      descriptionTrim = descriptionTrim + "...";
    } else {
      descriptionTrim = sentence;
    }

    var splitSentence = descriptionTrim.match(
      new RegExp(".{1," + lineSize + "}", "g")
    );
    var sentenceWrapped = "";
    for (let i = 0; i < splitSentence.length; i++) {
      sentenceWrapped = sentenceWrapped + splitSentence[i] + "\n";
    }
    return sentenceWrapped;
  };

  //Create a quest with a title and text. Once it's formed, the user can position it anywhere on the graph
  addQuest = event => {
    event.preventDefault();
    let rectangle = new joint.shapes.devs.Model({
      position: { x: 20, y: 20 },
      size: { width: 230, height: 200 },
      attrs: {
        ".label": {
          text:

            this.sentenceWrapped($('#add-quest').val().trim(), 20, 30) + "\n" + this.sentenceWrapped($('#quest-description').val()
              .trim(), 30, 200),

          fontWeight: 'bold',
          fontSize: ''

        }
      },
      inPorts: [""],
      outPorts: ["success", "failure"],
      ports: {
        groups: {
          in: {
            attrs: {
              ".port-body": {
                fill: "#0000FF",
                magnet: "passive"
              }
            },
            position: "top"
          },
          out: {
            attrs: {
              ".port-body": {
                fill: "#E74C3C"
              }
            },
            position: "bottom"
          }
        }
      }
    });



    this.graph.addCell(rectangle);
    $("#add-quest").val("");
    $("#quest-description").val("");
  };

  //Saves the current incarnation of a quest in our database
  saveQuest = (title, userId) => {
    let graphJSON = this.graph.toJSON();
    this.setState({ title: title });
    if (this.state.questID === "") {
      API.saveQuest(this.state.title, graphJSON, userId)
        .then(res => {
          this.setState({ questID: res.data._id });
        })
        .catch(err => console.log(err));
    } else {
      API.updateQuest(graphJSON, this.state.questID, userId);
    }
  };

  //Grabs the quest from the database. Eventually we will try to pull up specific versions
  getQuest = (userId, index) => {
    API.getAdventures(userId)
      .then(res => {
        this.graph.fromJSON(JSON.parse(res.data[index].chart));
        this.setState({ questID: res.data[index]._id });
      })
      .catch(err => console.log(err));
  };

  handleOnChangeTitle = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //Make it WORK!
  render() {
    document.documentElement.setAttribute("data-theme", this.props.loggedInUserClass);
    return (
      <Container as="section">
        <Row className="mt-3 mb-4">
          <Col>

            <div id="divPaperWrapper" style={paperStyle}>
              <div id='paper' ref='placeholder' className='scroller' />
            </div>

          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <Button
              id='create-new-quest'
              type='button'
              onClick={this.createNew}
              className='mt-2'
              style={this.props.theme.buttons}
            >
              Create New Adventure
                </Button>
            <Form>
              <Form.Group>
                <Form.Label>Quest name: </Form.Label>

                <Form.Control id='add-quest' type='text' required />
                <Form.Label className='mt-1'>Quest description: </Form.Label>
                <Form.Control id='quest-description' type='text' required />

                <Button
                  id="add-quest"
                  type="submit"
                  onClick={this.addQuest}
                  className='mt-2'
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>

          <Col xs={12} lg={6} className='text-lg-right'>
            <br className='d-none d-lg-block' />
            <Button
              id='save-btn'
              onClick={() => { this.toggleSaveModal() }}
              className='mb-1 mr-1'
            >
              Save New
            </Button>
            <Button
              id='delete-btn'
              onClick={() => { this.toggleDeleteModal() }}
              className='mb-1 mr-1'
            >
              Delete Adventure
            </Button>
            <br className='d-none d-lg-block' />

            {(this.state.adventures)
              ? <NavDropdown title="My Quests" id="collasible-nav-dropdown" onClick={() => this.getAdventureList(this.props.loggedInUserId)}>

                {this.state.adventures.map((quest, index) => {
                  return (
                    <NavDropdown.Item
                      href=""
                      key={index}
                      value={index}
                      onClick={() =>
                        this.getQuest(this.props.loggedInUserId, index)
                      }
                    >
                      {quest.title}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            ) : (
              ""
            )}

            <SaveModal
              className="modal"
              show={this.state.isOpenSave}
              close={this.toggleSaveModal}
              saveQuest={() =>
                this.saveQuest(this.state.title, this.props.loggedInUserId)
              }
            >
              <Form.Label>Name Your Adventure: </Form.Label>

              <Form.Control id='add-title' type='text' name='title' value={this.state.title} onChange={this.handleOnChangeTitle} required />

            </SaveModal>

            <DeleteModal
              className="modal"
              show={this.state.isOpenDelete}
              close={this.toggleDeleteModal}
              deleteQuest={() => this.deleteQuest()}
            />
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
