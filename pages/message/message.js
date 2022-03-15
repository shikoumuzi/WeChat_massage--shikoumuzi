// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        message_self:{
            "name":"NULL",
            "path":"/static/tabarimage/account-outline.256x256.png",//用户头像
            "Isempty":true
        },
        "path":"/static/home/36cfe8d94d562db81db69189b96415e6e7f00fa1.jpg@518w.webp",//用户头像
        machines:[{name:"广药加热按摩仪",value:"一款以精油舒缓身心，加热按摩呵护颈椎为主打的产品",Id:"0x00001F"}],//存放设备信息
        //如下为组件必备
        activeNames: ['1'],
    },
    MessageSelf:function(){
        var that = this
        //这样可以保证是获取到最外头的对象
        //不干扰内部函数的this
        if (that.data.message_self["Isempty"] == true)//当其为空
        {
            wx.getUserProfile({
            //也可以用button的方式 open-type：getUserinfo 来调用老方法来获取用户信息
              desc: '正在获取',//写了这个才能够弹出提示框
              success:function(res){
                  console.log("获取成功",res)
                  console.log(that.data.message_self)
                  that.setData({//同时更改前后端，传入字典
                       message_self:{
                        "name":res.userInfo.nickName,//获取用户名字
                        "path":res.userInfo.avatarUrl,//用户头像
                        "Isempty":false
                       }
                  })
                  console.log(that.data.message_self)

              },
              fail:function(res){//调用失败时
                /*wx.openSetting({//打开权限，让用户确定是否已经授权了
                  withSubscriptions: true,
                })*/
                console.log("获取失败",res)
              },
              complete:function(res){//调用结束

              }
            })
        }
        else//当其存在数据
        {
          console.log("shikoumuzi")
          console.log(that.data.message_self)
            wx.navigateTo({
              url: '/pages/message_user/message_user?name=' + that.data.message_self["name"] +"&path=" + 
              that.data.message_self["path"] + "&Isempty=false"//这里只能一个一个参数以字符串后缀的形式传递，多个参数之间用“ & ” 分隔不能够直接传递一个字典
            })
        }
    },
    
    onChange(event) {
      this.setData({
        activeNames: event.detail,
      });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setBackgroundColor({
        backgroundColor: '#F0FFFF', // 窗口的背景色为白色
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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

    }
})