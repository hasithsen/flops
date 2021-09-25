$(document).ready(function () {
  var current_ans = 0;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function new_exp() {
    var operators = [' + ', ' - ', ' * '];
    var operand1 = getRandomInt(1, 9);
    var operand2 = getRandomInt(1, 9);
    var op_idx = 0;
    do {
      op_idx = getRandomInt(0, 2);
    } while (!(op_idx >= 0 && op_idx <= 3));
    var ans = eval(operand1 + operators[op_idx] + operand2);
    current_ans = ans;
    var answers = [
      ans,
      ans + 1,
      ans - 1,
      ans + 2 * (Math.random() < 0.5 ? -1 : 1)
    ].sort(() => Math.random() - 0.5);

    $('#id_exp-text').text(operand1.toString() + operators[op_idx] + operand2.toString());
    for (let i = 1; i < 5; i++) {
      $('#id_ans-text-' + i).text(answers[i - 1]);
    }
  };

  function checkAns(selected_ans) {
    var ans_record_symbol = '';
    if (parseInt(selected_ans) == current_ans) {
      ans_record_symbol = '\u2713';
    } else {
      ans_record_symbol = '\u2022';
    }
    $('#id_ans-record').text($('#id_ans-record').text() + ' ' + ans_record_symbol);
    $('#id_current-exp').css('pointer-events', 'none');
    $('#id_current-exp').fadeOut('fast', function () {
      new_exp();
      $('#id_current-exp').css('pointer-events', 'auto');
    });
    $('#id_current-exp').fadeIn('fast');
  }

  $('.ans-btn').on('click', function (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    checkAns($(event.target).text());
  });

  new_exp();

});
