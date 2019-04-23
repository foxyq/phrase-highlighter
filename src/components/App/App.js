import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import DynamicContent from '../DynamicContent';
import Form from '../Form';
import initState from '../../records/initialState';
import {
  inputIsEmpty,
  formatHighlights,
  createHighlightedElements
} from '../../utils';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  handleSubmit = e => {
    e.preventDefault();

    // check text
    const rawText = e.target.text.value;
    const formText = inputIsEmpty(rawText) ? this.state.text : rawText;

    const rawHighlights = e.target.highlights.value;
    const formHighlights = inputIsEmpty(rawHighlights)
      ? this.state.highlights
      : rawHighlights;

    // format highlights
    const newHighlights = formatHighlights(formHighlights);

    var reactElementDiv = createHighlightedElements(newHighlights, formText);

    // var reactElementDiv = createHighlightedElements(
    //   this.state.highlights,
    //   this.state.text
    // );

    this.setState({
      text: formText,
      highlights: newHighlights,
      toDisplay: reactElementDiv
    });
  };

  // handleTextChange = e => {
  //   const rawText = e.target.value;
  //   const formText = inputIsEmpty(rawText) ? this.state.text : rawText;
  //   // console.log(formText);
  //   this.setState({ text: formText });
  // };

  // handleHighlightsChange = e => {
  //   const rawHighlights = JSON.parse(e.target.value);

  //   console.log(rawHighlights);
  //   // const formHighlights = inputIsEmpty(rawHighlights)
  //   //   ? this.state.highlights
  //   //   : rawHighlights;

  //   // // format highlights
  //   // const newHighlights = formatHighlights(rawHighlights);

  //   this.setState({ highlights: rawHighlights });
  // };

  render() {
    return (
      <div className='App'>
        <section>
          <Form
            text={this.state.text}
            highlights={JSON.stringify(this.state.highlights)}
            handleSubmit={this.handleSubmit}
          />
        </section>
        <section>
          <DynamicContent>{this.state.toDisplay}</DynamicContent>
        </section>
      </div>
    );
  }
}

export default App;
