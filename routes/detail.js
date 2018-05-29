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

      if(isOnlyFile){
        res.render('detailOnlyFile', { title: '考评点明细', detailList: result.content.responseData});
      }else{
        res.render('detail', { title: '考评点明细', detailList: result.content.responseData });
      }
    }
  });
});

module.exports = router;
