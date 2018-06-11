let express = require('express');
let commonService = require('../service/commonService');
let sysConfig = require('../config/sysConfig');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let service = new commonService.commonInvoke('detail4Item');
  let bankID = sysConfig.bankID;
  let branchID = sysConfig.branchID;
  let itemID = req.query.itemID;
  let year = req.query.year;
  let quarter = req.query.quarter;

  let parameter = bankID + '/' + branchID + '/' + itemID + '/' + year + '/' + quarter;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){

    }else{
      let isOnlyFile = true;
      for(let i = 0; i < result.content.responseData.length; i++){
        if(result.content.responseData[i].contentType !== 'F'){
          isOnlyFile = false;
          break;
        }
      }

      let imageList = [];
      let fileList = [];
      let itemName = '';
      if(result.content.responseData.length > 0){
        itemName = result.content.responseData[0].itemVO.itemName;
      }
      result.content.responseData.forEach(function(data,index){
        if(data.contentType === 'I'){
          imageList.push({
            detailID: data.detailID,
            imageUrl: data.content,
            isVideo: false
          });
        }
        if(data.contentType === 'V'){
          imageList.push({
            detailID: data.detailID,
            videoUrl: data.content,
            imageUrl: '/images/icons/video.jpeg',
            isVideo: true
          });
        }
        if(data.contentType === 'F'){
          fileList.push({
            fileName: data.content.substr(data.content.lastIndexOf('/') + 1),
            fileUrl: data.content
          });
        }
      });

      if(isOnlyFile){
        res.render('detailOnlyFile', {
          title: '考评点明细',
          fileList:fileList,
          itemID: itemID,
          itemName: itemName,
          year: year,
          quarter: quarter
        });
      }else{
        res.render('detail', {
          title: '考评点明细',
          imageList: imageList,
          fileList:fileList,
          itemID: itemID,
          itemName: itemName,
          year: year,
          quarter: quarter
        });
      }
    }
  });
});

router.get('/imageMemo', function (req, res, next) {
  let service = new commonService.commonInvoke('detail4ImageMemo');
  let parameter = '/' + sysConfig.bankID + '/' + sysConfig.branchID + '/' + req.query.itemID + '/' + req.query.textMapDetail;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

router.get('/imageMemo', function (req, res, next) {
  let service = new commonService.commonInvoke('detail4ImageMemo');
  let parameter = '/' + sysConfig.bankID + '/' + sysConfig.branchID + '/' + req.query.itemID + '/' + req.query.textMapDetail;

  service.get(parameter, function (result) {
    if(result.err || !result.content.result){
      res.json({
        err: true,
        msg: result.msg
      });
    }else{
      res.json({
        err: !result.content.result,
        msg: result.content.responseMessage,
        data: result.content.responseData
      });
    }
  });
});

module.exports = router;
