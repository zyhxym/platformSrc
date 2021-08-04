<template>
   <!-- videosessionNew 是tab栏里的综合联络页面 -->
  <div>
    <!-- <img src="../assets/newheader.jpg"> -->
    <div class="backcolor1">
      <!-- <el-row :gutter="1"> -->
      <!-- <el-row :gutter="1" style="padding-top:10px;" > -->
        <el-container >
          <!-------------------------------------- 第一大列 搜索分栏 ---------------------------->
          <el-aside width="200px" style="height: 650px;  text-align: right; font-size: 30px; margin-top: 55px">
            <el-col  :offset="1" >
                  <!-- 搜索框 -->
                <el-row>
                    <div class="box">
                      <div class="searchBox">
                        <input type="text"    placeholder=""   class="searchInput" style="padding-left: 1px;">
                        <input type="button"   value="搜索"    class="searchButton">
                      </div>
                    </div>
                    </br>
                </el-row>
                <!-- 树形控件 急救站组 -->
                <el-row >   
                  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" ></el-tree>
                </el-row>
            </el-col>
          </el-aside>
          <!------------------------------------- 第二大宽列 头像列 ----------------------------->
         <!-- <el-main style="border: 5px solid #eee">  -->
                 <!-- 加上边框是这么写的 -->
         <el-main >
          <el-col  style="padding-top:0px;">
              <!-- 第一行 头像窗口 -->
              <el-row  type="flex" justify="center">           
                <!-- 第一列 现场通话 -->
                <el-col :span="7">
                  <div v-if="showass">
                    <div class="text-v">
                      现场通话
                    </div>
                    <video id="501"
                          playsinline=""
                          width="400"
                          height="400"
                          autoplay
                          controls
                          poster="../assets/tx1.jpg"
                          style="object-fit:cover">
                    </video>                    
                  </div>
                  <div v-else>
                    <div class="text-v">
                      AR眼镜
                    </div>
                    <video id="Android11"
                          controls
                          autoplay
                          width="400"
                          height="400"
                          poster="../assets/tx1.jpg"
                          playsinline="">
                    </video>
                  </div>
                </el-col>
                <!-- 第二列 车辆通话 -->
                <el-col :span="7">
                  <div class="text-v">
                    车辆通话
                  </div>
                  <video id="502"
                        playsinline=""
                        width="400"
                        height="400"
                        poster="../assets/tx1.jpg"
                        autoplay
                        controls
                        style="object-fit:cover">
                  </video>                  
                </el-col>
                <!-- 第三列 医院通话 -->
                <el-col :span="7">
                  <div class="text-v">
                    医院通话
                  </div>
                  <video id="310"
                        playsinline=""
                        width="400"
                        height="400"
                        poster="../assets/tx1.jpg"
                        autoplay
                        controls
                        style="object-fit:cover">
                  </video>                 
                </el-col>
              </el-row>
              <!-- 第二行 头像窗口 -->
              <el-row :gutter="10" style="margin-top:10px;margin-bottom:0px;" type="flex" justify="center">
                <el-col :span="7">
                <!--  <video id="myPlayer"
                        width="450"
                        height="400"
                        controls
                        autoplay
                        poster="../assets/tx1.jpg"
                        webkit-playsinline>
                    <source src="http://hls01open.ys7.com/openlive/b61dd31246a441179438f5bdf093cfe5.m3u8" />
                  </video> -->
                  <div class="text-v">
                    现场实况
                  </div>
                  <!-- <video id="cmsv6flash"
                        playsinline=""
                        width="400"
                        height="400"
                        poster="../assets/tx1.jpg"
                        autoplay
                        controls
                        style="object-fit:cover">
                  </video>   --> 
                  <div style="margin:0 auto;">
        <div style= "width:400px;height:400px;">
            <iframe ref="iframe" width="400" height="400" allowfullscreen="true" scrolling="no"></iframe>
       </div>
       </div>              
                </el-col>
                <el-col :span="7">
                  <div class="text-v">
                    指 挥
                  </div>
                  <video id="901"
                        playsinline=""
                        width="400"
                        height="400"
                        poster="../assets/tx1.jpg"
                        autoplay
                        controls
                        style="object-fit:cover">
                  </video>                 
                  <!-- <video id="myPlayer2"
                          width="450"
                          height="400"
                          controls
                          autoplay
                          poster="/static/media/sky.jpg"
                          webkit-playsinline>

                      <source src="http://hls01open.ys7.com/openlive/95e93e36c95d44299a66e9d891275360.hd.m3u8" />
                    </video>
                    <div style="padding: 14px;font-size:20px;">
                      <span>车辆实况</span>
                    </div> -->
                </el-col>
                <el-col :span="7">
                  <div class="text-v">
                    专 家
                  </div>
                  <video id="401"
                        playsinline=""
                        width="400"
                        height="400"
                        poster="../assets/tx1.jpg"
                        controls
                        autoplay
                        style="object-fit:cover">
                  </video>                  
                  <video id="local"
                    height="0">
              </video>
                </el-col>
              </el-row>
          </el-col>              
        </el-main>
        </el-container>  
      <!-- </el-row> -->
    </div>
  </div>
