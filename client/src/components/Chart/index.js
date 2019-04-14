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
import Image from 'react-bootstrap/Image';
import "./style.css";
import "./joint.css";

//Image imports:
import bard from '../../images/bard.png'
import mage from '../../images/mage.png';
import warrior from '../../images/warrior.png';
import cleric from '../../images/cleric.png';

const pics = {
  bard,
  mage,
  warrior,
  cleric
}

//Link attributes
let questLink = new joint.dia.Link({
  attrs: {
    ".marker-source": {
      fill: "none",
      stroke: "none"
    },
    ".connection-wrap": {
      fill: "none"
    },

    ".connection": {
      stroke: "#0000ff",

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

//Sets the container for the paper to allow for a large, contained, scrollable workspace.
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

  //Chart component state
  state = {
    questID: "",
    title: "",
    adventures: [],
    isOpenSave: false,
    isOpenDelete: false,
    questIndex: ""
  };

  //To help trigger the Save modal
  toggleSaveModal = () => {
    this.setState({
      isOpenSave: !this.state.isOpenSave
    });
  };

  //To help trigger the delete modal
  toggleDeleteModal = () => {
    this.setState({
      isOpenDelete: !this.state.isOpenDelete
    });
  };

  getAdventureList = user => {

    API.getAdventures(user)
      .then(res => {
        this.setState({ adventures: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }

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
        color: "#efd5bd"
      },
      defaultLink: questLink,

      validateConnection: function(
        cellViewS,
        magnetS,
        cellViewT,
        magnetT,
        end,
        linkView
      ) {
        // Prevent linking from input ports.
        if (magnetS && magnetS.getAttribute("port-group") === "in")
          return false;
        // Prevent linking from output ports to input ports within one element.
        if (cellViewS === cellViewT) return false;
        // Prevent linking to input ports.
        return magnetT && magnetT.getAttribute("port-group") === "in";
      },


      validateMagnet: function (cellView, magnet) {
        // Disable linking interaction for magnets marked as passive.
        // We don't want in ports to try and link towards other elements.
        return magnet.getAttribute('magnet') !== 'passive';

      }
    });

    //If you want to remove an element from the paper, simply double click.

    this.paper.on('element:pointerdblclick', function (elementView) {
      let currentElement = elementView.model;
      currentElement.remove();
    });

    //Our initial Quest Tree Starting point.
    let start = new joint.shapes.devs.Model({
      position: { x: 398, y: 83 },
      size: { width: 150, height: 90 },
      attrs: {
        rect: { fill: "orange", stroke: "none", rx: "10px", ry: "10px" },
        text: { text: "Start Campaign", fill: "black", "font-size": 15 }
      },

      outPorts: [""],

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

  //If the user wants to start a fresh chart, simply reload the page
  createNew = () => {
    window.location.reload();
  };

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
  addQuest = e => {
    e.preventDefault();
    let rectangle = new joint.shapes.devs.Model({
      position: { x: 20, y: 20 },
      size: { width: 230, height: 200 },
      attrs: {
        ".label": {
          text:
            this.sentenceWrapped(
              $("#add-quest")
                .val()
                .trim(),
              20,
              30
            ) +
            "\n" +
            this.sentenceWrapped(
              $("#quest-description")
                .val()
                .trim(),
              30,
              200
            )
        },
        rect: { fill: "orange", rx: "10px", ry: "10px" }
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

  //Saves the current incarnation of a quest in our database. If there is no quest with a "quest ID", we insert a whole new document,
  //otherwise, we update the designated document
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

  //Grabs the user input for creating a title
  handleOnChangeTitle = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //Grabs the quest the user wants to bring up
  handleOnChangeDropdown = event => {
    this.setState({title: event.target.value});
  }

  hideInstructions = () => document.querySelector('.instruction-box').classList.add('d-none');

  //Make it WORK!
  render() {
    document.documentElement.setAttribute(
      "data-theme",
      this.props.loggedInUserClass
    );
    return (
      <Container as="section">
        <Row className="mt-3 mb-4">
          <Col xs={12} lg={3}>
            <Button
              id="create-new-quest"
              type="button"
              onClick={this.createNew}
              className="mt-2"
            >
              Create New Adventure
            </Button>
            <Form onSubmit={this.addQuest} >
              <Form.Group>
                <Form.Label>Quest name: </Form.Label>

                <Form.Control id='add-quest' type='text' required />
                <Form.Label className='mt-1'>Quest description: </Form.Label>
                <Form.Control id='quest-description' type='text' required />

                <Button
                  id="add-quest"
                  type="submit"
                  className="mt-2"
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
            {this.state.questID !== "" ? (
              <Button
                id="save-btn"
                onClick={() => {
                  this.saveQuest(this.state.title, this.props.loggedInUserId);
                }}
                className="mb-1 mr-1"
              >
                Save Adventure
              </Button>
            ) : (
              <Button
                id="save-btn"
                onClick={() => {
                  this.toggleSaveModal();
                }}
                className="mb-1 mr-1"
              >
                Save Adventure
              </Button>
            )}

            {this.state.questID && (
              <Button
                id="delete-btn"
                onClick={() => {
                  this.toggleDeleteModal();
                }}
                className="mb-1 mr-1"
              >
                Delete Adventure
              </Button>
            )}

            <br className="d-none d-lg-block" />


            {(this.state.adventures)
              && <NavDropdown title="My Quests" id="collapsible-nav-dropdown" onClick={() => this.getAdventureList(this.props.loggedInUserId)}>

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

            }

            <SaveModal
              className="modal"
              show={this.state.isOpenSave}
              close={this.toggleSaveModal}
              saveQuest={() =>
                this.saveQuest(this.state.title, this.props.loggedInUserId)
              }
            >
              <Form.Label>Name Your Adventure: </Form.Label>
              <Form.Control
                id="add-title"
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleOnChangeTitle}
                required
              />

            </SaveModal>

            <DeleteModal
              className="modal"
              show={this.state.isOpenDelete}
              close={this.toggleDeleteModal}
              deleteQuest={() => this.deleteQuest()}
            />
          </Col>

          <Col xs={12} lg={9}>
            <div id="divPaperWrapper" style={paperStyle}>
              <div id="paper" ref="placeholder" className="scroller" />
            </div>
          </Col>
        </Row>
        <div className='chart-instructions'>
          <div className='instruction-box' onClick={this.hideInstructions}>
                    <p className='instruction-text'>
                      Welcome to your quest!
                      <br /><br />
                      To add a new quest to your current adventure, enter the name and description of your quest in the scroll to the left.
                      <br /><br />
                      To save your current adventure, click “Save Adventure”.
                      <br /><br />
                      To start a new adventure, click “Start New Adventure.”
                      <br /><br />
                      To pull up a previous adventure, click it’s name under My Quests.
                    </p>
                    <p className="text-right dismiss-text">Click to dismiss.</p>
                  </div>
          <Image className='charapic-chart' src={pics[this.props.loggedInUserClass.toLowerCase()]}/>
        </div>
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
