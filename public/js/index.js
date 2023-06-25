const ratingDiv = document.getElementById('rater');
const ratingsBubbles = document.querySelectorAll('.rating-score');
const submit = document.getElementById('submit-button');

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


ratingDiv.addEventListener('click', (event) => {

  event.preventDefault();

  if(event.target === submit) {
    let targetBubble = ratingDiv.getElementsByClassName('bubble-selected')[0];
    if(targetBubble) {
      // This only runs when the submit button is clicked and there is a target bubble
      let score = findChildInput(targetBubble, 'radio').value;
      // The score can be passed to the new content
      console.dir(score);
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