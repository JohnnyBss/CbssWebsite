var json0 = {
  "a1": {
    "a-1": {
      "0": "a-1-1",
      "a-1-1": ["a-1-1-1", "a-1-1-1"]
    },
    "0": "a-1",
    "1": "a-1"
  },
  "b": {
    "0": "b-1",
    "b-1": ["b-1-1", "b-1-1"],
    "1": "b-1"
  }
};
var json1 = {
  "a2": {
    "a-2": {
      "0": "a-2-1",
      "a-2-1": ["a-2-1-1", "a-2-1-1"]
    },
    "0": "a-2",
    "1": "a-2"
  },
  "b": {
    "0": "b-1",
    "b-1": ["b-1-1", "b-1-1"],
    "1": "b-1"
  }
};
var json2 = {
  "a3": {
    "a-3": {
      "0": "a-3-1",
      "a-3-1": ["a-3-1-1", "a-3-1-1"]
    },
    "0": "a-3",
    "1": "a-3"
  },
  "b": {
    "0": "b-1",
    "b-1": ["b-1-1", "b-1-1"],
    "1": "b-1"
  }
};
var json3 = {
  "a4": {
    "a-4": {
      "0": "a-4-1",
      "a-4-1": ["a-4-1-1", "a-4-1-1"]
    },
    "0": "a-4",
    "1": "a-4"
  },
  "b": {
    "0": "b-1",
    "b-1": ["b-1-1", "b-1-1"],
    "1": "b-1"
  }
};

let _item = [
    {"itemID":42,"itemName":"网点外部设置相关标牌","parentItemID":11,"itemType":"I"},
    {"itemID":43,"itemName":"网点外部设置醒目的门楣标牌","parentItemID":42,"itemType":"I"},
    {"itemID":44,"itemName":"网点外部设置醒目的机构名称标牌","parentItemID":42,"itemType":"I"},
    {"itemID":45,"itemName":"网点外部设置醒目的营业时间标牌","parentItemID":42,"itemType":"I"},
    {"itemID":46,"itemName":"门楣标牌考评点1","parentItemID":43,"itemType":"I"},
    {"itemID":47,"itemName":"门楣标牌考评点2","parentItemID":43,"itemType":"I"},
    {"itemID":48,"itemName":"门楣标牌考评点3","parentItemID":43,"itemType":"I"},
    {"itemID":55,"itemName":"2017年第1季度","parentItemID":46,"itemType":"D"},
    {"itemID":49,"itemName":"机构名称标牌考评点1","parentItemID":44,"itemType":"I"},
    {"itemID":50,"itemName":"机构名称标牌考评点2","parentItemID":44,"itemType":"I"},
    {"itemID":51,"itemName":"机构名称标牌考评点3","parentItemID":44,"itemType":"I"},
    {"itemID":52,"itemName":"营业时间标牌考评点1","parentItemID":45,"itemType":"I"},
    {"itemID":53,"itemName":"营业时间标牌考评点2","parentItemID":45,"itemType":"I"},
    {"itemID":54,"itemName":"营业时间标牌考评点3","parentItemID":45,"itemType":"I"}
  ];

