// pages/treeTest/treeTest.js
var api = require('../../utils/api.js')
var app = getApp()
Page({
  data: {
     treeData: [{ id: 1, parentId: 0, name: "一级菜单A", rank: 1, code: '1' },// rank:代表第几级树节点；code：代表包含哪些子节点ID；
    { id: 2, parentId: 0, name: "一级菜单B", rank: 1, code: '2' },
    { id: 3, parentId: 0, name: "一级菜单C", rank: 1, code: '3' },
    { id: 4, parentId: 1, name: "二级菜单A-A", rank: 2, code: '1,4' },
    { id: 5, parentId: 1, name: "二级菜单A-B", rank: 2, code: '1,5' },
    { id: 6, parentId: 2, name: "二级菜单B-A", rank: 2, code: '2,6' },
    { id: 7, parentId: 4, name: "三级菜单A-A-A", rank: 3, code: '1,4,7' },
  { id: 8, parentId: 7, name: "四级菜单A-A-A-A", rank: 4, code: '1,4,7,8' },
  { id: 9, parentId: 8, name: "五级菜单A-A-A-A-A", rank: 5, code: '1,4,7,8,9' },
    { id: 10, parentId: 9, name: "六级菜单A-A-A-A-A-A", rank: 6, code: '1,4,7,8,9,10' },
    { id: 11, parentId: 10, name: "七级菜单A-A-A-A-A-A-A", rank: 7, code: '1,4,7,8,9,10,11' },
    { id: 12, parentId: 11, name: "八级菜单A-A-A-A-A-A-A-A", rank: 8, code: '1,4,7,8,9,10,11,12' },
    { id: 13, parentId: 12, name: "九级菜单A-A-A-A-A-A-A-A-A", rank: 9, code: '1,4,7,8,9,10,11,12,13' },
    { id: 14, parentId: 13, name: "十级菜单A-A-A-A-A-A-A-A-A-A", rank: 10, code: '1,4,7,8,9,10,11,12,13,14' },
     ], 
    index: 0,
    left: 40,
    total: 0,
    loading: true
  },

  onLoad() {

  },
  onShow() {
   // this.setData({
     // treeData: [],
     // loading: true
    //});
    //var tree = this.selectComponent("#treebar"); //组件的id
    //tree.setTreeData()
   // this.getGroupList();
  }, 
  btnSave: function ()  {
    var tree = this.selectComponent("#treebar"); //组件的id
    var selectedId = tree.getChooseNode()
    var selectNm=tree.getChooseNodeNm()
    if (selectedId != null && selectedId != '') {
      console.log(selectedId)
      let pages = getCurrentPages();  // 当前页的数据，可以输出来看看有什么东西
      let prevPage = pages[pages.length - 2];  // 上一页的数据，也可以输出来看看有什么东西 
      prevPage.setData({
        groupID: selectedId,
        groupNm: selectNm
      })      
      wx.navigateBack({})  
    }
  },
  btnCancel:function(){
    wx.navigateBack({})
  }
});