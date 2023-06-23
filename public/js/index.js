// Use the .selected class to toggle when a bubble is clicked for the styling
const getParent = function(elements) {

  let parents = [];
  for(let el of elements) {
    parents.push(el.parentElement);
  }

  return parents;

};

const ratingDiv = document.getElementById('rater');
const ratingScores = document.querySelectorAll('input[name=rating]');

ratingDiv.addEventListener('click', (event) => {

  event.preventDefault();

  let elParents = getParent(ratingScores);

  for(let el of elParents) {
    if(el.contains(event.target)) {
      el.classList.toggle('bubble-selected');
    }
  }

});