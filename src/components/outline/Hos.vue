<template>
  <div>
    <div class="picture_header flex align-center">
      <img src="../../assets/icon-8.png" />
        <span class="flex-1">{{title1}}</span>
        <span style="float:right"
              @click="$emit('comVisible', true)">返回</span>

      
    </div>
    <div class="picture_body3"
         v-if="cardshow">
      <div class="corner bg-blue padding-10">
        <el-row>
          <el-col :span="20">
            <el-row style="padding:5px;" class="font-18 font-blod text-blue">
              {{title1}}
            </el-row>
            <el-row style="padding:5px;">
              <mt-badge v-show="item.XiongtongTag">胸痛</mt-badge>
              <mt-badge v-show="item.GanranTag"> 感染</mt-badge>
              <mt-badge v-show="item.ZhongduTag">中毒</mt-badge>
              <mt-badge v-show="item.CuzhongTag">卒中</mt-badge>
              <mt-badge v-show="item.ChuangshangTag">创伤</mt-badge>
              <mt-badge v-show="item.HefusheTag">核辐射</mt-badge>
              <mt-badge v-show="item.YunchanTag">孕产</mt-badge>
              <mt-badge v-show="item.ErtongTag">儿童</mt-badge>
              <mt-badge v-show="item.ErchuangTag">儿创</mt-badge>
              <mt-badge v-show="item.JingshenTag">精神</mt-badge>
              <mt-badge v-show="item.XinliTag">心理</mt-badge>
              <mt-badge v-show="item.ChuanranTag">传染</mt-badge>
            </el-row>

          </el-col>
          <el-col :span="4">
			  <img style="display: block; margin-bottom:5px; margin-left:5px; margin-right:0;" src="../../assets/tel.png" @click="videocall()" />
          <!--  <i style="font-size: 30px; color:#7eb37e"
               class="el-icon-phone"
               @click="videocall()">
            </i></br> -->

            <font size="1"> 视频通话</font>
          </el-col>
        </el-row>
        <el-row class="font-14 text-lightblue">
          位置：<span>{{LocationDescription}}</span></br>
		   <!-- class="location"   class="fuzeren"  class="fuzeren"-->
          医院负责人：<span>{{realManager}}</span>&nbsp;&nbsp;联系方式：<span>{{phone}}</span>
        </el-row>

        <el-row v-show="ptshow"
                class="tips font-14 text-lightblue">
          待送达：<span class="text-red">{{num1}}人 </span>
		  <el-divider direction="vertical"></el-divider>
		  已入院：<span class="text-blue">{{num2}}人 </span>
		  <el-divider direction="vertical"></el-divider>
		  已出院：<span class="text-cyan">{{num3}}人</span>
        </el-row>
      </div>
      <!-- <el-row v-else="ptshow"
                style="font-size:15px; padding:10px">暂无病人</div> -->
      <el-row style=" margin-top:10px;margin-bottom:10px;"
              v-show="ptshow">
        <div class="demo-table table1">

          <el-table :data="tablepatient"
                    size="small"
                    max-height="145"
                    :cell-style="{padding:0}"
                    :header-cell-style="{'background-color': '#0b1865','color': '#00deff', 'text-align':'center',padding:0}"
                    @row-click="rowClick">
            <el-table-column prop="PatientId"
                             v-if="false">

            </el-table-column>
            <el-table-column prop="Name"
                             label="姓名">

            </el-table-column>
            <el-table-column prop="Gender"
                             label="性别"
                             width="50">

            </el-table-column>
            <el-table-column prop="Age"
                             label="年龄"
                             width="50">

            </el-table-column>
            <el-table-column prop="StatusName"
                             label="状态">

            </el-table-column>
            <el-table-column prop="Classification"
                             label="分级">

            </el-table-column>
            <el-table-column prop="Diagnose"
                             label="诊断">
            </el-table-column>
            <!-- <el-table-column prop="CarName"
                             label="分配车辆">

            </el-table-column> -->

          </el-table>
        </div>
      </el-row>

      <el-row v-show="ptshow">
        <div ref="barchart"
             style="height:180px;"></div>
      </el-row>

    </div>

    <el-dialog :visible.sync="showPatinfo"
               :before-close="handleClose"
               style="text-align:left;" class="mydialog">

      <el-row class="spanbox">
        <span class="text1-title">姓名：<i>{{perinfo.Name}}</i></span>  
		<span class="text1-title">性别：<i>{{perinfo.Gender}}</i></span>
		<span class="text1-title">年龄：<i>{{perinfo.Age}}</i></span>
        <el-button style="float:right"
                   size="mini"
                   @click="toolipVisible=true">查看真实姓名</el-button>
        <el-button style="float:right"
                   size="mini"
                   @click="refresh(perinfo.PatientId)"> <div class="flex align-center"><img src="../../assets/icon-12.png"> 刷新</div></el-button>

      </el-row>
      <el-row class="spanbox">
        <span class="text1-title"> 状态：<i>{{perinfo.StatusName}} </i></span> 
        <span class="text1-title">分级：<i>{{perinfo.Classification}} </i></span> 
        <span class="text1-title">现场：<i>{{perinfo.EmergencyGroupName}}</i></span> <br />
        <span class="text1-title">分配车辆：<i>{{perinfo.CarName}} </i></span>
        <span class="text1-title"> 分配医院：<i>{{perinfo.OrganizationName}}</i></span> 
		<span class="text1-title">诊断：<i>{{perinfo.Diagnose}}</i></span>
      </el-row>

      <el-dialog title="提示"
                 :visible.sync="toolipVisible"
                 width="30%"
                 append-to-body>
        <span>确认要查看病人真名吗？</span>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="toolipVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="getMemberInfo(perinfo.MemberId)">确 定</el-button>
        </span>
      </el-dialog>

      </br>
      <!-- 诊断：{{perinfo.Diagnose}} -->

      <div>
        <div>
          <mt-navbar v-model="selected"
                     style="backgroundColor:#0e2da0;color:00deff;font-size:14px;">
            <mt-tab-item id="病史">

              <div style="font-size:16px">病史</div>
            </mt-tab-item>
            <mt-tab-item id="体征">

              <div style="font-size:16px">体征</div>
            </mt-tab-item>
            <mt-tab-item id="处置">

              <div style="font-size:16px">处置</div>
            </mt-tab-item>
          </mt-navbar>
        </div>
        <mt-tab-container class="page-tabbar-container"
                          v-model="selected">

          <mt-tab-container-item id="病史">
            <div style="overflow:auto;height:250px;" class="scroll">
              <div>
                <div>
                  <div class="text1-title"> 主诉</div>
                  <div v-if="zhusu.timevalue!=''">
                    <div class="text1-time">{{zhusu.timevalue}} </div>
                    <div class="text1-content">{{zhusu.content}} </div>
                  </div>
                  <div v-else
                       class="text1-no">
                    暂无
                  </div>
                </div>
              
                <div>
                  <div class="text1-title"> 现病史</div>
                  <div v-if="xianbingshi.timevalue!=''">
                    <div class="text1-time">{{xianbingshi.timevalue}} </div>
                    <div class="text1-content">{{xianbingshi.content}} </div>

                  </div>
                  <div v-else
                       class="text1-no">
                    暂无
                  </div>
                </div>
                
                <div>

                  <div class="text1-title"> 过敏史</div>

                  <div v-if="guominshi.timevalue!=''">
                    <div class="text1-time">{{guominshi.timevalue}} </div>
                    <div class="text1-content">{{guominshi.content}} </div>
                  </div>
                  <div v-else
                       class="text1-no">
                    暂无
                  </div>
                </div>
                
                <div>
                  <div class="text1-title"> 疾病史</div>

                  <div v-if="jibingshi.timevalue!=''">
                    <div class="text1-time">{{jibingshi.timevalue}} </div>
                    <div class="text1-content">{{jibingshi.content}} </div>
                  </div>
                  <div v-else
                       class="text1-no">
                    暂无
                  </div>

                </div>
               
                <div>
                  <div class="text1-title"> 目前用药</div>
                  <div v-if="curdrugused.timevalue!=''">
                    <div class="text1-time">{{curdrugused.timevalue}} </div>
                    <div class="text1-content">{{curdrugused.content}} </div>
                  </div>
                  <div v-else
                       class="text1-no">
                    暂无
                  </div>
                </div>
                

                <div v-show="zhusuphotos.length>0">
                  <div class="text1-title">主诉图片</div>
                  <div class="text1-time">
                    {{zhusuphoto.time}}</div>

                  <div v-viewer>
                    <div v-for="(item,index) in zhusuphotos"
                         :key="index">
                      <div align="center">
                        <img :src="item"
                             style="width: 50%; height: 50%; "
                             v-show="index==0">
                      </div>
                    </div>
                  </div>
                 

                </div>
              </div>

            </div>

          </mt-tab-container-item>

          <mt-tab-container-item id="体征">
            <div style="overflow:auto;height:250px;" class="scroll">
              <div v-if="dataTZ.length>0">
                <div v-for="(item,index) in dataTZ">

                  <div class="text1-title">{{item.OperationName}}</div>
                  <div class="text1-time">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</div>

                  <div class="text1-content">{{item.Detail}}</div>
                  
                </div>
              </div>
              <div v-else
                   style="margin:50px;text-align:center;font-size:20px;">

                暂无体征
              </div>
            </div>

          </mt-tab-container-item>

          <mt-tab-container-item id="处置">
            <div style="overflow:auto;height:250px;" class="scroll">
              <div v-if="dataCZ.length>0">
                <div v-for="(item,index) in dataCZ"
                     style="">

                  <!-- <div class="text-title">{{item.OperationName}}</div>
                  <div class="text-time">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</div>

                  <div class="text-content">{{item.Detail}}</div> -->
                  <div class="text1-title">{{item.OperationName}}&nbsp;&nbsp;&nbsp;<span v-show="(item.OperationCode=='P112')"
                          class="text1-content">检查单号{{item.Detail1}}</span></div>
                  <div class="text1-time">
                    {{item.OperationTime}}&nbsp;&nbsp;&nbsp;
                    {{item.Address==1?'地点：会场':'地点：车辆'}}</div>

                  <div class="text1-content"><span>{{item.Detail}}</span></div>
                  <div align="center"
                       v-show="item.InfoType==3">
                    <div v-viewer>
                      <img :src="item.FileUrl"
                           style="width: 50%; height: 50%; ">
                    </div>
                  </div>
                
                </div>
              </div>
              <div v-else
                   style="margin:50px;text-align:center;font-size:20px;">
                暂无处置
              </div>
            </div>

          </mt-tab-container-item>
        </mt-tab-container>

      </div>
      <span class="text-title text-title2"> <img src="../../assets/icon-10.png"> 专家列表</span>
      <div class="ass">

        <el-table :data="ExpertList"
                  max-height="250"
                  :header-row-style="{'height':'14px','padding':'2px'}"
                  :header-cell-style="{'background-color': '#0070a8','color': 'white', 'text-align':'center','font-size':'14px'}">
          <el-table-column prop="PersonnelID"
                           v-if="false"></el-table-column>
          <el-table-column prop="Name"
                           label="姓名">

          </el-table-column>
          <el-table-column prop="DepartmentCode"
                           label="所在医院">

          </el-table-column>
          <el-table-column prop="TitleCode"
                           label="科室">

          </el-table-column>
          <el-table-column prop="Specialty"
                           label="专长">

          </el-table-column>
          <el-table-column label="操作">
            <!-- <el-button @click="push()">推送</el-button> -->
            <template slot-scope="scope">

              <el-button class="btn-ts" type="primary"
                         size="mini"
                         @click="ptoe(scope.$index)">推送</el-button>

            </template>
          </el-table-column>

        </el-table>
      </div>

    </el-dialog>

  </div>
