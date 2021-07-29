<template>
  <div class="bg">
    
    <img src="../assets/newheader3.jpg">
 
    <div class="wrapper">
      <div class="css1">
      <el-tabs tab-position="left"
               type="border-card"
               v-model="activeTabName"
               @tab-click="changetab">

        <el-tab-pane name="A">
			  <span slot="label"><img src="../assets/icon-1.png" />首页</span>
          <componet is='test'>
          </componet>
        </el-tab-pane>

        <el-tab-pane name="B">
        <span slot="label"><img src="../assets/icon-2.png" />数据驾驶舱</span>
          <componet is='medicalb'
                    v-if="isshow2"> </componet>
        </el-tab-pane>
        
        <el-tab-pane name="C">
					 <span slot="label"><img src="../assets/icon-3.png" />综合联络</span>
          <componet is='videosessionNew'
                    v-if="isshow3">
          </componet>
        </el-tab-pane>

        <el-tab-pane name="D">
					 <span slot="label"><img src="../assets/icon-4.png" />消息平台</span>
          <componet is='messagelist'
                    v-if="isshow4">
          </componet>
        </el-tab-pane>
        <el-tab-pane name="E">
					 <span slot="label"><img src="../assets/icon-5.png" />后台管理</span>
          <componet is='backgroundmanagement'
                    v-if="isshow5">
          </componet>
        </el-tab-pane>

        <el-tab-pane name="F">
					 <span slot="label"><img src="../assets/icon-3.png" />输血仿真</span>
          <componet is='simulation'
                    v-if="isshow6">
          </componet>
        </el-tab-pane>
      </el-tabs>

      <!------- 语音助手弹窗 ---------->
      <el-dialog title="语音助手"
		           :visible.sync="voiceDialogVisible"
		           :before-close="handleClose"
		           style="text-align:left; font-color: #ffffff" class="mydialog">
			<el-row>
        <div style="margin-left: 100px">				   	 	
              <i class="el-icon-chat-dot-round" style="font-size: 80px; color: #98FB98"></i>&nbsp;&nbsp;	    	
              <span style="text-align:center;font-size:30px;color: #ffffff;font-weight: 700;">需要我为你做什么？</span>
        </div>
			</el-row>
			 <!--------- 搜索栏 ---------->
			<el-row>
				<div class="box">
            <div class="searchBox">
                		<!-- <input type="text" v-model="keyword" placeholder="请输入关键词进行搜索" class="searchInput" style="padding-left: 10px;">
                		<input type="button"  @click="_search" value="搜索" class="searchButton"> -->

                    <input type="text"  placeholder="请输入关键词进行搜索" class="searchInput" style="padding-left: 10px;">
                		<input type="button" value="搜索" class="searchButton">
             </div>
         </div>
			</el-row>
			<el-row>
				</br>
				</br>
				<div>
					<div style="font-size:25px;color: #ffffff; margin-left: 150px">试着对我说:</div></br></br>

					<p class="app">“搜索车辆”</p></br></br>
		
					<p class="app">“搜索病人”</p></br></br>
				
					<p class="app">“推荐调度方案”</p></br></br>	
				</div>

			</el-row>
		</el-dialog>

    <!-- 语音图标 -->
    </div>
       <!-- 原来的语音助手弹窗 废除 -->
       <!-- <span class="iconfont" @click="voiceDialogVisible = true" style="color:red">&#xe6c5;</span> -->

      <!-- 按下键盘的空格键 触发录音图标变成红色 style前面要加冒号 等于号后面不能有空格 让颜色变蓝 不然就是bug-->
       <span class="iconfont" :style="voiceColor">&#xe6c5;</span>
           
    </div>
  </div>
  
</template>

