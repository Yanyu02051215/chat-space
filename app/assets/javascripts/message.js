$(function(){
  function buildMessage(message){
    var html = `<div class="message" data-message-id="${message.id}" data-user_id="${message.user_id}"}>
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
    <img class="lower-message__image" src="${message.image.url}">
    </div>`
    return html;
  }

  function ScrollToNewMessage(){
    $('.message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');
  }



  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html)
      $("#new_message")[0].reset();
    })
    .fail(function(){
      alert('メッセージを送信できません');
    })
    .always(function(){
      $('.form__submit').prop("disabled", false);
    })
  })


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.messages:last').data('id');
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: location.href,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      data.forEach(function(message){
      //メッセージが入ったHTMLを取得
      insertHTML = buildHTML(message);
      //メッセージを追加
      $('.message').append(insertHTML)
    })
    .fail(function() {
      console.log('error');
    });
    setInterval(reloadMessages, 5000);
   });
  };
});
