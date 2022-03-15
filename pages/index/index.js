// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CurrentName : "",
        individuation:[
            {name:"Temperature",value:["none","30","40"],checked:false,Switch:false,vaildvalue:"30"},
            {name:"Time", value:["15min","30min","1h"],checked:false, Switch:false,vaildvalue:"30min"},
            {name:"Dosage",vaildvalue:"60"}
        ],
        Reindividuation:[//备份
            {name:"Temperature",value:["none","30","40"],checked:false,Switch:false,vaildvalue:"30"},
            {name:"Time", value:["15min","30min","1h"],checked:false, Switch:false,vaildvalue:"30min"},
            {name:"Dosage",vaildvalue:"60"}
        ],
        saveFile_for_ind:[//保存的个性化设置
            {name:"小憩一下",temperature:"40",time:"15min",dosage:"100"},
            {name:"午间休息",temperature:"30",time:"30min",dosage:"60"},
            {name:"长时舒缓",temperature:"30",time:"1h",dosage:"60"},
        ],

        AddInd:false,//加入个性化设置,用以判断是否渲染自定义表格
        /*以下均为控件必备值*/
        activeName: '1',
        radio: '1',
    },
    //选择是否展开个性化设置
    SwichInindIviduation:function(e)
    {
        console.log("switch working");
        for(var i = 0; i<this.data.individuation.length && this.data.individuation[i].name != "Dosage"; ++i )
        {
            if(this.data.individuation[i].name == e.currentTarget.dataset.labelname.name)
            //需要用currentTarget.dataset.来获取当前数据
            {
                var temp =  this.data.individuation;
                temp[i].Switch =~this.data.individuation[i].Switch;
                console.log(temp[i].Switch);
                this.setData({
                    individuation:temp
                });
                break;
            }
        } 
/*         this.setData({
            
        }) */
    },
    //对用量的滑动条
    slider1change:function(e)
    {
        var temp =this.data.individuation;//不仅可以currentTarget.dataset.，也可以用detail.来取值
        temp[2].vaildvalue = e.detail.value;
        console.log(temp);
        this.setData({
            individuation:temp
        })
    },
    SaveFile:function(e)//这里需要一个后端接口
    {
        console.log("saveing")
        var temp =  {name:"NULL",temperature:"",time:"",dosage:""};
        temp.name = this.data.CurrentName;
        if(temp.name === "")
        {
            temp.name = "自定义配置" + (this.data.saveFile_for_ind.length - 2);//默认名字
        }
        for(var i = 0;i<this.data.individuation.length;++i)
        {
            switch(this.data.individuation[i].name)
            {
            case "Temperature":
                temp.temperature = this.data.individuation[i].vaildvalue;
                break;
            case "Time":
                temp.time = this.data.individuation[i].vaildvalue;
                break;
            case "Dosage":
                temp.dosage = this.data.individuation[i].vaildvalue;
                break;
            default:
                break;
            }
        }
        this.data.saveFile_for_ind[ this.data.saveFile_for_ind.length] =  temp;

        /*这里插入一个后端接口保存*/
        this.setData({//还原默认值
            individuation:this.data.Reindividuation,
            saveFile_for_ind: this.data.saveFile_for_ind,
            CurrentName:""
        })
        wx.showToast({
          title: '已保存个性设置',
        })
        this.setData({
            AddInd:false
        })
    },//还有问题
    pushIndivid:function(e)//决定是否渲染表单的函数
    {
        if(this.data.AddInd === false)
        {
            this.setData
            ({
                AddInd:true
            })
        }
    },
    onChangecollapse(event) {
        this.setData({
          activeName: event.detail,
        });
      },

    onChange(event) {//个性化配置的改变函数
         var i = 0;
         console.log(event.detail.substring(0,4))

         for( ;i < this.data.individuation.length; ++i)//查找对应的信息
         {
             var index = 0;
            index = event.detail.indexOf(':');
             if( (index = event.detail.indexOf(':')) != -1 && event.detail.substring(0,index) == this.data.individuation[i].name)
             {
                 console.log("index get")
                event.detail = event.detail.substring(index + 1);
                break;//找到对应的信息
             }
         }
         console.log(event.detail)
         var temp = this.data.individuation;
         temp[i].vaildvalue = event.detail;//修改原值
        this.setData({
          individuation:temp
        });
    },
    onChangeinput(event)
      {
        console.log(this.data.CurrentName);
   
        this.setData({
            CurrentName:event.detail
        })
    },

    beforeenter(event)
    {
        if(this.data.saveFile_for_ind.length >= 8)
        {
            this.setData({
                AddInd:false
            })
            wx.showToast({
                title: '配置不准超过8',
                icon:"error"
            })
        }
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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