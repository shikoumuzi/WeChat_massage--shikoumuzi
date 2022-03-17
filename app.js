// pages/home/home.js
App({//app.js内这里是App 而不是Page

    /**
     * 页面的初始数据
     */
    globalData:
    {
        model:{name:"小憩一下",temperature:"40",time:"15min",dosage:"100"},
        BluetoothMachineDeviceld:"",
        BluetoothMachineSeervice:[],
        
        saveFile_for_ind:[//保存的个性化设置
            {name:"小憩一下",temperature:"40",time:"15min",dosage:"100"},
            {name:"午间休息",temperature:"30",time:"30min",dosage:"60"},
            {name:"长时舒缓",temperature:"30",time:"1h",dosage:"60"},
        ],
        model:{name:"小憩一下",temperature:"40",time:"15min",dosage:"100"},
        BluetoothinItializte:false
    },

    
    BluetoothinItialization:function()//初始化蓝牙模块
    {
        wx.openBluetoothAdapter({
        mode: 'central',//主机模式
          success:(res)=>
          {
            console.log(res)
            this.globalData.BluetoothinItializte=true
            console.log("初始化成功")
          },
          fail:(err)=>
          {
            console.log(err)

            var title_set = ""
            switch(err.errCode)//错误提示
            {
            case 10000:
                title_set = "蓝牙未打开"
                break
            case 10001:
                title_set = "蓝牙不可用"
                break
            case 10002:
                title_set = "没有找到设备"
                break;
            case 10003:
                title_set = "当前连接已断开"
                break
            case 10009:
                title_set = "系统版本太低"
                break
            case 10012:
                title_set = "连接超时"
                break
            default:
                console.log(err.errCode)
                title_set = "未知错误"
                break
            }
            console.log(err)
            wx.showModal({
              cancelColor: 'cancelColor',
              title: "错误提示",
              content: title_set
            })
          }

        })
        console.log(" BluetoothinItialization()结束")
    },

    BluetoothListenConnect:function()//蓝牙信号的监听以及连接
    {
        var that = this
        console.log("开始信号监听")

        console.log("启用链接")
        wx.createBLEConnection({//连接
          deviceId: that.globalData.BluetoothMachineDeviceld,
          success:(res)=>{
            wx.getBLEDeviceServices({
                deviceId:that.globalData.BluetoothMachineDeviceld,
                success:function(res){
                    console.log("getDeviced");
                    for (var t = 0; t < res.services.length; t++) {
                        console.log(service)
                        var serviceId = service.uuid.substring(4, 8)//截取特征值
                        if (serviceId === 'FFE0') {             //‘FFE0’为设备定义的读写UUID
                            that.serviceId = service.uuid
                        }
                    }
                },
                fail:(res)=>{
                    console.log("getDevicedfailed")
                }
            })
          }
        })
        console.log(" BluetoothListenConnect()结束")

    },
    /**
     * 小程序初始化完成时触发，全局只触发一次。
     */ 
    onLaunch (options) {
        //请求蓝牙授权
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
        var that = this;
        wx.getSetting({
            success(res) {
            if(!res.authSetting['scope.userLocationBackground'])
            {
                wx.authorize({
                    scope: 'scope.userLocationBackground',
                    success () {
                        // 用户已经同意小程序使用蓝牙功能，后续调用蓝牙接口不会弹窗询问
                        
                    },
                    fail:(err)=>{

                    }
                })
            }
            if (!res.authSetting['scope.bluetooth' ]) {
                wx.authorize({
                scope: 'scope.bluetooth',
                success () {
                    // 用户已经同意小程序使用蓝牙功能，后续调用蓝牙接口不会弹窗询问
                    console.log("初始化成功")
                },
                fail:(res) =>{

                }
                })
            }
            else{
                console.log("调用完毕")
            }

        } }),
        that.BluetoothinItialization()

        //对蓝牙信号进行实时监听
        wx.onBluetoothDeviceFound((res) => {
            console.log(res)
            res.devices.forEach((device) => {//foreach遍历
            // 这里可以做一些过滤
            console.log(device.name + " " + device.deviceId)
                if(device)//对device的判判断
                {
                    console.log(device)
                    that.globalData.BluetoothMachineDeviceld=device
                }
            console.log('Device Found', device)
            })
            // 找到要搜索的设备后，及时停止扫描
            wx.stopBluetoothDevicesDiscovery()
        })
        console.log("BluetoothListenConnect()启用")
        
        that.BluetoothListenConnect();
    },

    /*
    *小程序启动，或从后台进入前台显示时触发。 
    */
    onShow(options){

    },
        
          /**
       * 小程序从前台进入后台时触发
       */
    onHide () {
        // Do something when hide.
      },

      /**
       * 
       * 小程序发生脚本错误或 API 调用报错时触发
       */
    onError (msg) {
        console.log(msg)
      }
    })


