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
};

$(document).ready(() => {
  init();
});