<script>
import global from '../components/global.vue'
import axios from 'axios';
import test from './test.vue'
import medicalb from './medicalb.vue'
import medicalresource from './medicalresource.vue'
import messagelist from './messagelist.vue'
import videosessionNew from './videosessionNew.vue'
import backgroundmanagement from './backgroundmanagement.vue'
import simulation from './simulation.vue'
export default {

  // beforeRouteLeave (to, from, next) { if(this.ws){ this.ws.close() } },
  components: {
    'test': test,
    'medicalb': medicalb,
    'videosessionNew': videosessionNew,
    'medicalresource': medicalresource,
    'messagelist': messagelist,
    'backgroundmanagement': backgroundmanagement,
    'simulation': simulation
  },
  provide() { // 注册一个方法
    return {
      reload: this.reload
    }
  },

  sockets: {

          news: function (data) {
            //收到的消息会在这里
            console.log('首页 收到普通消息')

            this.$notify.info({
              title: '通知',
              message: data.MessageTitle,
              duration: 300000
              // duration: 0
            });
          },
          
          news1: function (data) {
            console.log('我知道了2');
            this.$notify.info({
              title: '通知',
              message: data.MessageTitle,
              duration: 300000

            });
          },

          alert: function (data) {
            //收到的消息会在这里
            console.log('首页 收到病人求助消息')
            // console.log(data)
            
            this.$notify({
              title: '上报病人',
              message: data.MessageTitle,
              type: 'warning',
              duration: 300000
              // duration: 0
            });
          },

          alert0: function (data) {

            this.$notify({
              title: '上报病人',
              message: data.MessageTitle,
              type: 'warning',
              duration: 300000
              // duration: 0
            });
          },
          
          help: function (data) {
              //收到的消息会在这里
              console.log('首页 收到普通求助消息')

              this.$notify({
                title: '请求远程支持',
                message: data.MessageTitle,
                type: 'warning',
                duration: 20000
              });
          },
  },
  data() {
    return {

      // //将全局变量赋值到data里面
      // // dialogGlobal: global.dialogGlobal,  

      // //第二种全局变量的写法
      // dialogGlobal: this.GLOBAL.dialogGlobal,  

      // //dialogVisible是应急预案 按钮点击 出来的弹窗标记，默认为关闭状态
			// dialogVisible: false,

      // diaResult1 : false,

      // //dialogDetailVisible1是应急预案弹窗上“一级”小 按钮点击 出来的弹窗标记
			// dialogDetailVisible1: false,

      //语音图标的弹窗标记
			voiceDialogVisible: false,

      msg1: '互联网大会',
      msg2: '2019/9/25 16:00:00',
      isRouterAlive: true,
      msg3: '',
      msg4: '',
      num1: '',
      num2: '',
      num3: '',
      num4: '',
      num5: '',
      num6: '',
      activeTabName: 'A',
      
      isshow2: false,
      isshow3: false,
      isshow4: false,
      isshow5: false,
      isshow6: false,
      
      //voiceColor表示的是语音图标的style 上面的格式是 style="color:red" 或 
      //style="voiceColor"  下面voiceColor的函数里是 if。。。style = {color: black}

      //但是这里写成 voiceColor:{ color:black } 会报错 tab切换时候除首页之外其他tab页都显示不出
      voiceColor: null,
      recorder: null,
      ws:null,
      recording:0
    }
  },
  mounted() {
    this.getTime();
    this.getAllStatusCount();

    //  //---------------------------------- 语音录入部分 ----------------------------------------------------------------//
    //  this.initWebSocket();
    //  this.recorder = new this.Recorder({
    //       sampleBits: 16,                   // 采样位数，支持 8 或 16，默认是16
    //       sampleRate: 16000,               // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    //       numChannels: 1,                 // 声道，支持 1 或 2， 默认是1
    //                                      // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    // });
    // var that=this

    // //  这一段暂时注释掉
    // document.onkeydown = function(e) {
    //         // console.log('触发按下空格事件')
    //         //事件对象兼容
    //         let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
    //         //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
    //         //左
    //         if (e1 && e1.keyCode==40) {
    //               if(that.recording==0){

    //                 that.recStart()
    //                 that.voiceColor = {
    //                   color: '#FF0000',

    //                 }
    //             } 
    //         };
    // };

    // document.onkeyup = function(e) {
    //         // console.log('空格键弹起')
    //         //事件对象兼容
    //         let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
    //         //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
    //         //左
    //         if (e1 && e1.keyCode==40) {

    //             that.recStop()
    //             console.log('录音结束')
    //             that.voiceColor = {
    //               color: '#000000',

    //             }
    //         } 
    //         // else console.log("333")
    // };

},

  watch: {
            
			// //应急预案查询弹窗
			// dialogGlobal:function(dialogGlobal){

			// 	  console.log('监听到预案查询按钮弹窗值更改，dialogGlobal当前为', dialogGlobal)

			// 	  //将当前弹窗的dialog值(true or false)设置为全局
      //     // window.localStorage.setItem('diaMain', dialogVisible)

			// },

      // //聚集踩踏一级弹窗
			// dialogDetailVisible1:function(dialogDetailVisible1){

			// 	  console.log('监听到预案查询按钮弹窗值更改，当前为', dialogDetailVisible1)
				  
			// 	  //将当前弹窗的dialog值(true or false)设置为全局
      //     window.localStorage.setItem('dia1', dialogDetailVisible1)

			// },

			// //聚集踩踏里面的数组
			// checkList1:function(checkList1){

			// 	  console.log('监听到预案查询按钮弹窗值更改，当前为', checkList1)
				  
			// 	  //将当前弹窗的dialog值(true or false)设置为全局
      //     window.localStorage.setItem('keyList', checkList1)
			// },
		},

  methods: {

    // initWebSocket() {

    //   // 下面这段注释掉是因为会一直报警 连接断开
    //   // 初始化websocket

    //   let wsuri = 'ws://10.11.96.46:12032'
    //   this.ws = new WebSocket(wsuri)
    //   this.ws.onmessage = this.websocketonmessage
    //   this.ws.onopen = this.websocketonopen
    //   this.ws.onerror = this.websocketonerror
    //   this.ws.onclose = this.websocketclose

    // },
    // websocketonopen() {
    //   console.log('识别接口的websocket 连接成功')
    // },

    // //----- 获取websocket推送的数据
    // websocketonmessage(e) {
    
    //   let msg = JSON.parse(e.data)[0]
    //   let ifSpeakBySelf = ''

    //   console.log('数据已获取,msg为',msg)
    //   //打印结果是{code: 0, trans: "现在开始第四次测试"}

    //   //取到返回的信息里的文字字段
    //   console.log(msg.trans)  

    //   if(msg.trans == ""){

    //      msg.trans = '识别内容为空'
    //   }

    //   if(msg.score >= 0){        
    //      msg.trans = msg.trans.concat('是当前说话人') 

    //   }else{
    //       msg.trans = msg.trans.concat('不是当前说话人') 
    //   }

    //   // 触发应急预案查询按钮: 是否识别结果包含这个字段？
    //   if(msg.trans.indexOf("应急预案查询") != -1){

    //         // 取到这个字段时 设置全局的'diaMain'的key对应的value('dialogVisible')为true

    //         // 这里面两个 dialog 值，一个是 dialogVisible(应急预案窗口) 和 dialogDetailVisible1(聚集踩踏窗口), 都要首次在这里创建，而不是在test.vue创建。并设置成全局变量
    //         // window.localStorage.setItem('diaMain', this.dialogVisible);

    //         console.log("检测到说话中含命令字样，此时dialogGlobal值是",this.dialogGlobal);

    //         this.dialogGlobal = true;

    //         console.log("将dialogGlobal设成true后，应急dialogGlobal值是",this.dialogGlobal)

    //         // window.localStorage.setItem('dia1', this.diaResult1);

    //        if(msg.trans.indexOf("聚集踩踏一级") != -1){
              
    //             //先弹出当前对话框
    //               var diaResult1 = window.localStorage.getItem('dia1');
    //               this.diaResult1 = true;
    //               console.log("聚集踩踏一级的dialog值是", this.diaResult1)
               
    //                 // 让前一步的对话框消失
    //                  this.dialogVisible = false;

    //                 console.log('发起一次应急预案查询请求')
    //                 var keyList = window.localStorage.getItem('keyList');

    //                 if( keyList.length < 6){
    //                       axios.post('/oneClickEmergPlan', {

    //                           // console.log('发起第二次查询请求'),
    //                             "type": "聚集踩踏",
    //                             "classification": "一级"
                            
    //                       }).catch(function(error){
    //                         console.log("error",error);
    //                       })

    //                 }  
    //        }     
    //   }
      
    //   //------------------------------------------     弹出文本识别结果 直接写在这里--------------------------------------
    //   this.$notify.info({
 
    //         title: '语音内容',
    //         message: msg.trans,
    //         position: 'bottom-left',
    //         duration: 5000
									
		// 	});

    // },
    
    // // 连接失败时重新连接
    // websocketonerror() {
    //   this.initWebSocket()
    // },

    // // 断开链接后报错
    // websocketclose(e) {
    //   console.log('断开连接', e)
    //   this.initWebSocket() 
    //   //断开后重新连接
    // },

    // recStart(){ 
      
    //   this.recorder.start().then(() => {
    //     // 开始录音
    //     this.recording=1;
    //     console.log("录音开始");
    // }, (error) => {
    //     // 出错了
    //     console.log("录音出错");
    // });
    // },

    // // ----------------------------------------发送回服务端-----------------
    // recStop(){
    //     // this.recorder.stop();
    //     console.log("stop")
    //     this.recording=0;
    //     var a= this.recorder.getWAVBlob()
    //     var file 
    //     a.arrayBuffer().then((result)=> {

    //         console.log('拿到结果准备发给服务端')
    //         console.log(result)
    //         file = new Uint8Array(result)
            
    //         //取到在voiceinfo.vue里设置的全局变量pho对应的值（即电话号码的值）
    //         var phoResult = window.localStorage.getItem('pho');

    //         var j={ 

    //           //原来是name         
    //           phone:phoResult,
    //           file:file
    //         } 
    //         console.log('指定说话人的电话号码为',j.phone,'（即将传给服务端）')       
    //         this.ws.send(JSON.stringify(j))

    //     })

    //     // console.log('%o',a.arrayBuffer)
    //     // console.log('%o',a)

    // },
    // recPlay(){

    //     this.recording=0;
    //     this.recorder.play();
    // },
    // recDownload(){

    //     this.recording=0;
    //     this.recorder.downloadWAV('test');
    // },
 


    // startRecord(){
    //   this.style = {
    //     color: red
    //   }
    // },
    // endRecord(){
   
    //   this.style = {
    //     color: black
    //   }
    // },

    handleClose(done) {
				done();
		},
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
        //console.log('reload')
      })
    },
    changetab(tab, b) {
      console.log('切换tab')
      switch (tab.name) {
        case 'B':
          this.isshow3 = false
          this.isshow4 = false
          this.isshow5 = false
          this.isshow2 = true
          this.isshow6 = false

          break
        case 'C':
          this.isshow2 = false
          this.isshow3 = true
          this.isshow4 = false
          this.isshow5 = false
          this.isshow6 = false
          break
        case 'D':
          this.isshow2 = false
          this.isshow4 = true
          this.isshow3 = false
          this.isshow5 = false
          this.isshow6 = false
          break
        case 'E':
          this.isshow2 = false
          this.isshow5 = true
          this.isshow4 = false
          this.isshow3 = false
          this.isshow6 = false
          break
        case 'F':
          this.isshow2 = false
          this.isshow5 = false
          this.isshow4 = false
          this.isshow3 = false
          this.isshow6 = true
          break

        default:
          break
      }
    },
    getTime() {
      setInterval(() => {
        //new Date() new一个data对象，当前日期和时间
        // //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        // this.msg3 = new Date(parseInt(time) * 1000).toLocaleString('chinese', { hour12: false }).replace(/:d{1,2}$/, ' ');

        this.msg3 = new Date().toLocaleString('chinese', { hour12: false });
        // this.msg4 = this.caltime(s1, this.msg2)
        var a = new Date(this.msg3.replace(/-/g, "/"));
        var b = new Date(this.msg2.replace(/-/g, "/"));
        this.caltime(a, b)
      }, 1000)
    },
    caltime(a, b) {
      var date3 = a - b;   //时间差的毫秒数     
      //计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000))
      //计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))
      //计算相差秒数
      var leave3 = leave2 % (60 * 1000)          //计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      this.msg4 = days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒"
    },

    getAllStatusCount() {
      axios.get('/getAllStatusCount', {}).then((response) => {
          // console.log(response.data.results)
          var nn = response.data.results
          this.num1 = nn.chuzhiwancheng
          this.num2 = nn.chuzhizhong
          this.num3 = nn.daihousong
          this.num4 = nn.housongzhong
          this.num6 = nn.yichuyuan
          this.num5 = nn.yiruyuan

      }).catch(function (error) {       
          console.log("error", error);
      })
    },
  }
}