</template>
<script>
import scriptjs from 'scriptjs'
import axios from 'axios';
import global from './global.vue'

export default {
  components: {


  },
  sockets: {


  },
  data() {
    return {
      //判断现场还是眼镜 GYX 19/9/14
      showass: true,
      showcar: true,
      GNo:'',
      showPatinfo: false,
      perinfo: {},
      ExpertList: [],
      choosenpatient: '',
      showPMH: false,
      //消息列表展示的消息类型 A 病人B会场 无
      type: '',
      curpatient: '',
      curhelp: '',
      //以下是既往病历

      // 右侧树形图控件
      data: [{
              label: '现场医疗组',
              children: [{
                
                label: '杭州奥体中心',
              
              },
              {
                label: '黄龙体育中心',
                
              },
              {
                label: '大运河亚运公园',
                
              }]

        }, {
                label: '救护车组',
                children: [{
                  label: '救护车1',
                  
                }, {
                  label: '救护车2',
                
                }]

        }, {
                label: '医院组',
                children: [{
                  label: '浙医二院',
                  
                }, {
                  label: '杭州市第一人民医院',
                
                },
                {
                  label: '浙江省人民医院',
                
                }]

        },{

                label: '后勤组',
                children: [{
                  label: '后勤人员1',
                  
                }, {
                  label: '后勤人员2',
                
                }]

        },
        {
                label: '专家组',
                children: [{
                  label: '专家1',
                  
                }, {
                  label: '专家2',
                
                }]

        },
        {
          label: '巡诊无人车',
          children: [{
            label: '无人车1',
            
          }, {
            label: '无人车2',
           
          }]

        },
        {
          label: '运输无人机',
          children: [{
            label: '无人机1',
            
          }, {
            label: '无人机2',
           
          }]

        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
       
    }
  },
  watch: {
    showass: function (val, oldval) {
      console.log(val, '变化一次', '监听')
    },
    showcar: function (val, oldval) {
      console.log(val, '变化一次', '监听')
    },
  },
  mounted() {

    // var player = new EZuikit.EZUIPlayer('myPlayer');
    // var player2 = new EZuikit.EZUIPlayer('myPlayer2');
    //单兵地址
    this.$refs.iframe.contentWindow.location.replace(
                "http://47.105.139.224:8088/808gps/open/player/video.html?lang=zh&devIdno=192982&account=zjsys&password=000000"
            );
        

    window.configData = {
      "sdkappid": 1400203281,
      "users": [{
        "userId": "web01",
        "userToken": "eJwtzMEKgkAUheF3mXXI9d7MEloUJRRRwYSUO2NGuVrNYKZB9O6Zujzfgf8jTjvp1LoUgUAHxKjbrPSj4pQ7bvQV3OF4qiKxlpUI3DEAAuHU7R-9tlzq1j3PQwDoteL73yboAxGBP1Q4a7s3TMAcGhPabU3WLPIihyIyGK820XktaZmls-2LjjK8zMX3B-JvMNo_"
      }]
    }


    WebRTCAPI.fn.detectRTC({
      screenshare: true
    }, function (info) {
      if (!info.support) {
        alert('不支持WebRTC')
      } else {
        // alert('支持WebRTC！')
      }
    });
    var _mtac = { "senseHash": 0 };
    (function () {
      var mta = document.createElement("script");
      mta.src = "//pingjs.qq.com/h5/stats.js";
      mta.setAttribute("name", "MTAH5");
      mta.setAttribute("sid", "500538821");
      mta.setAttribute("cid", "500538834");
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(mta, s);
    })();

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'UA-121844058-1');
    // do your logic.
    // 实例化，绑定事件等操作
    var sdkappid = configData.sdkappid;
    var users = configData.users;


    // window.onload = function () {
    //   push();
    // }

    // 渲染出用户
    (function render() {
      var html = '';
      users.forEach(user => {
        html += '<option value="' + user.userId + '">' + user.userId + '</option>';
      });
      $('#userId').html(html);
    })();
    //页面加载前预登录预推流
    push();


    function onKickout() {
      //alert("on kick out!");
    }

    function quitRTC() {
      stopRTC();
      RTC.quit();
      window.close(); //关闭当前页面
      $("#video-section").hide();
      $("#input-container").show();
      $("#remote-video-wrap").html("");
    }

    function onRelayTimeout(msg) {
      alert("onRelayTimeout!" + (msg ? JSON.stringify(msg) : ""));
    }
    //禁止进入陌生人
    function createVideoElement(id, isLocal) {
      console.log('开始创建div')
      var videoDiv = document.createElement("div");

      videoDiv.innerHTML = '<video id="' + id + '" autoplay ' + (isLocal ? 'muted' : '') + ' playsinline ></source=>';

      document.querySelector("#remote-video-wrap").appendChild(videoDiv);

      return document.getElementById(id);
    }

    function onLocalStreamAdd(info) {
      if (info.stream && info.stream.active === true) {
        var id = "local";
        var video = document.getElementById(id);
        console.log('本地接入')
        if (!video) {
          createVideoElement(id, true);
        }
        var video = document.getElementById(id)
        video.srcObject = info.stream;
        video.muted = true
        video.autoplay = true
        video.playsinline = true
      }
    }
    var that = this
    function onRemoteStreamUpdate(info) {
      console.debug(info)
      console.log(this)

      console.log('远程视频接入')
      // console.log(info.userId, info.videoId)

      if (info.stream && info.stream.active === true) {
        var id = info.userId;
        console.log(id);

        //这里判断是现场通话还是AR眼镜 GYX 19/9/14
        if (id == "Android11") {
          that.showass = false
          console.log('出现了AR')
        }
        else 
          if (id == "501") {
          that.showass = true
          console.log('出现了现场通话')
        }
        else if (id == "503") {
          id = "310"
        }
        else if (id == "503") {
          id = "310"
        }

        else if (id.substring(0,1)=='1') {
          //如果id901 就把它改成901
          id = "501"
        }
        else if (id.substring(0,1)=='2') {
          //如果id901 就把它改成901
          id = "502"
        }
        else if (id.substring(0,1)=='3') {
          //如果id901 就把它改成901
          id = "310"
        }else if (id.substring(0,1)=='4') {
          //如果id901 就把它改成901
          id = "401"
        }
        else if (id == "902") {
          //如果id901 就把它改成901
          id = "901"
        }
        else if (id == "903") {
          //如果id903 就把它改成901
          id = "901"
        }
        else if (id == "904") {
          //如果id904 就把它改成901
          id = "901"
        } else if (id == "905") {
          //如果id905 就把它改成901
          id = "901"
        }
          else if (id == "130") {
          //如果id901 就把它改成902
          id = "901"
        }
         else if (id == "402") {
          //如果id901 就把它改成902
          id = "401"
        }
        else {
          console.log('啥也没出现')
        }

        // console.log(this.showass, '视频后')
        var video = document.getElementById(id);
        if (!video) {
          console.log('禁止陌生人加入')
        }
        else {
          video.srcObject = info.stream;
        }

      } else {
        // console.log('欢迎用户' + info.userId + '加入房间');
      }
    }

    function onRemoteStreamRemove(info) {
      // console.log(info.userId + ' 断开了连接');
      var videoNode = document.getElementById(info.userId);
      if (videoNode) {
        videoNode.srcObject = null;
        // document.getElementById(info.videoId).parentElement.removeChild(videoNode);
        document.getElementById(info.userId).parentElement
      }
    }

    function onWebSocketClose() {
      RTC.quit();
    }

    function gotStream(opt, succ) {
      RTC.getLocalStream({
        video: false,
        audio: true,
        videoDevice: opt.videoDevice,
        // 如需指定分辨率，可以在attributes中增加对width和height的约束
        // 否则将获取摄像头的默认分辨率
        // 更多配置项 请参考 接口API
        // https://cloud.tencent.com/document/product/647/17251#webrtcapi.getlocalstream
        // attributes: {
        //   width: 640,
        //   height: 320
        // }
      }, function (info) {
        var stream = info.stream;
        succ(stream)
      });
    }

    function initRTC(opts) {
      window.RTC = new WebRTCAPI({
        userId: opts.userId,
        userSig: opts.userSig,
        sdkAppId: opts.sdkappid,
        accountType: opts.accountType
      }, function () {
        RTC.enterRoom({
          roomid: opts.roomid * 1,
          privateMapKey: opts.privateMapKey,
          role: "user",
        }, function (info) {
          console.warn("init succ", info)
          gotStream({
            audio: true,
            video: false
          }, function (stream) {
            RTC.startRTC({
              stream: stream,
              role: 'user'
            });
          });
          startRTC();
        }, function (error) {
          console.error("init error", error)
        });
      }, function (error) {
        // console.warn("init error", error)
      });

      // 远端流新增/更新
      RTC.on("onRemoteStreamUpdate", onRemoteStreamUpdate)
      // 本地流新增
      RTC.on("onLocalStreamAdd", onLocalStreamAdd)
      // 远端流断开
      RTC.on("onRemoteStreamRemove", onRemoteStreamRemove)
      // 重复登录被T
      RTC.on("onKickout", onKickout)
      // 服务器超时
      RTC.on("onRelayTimeout", onRelayTimeout)

      RTC.on("onErrorNotify", function (info) {
        console.error(info)
        if (info.errorCode === RTC.getErrorCode().GET_LOCAL_CANDIDATE_FAILED) {
          // alert( info.errorMsg )
        }
      });
      RTC.on("onStreamNotify", function (info) {
        // console.warn('onStreamNotify', info)
      });
      RTC.on("onWebSocketNotify", function (info) {
        // console.warn('onWebSocketNotify', info)
      });
      RTC.on("onUserDefinedWebRTCEventNotice", function (info) {
        // console.error( 'onUserDefinedWebRTCEventNotice',info )
      });
    }

    function push() {
      //默认登录了
      // var roomid = $('#roomid').val();
      // var userId = $('#userId').val();

      var roomid = '999'
      var userId = 'web01';
      var userSig = findUserToken(userId);

      $('#c_roomid').html(roomid);
      $('#c_userid').html(userId);

      // 页面处理，显示视频流页面
      $("#video-section").show();
      $("#input-container").hide();

      initRTC({
        "userId": userId,
        "userSig": userSig,
        "sdkappid": sdkappid,
        "accountType": 1, // 随便传一个值，现在没有啥用处
        "roomid": roomid
      });
    }

    function audience() {
      login(true);
    }

    function stopRTC() {
      RTC.stopRTC(0, function (info) {
        // console.debug(info)
      }, function (info) {
        // console.debug(info)
      });
    }

    function stopWs() {
      RTC.global.websocket.close();
    }

    function startRTC() {
      RTC.startRTC(0, function (info) {
        console.debug('success', info)
      }, function (info) {
        console.debug('failed', info)
      });
    }

    function findUserToken(userid) {
      var userToken = null;
      for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.userId === userid) {
          userToken = user.userToken;
          break;
        }
      }
      return userToken;
    }


  },
  destoryed() {
    // 解绑全局事件
    // 销毁实例
  },

  methods: {

    //  下面这个handle是树形控件的
     handleNodeClick(data) {

        console.log('树形控件已点击', '这个树形控件的标签是：',data.label,'这个树形控件的孩子是：', data.children)
             
            if( data.label == '杭州奥体中心' ){

              this.GNo = 'G01'

            }else if( data.label == '黄龙体育中心' ){

              this.GNo = 'G02'

            }else if( data.label == '大运河亚运公园' ){

              this.GNo = 'G11'

            }else if( data.label == '救护车1' ){

              this.GNo = 'G03'

            }else if( data.label == '救护车2' ){

              this.GNo = 'G04'

            }else if( data.label == '浙医二院' ){

              this.GNo = 'G05'

            }else if( data.label == '杭州市第一人民医院' ){

              this.GNo = 'G06'

            }else if( data.label == '浙江省人民医院' ){

              this.GNo = 'G33'

            }else if( data.label == '专家1' ){

              this.GNo = 'G90'

            }else if( data.label == '专家2' ){

              this.GNo = 'G91'

            
            }else{
              this.GNo = ''
            }

           //传组别过去
            axios.post('/pushVideoLeader', {

                "GN": this.GNo

            }).then((response) => {

                 if(this.GNo == 'G01' ){
                   this.$message('已发送视频邀请给杭州奥体中心急救站')

                 }else if(this.GNo == 'G02' ){
                   this.$message('已发送视频邀请给黄龙体育中心急救站')

                 }else if(this.GNo == 'G11' ){
                   this.$message('已发送视频邀请给大运河亚运公园急救站')

                 }else if(this.GNo == 'G03' ){
                   this.$message('已发送视频邀请给救护车1')

                 }else if(this.GNo == 'G04' ){
                   this.$message('已发送视频邀请给救护车2')

                 }else if(this.GNo == 'G05' ){
                   this.$message('已发送视频邀请给浙医二院')

                 }else if(this.GNo == 'G06' ){
                   this.$message('已发送视频邀请给杭州市第一人民医院')

                 }else if(this.GNo == 'G33' ){
                   this.$message('已发送视频邀请给浙江省人民医院')

                 }else if(this.GNo == 'G90' ){
                   this.$message('已发送视频邀请给专家1')

                 }else if(this.GNo == 'G91' ){
                   this.$message('已发送视频邀请给专家2')
                 }


            }).catch(function(error) {
                console.log("error", error);
            }) 
                     
     },
     


    sendinfo() {
      axios.post('/pushVideoAll', {
      }
      )
        .then((response) => {
          console.log('yitongzhi')
        }).catch(function (error) {
          console.log("error", error);
        })

    },
    getPatientInfo(val) {
      axios.post('getPatientInfo', {
        "patientId": val
      }).then(res => {
        console.log(res.data.results[0])
        // var cdata = 'qioalelimam'
        var tt = res.data.results[0]
        // this.choosenpatient = row.PatientId
        this.perinfo = tt
        this.curpatient = tt
        this.type = 'A'
        this.shake($("#myexample"), "red", 4)

      }).catch(function (err) {
        console.log("error", err)
      })
    },
    handleClose(done) {
      done();
    },
    handleClose2(done) {
      done();
    },

    //查看既往病史
    // viewPMH(ss) {
    //   this.showPMH = true
    // },
    shake(ele, cls, times) {//边框闪烁   
      //ele要闪动的元素 cls闪动的类 times 闪动几次  
      var i = 0, t = false, o = ele.attr("class") + " ", c = "", times = times || 2;
      if (t) return;
      t = setInterval(function () {     
        i++; 
        c = i % 2 ? o + cls : o; 
        ele.attr("class", c);
        if (i == 2 * times) { 
          clearInterval(t); 
          ele.removeClass(cls);
         }      
         
         }, 200);
    },
    getExpertList() {
      console.log('推送专家')
      this.showPatinfo = true
      axios.get('/getExpertList', {

         }
      )
        .then((response) => {
          this.ExpertList = response.data.results
        }).catch(function (error) {
          console.log("error", error);
        })

    },
    //将病人推送给医生
    ptoe(index) {

      axios.post('/newExpertPatient', {
        // "token": this.GLOBAL.token,
        "patientId": this.perinfo.PatientId,
        "expertId": this.ExpertList[index].PersonnelID
      })
        .then(response => {

          this.$message('推送成功')
        })
        .catch(function (error) {
          console.log("error", error);
        });

    },


    getGroupInfo(val) {
      axios.post('getGroupInfo', {
        "groupNo": val
      }).then(res => {
        console.log(res.data.results[0])
        var tt = res.data.results[0]
        this.curhelp = tt
        this.type = 'B'
        this.shake($("#myexample"), "red", 4)

      }).catch(function (err) {
        console.log("error", err)
      })
    },
    tuisong() {
      console.log('推送')
    },
    quitRTC() {
      this.stopRTC();
      RTC.quit();
      window.close(); //关闭当前页面
      $("#video-section").hide();
      $("#input-container").show();
      $("#remote-video-wrap").html("");
    },
    stopRTC() {
      RTC.stopRTC(0, function (info) {
        // console.debug(info)
      }, function (info) {
        // console.debug(info)
      });
    },

 

  }
}
</script>
<style>
 /* 隐藏页面滚动条 */
  ::-webkit-scrollbar{
      display:none;
  }
/* 第二种搜索框 */
.box{
    margin: 0 auto;
    padding-top: 10px;
    height: 50px;
    width: 95%;
  }
  .searchBox{ 
    margin: 0 auto;
    width: 88%;
    position: relative;
	  margin-left: 0px;
   
  }
  .searchInput{
    display: inline-block;
    width: 75%;
    height: 38px;
    border: 1px solid #cccccc;
    float: left;
    font-size: 18px;
    box-sizing: border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .searchButton{
    display: inline-block;
    width: 25%;
    height: 38px;
    line-height: 40px;
    float: left;
    background-color: #1e4557;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    border: none;
    color: #fff;
  }
 
.backcolor1 {
  color: white;
}
.text-v {
  color:rgb(252, 247, 247);
  font-weight: 700;
  font-size: 25px;
  /* font-weight: bold; */
  margin-top: 5px;
}
/* 自定义样式 */
</style>


