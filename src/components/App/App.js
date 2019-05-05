import React, { Component } from 'react';
import DynamicContent from '../DynamicContent';
import Form from '../Form';
import initState from '../../records/initialState';
import {
  inputIsEmpty,
  createWords,
  createHighlights,
  addClassesToWords,
  createRenderableDom
} from '../../utils';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { highlightedIndex, text, highlights } = this.state;

    if (prevState.highlightedIndex !== highlightedIndex) {
      const parsedWords = createWords(text);
      const parsedHighlights = createHighlights(text, highlights);

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

      this.setState({ toDisplay: dom });
    }
  };

  getFormText = e => {
    return e.target.text.value || this.state.text;
  };

  getFormHighlights = e => {
    const rawHighlights = e.target.highlights.value;

    return inputIsEmpty(rawHighlights) ? this.state.highlights : rawHighlights;
  };

  onMouseHover = e => {
    const highlightIndices = e.target
      .getAttribute('datahighlightindex')
      .split(' ');

    const toHighlight = this.state.parsedHighlights
      .filter((x, i) => highlightIndices.includes(i.toString()))
      .reduce((acc, next) => {
        return acc.priority < next.priority ? acc : next;
      });

    // toHighlight.priority = 0;
    const indexToHighlight = this.state.parsedHighlights.indexOf(toHighlight);

    this.setState({ highlightedIndex: indexToHighlight });
  };

  onMouseOut = () => {
    this.setState({ highlightedIndex: null });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formText = this.getFormText(e);
    const formHighlights = this.getFormHighlights(e);

    // parse input into arrays with required properties
    const parsedWords = createWords(formText);
    const parsedHighlights = createHighlights(formText, formHighlights);
    const wordsWithClasses = addClassesToWords(parsedWords, parsedHighlights);

    // console.log(parsedWords);
    console.log(parsedHighlights);
    // console.log(wordsWithClasses);

    const dom = createRenderableDom(
      wordsWithClasses,
      this.onMouseHover,
      this.onMouseOut
    );

    this.setState({
      text: formText,
      highlights: formHighlights,
      parsedHighlights,
      highlightedIndex: null,
      toDisplay: dom
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
