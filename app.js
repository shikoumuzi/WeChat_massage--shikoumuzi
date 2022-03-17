// pages/home/home.js
App({//app.js内这里是App 而不是Page

    /**
     * 页面的初始数据
     */
    data: {
        model:{name:"小憩一下",temperature:"40",time:"15min",dosage:"100"},
        BluetoothMachineDeviceld:""
    },
    globalData:
    {
        saveFile_for_ind:[//保存的个性化设置
            {name:"小憩一下",temperature:"40",time:"15min",dosage:"100"},
            {name:"午间休息",temperature:"30",time:"30min",dosage:"60"},
            {name:"长时舒缓",temperature:"30",time:"1h",dosage:"60"},
        ],
        model:{name:"小憩一下",temperature:"40",time:"15min",dosage:"100"}
    },

    
    BluetoothinItialization:function()//初始化蓝牙模块
    {
        console.log("初始化成功")
        wx.openBluetoothAdapter({
        mode: 'central',//主机模式
          success:()=>
          {
            console.log("初始化成功")

          },
          fail:(err)=>
          {
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
                console.log(err.errno)
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
    },

    /**
     * 小程序初始化完成时触发，全局只触发一次。
     */ 
    onLaunch (options) {

        //请求蓝牙授权
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
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
                    getApp().BluetoothinItialization()
                    
                },
                fail:(res) =>{

                }
                })
            }
            else{
                getApp().BluetoothinItialization()
                console.log("调用完毕")
            }
        } }),
        console.log("开始信号监听")
        //对蓝牙信号进行实时监听
        wx.onBluetoothDeviceFound((res) => {
            res.devices.forEach((device) => {//foreach遍历
              // 这里可以做一些过滤

              console.log('Device Found', device)
            })
            // 找到要搜索的设备后，及时停止扫描
            wx.stopBluetoothDevicesDiscovery()
          })
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


