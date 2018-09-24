const View = (() => {
  const upperKeyboard = $("#keyboard-upper-container");
  const lowerKeyboard = $("#keyboard-lower-container");
  const sentenceContainer = $("#sentence");
  const targetLetterContainer = $("#target-letter");
  let correctIcon = $('.glyphicon-ok');
  let wrongIcon = $('.glyphicon-remove');

  const toggleKeyBoard = () => {
    if (upperKeyboard.is(":hidden")) {
      upperKeyboard.show();
      lowerKeyboard.hide();
    } else {
      upperKeyboard.hide();
      lowerKeyboard.show();
    }
  };

  const toggleFeedback = isCorrect => {
    if (isCorrect) {
      wrongIcon.hide();
      correctIcon.show();
    } else {
      correctIcon.hide();
      wrongIcon.show();
    }
  };

  const moveCursor = id => {
    const selector = $(`.sentence-${id}`);
    selector.prev().css({
      backgroundColor: 'white'
    });
    selector.css({
      backgroundColor: 'yellow'
    });
  };

  const highlightKey = key => {
    const keySelector = $(`#${key}`);
    keySelector.addClass("highlight-key");
    setTimeout(() => {
      keySelector.removeClass("highlight-key");
    }, 250);
  };

  const updateSentence = content => sentenceContainer.html(content);
  const updateTargetLetter = l => targetLetterContainer.text(l);

  return {
    toggleKeyBoard,
    toggleFeedback,
    highlightKey,
    updateSentence,
    updateTargetLetter,
    moveCursor
  };
})();

const Model = (() => {
  let sentences = ["hello world", "test"];
  let currentSentenceIndex = 0;
  let currentLetterIndex = 0;

  let mistakes = 0;

  let startTime;
  let timerStarted = false;

  const getCurrentSentence = () => sentences[currentSentenceIndex];
  const getCurrentLetter = () => getCurrentSentence()[currentLetterIndex];

  const incrementSentenceCounter = () => currentSentenceIndex++;
  const incrementLetterCounter = () => currentLetterIndex++;
  const incrementMistakesCounter = () => mistakes++;

  const resetSentenceCounter = () => (currentSentenceIndex = 0);
  const resetLetterCounter = () => (currentLetterIndex = 0);
  const resetMistakesCounter = () => (mistakes = 0);

  const startTimer = () => {
    startTime = Date.now();
    timerStarted = true;
  };

  const stopTimer = () => {
    const endTime = Date.now();
    timerStarted = false;
    return ((endTime - startTime) / 1000) / 60;
  };

  return {
    getCurrentSentence,
    getCurrentLetter,
    incrementSentenceCounter,
    incrementLetterCounter,
    incrementMistakesCounter,
    resetSentenceCounter,
    resetLetterCounter,
    resetMistakesCounter,
    startTimer,
    stopTimer,
    get sentenceIndex () { return currentSentenceIndex },
    get letterIndex () { return currentLetterIndex },
    get totalSentences () { return sentences.length },
    get totalWords () { return sentences.reduce((totalWords, n) => totalWords += n.length, 0) },
    get timerStarted () { return timerStarted }
  };
})();

const Controller = ((view, model) => {
  const init = () => {
    $(document).on("keyup keydown", e => {
      if (e.keyCode === 16) {
        view.toggleKeyBoard();
      } else {
        view.highlightKey(e.key.charCodeAt(0));
        if (!model.timerStarted) {
          model.startTimer();
        }
        if (e.type === "keyup") {
          checkKey(e);
        }
      }
    });

    handleDisplay();
    view.moveCursor(model.letterIndex);
  };

  const checkKey = ({ key }) => {
    const isCorrect = key === model.getCurrentLetter();
    if (isCorrect) {
      model.incrementLetterCounter();
      if (model.letterIndex >= model.getCurrentSentence().length) {
        model.incrementSentenceCounter();
        model.resetLetterCounter();
        if (model.sentenceIndex >= model.totalSentences) {
          const totalMinutes = model.stopTimer();
          const wpm = Math.round(model.totalWords / totalMinutes);
          if (confirm(`You win. \nYour WPM is: ${wpm}. \nPlay again?`)) {
            reset();
          }
        }
      }
      handleDisplay();
      view.moveCursor(model.letterIndex);
    } else {
      model.incrementMistakesCounter();
    }
    view.toggleFeedback(isCorrect);
  };

  const handleDisplay = () => {
    let currentSentence = model
      .getCurrentSentence()
      .split("")
      .map((t, n) => `<span class="sentence-${n}">${t}</span>`);

    view.updateSentence(currentSentence);
    view.updateTargetLetter(model.getCurrentLetter());
  };

  const reset = () => {
    model.resetSentenceCounter();
    model.resetLetterCounter();
    model.resetMistakesCounter();
  };
  return {
    init
  };
})(View, Model);

$(document).ready(() => {
  Controller.init();
});
