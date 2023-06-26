const mainEl = document.getElementsByTagName('main')[0];
const ratingDiv = document.getElementById('rater');
const ratingsBubbles = document.querySelectorAll('.rating-score');
const submit = document.getElementById('submit-button');

const overlay = document.getElementById('overlay');

// Search an array of elements and return a match if it is the event target
// or return false. Useful for event delegation.
const findEventTarget = function(e, elementArray) {

  for(let el of elementArray) {
    if(el.contains(e.target)) {
      return el;
    }
  }

  return false;

};

// Look at the children for an element and return a child if it is an input
// of the requested type. This function only returns the first element of the
// type that it finds
const findChildInput = function(parentEl, type) {

  let inputs = parentEl.getElementsByTagName('input');

  for(let input of inputs) {
    if(input.type === type) {
      return input;
    }
  }

  return false;

};

// Function to remove all child elements from within a containing element
const emptyElement = function(el) {

  while(el.firstChild) {
    el.firstChild.remove();
  }

};

// Function to create new elements in the dom, with optional attributes
// and append the new element to a specified parent
const createNewElement = function(el, parentEl, options={}) {

  const newEl = document.createElement(el);

  let elKeys = Object.keys(options);

  if(elKeys.length > 0) {

    for(let k = 0; k < elKeys.length; k++) {
      newEl.setAttribute(String(elKeys[k]), String(options[elKeys[k]]));
    }

  }

  parentEl.appendChild(newEl);

  return newEl;

}


ratingDiv.addEventListener('click', (event) => {

  event.preventDefault();

  if(event.target === submit) {
    let targetBubble = ratingDiv.getElementsByClassName('bubble-selected')[0];
    if(targetBubble) {
      // This only runs when the submit button is clicked and there is a target bubble
      let score = findChildInput(targetBubble, 'radio').value;

      let domFragment = document.createDocumentFragment();

      let headlineDiv = createNewElement('div', domFragment, {
        'id': 'headline',
        'class': 'centered'
      });
      createNewElement('img', headlineDiv, {
        'class': 'centered',
        'src': 'public/images/illustration-thank-you.svg',
        'alt': 'Graphic of ballot box style response confirmation'
      });

      let messageDiv = createNewElement('div', domFragment, {
        'id': 'message',
        'class': 'flex-centered post-submit'
      });
      let scoreMessageDiv = createNewElement('div', messageDiv, {
        'class': 'score-message'
      });
      let scoreMessage = createNewElement('p', scoreMessageDiv);
      scoreMessage.innerHTML = `You selected ${score} out of 5`;

      let raterDiv = createNewElement('div', domFragment, {
        'id': 'rater',
        'class': 'centered post-submit'
      });

      let header = createNewElement('h1', raterDiv, {
        'class': 'thank-you'
      });
      header.innerHTML = 'Thank you!';

      let thankYouMsg = createNewElement('p', raterDiv);
      thankYouMsg.innerHTML = 'We appreciate you taking the time to give a rating. If you ever need more support, don\'t hesitate to get in touch!';

      emptyElement(mainEl);
      mainEl.appendChild(domFragment);

    }
  }

  let el = findEventTarget(event, ratingsBubbles);

  if(el) {
    for(let item of ratingsBubbles) {
      if(item != el) {
        item.classList.remove('bubble-selected');
      }
    }
    el.classList.toggle('bubble-selected');

    let input = findChildInput(el, 'radio');

    if(input) {
      input.checked = true;
    }
  }

});