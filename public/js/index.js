const ratingDiv = document.getElementById('rater');
const ratingsBubbles = document.querySelectorAll('.rating-score');

const ratings = document.querySelectorAll('input[type="radio"]');


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
// of the requested type. This could be set up as a recursive function.
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