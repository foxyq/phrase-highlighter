# Phrase Highlighter

App highlights user defined phrases from custom text.
The applicable colors are : ```orange, green, blue, purple, grey``` starting with the highest priority

Example input of phrases: 

```[ { color : blue, phrases: [we expect our, puppy ] }, {color: orange, phrases: [our ]}, {color: green, phrases: [will, to]} ]```

Demo: https://phrase-highlighter.herokuapp.com/

## Installation

1. yarn install
2. yarn start

## The problem
Write a component that, given an empty div, a string, and the categorized lists of phrases , can highlight phrases like so:

<img width="951" alt="Screen Shot 2019-07-03 at 10 17 59 PM" src="https://user-images.githubusercontent.com/3019823/60641471-c2538780-9de0-11e9-8cc8-37f0feb8ee53.png">


1. The component should be able to accept a new string repeatedly, replacing what was previously rendered with the new text.
2. Hovering over a highlight should produce an effect where the color slightly darkens and the text switches from black to white.

<img width="661" alt="Screen Shot 2019-07-03 at 10 20 57 PM" src="https://user-images.githubusercontent.com/3019823/60641502-d8f9de80-9de0-11e9-9a11-679010fedfc8.png">

3. The component should be able to handle cases where the highlights overlap (including containment, where one phrase sits inside another). The color lists below have priorities assigned to them. When phrases overlap, the higher priority color should “win”. In the following example, “will deliver new” is a green phrase, while “new technology” is a grey phrase. Green phrases take priority, so it will render on top:

<img width="738" alt="Screen Shot 2019-07-03 at 10 22 16 PM" src="https://user-images.githubusercontent.com/3019823/60641532-0b0b4080-9de1-11e9-87a5-be38e5f97ce7.png">


4. When hovering over a portion of an overlapping highlight, that entire phrase should be shown in the corresponding hover color, with all overlapping phrases temporarily removed, regardless of priority. For the example below, if you hover over “will deliver”, then that part of the highlight should stand alone during the hover. Note also that phrases that aren’t overlapping the hovered phrase should remain highlighted – see “an adorable puppy” in the example below.

<img width="676" alt="Screen Shot 2019-07-03 at 10 22 41 PM" src="https://user-images.githubusercontent.com/3019823/60641544-16f70280-9de1-11e9-9c60-c6a8e6b89a7e.png">



## User guide

There are two options to change input for text and highlights:

1. Change them in input fields of UI ( highlights only accept a valid array )
2.  Change them in code src/records/initialState.js


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
