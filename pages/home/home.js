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
 /*蓝牙模块*/
  MachineBluetooth:function(e){
      var data = e.currentTarget.dataset.status;
      
      wx.openBluetoothAdapter({//初始化蓝牙模块
        mode: 'central',
        success:function(res){

          console.log("搜索蓝牙模块");
          wx.startBluetoothDevicesDiscovery({//搜索蓝牙模块
            services:[],//指示主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
            allowDuplicatesKey: false,
            powerLevel:innerHeight,
            success:function(res){

              console.log("连接蓝牙模块")
              wx.createBLEConnection({//连接蓝牙设备
                deviceId:this.deviceId, // 搜索到设备的 deviceId
                success: () => {
                  console.log("蓝牙设备连接成功");
                  // 连接成功，获取服务
                  this.setData({
                    IsConnect:true,//显示已经连接
                  });
                  console.log("is connect now")
                  wx.getBLEDeviceServices({//获取服务
                    deviceId,
                    success: (res) => {
              
                      for (let i = 0; i < res.services.length; i++) {
                        if (res.services[i].isPrimary) {//获取从设备上的所有服务
                          this.setData({
                              BluetoothService: this.data.BluetoothService + res.services[i]//增加服务列表
                          })
                          // 可根据具体业务需要，选择一个主服务进行通信
                        }
                      }
                    },
                    fail:(res) =>{//获取服务失败
                        console.log("service con not  get for machine please check machine");
                        wx.closeBLEConnection({
                          deviceId: 'deviceId',
                        })
                    }
                  })
                },
                fail: (res)=>{
                  console.log(" connect can not ready ");
                  wx.closeBluetoothAdapter({
                    success: (res) => {},
                  })
                }
              })
            }
            
          })
        },
        fail:(res)=>
        {
          wx.showToast({
            title: '初始化失败',
          })
          console.log("初始化失败")
        },
        fail:(res)=>
        {
          wx.stopBluetoothDevicesDiscovery({
            success: (res) => {
              console.log("蓝牙搜索结束,请检查蓝牙是否打开")
            },
          })
        }
      })
  },

})


