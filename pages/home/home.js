// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      //页面渲染模块
      MachineStart:true,

      //机器状态
        model:"",
      //蓝牙模块数据
        BluetoothService:[],
        IsConnect:false,
    },
     /*蓝牙启动模块*/
     BLEConnect:function()
     {
        const app=getApp()
        app.BluetoothListenConnect();
     },
     Location:function()
     {
        getApp().BluetoothinItialization()//测试，初始化蓝牙模块
     },

    /*蓝牙读写模块*/ 
    OpenSwitch:function()
    {
      if(this.data.IsConnect === false)
      {
        wx.showToast({
          title: '蓝牙未连接',
          icon:"error"
        })
        
      }
      else
      {

      }
      /**/
    },
    /**
     * 生命周期函数--监听页面加载
     */ 
    onLoad: function (options) {
      var app = getApp();

      this.setData({
        model:app.globalData.model.name
      })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      var app = getApp();

      this.setData({
        model:app.globalData.model.name
      })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {//通过该函数接受,但只能跳转到非tarbar页面

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },



})


