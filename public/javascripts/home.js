var app = new Vue({
  el: '#app',
  data: {
    newsList: [],
    pageNumber: 0,
    pageSize: 6
  },
  methods: {
    loadNewsList: function () {
      this.pageNumber++;
      $.ajax({
        url: '/home/newsList?pageNumber=' + this.pageNumber,
        type: 'get',
        success: function(res){
          if(res.err){
            layer.msg(res.msg);
            return false;
          }
          if(res.dataList.length === 0){
            layer.msg('没有数据啦！');
            return false;
          }
          $.each(res.dataList, function (index, news) {
            app.$data.newsList.push({
              newsUrl: '/news?newsID=' + news.newsID,
              thumbnailUrl: news.thumbnailUrl,
              newsTitle: news.newsTitle,
              newsDate: news.newsDate
            });
          });
        },
        error: function(XMLHttpRequest){
          layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    loadMore: function () {
      this.loadNewsList();
    }
  },
  mounted: function () {
    this.loadNewsList(1);
  }
});