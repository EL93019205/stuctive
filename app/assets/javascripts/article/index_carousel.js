$(document).on('turbolinks:load', () => {
  /* 変数宣言 */
  var carousel_slider = $(".index__carousel__draw__visible__slider"); /* カルーセルのスライダーのDOM */
  var carousel_button = $(".index__carousel__draw__dots__dot--button"); /* カルーセルのボタンのDOM */
  var CAROUSEL_CARD_SIZE = -220; /* アイキャッチ1つのサイズ */
  var carousel_now_left = 0; /* カルーセルの現在のスライド位置 */
  var carousel_slide_id; /* 現在参照中のカルーセル */
  var MAX_CAROUSEL_CARD_NUM = 9; /* カルーセルのカード枚数 */
  var button_new_index = 0; /* 新しい参照ボタン */
  var button_old_index = 0; /* 1つ前の参照ボタン */

  /* ボタンの色を入れ替える */
  function toggle_button(new_index) {
    button_new_index = new_index;
    carousel_button.eq(button_old_index).css("opacity", 0.25);
    carousel_button.eq(button_new_index).css("opacity", 0.8);
    button_old_index = button_new_index;
  }

  /* カルーセルをアニメーションさせる */
  function carousel_slide(position) {
    button_new_index += 1;
    if (button_new_index == MAX_CAROUSEL_CARD_NUM) {
      button_new_index = 0;
    }
    if (position <= CAROUSEL_CARD_SIZE * (MAX_CAROUSEL_CARD_NUM + 1)) {
      position = CAROUSEL_CARD_SIZE;
      carousel_now_left = CAROUSEL_CARD_SIZE;
      carousel_slider.css("left", 0);
    }
    carousel_slider.animate({
      "left": position
    });
    toggle_button(button_new_index);

  }

  /* ボタンをクリックしたらカルーセルのスライドを移動させる処理 */
  carousel_button.on('click', function () {
    var index = carousel_button.index(this);
    carousel_now_left = index * CAROUSEL_CARD_SIZE;
    carousel_slide(carousel_now_left);
    toggle_button(index);
    $(this).removeAttr("disabled");
  });

  /* 一定時間ごとにカルーセルのスライドを移動させる関数 */
  function StartCarousel() {
    carousel_slide_id = setInterval(function () {
      carousel_now_left += CAROUSEL_CARD_SIZE;
      carousel_slide(carousel_now_left);
    }, 3000);
  }

  /* カルーセルのスライドを停止する関数 */
  function StopCarousel() {
    clearInterval(carousel_slide_id);
  }

  /* ページが読み込まれた時カルーセルをスライドする */
  $(document).ready(function () {
    toggle_button(button_new_index);
    StartCarousel();
  });

  /* カルーセルのマウスホバー対応 */
  carousel_slider.hover(
    /* マウスカーソルがカルーセルに当たっている時はカルーセルのスライドを停止 */
    function () {
      StopCarousel();
    },
    /* マウスカーソルがカルーセルから離れた時はカルーセルのスライドを再開 */
    function () {
      StartCarousel();
    }
  );

  /* ボタンのマウスホバー対応 */
  carousel_button.hover(
    /* マウスカーソルがボタンに当たっている時はカルーセルのスライドを停止 */
    function () {
      StopCarousel();
      $(this).css("opacity", 0.8);
    },
    /* マウスカーソルがボタンから離れた時はカルーセルのスライドを再開 */
    function () {
      StartCarousel();
      var index = carousel_button.index(this);
      if (button_new_index != index) {
        $(this).css("opacity", 0.25);
      }
    }
  );

});
