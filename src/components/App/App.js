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

  createWords = string => {
    const validWords = [];

    const pattern = /\b\w+[-]*\w*\b/gi;

    let matched = '';
    while ((matched = pattern.exec(string)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      // if (m.index === regex.lastIndex) {
      //   regex.lastIndex++;
      // }

      validWords.push({
        word: matched[0],
        start: matched.index,
        end: matched.index + matched[0].length - 1
      });
    }

    return validWords;
  };

  createHighlights = (words, highlights) => {
    const resultHighlights = [];

    highlights.forEach((highlight, highlightIndex) => {
      const color = highlight.color || 'none';

      highlight.phrases.forEach(phrase => {
        const pattern = `\\b${phrase}\\b`;
        const regex = new RegExp(pattern, 'gi');

        let found = regex.exec(words);

        while (found !== null) {
          resultHighlights.push({
            phrase,
            color,
            zIndex: 10 - highlightIndex,
            start: found.index,
            end: found.index + phrase.length - 1
          });

          found = regex.exec(words);
        }
      });
    });

    return resultHighlights.sort((a, b) => a.start - b.start);
  };

  addClassesToWords = (words, highlights) => {
    const wordsWithClasses = words.slice();

    highlights.forEach(highlight => {
      wordsWithClasses.forEach(word => {
        // a bit hacky, fix this for words at the end of sentence
        const wordEnd = word.start + word.word.length - 2;

        const isIn = () =>
          highlight.start <= word.start && highlight.end >= wordEnd;

        if (isIn()) {
          const hasClassesArray = word.classes;

          if (!hasClassesArray) {
            word.classes = [];
          }

          word.classes.push(highlight.color);
        }
      });
    });

    return wordsWithClasses;
  };

  handleSubmit = e => {
    e.preventDefault();

    const rawText = e.target.text.value;
    const formText = rawText || this.state.text;
    const parsedWords = this.createWords(formText);
    console.log(parsedWords);

    const rawHighlights = e.target.highlights.value;
    const formHighlights = inputIsEmpty(rawHighlights)
      ? this.state.highlights
      : rawHighlights;

    const parsedHighlights = this.createHighlights(formText, formHighlights);

    console.log(parsedHighlights);

    // console.log(this.addClassesToWords(words, objects));

    // const newHighlights = formatHighlights(formHighlights);
    // // const newHighlights = [];
    // // const reactElementDiv = createHighlightedElements(newHighlights, formText);

    // const arr = [
    //   <span style={{ color: '#efefef' }}>sad1</span>,
    //   <span className='tololol'>2</span>,
    //   <span>2</span>
    // ];

    // const reactElementDiv = <div>{arr.map(x => x)}</div>;

    // this.setState({
    //   text: formText,
    //   highlights: newHighlights,
    //   toDisplay: reactElementDiv
    // });
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
