const toggleKeyBoard = () => {
  if ($('#keyboard-upper-container').is(':hidden')) {
    $('#keyboard-upper-container').show()
    $('#keyboard-lower-container').hide()
  } else {
    $('#keyboard-upper-container').hide()
    $('#keyboard-lower-container').show()
  }
};

const highlightKey = ({ keyCode }) => {
  // console.log(e);
  $(`#${keyCode}`).toggleClass('.hi')
}


const init = () => {
  $(document).on('keyup keydown', ({ key }) => {
    // console.log(e);
    if (key === 'Shift') {
      toggleKeyBoard();
    }
  });

  $(document).on('keypress', highlightKey);
};

$(document).ready(() => {
  init();
});
