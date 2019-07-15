//获取应用实例
const app = getApp()
Component({

  /**
  * 组件的属性列表
  */
  properties: {
    serval: {
      type: 'String',
      value: '组线名称'
    },
    value: {
      type: Array,
      value: [],
      observer() {
        this.setTreeData();
      }
    }

  },

  /**
  * 组件的初始数据
  */
  data: {
    treeList: [],
    treeData: [],
    selectedNodeId:'',
    selectedNodeNm:'',
    index: 0,
    left: 40
  },
  // 组件创建函数（如果是后台请求的数据，可以在里面实现）
  created: function () {

    if (this.properties.value.length > 0) {
      this.setData({
       treeData: this.properties.value
      });
    }

    var that = this;
    var array = that.treeData();
    if (array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        var list = that.data.treeList;
        var index_i = that.data.index;
        obj["checked"] = true;
        // 该节点是否打开
        obj["open"] = false;      
        list[index_i] = obj;
        that.setData({
          treeList: list,
          index: index_i + 1
        });
        if (obj.children != undefined) {
          that.collectTree(obj.children);
        }
      }
    }
  },
  ready: function () {
    var that = this;
    that.setData({
      treeList: that.data.treeList
    });
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setTreeData:function()
    {
      if (this.properties.value.length > 0) {
        this.setData({
          treeData: this.properties.value
        });

        var that = this;
        var array = that.treeData();
        if (array.length > 0) {
          for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            var list = that.data.treeList;
            var index_i = that.data.index;
            obj["checked"] = true;
            // 该节点是否打开
            obj["open"] = false;         
            list[index_i] = obj;
            that.setData({
              treeList: list,
              index: index_i + 1
            });
            if (obj.children != undefined) {
              that.collectTree(obj.children);
            }
          }
        }
        //this.triggerEvent('created', this.properties.value);        
        this.reloadTreeData()
      }
    },
    collectTree: function (list) {
      var that = this;
      if (list.length > 0) {
        for (var j = 0; j < list.length; j++) {
          var list1 = that.data.treeList;
          var index_i = that.data.index;
          var obj1 = list[j];
          obj1["checked"] = false;
          // 该节点是否打开
          obj1["open"] = false;
          list1[index_i] = obj1;
          that.setData({
            treeList: list1,
            index: index_i + 1
          });

          if (obj1.children == undefined) {
            continue;
          } else {
            if (obj1.children.length > 0) {
              that.collectTree(obj1.children);
            }
          }
        }
      }
    },
    //选中单位，提交
    chooseNode:function(e)
    {
      var that=this;
      this.setData({
        selectedNodeId: e.target.id,
        selectedNodeNm:e.target.dataset.name
      });
    },
    getChooseNode:function(e)
    {
      var that=this;
      return that.data.selectedNodeId
    },
    getChooseNodeNm: function (e) {
      var that = this;
      return that.data.selectedNodeNm
    },
    selectNode: function (e) {
      var that = this;
      var trees = that.data.treeList;
      for (var i = 0; i < trees.length; i++) {
        var obj = trees[i];
        if (e.target.id == obj.id) {
          if (obj.open) {
            obj["open"] = false;
            trees[i] = obj;
            for (var j = i; j < trees.length; j++) {
              var obj1 = trees[j];
              if (obj1.code.indexOf(e.target.id) >= 0 && e.target.id != obj1.id) {
                obj1["checked"] = false;
                obj1["open"] = false;
                trees[j] = obj1;
              }
            }
          } else {
            obj["open"] = true;
            trees[i] = obj;
            for (var j = 0; j < trees.length; j++) {
              var obj1 = trees[j];
              if (e.target.id == obj1.parentId) {
                obj1["checked"] = true;
                trees[j] = obj1;
              }
            }
          }
        }
      }

      that.setData({
        treeList: trees
      });
      that.reloadTreeData()
      //console.log(that.data.treeList);
    },
    // 重新对tree进行循环
    reloadTreeData: function (id) {
      var that = this;
      var list = that.data.treeList;
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          var obj = list[i];
          if (id == obj.parentId) {
            if (obj.checked) {
              obj["checked"] = false;
            } else {
              obj["checked"] = true;
            }
            list[i] = obj;
            that.setData({
              treeList: list
            });
            that.reloadTreeData(obj.id);
          } else {
            list[i] = obj;
            that.setData({
              treeList: list
            });
          }
        }
      }
    },
    treeData: function () {
      var that = this;
      let cloneData = that.data.treeData;    // 对源数据深度克隆
      let tree = cloneData.filter((father) => {              //循环所有项
        let branchArr = cloneData.filter((child) => {
          return father.id == child.parentId      //返回每一项的子级数组
        });
        if (branchArr.length > 0) {
          father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.parentId == 0;      //返回第一层
      });
      return tree     //返回树形数据
    }
  }
})
