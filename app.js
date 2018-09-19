const toggleKeyBoard = () => {
  if ($('#keyboard-upper-container').is(':hidden')) {
    $('#keyboard-upper-container').show()
    $('#keyboard-lower-container').hide()
  } else {
    $('#keyboard-upper-container').hide()
    $('#keyboard-lower-container').show()
  }
};


const init = () => {
  $(document).on('keyup keydown', ({ key }) => {
    // console.log(e);
    if (key === 'Shift') {
      toggleKeyBoard();
    }
  });
};

$(document).ready(() => {
  init();
});
