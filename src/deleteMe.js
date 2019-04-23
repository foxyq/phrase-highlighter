// const formatText = (text, highlights) => {
//   // return text;
//   if (inputIsEmpty(highlights)) return text;

//   let finalText = '';
//   let textIndex = 0;

//   highlights.forEach((item, index) => {
//     if (index === 0) {
//       finalText = text.substring(textIndex, item.startOffset);
//       textIndex = item.startOffset;
//     }

//     if (item.startOffset > textIndex) {
//       finalText += text.substring(textIndex, item.startOffset);
//       textIndex = item.startOffset;
//     }

//     const joinClass = item.join || '';
//     const className = 'highlight ' + joinClass;

//     finalText += `<span class="${className}" style="background-color:${
//       item.color
//     };z-index:${100 - item.priority}">`;
//     finalText += text.substring(item.startOffset, item.endOffset);
//     finalText += '</span>';

//     if (index === highlights.length - 1) {
//       finalText += text.substring(item.endOffset);
//     }

//     textIndex = item.endOffset;
//   });

//   return finalText;
// };
