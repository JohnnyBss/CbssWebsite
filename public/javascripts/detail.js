$(function(){
  let itemMap = [];
  function initPage() {
    imageDes();
    setPageTitle();
  }

  function setPageTitle() {
    let itemID = $('#hidden-itemID').val();
    let year = $('#hidden-year').val();
    let quarter = $('#hidden-quarter').val();
    let itemName = $('#hidden-itemName').val();
    let map = itemName + ' > ' + year + '年' + '第' + quarter + '季度';
    $('.page-title').text(map);
  }

  function getItems(parentID) {
    $.ajax({
      url: '/list/itemByID?itemID=' + parentID,
      type: 'get',
      async: false,
      success: function(res){
        if(res.err){
          layer.msg(res.msg);
          return false;
        }
        itemMap.push(res.data.itemName);
      },
      error: function(XMLHttpRequest){
        layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
      }
    });
  }

  function imageDes(){
    let itemID = $('#hidden-itemID').val();
    let detailID = $('div.small_list').find('ul').find('li').eq(0).find('img').attr('data-detail-id');
    $.ajax({
      url: '/detail/imageMemo?itemID=' + itemID + '&textMapDetail=' + detailID,
      type: 'get',
      success: function (res) {
        if(res.err){
          return false;
        }
        $('div.Text_introduce').find('p').text(res.data.content);
      },
      error: function(XMLHttpRequest){

      }
    });
  }
  /* 商品轮播图（带缩略图的轮播效果） */
  $(".banner").thumbnailImg({
    large_elem: ".large_box",
    small_elem: ".small_list",
    left_btn: ".left_btn",
    right_btn: ".right_btn"
  });
  initPage();
});