</template>
<script>
import axios from 'axios';
import echarts from 'echarts';
import global from '../global.vue'
export default {
  props: ['mid'],
  inject: ['reload'],
  data() {
    return {
      ptshow: false,
      cardshow: false,//卡片加载
      title1: '',//名称
      GNo: '',
      // nowLocation: '',//当前位置
      realManager: '',//医院负责人
      phone: '',

      LocationDescription: '',

      NowPatient: '',//运送病人
      Classification: '',//病情分级
      // CarName: '',
      // OrganizationName: '',

      patientshow: false,//病人情况是否展示
      tablepatient: [],//病人列表
      num1: '',
      num2: '',
      num3: '',
      item: {

      },
      showPatinfo: false,
      perinfo: {},
      memberId: '',
      ExpertList: [],
      choosenpatient: '',
      toolipVisible: false,
      //以下是病历
      photosrc: global.photoUrl + "zyh_1557216080825test.jpg",
      intervalid1: null,
      watchID1: null,

      PatientId: '',
      selected: '病史',

      content: '',

      //过敏史
      guominshi: {
        content: '',
        timevalue: ''
      },
      //疾病史
      jibingshi: {
        content: '',
        timevalue: ''      },
      curdrugused: { timevalue: '', content: '', },
      zhusu: {        content: '',
        timevalue: ''

      }, xianbingshi: {
        content: '',
        timevalue: ''
      },

      timevalue2: '',

      zhusuphoto: {

        time: '',
      },
      // 主诉图片是数组,
      zhusuphotos: [],
      体征: '请选择体征',
      // 现病史: '',
      现病史图片: [],

      既往史图片: [],
      初步诊断: '',
      level: '',
      Name: '',
      Gender: '',
      Age: '',
      Nation: '',
      Phone: '',
      Email: '',
      Unit: '',
      Position: '',
      bloodType: '',
      StatusNameHos: '',
      situations: '',
      carId: '',
      hospital: '',
      dataTZ: [],
      dataCZ: [],
      patientrecord: [],
    }
  },
  mounted() {
    this.gethosinfo()
  },
  watch: {
    mid(value, oldvalue) {
      this.reload()
    }

  },
  methods: {
    gethosinfo() {
      console.log(this.mid)
      axios.post('/getHosInfo', {

        'hosNo': this.mid

      }
      )
        .then((response) => {

          // console.log(response.data['results'])
          var cdata = response.data['results'][0]
          // console.log(cdata)
          this.item = cdata
          // console.log(cdata)
          this.GNo = cdata.GroupNo

          this.title1 = cdata.OrganizationName;
          this.LocationDescription = cdata.LocationDescription;
          this.nowLocation = [cdata.Longitude, cdata.Latitude];
          this.realManager = cdata.realManager;
          this.phone = cdata.phone;


          this.cardshow = true
          //当病人不为空 才展示下面
          // if (cdata.NowPatient != null) {
          //   //查询病人信息
          //   console.log(cdata.NowPatient)
          //   this.getPatientInfo(cdata.NowPatient)
          // }
          if (cdata.GroupNo != null) {
            this.getpatientList(cdata.GroupNo)
            this.getHosStatusCount(cdata.GroupNo)          }



        }).catch(function (error) {
          console.log("error", error);
        })

    },
    //获取病人信息
    getpatientList(s) {
      // console.log(s)
      axios.post('/getPatientListHospitalClass', {
        'groupNo': s


      }
      )
        .then((response) => {
          var ad = response.data['results']
          // console.log(ad)
          if (ad.length > 0) {
            this.ptshow = true
            // console.log(ad)
            this.tablepatient = ad
          }


        }).catch(function (error) {
          console.log("error", error);
        })

    },
    getHosStatusCount(s) {
      console.log(s)
      axios.post('/getHosStatusCount', {
        'groupNo': s

      }
      )
        .then((response) => {

          var nn = response.data['results']
          // console.log(nn)
          this.num1 = nn.daisongda;
          this.num2 = nn.yiruyuan
          this.num3 = nn.yichuyuan

          this.drawbar(this.num1, this.num2, this.num3)

        }).catch(function (error) {
          console.log("error", error);
        })
    },
    rowClick(row, column, event) {
      this.showPatinfo = true

      this.getPatientInfo(row.PatientId)
      this.choosenpatient = row.PatientId
      this.getExpertList()
      this.getPatientRecord(row.PatientId)
    },
    handleClose(done) {
      done();
    },
    getPatientInfo(a) {
      axios.post('/getPatientInfo', {
        "patientId": a
      }
      )
        .then((response) => {
          // console.log(response.data.results[0])
          this.perinfo = response.data.results[0]

        }).catch(function (error) {
          console.log("error", error);
        })


    },

    initialvalue() {


      this.PatientId = ''
      this.selected = '病史'
      this.content = ''
      this.guominshi = { content: '', timevalue: '' }
      this.jibingshi = { content: '', timevalue: '' }
      this.curdrugused = { timevalue: '', content: '', }
      this.zhusu = { content: '', timevalue: '' }
      this.xianbingshi = {
        content: '',
        timevalue: ''
      }

      this.timevalue2 = ''

      this.zhusuphoto = {

        time: ''
      },

        this.zhusuphotos = []
      this.体征 = '请选择体征'

      this.现病史图片 = []

      this.既往史图片 = []
      this.初步诊断 = ''



      this.dataTZ = []
      this.dataCZ = []
      this.patientrecord = []


    },
    getPatientRecord(ss) {
      this.initialvalue()
      axios.post('/getPatientRecord', {
        patientId: ss
      }).then((response) => {
        // window.localStorage.setItem('PATIENTNO', this.patientId);
        this.patientrecord = response.data.results
        //主诉
        // this.zhusu = this.patientrecord.P01;
        if (this.patientrecord.P01.length > 0) {
          this.zhusuphotos = []
          for (var i = 0; i < this.patientrecord.P01.length; i++) {
            if (this.patientrecord.P01[i].InfoType == 3) {
              var fileUrl = this.patientrecord.P01[i].FileUrl
              var time = this.patientrecord.P01[i].OperationTime
              // this.zhusuphoto.fileUrl = global.photoUrl + fileUrl
              this.zhusuphoto.time = time
              // this.zhusuphoto.unshift({
              //   fileUrl: global.photoUrl + fileUrl,
              //   time: time
              // })

              this.zhusuphotos.push(global.photoUrl + fileUrl)


            }
          }
          console.log(this.zhusuphotos, '主诉图片列表')

          for (var k = 0; k < this.patientrecord.P01.length; k++) {
            if (this.patientrecord.P01[k].InfoType == 1) {
              this.zhusu.content = this.patientrecord.P01[k].Detail;
              this.zhusu.timevalue = this.patientrecord.P01[k].OperationTime;
              break;
            }
          }
        } else {
          this.zhusu.content = '暂无';
          this.zhusu.timevalue = '';
        }
        //现病史
        if (this.patientrecord.P02.length > 0) {
          for (var i = 0; i < this.patientrecord.P02.length; i++) {
            if (this.patientrecord.P02[i].InfoType == 3) {
              var fileUrl = this.patientrecord.P02[i].FileUrl
              var time = this.patientrecord.P02[i].OperationTime
              this.现病史图片.unshift({
                fileUrl: global.photoUrl + fileUrl,
                time: time
              })
            }
          }
          console.log(this.现病史图片)
          for (var k = 0; k < this.patientrecord.P02.length; k++) {
            if (this.patientrecord.P02[k].InfoType == 1) {
              this.xianbingshi.content = this.patientrecord.P02[k].Detail;
              this.xianbingshi.timevalue = this.patientrecord.P02[k].OperationTime;
              break;
            }
          }
        } else {
          this.xianbingshi.content = '暂无';
          this.xianbingshi.timevalue = '';
        }
        //体征
        this.dataTZ = this.patientrecord.P03
        console.log(this.dataTZ)
        //既往史
        for (var i = 0; i < this.patientrecord.P04.length; i++) {
          if (this.patientrecord.P04[i].OperationCode == "P041") {
            this.guominshi.content = this.patientrecord.P04[i].Detail
            this.guominshi.timevalue = this.patientrecord.P04[i].OperationTime;

            break;
          }
        }
        for (var k = 0; k < this.patientrecord.P04.length; k++) {
          if (this.patientrecord.P04[k].OperationCode == "P042") {
            this.jibingshi.content = this.patientrecord.P04[k].Detail
            this.jibingshi.timevalue = this.patientrecord.P04[k].OperationTime;
            break;
          }
        }
        console.log(this.patientrecord.P04[k], 'P04指标')
        for (var j = 0; j < this.patientrecord.P04.length; j++) {
          if (this.patientrecord.P04[j].OperationCode == "P043") {
            this.curdrugused.content = this.patientrecord.P04[j].Detail
            this.curdrugused.timevalue = this.patientrecord.P04[j].OperationTime;
            break;
          }
        }
        for (var j = 0; j < this.patientrecord.P04.length; j++) {
          if (this.patientrecord.P04[j].OperationCode == "P040") {
            var fileUrl = this.patientrecord.P04[j].FileUrl
            var time = this.patientrecord.P04[j].OperationTime
            this.既往史图片.unshift({
              fileUrl: global.photoUrl + fileUrl,
              time: time
            })
          }
        }
        //初步诊断
        if (this.patientrecord.P05.length > 0) {
          this.初步诊断 = this.patientrecord.P05[0].Detail
          this.timevalue2 = this.patientrecord.P05[0].OperationTime
        } else {
          this.初步诊断 = ''
          this.timevalue2 = ''
        }
        //处置方案
        this.dataCZ = this.patientrecord.P11
        for (var j = 0; j < this.patientrecord.P11.length; j++) {
          if (this.patientrecord.P11[j].InfoType == 3) {
            var fileUrl = this.patientrecord.P11[j].FileUrl
            this.dataCZ[j].FileUrl = global.photoUrl + fileUrl

          }
        }

        console.log(this.dataCZ, '既往处置')
        //医嘱
        if (this.patientrecord.P06.length > 0) {
          this.doctortell = this.patientrecord.P06[0].Detail
        } else {
          this.doctortell = ''
        }
      })



    },
    refresh(PatientId) {
      this.getPatientInfo(PatientId)

      // this.getExpertList()
      this.getPatientRecord(PatientId)
    },
    getMemberInfo(memberId) {
      //确定 取消是否要查看真名
      this.toolipVisible = false



      axios.post('/getMemberInfo', {
        "memberId": memberId
      }
      )
        .then((response) => {
          var cc = response.data.results[0]
          console.log(cc)
          this.perinfo.Name = cc.Name

        }).catch(function (error) {
          console.log("error", error);
        })
    },
    getExpertList() {
      axios.get('/getExpertList', {

      }
      )
        .then((response) => {
          // console.log(response.data.results[0])
          this.ExpertList = response.data.results

        }).catch(function (error) {
          console.log("error", error);
        })

    },
    //将病人推送给医生
    ptoe(index) {

      axios.post('/newExpertPatient', {
        // "token": this.GLOBAL.token,
        "patientId": this.choosenpatient,
        "expertId": this.ExpertList[index].PersonnelID
      })
        .then(response => {
          // this.$message('推送成功')

        })
        .catch(function (error) {
          console.log("error", error);
        });

    },
    videocall() {
      //打开视频通话
      console.log('打开视频通话')

      //传组别过去
      console.log(this.GNo)
      axios.post('/pushVideoLeader', {
        "GN": this.GNo
      }
      )
        .then((response) => {
          this.$message('已发送邀请')

        }).catch(function (error) {
          console.log("error", error);
        })




    },
    drawbar(a, b, c) {
      // console.log('kaishi')
      var d1 = []
      var d2 = []
      var d3 = []
      d1.push(a);
      d2.push(b)
      d3.push(c)
      let barchart = this.$echarts.init(this.$refs.barchart, 'white')
      barchart.setOption({
		  color:["#fe3a63","#4595e6","#00e9f2"],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: '2%',
          data: ['待送达', '已入院', '已出院'],
		  textStyle:{
			  color:"#c0c6dc",
			  fontSize:14
		  }
        },
        grid: {
        	left:'4%',
        	bottom:'10%',
        	top:'16%',
        	right:'5%',
        },
        toolbox: {
          show: true,
          right: '5%',
          feature: {
            saveAsImage: {}
          },
		  iconStyle:{
			  borderColor:"#0074ff"
		  }
        },
        xAxis: {
			show:true,
			axisLine:{
				lineStyle:{
					color:"#12f1fe"
				}
			},
			axisLabel:{
				 fontSize:14,
				color:"#c0c6dc"
			},
			axisTick:{
				show:false
			},
			splitLine:{
				lineStyle:{
					color:"#212952"
				}
			}
        },
        yAxis: {
			show:true,
          type: 'category',
          inverse: true,
		  axisLine:{
		  	lineStyle:{
		  		color:"#12f1fe"
		  	}
		  },
		  axisLabel:{
		  	 fontSize:14,
		  	color:"#c0c6dc"
		  },
		  splitLine:{
		  	lineStyle:{
		  		color:"#212952"
		  	}
		  }

        },
        series: [

          {
            name: '待送达',
            type: 'bar',
            // label: seriesLabel,
            data: d1,
			barWidth:"16%",
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
          },
          {
            name: '已入院',
            type: 'bar',
            // label: seriesLabel,
            data: d2,
			barWidth:"16%",
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
          },
          {
            name: '已出院',
            type: 'bar',
            // label: seriesLabel,
            data: d3,
			barWidth:"16%",
            label: {
              normal: {
                show: true,
                position: 'right'
              }
            },
          }
        ]

      })

    }

  }
}
</script>
<style>
/* .picture_header {
  background-color: #808288;
}
.picture_title {
  padding: 2px 15px;
  line-height: 25px;
  font-size: 14px;
  color: white;
  text-align: left;
}*/
.picture_body3 {
	background-color:#050e3a;
  /* border: 1px solid #808288; */
  text-align: left;
  color: whitesmoke;
  padding: 10px;
}
.fuzeren {
  color: #fda794;
  font-size: 20px;
}
.location {
  color: #d3b29b;
  font-size: 20px;
}
.text2 {
  color: #5aaee2;
  font-size: 20px;
}
.text1-title {
  font-size: 16px;
  font-weight: bold;
}
.text1-time {
  font-size: 12px Small;
  color: gray;
  padding: 10px;
}
.text1-content {
  font-size: 14px;
  margin: 0px 10px;
}

.text1-no {
  font-size: 14px;

  margin: 10px;
}
.ass .el-table th,
.ass .el-table tr {
  background-color: white;
}
.ass .el-table,
.ass .el-table__expanded-cell {
  background-color: white;
}
.tips{
	background-color:#0b286e;
	padding:5px 10px;
	margin-top:10px;
}
.tips .el-divider{
	background-color:#394e86 !important;
}
.table1 .has-gutter tr{
	height: 45px !important;
}
.table1 .el-table__row{
	height: 30px;
	color:#a3a5bc;
}
</style>


