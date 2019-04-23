import React, { Component } from 'react';
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

    const rawText = e.target.text.value;
    const formText = inputIsEmpty(rawText) ? this.state.text : rawText;

    const rawHighlights = e.target.highlights.value;
    const formHighlights = inputIsEmpty(rawHighlights)
      ? this.state.highlights
      : rawHighlights;

    const newHighlights = formatHighlights(formHighlights);
    var reactElementDiv = createHighlightedElements(newHighlights, formText);

    this.setState({
      text: formText,
      highlights: newHighlights,
      toDisplay: reactElementDiv
    });
  };

  render() {
    return (
      <div>
        <div className='overlay' />
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
      </div>
    );
  }
}

export default App;
