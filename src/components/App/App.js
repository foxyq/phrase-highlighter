import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../DynamicContent/DynamicContent.js';
import DynamicContent from '../DynamicContent/DynamicContent.js';
import initState from '../../records/initialState';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  render() {
    const injectMarkup = elements => {
      return { __html: elements };
    };

    const inputIsEmpty = input => input === null || input === '';

    const hasOverlap = (block1, block2) => {
      const start = Math.max(block1.startOffset, block2.startOffset);
      const end = Math.min(block1.endOffset, block2.endOffset);

      return start < end ? [start, end] : null;
    };

    const isFirstPrioritized = (first, second) => {
      return first.priority < second.priority;
    };

    const secondIsInsideFirst = (first, second) =>
      second.startOffset >= first.startOffset &&
      second.endOffset <= first.endOffset;

    const formatHighlights = highlights => {
      if (highlights.length < 2) return highlights;

      const workingHighlights = highlights.slice();
      // try {
      workingHighlights.sort((a, b) => a.startOffset - b.startOffset);
      // } catch (e) {
      // console.log(e);
      // }

      let i = 1;
      while (i < workingHighlights.length) {
        const prev = workingHighlights[i - 1];
        const curr = workingHighlights[i];

        const overlap = hasOverlap(prev, curr);

        // need to split
        if (overlap) {
          // split longer into 2
          if (secondIsInsideFirst(prev, curr)) {
            if (!isFirstPrioritized(prev, curr)) {
              const furtherEnd = prev.endOffset;
              prev.endOffset = curr.startOffset;

              const newBlock = { ...prev };
              prev.join = ' join-right';
              newBlock.startOffset = curr.endOffset;
              newBlock.endOffset = furtherEnd;
              newBlock.join = ' join-left';

              workingHighlights.splice(i + 1, 0, newBlock);
            }
          } else {
            // shorten one
            if (isFirstPrioritized(prev, curr)) {
              curr.startOffset = prev.endOffset;
              curr.join += ' join-left';
            } else {
              prev.endOffset = curr.startOffset;
              curr.join += ' join-left';
            }
          }
        }

        // no overlap, do nothing
        i++;
      }
      console.log(workingHighlights);
      return workingHighlights;
    };

    const formatText = (text, highlights) => {
      // return text;
      if (inputIsEmpty(highlights)) return text;

      let finalText = '';
      let currIndex = 0;

      highlights.forEach((item, index) => {
        if (index === 0) {
          finalText = text.substring(currIndex, item.startOffset);
          currIndex = item.startOffset;
        }

        if (item.startOffset > currIndex) {
          finalText += text.substring(currIndex, item.startOffset);
          currIndex = item.startOffset;
        }

        const joinClass = item.join || '';
        const className = 'highlight ' + joinClass;

        finalText += `<span class="${className}" style="background-color:${
          item.color
        };z-index:${100 - item.priority}">`;
        finalText += text.substring(item.startOffset, item.endOffset);
        finalText += '</span>';

        if (index === highlights.length - 1) {
          finalText += text.substring(item.endOffset);
        }

        currIndex = item.endOffset;
      });

      return finalText;
    };

    const returnEmptyDiv = () =>
      React.createElement(
        'div',
        {
          className: 'list'
        },
        []
      );

    const createReactElement = (highlights, text) => {
      const arrayOfChildren = [];

      if (inputIsEmpty(highlights)) returnEmptyDiv();

      let currIndex = 0;

      highlights.forEach((item, index) => {
        if (index === 0) {
          const content = text.substring(currIndex, item.startOffset);

          arrayOfChildren.push(
            React.createElement('span', { key: currIndex }, content)
          );

          currIndex = item.startOffset;
        }

        if (item.startOffset > currIndex) {
          const content = text.substring(currIndex, item.startOffset);

          arrayOfChildren.push(
            React.createElement('span', { key: currIndex }, content)
          );

          currIndex = item.startOffset;
        }

        const joinClass = item.join || '';
        const className = 'highlight ' + joinClass;
        const content = text.substring(item.startOffset, item.endOffset);

        const styles = {
          backgroundColor: item.color,
          zIndex: 100 - item.priority
        };

        arrayOfChildren.push(
          React.createElement(
            'span',
            {
              className: className,
              key: currIndex,
              style: styles
            },
            content
          )
        );

        if (index === highlights.length - 1) {
          const content = text.substring(item.endOffset);
          React.createElement('span', { key: currIndex }, content);
        }

        currIndex = item.endOffset;
      });

      return React.createElement(
        'div',
        {
          className: 'myList'
        },
        arrayOfChildren
      );
    };

    const handleSubmit = e => {
      e.preventDefault();

      // check text
      const rawText = e.target.text.value;
      const formText = inputIsEmpty(rawText) ? this.state.text : rawText;

      const rawHighlights = e.target.highlights.value;
      const formHighlights = inputIsEmpty(rawHighlights)
        ? this.state.highlights
        : rawHighlights;

      // if (inputIsEmpty(rawText) && inputIsEmpty(rawHighlights)) {
      //   return;
      // }

      // format highlights
      const newHighlights = formatHighlights(formHighlights);
      // const newText = formatText(formText, newHighlights);

      var reactElementUl = createReactElement(newHighlights, formText);

      ReactDOM.render(reactElementUl, document.getElementById('content'));

      // this.setState({ text: newText, highlights: newHighlights });
    };

    return (
      <div className='App'>
        <section>
          <div>
            <form className='form' onSubmit={handleSubmit}>
              <textarea name='text' cols='120' rows='5' />

              <textarea name='highlights' cols='3' rows='5' />
              <input type='submit' value='Submit' />
            </form>
          </div>
        </section>
        <section>
          {/* <div dangerouslySetInnerHTML={injectMarkup(this.state.text)} /> */}
          {/* <DynamicContent>{this.state.text}</DynamicContent> */}
        </section>
        <div id='content' />
      </div>
    );
  }
}

export default App;
