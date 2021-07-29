<template>
  <div>
    <el-row style="text-align: left">
      <el-col :span="12">

        <!-- <video width="600"
               poster="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">

        </video> -->
      </el-col>
      
      <el-col :span="12">
        <div style="margin-top:5px;">

          <!-- <div class="eventtext">
            活动名称：{{EventName}}
          </div> -->

          <!-- label是列表里的姓名， value是即下拉选择器的“选项一” 必须每个都不同 -->
          <div>
                <span style="display: inline-block; width:45%; color:#ccc ">指定说话人:{{""}}</span><br><br>
                  <el-select v-model="value" placeholder="默认说话人">               
                        <el-option
                        v-for="item in options"               
                        :key="item.value"
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                  </el-select>   
                <br><br>

                <span style="display: inline-block; width:55%; color:#ccc ">新用户注册:{{""}}</span> <br><br>
                <el-input v-model="userName" type="text" placeholder="请输入名字" size="medium" maxlength= "100"  style="width:250px;"></el-input><br><br>
                <el-input v-model="userPhone" type="text" placeholder="请输入电话" size="medium" maxlength="11"  style="width:250px;"></el-input>
                
                <el-button type="success"  @click="sendRegister()">注册</el-button>
                <br><br>

                <!----- 语音训练功能 ----->
                <span style="display: inline-block; width:45%; color:#ccc; ">语音训练:{{""}}</span><br><br>

                <span style="display: inline-block; width:45%; color:#ccc;  fontSize: 21px">选择用户:{{""}}</span><br><br>
                  <el-select v-model="valueUse" placeholder="默认无用户">               
                        <el-option
                        v-for="item in options"               
                        :key="item.value"
                        :label="item.label" 
                        :value="item.value">
                        </el-option>
                  </el-select>   
                  <br><br>

                <!-- 阅读材料 折叠 -->
                 <el-collapse v-model="activeNames" @change="handleChange">
                      <el-collapse-item title="阅读材料一病历样本" name="1">
                        <div>胆囊形态饱满,壁厚,未见异常密度影。左肾可见类圆形低密度影,界清,径约0.6CM,平扫CT值约31HU,增强扫描未见强化。脾脏、胰腺、右肾形态大小正常范围,未见异常密度影。</div>
                        <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
                      </el-collapse-item>

                      <el-collapse-item title="阅读材料二" name="2">                 
                        <div>春日起每早, 采桑惊啼鸟； 风过扑鼻香，花开花落知多少。</div>                     
                      </el-collapse-item>       
                </el-collapse>

                <br><br>
                <el-button @click="recStart()" type="success">开始录音</el-button>
                <el-button @click="recStop()" type="danger">停止</el-button>

          </div>      
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  beforeRouteLeave (to, from, next) { if(this.ws){ this.ws.close() } },
  data() {
    return {

      //Collapse折叠面板参数设置
      activeNames: ['1'],

      phoneUser:'',
      userName:'',
      userPhone:'',
      // combo:{},

      url: '/static/media/1_2.jpg',
      EventName: '',
      StartTime: '',
      EndTime: '',
      EventManager: '',

      //指定说话人 下拉选择器
			// options: [{

        //     value: '1',
        //     label: '医生1'
			  // 	}, {
        // 		value: '2',
        // 		label: '医生2'
			  // 		}, 				
			  // 	],

        options: [],

        //value在下面被定义类型为char 不是num。即这个数组的index 从0开始
        value: '',
        valueUse: '',
        array:[],

        
    }
  },
  mounted() {

    //拿到说话人列表
    this.getSpeakerList();
    this.initWebSocket();

    this.recorder = new this.Recorder({

          sampleBits: 16,                // 采样位数，支持 8 或 16，默认是16
          sampleRate: 16000,             // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
          numChannels: 1,                // 声道，支持 1 或 2， 默认是1
                                         // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
    });
    
  },

  watch: {

    //识别下拉选择器的选择value 因为首页用到 电话号码必须设为全局
    value:function(value){

      console.log('监听到指定说话人更改，当前指定的是',value)
       
       //将当前phone值设为全局：如何取到那个phone：先把value转成num类型，就有array[value].phone
        var index = parseInt(value)
        console.log(index)

        var phoneNum = this.array[index].phone
        console.log(phoneNum)
         
        //将当前选取的人的电话值(char)设置为全局
        window.localStorage.setItem('pho', phoneNum);
 
    },

    // 训练下拉选择器的选择value
    valueUse:function(valueUse){

       console.log('用户选择更改，当前选择的是',valueUse);
       
       //将当前phone值设为全局：如何取到那个phone：先把value转成num类型，就有array[value].phone
        var index = parseInt(valueUse)
        console.log(index)

        //phoneUser是最后一步要传入停止按钮的电话号码
        this.phoneUser = this.array[index].phone
        console.log(this.phoneUser)

    },

     //监听输入框输入的用户手机号
     userPhone:function(userPhone) {

        console.log('用户手机号为:',userPhone) 
             
    },

    //监听输入框输入的用户名
    userName:function(userName){

        console.log('用户姓名为:',userName)
    
    },

  },

  methods: {
     
    //训练阅读材料折叠面板 参数设置
    handleChange(val) {
        console.log(val);
      },
    
    //获取说话人列表
    getSpeakerList() {
				console.log('发起一次获取说话人的列表请求')
				axios.get('http://10.11.96.46:12080/get_users', {}).then((response) => {

              //获取消息一次		
              this.options =[];
              this.array = [];
              // console.log('*****',this.array)
              this.array = response.data

              // console.log('&&&&&&',this.array)

              console.log('获取到服务端的说话人表',this.array)

              for(var i = 0; i < this.array.length; i++){

                    //label设置成取到的列表里的人名， value是下拉选择器的“选项” 必须每个都不同              
                    var va = String(i);
                    var la = this.array[i].name + ' ' + this.array[i].phone;
                    var x = { value: va, label: la };

                    //console.log(x)
                    this.options.push(x);
              }		

				}).catch(function(error) {
					console.log("error", error); 
				})
			},

    // 还没用上）判断是否为手机号 如果不是 提示重新输入！！
      isPoneAvailable: function (pone) {
        
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(pone)) {
              return false;
            } else {
              return true;
            }
      },

  //=============================以下是训练功能部分==========================/

    initWebSocket() {

        // 注释掉是因为会一直报警 连接断开
        // 初始化websocket
        let wsuri = 'ws://10.11.96.46:12031'
        this.ws = new WebSocket(wsuri)
        this.ws.onmessage = this.websocketonmessage
        this.ws.onopen = this.websocketonopen
        this.ws.onerror = this.websocketonerror
        this.ws.onclose = this.websocketclose

    },

    websocketonopen() {
      console.log('注册和训练接口的websocket, 连接成功')
    },


    //获取websocket推送的数据
    websocketonmessage(e) {
      
          // 0 表示返回成功 1表示失败
          // JSON.parse(e.data) 是一个对象   {code: 1, description: "Successfully registered 8273474."}
         
          console.log('返回的数据已获取，是',e.data)
          let moVal = JSON.parse(e.data).mode

          if(moVal == 0){
              console.log('现在是注册，mode值是', moVal)
          }
          if(moVal == 1){
              console.log('现在是训练，mode值是', moVal)
          }

          let code = JSON.parse(e.data).code         
          console.log('训练的返回code值为',code)

          //如果返回成功
          if(code == '0'){

            //注册成功
            if(moVal == 0){

                  this.$notify.info({
                      title: '注册结果',
                      message: '用户注册成功',
                      position: 'bottom-left',
                      duration: 3000									
                   });
               
                  this.getSpeakerList();

            }

            //训练成功
            if(moVal == 1){

                  this.$notify.info({
                        title: '训练结果',
                        message: '用户训练成功',
                        position: 'bottom-left',
                        duration: 5000									
                  });
            }

          //如果返回失败
          }else {
            //注册失败
            if(moVal == 0){

              this.$notify.info({
                  title: '注册结果',
                  message: '用户注册失败',
                  position: 'bottom-left',
                  duration: 5000									
                });

            }
            //训练失败
            if(moVal == 1){

                this.$notify.info({
                      title: '训练结果',
                      message: '用户训练失败',
                      position: 'bottom-left',
                      duration: 5000									
                });
            }
          }
    },
    
    // 连接失败时重新连接
    websocketonerror(){
          this.initWebSocket()
          console.log('连接已失败，开始重新连接')
    },

    // 断开链接后报错
    websocketclose(e){

          console.log('断开连接', e)
          // 断开后重新连接
          this.initWebSocket() 
    },
     //点击“注册”按钮 发送注册请求 将人名和电话发出去 mode == 0是注册 mode == 1是训练
    sendRegister(){

        // var newPhone = window.localStorage.getItem('newPhone');
        // var newUser  = window.localStorage.getItem('newUser');
        // 记得解封注释 console.log('点击函数生效 这是拿到的电话和名字', newPhone, newUser);

        console.log('点击函数生效 这是拿到的电话和名字', this.userPhone, this.userName);

        var temp = {    
                
            //之前注册的phone拿到这里 全局getItem一下
            mode:  0,
            phone: this.userPhone,
            name:  this.userName,

        }  

        this.ws.send(JSON.stringify(temp))

    },

    // 开始录音
    recStart(){ 

        this.recorder.start().then(() => {   

            this.recording=1;
            console.log("录音开始");

        }, (error) => {

            // 出错了
            console.log("录音出错");

        });

    },

    //将录音发送回服务端
    recStop(){

        // this.recorder.stop();
        console.log("stop函数触发")
        this.recording = 0;

        //获取blob
        var a= this.recorder.getWAVBlob()
        var file 

      
        console.log('点击函数生效 这是拿到的电话', this.phoneUser);

        a.arrayBuffer().then((result)=> {

              console.log('拿到结果准备发给服务端')
              console.log(result)
              file = new Uint8Array(result)
              var temp = {                   
                    //之前在选择用户下拉栏选中的人的phone拿到这里 全局getItem一下
                    mode:  1,
                    phone: this.phoneUser,
                    file:  file,                   
              }  
              this.ws.send( JSON.stringify(temp) )

        })
    },

    recPlay(){

        this.recording=0;
        this.recorder.play();
    },
    recDownload(){

        this.recording=0;
        this.recorder.downloadWAV('test');
    },

    handleClose(done){
				done();
		},

    reload() {

        this.isRouterAlive = false
        this.$nextTick(function () {
            this.isRouterAlive = true
            //console.log('reload')

        })
    },
       
      // *** 注册接口如果是http的要怎么写？
      // sendRegister(){
      // var newPhone = window.localStorage.getItem('newPhone');
      // var newUser = window.localStorage.getItem('newUser');
      // console.log('点击函数生效 这是拿到的电话和名字',newPhone, newUser)

      // axios.get('http://10.11.96.46:12080/register_v1', {

			// 			// // console.log('连接注册接口')

			// 			"phone": newPhone,
			// 			"name" : newUser,
      //       "mode" : 0,

			// 	}).then((response) => {
			// 		  // var nn = response.data.results
			// 			// console.log(nn)

      //       console.log('已连接注册接口')

			// 	}).catch(function(error){

			// 			console.log("error",error);
			// 	})

  }

}
</script>
<style>
.groupbox-boarder {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 0px 0px #000;
}
.one-of-groupbox-boarder {
  padding: 0 10px;
  text-align: left;
  /* background-color: #428bca; */
  /* color: #fffffb; */
}
.eventtext {
  font-size: 20px;
  padding: 10px;
  color:#ccc;
}
</style>