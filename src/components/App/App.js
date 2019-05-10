import React, { Component } from 'react';
import Form from '../Form';
import initState from '../../records/initialState';
import {
  createWords,
  createHighlights,
  addClassesToWords,
  createRenderableDom,
  isHighlightsInputValid,
  arrayFromHighlightsInput
} from '../../utils';

import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  componentDidMount = () => {
    const text = this.state.text;
    const highlights = this.state.highlights;

    this.parseInputAndSetState(text, highlights);
  };

  onMouseHover = e => {
    const dataIndex = String(e.target.getAttribute('datahighlightindex'));
    const highlightIndices = dataIndex.split(' ');

    const parsedHighlights = this.state.parsedHighlights;

    const toHighlight = parsedHighlights
      .map((x, i) => ({ ...x, index: i }))
      .filter(x => highlightIndices.includes(String(x.index)))
      .reduce((acc, next) => (acc.priority < next.priority ? acc : next));

    const { text, highlights } = this.state;
    this.parseInputAndSetState(text, highlights, toHighlight.index);
  };

  onMouseOut = () => {
    const { text, highlights } = this.state;
    this.parseInputAndSetState(text, highlights);
  };

  parseInputAndSetState = (newText, newHighlights, highlightedIndex = null) => {
    const parsedWords = createWords(newText);

    const parsedHighlights = createHighlights(
      newText,
      newHighlights,
      highlightedIndex
    );

    const wordsWithClasses = addClassesToWords(
      parsedWords,
      parsedHighlights,
      highlightedIndex
    );

    const dom = createRenderableDom(
      wordsWithClasses,
      this.onMouseHover,
      this.onMouseOut
    );

    this.setState({
      text: newText,
      highlights: newHighlights,
      highlightedIndex,
      parsedHighlights,
      toDisplay: dom
    });
  };

  onTextChange = e => {
    const text = e.target.value;
    this.parseInputAndSetState(text, this.state.highlights);
  };

  onHighlightsChange = e => {
    const highlights = arrayFromHighlightsInput(e.target.value);

    if (isHighlightsInputValid(highlights)) {
      this.parseInputAndSetState(this.state.text, highlights);
    }
  };

  render() {
    return (
      <div>
        <div className='overlay' />
        <div className='App'>
          <section>
            <Form
              text={this.state.text}
              onTextChange={this.onTextChange}
              highlights={JSON.stringify(this.state.highlights)}
              onHighlightsChange={this.onHighlightsChange}
            />
          </section>
          <section id='content'>
            <>{this.state.toDisplay}</>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
