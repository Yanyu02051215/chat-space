$(function(){
  function buildMessage(message){
    var html = `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.user_name}
    </div>
    <div class="upper-message__date">
    ${message.created_at}
    </div>
    </div>
    <div class="lower-meesage"></div>
    <p class="lower-message__content">
    ${message.content}
    </p>
    
    </div>`
    
    return html;
  }


  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html)
      $('#message_content').val('')
      
    })
    .fail(function(){
      alert('メッセージを送信できません');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })
});
