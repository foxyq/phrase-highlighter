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

  onMouseHover = e => {
    const { text, highlights, highlightedIndex } = this.state;

    const dataIndex = String(e.target.getAttribute('datahighlightindex'));
    const highlightIndices = dataIndex.split(' ');

    const parsedHighlights = createHighlights(
      text,
      highlights,
      highlightedIndex
    );

    const toHighlight = parsedHighlights
      .map((x, i) => ({ ...x, index: i }))
      .filter(x => highlightIndices.includes(String(x.index)))
      .reduce((acc, next) => (acc.priority < next.priority ? acc : next));

    this.setState({ highlightedIndex: toHighlight.index });
  };

  onMouseOut = () => {
    this.setState({ highlightedIndex: null });
  };

  onTextChange = e => {
    const text = e.target.value;
    this.setState({ text });
  };

  onHighlightsChange = e => {
    const highlights = arrayFromHighlightsInput(e.target.value);

    if (isHighlightsInputValid(highlights)) {
      this.setState({ highlights });
    }
  };

  render() {
    const { text, highlights, highlightedIndex } = this.state;

    const parsedWords = createWords(text);

    const parsedHighlights = createHighlights(
      text,
      highlights,
      highlightedIndex
    );

    const wordsWithClasses = addClassesToWords(
      parsedWords,
      parsedHighlights,
      highlightedIndex
    );

    const domElements = createRenderableDom(
      wordsWithClasses,
      this.onMouseHover,
      this.onMouseOut
    );

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
            <>{domElements}</>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
