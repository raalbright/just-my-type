// const sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
const sentences = ['ten ate neite'];

let currentSentenceIndex = 0;
let currentSentence = sentences[currentSentenceIndex];
let currentLetterIndex = 0;
let numberOfMistakes = 0;
let numberOfWords = sentences
  .map(sentence => sentence.split(' '))
  .reduce((acc, k) => acc += k.length, 0);

let start;

const toggleKeyBoard = () => {
  if ($('#keyboard-upper-container').is(':hidden')) {
    $('#keyboard-upper-container').show()
    $('#keyboard-lower-container').hide()
  } else {
    $('#keyboard-upper-container').hide()
    $('#keyboard-lower-container').show()
  }
};

const updateDisplay = () => $('#sentence').text(currentSentence);

const updateTargetLetter = () => $('#target-letter').text(currentSentence[currentLetterIndex]);

const toggleFeedback = (correct) => {
  $('#feedback').empty();
  $('#feedback').append(`<span class="glyphicon glyphicon-${(correct) ? 'ok' : 'remove'}">`);
  setTimeout(() => {
    $('#feedback').empty();
  }, 300);
}

const moveCursor = () => {
  // const left = $('#yellow-block').position().left;
  // const width = $('#yellow-block').width();

  // $('#yellow-block').css({
  //   left: `${left + width}px`
  // });
}

const calculateWordsPerMinute = () => {
  const minutes = ((Date.now() - start) / 1000) / 60;
  return (numberOfWords / (minutes - 2)) * numberOfMistakes;
}

const checkKey = (e) => {
  if (e.key === currentSentence[currentLetterIndex]) {
    toggleFeedback(true);
  } else {
    numberOfMistakes++;
    toggleFeedback(false);
  }

  currentLetterIndex++;

  if (currentLetterIndex === currentSentence.length) {
    currentLetterIndex = 0;
    currentSentenceIndex++;
    currentSentence = sentences[currentSentenceIndex];
    updateDisplay();
  }
  checkComplete();
  updateTargetLetter();
  moveCursor();
};

const reset = () => {
  currentSentenceIndex = 0;
  numberOfMistakes = 0;
  currentLetterIndex = 0;
  currentSentence = sentences[currentSentenceIndex];
  $(document).one('keypress', () => {
    start = Date.now();
  });
  updateDisplay();
  updateTargetLetter();
}

const checkComplete = () => {
  if (currentSentenceIndex >= sentences.length) {
    const toggleReset = confirm(`Words per minute: ${calculateWordsPerMinute()}
Would you like to try again`);
    if (toggleReset) {
      reset();
    }
  }
};

const highlightKey = (key) => {
  $(`#${key.charCodeAt()}`).addClass('highlight-key');
  setTimeout(() => {
    $(`#${key.charCodeAt()}`).removeClass('highlight-key');
  }, 250)
};

const init = () => {
  $(document).on('keyup keydown', ({ key }) => {
    if (key === 'Shift') {
      toggleKeyBoard();
    } else {
      highlightKey(key);
    }
  });

  $(document).on('keypress', checkKey);
  $(document).one('keypress', () => {
    start = Date.now();
  });
  updateDisplay();
  updateTargetLetter();
};

$(document).ready(() => {
  init();
});
