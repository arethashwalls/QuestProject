import React, { Component } from "react";
import joint from 'jointjs/index';
import ReactDOM from 'react-dom';
import $ from "jquery";
import API from "../../utils/api";
import "./style.css";

let uml = joint.shapes.uml;

class Chart extends Component {
    constructor(props) {
        super(props);
        this.graph = new joint.dia.Graph();
    }

    componentDidMount() {

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

        let start = new joint.shapes.basic.Rect({
            position: { x: 398, y: 83 },
            size: { width: 150, height: 90 },
            attrs: { rect: { fill: 'orange' }, text: { text: 'Start Campaign', fill: 'white' } }

        });

        this.graph.addCell(start);
    };

    sentenceWrapped = (sentence, lineSize, maxSize) => {
        var descriptionTrim = "";
        if (sentence.length + 3 > maxSize) {
            descriptionTrim = sentence.substring(0, maxSize - 3);
            descriptionTrim = descriptionTrim + '...';
        }
        else {
            descriptionTrim = sentence
        }

        var splitSentence = descriptionTrim.match(new RegExp('.{1,' + lineSize + '}', 'g'));
        var sentenceWrapped = "";
        for (let i = 0; i < splitSentence.length; i++) {
            sentenceWrapped = sentenceWrapped + splitSentence[i] + '\n';
        }
        return sentenceWrapped;
    }

    addLink = () => {
        let link = new joint.dia.Link({
            source: { x: 75, y: 175 },
            target: { x: 150, y: 200 }
        });
        this.graph.addCell(link);
    };

    addQuest = (event) => {
        event.preventDefault();

        let rectangle = new uml.Class({
            position: { x: 150, y: 300 },
            name: this.sentenceWrapped($("#add-quest").val().trim(), 10, 1000),
            attributes: [this.sentenceWrapped($("#quest-description").val().trim(), 40, 200)],
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

        rectangle.translate(100);
        this.graph.addCell(rectangle);
        $("#add-quest").val("");
        $("#quest-description").val("")
    }

    saveQuest = () => {
        let graphJSON = this.graph.toJSON();
        API.saveQuest(graphJSON)
            .then(res => res.json("success"))
            .catch(err => console.log(err));
    }

    getQuest = () => {
        
        API.getQuest()
        .then(res =>console.log(this.graph.fromJSON(JSON.parse(res.data[0].chart))))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <section id="app" className="container-fluid">
                <div className="container scroller">
                    <div id="paper" ref="placeholder" className="scroller container"></div>
                </div>

                <div id="form">
                    <form>
                        Quest Name: <input type="text" name="add-quest" id="add-quest" className="mr-3" />
                        Quest Description: <input type="text" name="quest-description" id="quest-description" />
                        <input type="submit" value="Submit" id="add-quest" onClick={this.addQuest} className="ml-3" />
                    </form>
                </div>
                <div id="buttons" className="mt-3">
                    <button id="add-link" onClick={this.addLink}>Add Link</button>
                    <button id="save-btn" onClick={this.saveQuest}>Save</button>
                    <button id="retrieve-btn" onClick={this.getQuest}>Retrieve Quest</button>
                </div>



            </section>

        );

    };
};

export default Chart;