</script>
<style>

  /* 包裹语音iconfont和地图的外层div */
    .wrapper{
	    position: relative;
    }

  /* 语音图标 */
  .iconfont{
		position: absolute;
		/* put 语音图标 覆盖 tab条 */
  		z-index: 3; 
  		background: rgb(167, 223, 223);
  		width: 55px;
		/* 语音图标距离外层wrapper左边缘1%，上边缘90% 如果设置成px也可以，就是不会随着浏览器窗口缩小而改变位置了 */
  		left: 5%;
  		top: 85%;
	}
  
	/* body{
		height: 100%;
	} */
	/* body>div{
		height: 100%;
	} */
  
  /* 隐藏页面滚动条 */
  ::-webkit-scrollbar{
      display:none;
  }
	.bg{
		background:url(../assets/bg.png) no-repeat top left;
    /* 第一个100%是蓝色布满整个页面宽度 第二个100%是蓝色布满整个页面的高度 */
		background-size:100% 100%;
		height: 100%;
	}  
  .css1{
		height: 100%;
	}
	.bg>img{
		/* width:100%; */
    width: 100%;
	}
	
.css1 .el-tabs--border-card {
  /* background: #74adda; */
  border:0;
  background-color: transparent;
  height: 100%;
}
.css1 .el-tabs--border-card > .el-tabs__header {
  /* background-color: #4575b4; */
  height: 961px !important;
  border:0;
  background: linear-gradient(rgba(12,12,114,.5),rgba(57,92,209,.5));
  padding-top:20px;
}
.css1 .el-tabs--border-card > .is-left{
	border:0 !important;
	height: 100%;
}
/* tabs悬浮颜色 */
.css1 .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #1930c1;
  position: relative;
}
.css1 .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active:before {
	content: '';
	position: absolute;
	top:0;
	left:0;
	width:3px;
	height: 100%;
  background-color: #1c58f0;
}
.el-tabs--left.el-tabs--border-card .el-tabs__item.is-left.is-active{
	border:0;
}
/* tabs名字改成白色 */
.css1 .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #fff;
  font-size: 16px;
  text-align: center;
  font-weight: 700;
  height: 100px;
  width:140px;
  padding-top:13px;
  padding-bottom:13px;
  border:0;
  margin-bottom:36px;
 
}
.css1 .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover{
	color:#fff;
	opacity: .8;
}
.css1 .el-tabs--border-card > .el-tabs__header .el-tabs__item span{
	  display: block;
	  width:100%;
	  height: 100%;
}
.css1 .el-tabs--border-card > .el-tabs__header .el-tabs__item span img{
  	  display: block;margin:0 auto; margin-bottom:5px;
}
</style>
