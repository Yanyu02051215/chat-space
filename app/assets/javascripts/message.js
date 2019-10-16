$(function() {
  
  function buildHTML(message){
    image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
  	  var html =
  	    `<div class="main__message__box" data-message-id= "${message.id}">
          <div class="main__message__box__top">
            <div class="main__message__box__top__name">
              ${message.user_name}
            </div>
            <div class="main__message__box__top__time">
              ${message.date}
            </div>
          </div>
          <div class="main__message__box__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          ${image}
        </div>`
    return html;
  }
  
  function ScrollToNewMessage(){
    $('.main__message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');
  }

  $('#new_message').on('submit',function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
	  .done(function(data){
		  var html = buildHTML(data);
	  	$('.main__message').append(html);
      ScrollToNewMessage();
	  	$('.main__footer__text').val('');
	  	$(".main__footer__send-button").prop('disabled', false);
	  })
	  .fail(function(){
	    alert('error');
	  });
  });

    var interval = setInterval(function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.main__message__box').filter(":last").data('messageId')
    $.ajax({
      url: location.href.json,
      data: { last_id: last_message_id },
      type: "GET",
      dataType: 'json'
    })
    .done(function(data){
      var insertHTML = '';
      data.forEach(function(message){
      insertHTML = buildHTML(message);         
      $('.main__message').append(insertHTML)
      ScrollToNewMessage();
      });
    })
    .fail(function(data){
      alert('自動更新に失敗しました');
    })
  } else{
      clearInterval(interval);
    }} , 5000 )
});


// $(function(){
//   function buildMessage(message){
//     image = ( message.image ) ? `<img class= "lower-message__image" src=${message.image} >` : "";
//     var html = `<div class="message" data-message-id="${message.id}" data-user_id="${message.user_id}"}>
//     <div class="upper-message">
//     <div class="upper-message__user-name">
//     ${message.user_name}
//     </div>
//     <div class="upper-message__date">
//     ${message.created_at}
//     </div>
//     </div>
//     <div class="lower-meesage"></div>
//     <p class="lower-message__content">
//     ${message.content}
//     </p>
//     <img class="lower-message__image" src="${message.image.url}">
//     </div>`
//     return html;
    
//   }

//   function ScrollToNewMessage(){
//     $('.message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');
//   }



//   $('#new_message').on('submit',function(e){
//     e.preventDefault();
//     var formData = new FormData(this);
//     var url = $(this).attr('action');
//     $.ajax({
//       url: url,
//       type: "post",
//       data: formData,
//       dataType: "json",
//       processData: false,
//       contentType: false
//     })
//     .done(function(data){
//       var html = buildMessage(data);
//       $('.messages').append(html)
//       $("#new_message")[0].reset();
//     })
//     .fail(function(){
//       alert('メッセージを送信できません');
//     })
//     .always(function(){
//       $('.form__submit').prop("disabled", false);
//     })
//   })


//   var reloadMessages = function() {
//     //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
//     last_message_id = $('.messages:last').data('id');
//     $.ajax({
//       //ルーティングで設定した通りのURLを指定
//       url: location.href,
//       //ルーティングで設定した通りhttpメソッドをgetに指定
//       type: 'get',
//       dataType: 'json',
//       //dataオプションでリクエストに値を含める
//       data: {id: last_message_id}
//     })
//     .done(function(data) {
//       //追加するHTMLの入れ物を作る
//       var insertHTML = '';
//       //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
//       data.forEach(function(message){
//       //メッセージが入ったHTMLを取得
//       insertHTML = buildHTML(message);
//       //メッセージを追加
//       $('.message').append(insertHTML)
//     })
//     .fail(function(data) {
//       alert('error');
//     });
//     setInterval(reloadMessages, 5000);
//    });
//   };
// });
