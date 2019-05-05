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

    const pattern = /\w+[-]*\w*|[.,?!;:'"()]+/gi;
    // const pattern = /(\b\w+[-]*\w*\b)|([/,/./!/?])/gi;

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
    const wordsWithClasses = JSON.parse(JSON.stringify(words));

    highlights.forEach(highlight => {
      wordsWithClasses.forEach(word => {
        const wordIsIncludedInPhrase = () =>
          highlight.start <= word.start && highlight.end >= word.end;

        if (wordIsIncludedInPhrase()) {
          const hasClassesArray = word.classes;

          if (!hasClassesArray) {
            word.classes = [];
          }

          word.classes.push({
            color: highlight.color,
            zIndex: highlight.zIndex
          });
        }
      });
    });

    return wordsWithClasses;
  };

  getClassNames = classes => {
    let names = '';

    classes.forEach(classItem => (names += classItem.color + ' '));

    return names.trim();
  };

  createRenderableDom = content => {
    if (!Array.isArray(content)) return <span>nothing to display</span>;

    const spanArray = [];
    content.forEach(item => {
      if (!item.classes) {
        spanArray.push(<span key={item.start}>{item.word} </span>);
      } else {
        const names = this.getClassNames(item.classes);

        spanArray.push(
          <span
            key={item.start}
            className={'highlight ' + names}
            style={{ zIndex: item.classes[0].zIndex }}
          >
            {item.word}{' '}
          </span>
        );
      }
    });

    return spanArray;
  };

  handleSubmit = e => {
    e.preventDefault();

    const formText = e.target.text.value || this.state.text;
    const parsedWords = this.createWords(formText);

    const rawHighlights = e.target.highlights.value;
    const formHighlights = inputIsEmpty(rawHighlights)
      ? this.state.highlights
      : rawHighlights;

    const parsedHighlights = this.createHighlights(formText, formHighlights);

    const wordsWithClasses = this.addClassesToWords(
      parsedWords,
      parsedHighlights
    );

    console.log(wordsWithClasses);

    const dom = this.createRenderableDom(wordsWithClasses);

    this.setState({
      text: formText,
      highlights: formHighlights,
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
