$(document).on('turbolinks:load', function() {

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
      if(data.length !== 0){
		  var html = buildHTML(data);
	  	$('.main__message').append(html);
      ScrollToNewMessage();
	  	$('.main__footer__text').val('');
      $(".main__footer__send-button").prop('disabled', false);
      $("#new_message")[0].reset();
      } else {
        alert("エラーです")
        $(".main__footer__send-button").prop('disabled', false);
      }
	  })
	  .fail(function(){
	    alert('error');
	  });
  });
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.main__message__box:last').data("message-id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      // var group_id = $(".group").data("group-id");
      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.main__message').append(insertHTML);//メッセージを追加
        })
        $('.main__message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function (messages) {
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
    }
  };
  setInterval(reloadMessages, 5000);//5000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
  
//   var interval = function(){
//     if (window.location.href.match(/\/groups\/\d+\/messages/)){
//       var last_message_id = $('.main__message__box').filter(":last").data('message-id')
//       console.log(last_message_id)
//   $.ajax({
//     url: "api/messages",
//     data: { last_id: last_message_id },
//     type: "GET",
//     dataType: 'json'
//   })
//   .done(function(data){
//     if(data.length !== 0) {
//       var insertHTML = '';
//       data.forEach(function(message){
//       insertHTML = buildHTML(message);         
//       $('.main__message').append(insertHTML)
//       ScrollToNewMessage();
//       });
//     }
//   })
//   .fail(function(data){
//     alert('自動更新に失敗しました');
//   })
// }
// }
// setInterval(interval , 5000 );

});
});