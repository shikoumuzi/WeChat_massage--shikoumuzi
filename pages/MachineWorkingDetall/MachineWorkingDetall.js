// pages/MachineWorkingDetall/MachineWorkingDetall.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       // message:"李",//此时数据同wxml文件当中的对应{{}}所绑定数据一致，相当于同一个变量
        BluetoothStatus:[],
        IsConnect:false,
        outputdata:"",
        callbackBluetooth:"",
        wornning:"working",
    },
    Working:function(data_e,callbackFun){
        var that = this;
        if(data_e.currentTarget.dataset.IsConnect === true)//需要currentTarget.dataset来获取当前传过来的变量
        {
            console.log("workong")
            this.setData({
            callbackfunBluetooth:callbackfun,
            BluetoothStatus:data_e.currentTarget.dataset.BluetoothStatus,
            IsConnect:data_e.IsConnect,
            wornning:"working"
        })
        var outputdaa = 0;
            switch(data_E)
            {
            case 0://短时
                break;
            case 1://中时
                break;
            case 2://长时
                break;
            default:
                break;
            }
        }
        else{
            console.log("can not use bluetooth");
            that.setData
            this.setData({
                wornning:"请检查蓝牙,然后重试连接设备"
            });
            setTimeout(
            function(){wx.showToast({
              title: '蓝牙调用失败',
              icon:'error'
            })},500),

            setTimeout((function callback() 
            {console.log("跳转中")}),3000);

            var pages = getCurrentPages(); //当前页面
            var beforePage = pages[pages.length - 2]; //前一页
            beforePage.onLoad(); // 执行前一个页面的onLoad方法
            wx.navigateBack({
              delta: 1
            });
        }
       //严格注意拼写
        //console.log(this.data.message_for_mode);//获取数据
        //this.setData({message_for_mode : "fu11"})
        //如果像python一样直接指出对应变量进行修改的话，那么只会修改后端的值
        //用setDate可以同时修改前端和后端的值
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /*var nid = options.currentTarget.dataset.nid;
        console.log(nid);*/
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