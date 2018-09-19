const sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];

let currentSentenceIndex = 0;
let currentSentence = sentences[currentSentenceIndex];

const toggleKeyBoard = () => {
  if ($('#keyboard-upper-container').is(':hidden')) {
    $('#keyboard-upper-container').show()
    $('#keyboard-lower-container').hide()
  } else {
    $('#keyboard-upper-container').hide()
    $('#keyboard-lower-container').show()
  }
};

const highlightKey = (key) => $(`#${key.charCodeAt()}`).toggleClass('highlight-key');

const init = () => {
  $(document).on('keyup keydown', ({ key }) => {
    if (key === 'Shift') {
      toggleKeyBoard();
    } else {
      highlightKey(key);
    }
  });

  $('#sentence').text(currentSentence);
};

$(document).ready(() => {
  init();
});
