var api = require('../../utils/api.js')
var app = getApp()
var interval;
Page({
  data: {
    loading: false,
    phoneNum: '',
    vfCode: '',
    groupID:'',
    groupNm:'',
    time: '获取验证码', //倒计时 
    currentTime: 61,
    vfCodeBtnDisable: false
  },

  onLoad() {},
  onShow() {

  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  
  chooseGroup:function(e)
  {
    wx.navigateTo({
      url: '../../pages/group_select/index'
    })
  } 
  
})