$(function() {
  let items = [];
  $(".select p").click(function(e) {
    $(this).parent().toggleClass('open');
    e.stopPropagation();
  });

  $(".select ul li").click(function(e) {
    var _this = $(this);
    _this.parent().siblings('p').text(_this.attr('data-value'));
    _this.addClass("Selected").siblings().removeClass("Selected");
    _this.parent().parent().removeClass("open");
    e.stopPropagation();
  });

  $(document).on('click', function() {
    $(".select").removeClass("open");
  });

  /* make tree */

  /*递归实现获取无级树数据并生成DOM结构*/
  let str = "";
  function forTree(o) {
    let urlstr = "";
    let keys = [];
    for(let key in o) {
      keys.push(key);
    }
    for(let j = 0; j < keys.length; j++) {
      k = keys[j];
      if(typeof o[k] === "object") {
        urlstr = "<div class='tab-content'><h3>" + k + "</h3><ul>";
      } else {
        urlstr = "<div><li><p>" + o[k] + "</p><a herf=''>查看详情</a></li><ul>";
      }
      str += urlstr;
      let kcn = 0;
      if(typeof o[k] === "object") {
        for(let kc in o[k]) {
          kcn++;
        }
      }
      if(kcn > 0) {
        forTree(o[k]);
      }
      str += "</ul></div>";
    }
    return str;
  }

  /*添加无级树*/
  function addtree(obj, index) {
    str = '';
    if(undefined === index) {
      index = 0;
    }
    let json = eval('json' + index);
    $(obj).html(forTree(json));
    $(obj).find('ul').each(
        function(index, element) {
          let ulContent = $(element).html();
          let spanContent = $(element).siblings("h3").html();
          if(ulContent) {
            $(element).siblings("h3").html(spanContent + '<i class="add"></i>')
          }
        });

    $(obj).find("div h3").click(function() {
      let ul = $(this).siblings("ul");
      let spanStr = $(this).html();
      let spanContent = spanStr.substr(0, spanStr.length);
      if(ul.find("div").html() != null) {
        if(ul.css("display") === "none") {
          ul.show(300);
          $(this).html(spanContent + '<i class="sub"></i>');
        } else {
          ul.hide(300);
          $(this).html(spanContent + '<i class="add"></i>');
        }
      }
    });
  }

  function getItems(parentID) {
    $.ajax({
      url: '/list/item?parentItemID=' + parentID,
      type: 'get',
      async: false,
      success: function(res){
        if(res.err){
          layer.msg(res.msg);
          return false;
        }
        if(res.dataList.length === 0){
          return false;
        }
        $.each(res.dataList, function (index, data) {
          items.push({
            itemID: data.itemID,
            itemName: data.itemName,
            parentItemID: data.parentItemID,
            itemType: data.itemType
          });
        });
        $.each(res.dataList, function (index, data) {
          getItems(data.itemID);
        });

      },
      error: function(XMLHttpRequest){
        layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
      }
    });
  }

  /**
   * 加载当前模块的考评项目
   */
  function loadBlocks() {
    $.ajax({
      url: '/list/item?parentItemID=' + $('#hidden-itemID').val(),
      type: 'get',
      success: function(res){
        if(res.err){
          layer.msg(res.msg);
          return false;
        }
        $.each(res.dataList, function (index, data) {
          if(index === 0){
            $('ul.tabs-ul').append(
                '<li>\n' +
                ' <a class="tab-active" data-index="' + index + '" href="#" data-item-id="' + data.itemID + '">' + data.itemName + '</a>\n' +
                '</li>');
          }else{
            $('ul.tabs-ul').append(
                '<li>\n' +
                ' <a data-index="' + index + '" href="#" data-item-id="' + data.itemID + '">' + data.itemName + '</a>\n' +
                '</li>');
          }
        });
        let widget = $('.tabs-vertical');
        let content = widget.find('.tabs-content-placeholder > div.tabblock');
        let tabs = widget.find('ul a');
        let obj = $('.menuTree')[0];
        tabs.on('click', function(e) {
          e.preventDefault();
          // Get the data-index attribute, and show the matching content div
          let index = $(this).data('index');
          // add tree
          let cur_div = $("#content").children("div").get(index);
          $(cur_div).addClass('tab-content-active').siblings('div').removeClass('tab-content-active');
          getItems($(this).attr('data-item-id'));
          let a = items;
          //addtree(cur_div, index);

          tabs.removeClass('tab-active');
          content.removeClass('tab-content-active');

          $(this).addClass('tab-active');
          content.eq(index).addClass('tab-content-active');

        });
        addtree(obj);
      },
      error: function(XMLHttpRequest){
        layer.msg('远程服务无响应，状态码：' + XMLHttpRequest.status);
      }
    });
  }

  loadBlocks();
});

