$(function(){
  function initPage() {
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

  initPage();
});