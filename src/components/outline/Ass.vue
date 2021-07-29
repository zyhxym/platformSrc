<template>
	<div>
		<div class="picture_header flex align-center">
			<img src="../../assets/icon-8.png" />
			<span class="flex-1">{{title1}}</span>
			<span @click="$emit('comVisible', true)">返回</span>
		</div>
		<div class="picture_body1" v-if="cardshow">
			<div class="corner bg-blue padding-10">

				<el-row class="font-14 text-lightblue">
					<el-col :span="20">
						<span class="font-18 font-blod text-blue block" style="margin-bottom:6px">
							{{title1}}
						</span>

						位置:<span>
							{{LocationDescription}} </span>
						</br>
						会场负责人:<span>
							{{realManager}} </span></br>
						联系方式:<span>
							{{phone}} </span>
						<!-- 联系方式: <span style="color:#ffe900;font-size:20px;">
              {{phone}} </span> -->

					</el-col>
					<el-col :span="4">
						<img style="display: block; margin-bottom:5px; margin-left:5px; margin-right:0;" src="../../assets/tel.png"
						 @click="videocall()" />

						<font size="1"> 视频通话</font>
					</el-col>
				</el-row>

				<el-row v-show="ptshow" class="tips padding-10 font-14 text-lightblue">
					处置中：
					<span class="text-red"> {{num1}}人</span>
					<el-divider direction="vertical"></el-divider>
					处置完成：<span class="text-blue"> {{num2}}人</span></br>
					待后送：<span class="text-cyan"> {{num3}}人</span>
					<el-divider direction="vertical"></el-divider>
					已后送：<span class="text-yellow"> {{num4}}人</span>
				</el-row>
				<el-row v-show="ptshow==false" style="margin-top:5px;padding:3px; text-align:center;background-color:#0b286e;color:#a3a5bc;">暂无病人</el-row>
			</div>
			<el-row v-show="ptshow" style=" margin-top:10px;margin-bottom:10px;">
				<div class="demo-table table1">

					<el-table :data="tablepatient" size="small" max-height="145" :cell-style="{padding:0}" @row-click="rowClick"
					 :header-cell-style="{'background-color': '#0b1865','color': '#00deff', 'text-align':'center',padding:0}">
						<el-table-column prop="Name" label="姓名">

						</el-table-column>
						<el-table-column prop="Gender" label="性别" width="50">
						</el-table-column>
						<el-table-column prop="Age" label="年龄" width="50">
						</el-table-column>
						<el-table-column prop="StatusName" label="状态">

						</el-table-column>
						<el-table-column prop="Classification" label="分级">
						</el-table-column>
						<el-table-column prop="Diagnose" label="诊断" show-overflow-tooltip="">

						</el-table-column>
						<!-- <el-table-column prop="CarName"
                             label="分配车辆">

            </el-table-column>
            <el-table-column prop="OrganizationName"
                             label="分配医院">

            </el-table-column> -->

					</el-table>
				</div>
			</el-row>

			<el-row v-show="ptshow">
				<div ref="barchart" style="height:180px;"></div>
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
		inject: ['reload'],
		props: ['mid'],
		mounted() {
			this.getassinfo()

		},
		data() {
			return {
				cardshow: false, //卡片加载
				title1: '', //名称
				GNo: '',
				// nowLocation: '',//当前位置
				realManager: '', //医院负责人
				phone: '',

				LocationDescription: '',



				Classification: '', //病情分级
				// CarName: '',
				// OrganizationName: '',
				ptshow: false,

				tablepatient: [], //病人列表
				num1: '',
				num2: '',
				num3: '',
				num4: '',
				showPatinfo: false,
				perinfo: {},
				//用于查看真实姓名
				memberId: '',
				toolipVisible: false,
				ExpertList: [],
				choosenpatient: '',
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
					timevalue: ''
				},
				curdrugused: {
					timevalue: '',
					content: '',
				},
				zhusu: {
					content: '',
					timevalue: ''

				},
				xianbingshi: {
					content: '',
					timevalue: ''
				},
				// timevalue42: '',
				// timevalue43: '',
				timevalue2: '',
				// 主诉: '',
				// 主诉图片: [],
				zhusuphoto: {

					time: '',
				},
				// 主诉图片是数组,
				zhusuphotos: [],
				体征: '请选择体征',
				// 现病史: '',
				现病史图片: [],
				// 过敏史: '',
				// 疾病史: '',
				// 目前用药: '',
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
			this.getassinfo()
		},
		watch: {
			mid(value, oldvalue) {
				this.reload()
			}
		},
		methods: {
			getassinfo() {

				var cc = this.mid
				//暂时先用列表
				axios.get('/getAssemblyList', {})
					.then((response) => {

						var cdata = response.data['results']


						var dd = cdata.filter(function(item) {
							return item.LocationNo == cc;
						})
						this.GNo = dd[0].GroupNo
						this.title1 = dd[0].LocationName
						this.LocationDescription = dd[0].Description
						this.realManager = dd[0].Manager
						this.phone = dd[0].phone
						this.getpatientList(dd[0].GroupNo)
						this.getEmergencyStatusCount(dd[0].GroupNo)
						this.cardshow = true

					}).catch(function(error) {
						console.log("error", error);
					})




				//当病人不为空 才展示下面
				// if (cdata.NowPatient != null) {
				//   //查询病人信息
				//   console.log(cdata.NowPatient)
				//   this.getPatientInfo(cdata.NowPatient)
				// }
				// this.getpatientList(cdata.GroupNo)
				// this.getEmergencyStatusCount(cdata.GroupNo)




			},
			//获取病人信息
			getpatientList(s) {
				// console.log(s)
				axios.post('/getPatientListEmergencyClass', {
						'groupNo': s


					})
					.then((response) => {
						var ad = response.data['results']

						if (ad.length > 0) {

							this.tablepatient = ad

							this.ptshow = true
						}




					}).catch(function(error) {
						console.log("error", error);
					})

			},
			getEmergencyStatusCount(s) {
				// console.log(s)
				axios.post('/getEmergencyStatusCount', {
						'groupNo': s

					})
					.then((response) => {

						var nn = response.data['results']
						// console.log(nn)
						this.num1 = nn.chuzhizhong;
						this.num2 = nn.chuzhiwancheng
						this.num3 = nn.daihousong
						this.num4 = nn.yihousong


						this.drawbar(this.num1, this.num2, this.num3, this.num4)



					}).catch(function(error) {
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
					})
					.then((response) => {
						// console.log(response.data.results[0])
						this.perinfo = response.data.results[0]
						console.log(this.perinfo)

					}).catch(function(error) {
						console.log("error", error);
					})


			},
			getExpertList() {
				axios.get('/getExpertList', {

					})
					.then((response) => {
						// console.log(response.data.results[0])
						this.ExpertList = response.data.results

					}).catch(function(error) {
						console.log("error", error);
					})

			},
			ptoe(index) {

				axios.post('/newExpertPatient', {
						// "token": this.GLOBAL.token,
						"patientId": this.choosenpatient,
						"expertId": this.ExpertList[index].PersonnelID
					})
					.then(response => {
						// this.$message('推送成功')

					})
					.catch(function(error) {
						console.log("error", error);
					});

			},
			initialvalue() {


				this.PatientId = ''
				this.selected = '病史'
				this.content = ''
				this.guominshi = {
					content: '',
					timevalue: ''
				}
				this.jibingshi = {
					content: '',
					timevalue: ''
				}
				this.curdrugused = {
					timevalue: '',
					content: '',
				}
				this.zhusu = {
					content: '',
					timevalue: ''
				}
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
				//每次获取病历前先清空病历初始值
				this.initialvalue()
				axios.post('/getPatientRecord', {
					patientId: ss
				}).then((response) => {

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
					// console.log(this.patientrecord.P04[k], 'P04指标')
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

					// console.log(this.dataCZ, '既往处置')
					//医嘱
					if (this.patientrecord.P06.length > 0) {
						this.doctortell = this.patientrecord.P06[0].Detail
					} else {
						this.doctortell = ''
					}
				})



			},
			getMemberInfo(memberId) {
				//确定 取消是否要查看真名
				this.toolipVisible = false



				axios.post('/getMemberInfo', {
						"memberId": memberId
					})
					.then((response) => {
						var cc = response.data.results[0]
						console.log(cc)
						this.perinfo.Name = cc.Name

					}).catch(function(error) {
						console.log("error", error);
					})
			},
			videocall() {
				//打开视频通话
				console.log('打开视频通话')

				console.log(this.GNo)
				//传组别过去
				axios.post('/pushVideoLeader', {
						"GN": this.GNo
					})
					.then((response) => {
						this.$message('已发送邀请')
						console.log(response.data)
					}).catch(function(error) {
						console.log("error", error);
					})





			},
			 sendcall(val) {
      axios.post('/pushVideoLeader', {
        "GN": val
      }
      )
        .then((response) => {
          this.$message('已发送邀请')

        }).catch(function (error) {
          console.log("error", error);
        })

    },
			drawbar(a, b, c, d) {
				// console.log('kaishi')
				var d1 = []
				var d2 = []
				var d3 = []
				var d4 = []
				d1.push(a);
				d2.push(b);
				d3.push(c);
				d4.push(d)
				let barchart = this.$echarts.init(this.$refs.barchart, 'white')
				barchart.setOption({
					color: ["#fe3a63", "#4595e6", "#00e9f2", "#ffd835", "#23befa"],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						top: '2%',
						left: '0%',
						data: ['处置中', '处置完成', '待后送', '已后送'],
						textStyle: {
							color: "#c0c6dc",
							fontSize: 14
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
						iconStyle: {
							borderColor: "#0074ff"
						}
					},
					xAxis: {
						show: true,
						axisLine: {
							lineStyle: {
								color: "#12f1fe"
							}
						},
						axisLabel: {
							fontSize: 14,
							color: "#c0c6dc"
						},
						axisTick: {
							show: false
						},
						splitLine: {
							lineStyle: {
								color: "#212952"
							}
						}
					},
					yAxis: {
						type: 'category',
						inverse: true,
						show: true,
						axisLine: {
							lineStyle: {
								color: "#12f1fe"
							}
						},
						axisLabel: {
							fontSize: 14,
							color: "#c0c6dc"
						},
						axisTick: {
							show: false
						},
						splitLine: {
							lineStyle: {
								color: "#212952"
							}
						}

					},
					series: [

						{
							name: '处置中',
							type: 'bar',
							barWidth:"16%",
							// label: seriesLabel,
							data: d1,
							label: {
								normal: {
									show: true,
									position: 'right'
								}
							},
						},
						{
							name: '处置完成',
							type: 'bar',
							barWidth:"16%",
							// label: seriesLabel,
							data: d2,
							label: {
								normal: {
									show: true,
									position: 'right'
								}
							},
						},
						{
							name: '待后送',
							type: 'bar',
							barWidth:"16%",
							// label: seriesLabel,
							data: d3,
							label: {
								normal: {
									show: true,
									position: 'right'
								}
							},
						},
						{
							name: '已后送',
							type: 'bar',
							barWidth:"16%",
							// label: seriesLabel,
							data: d4,
							label: {
								normal: {
									show: true,
									position: 'right'
								}
							},
						}
					]

				})

			},
			refresh(PatientId) {
				this.getPatientInfo(PatientId)
				this.getPatientRecord(PatientId)
			},

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
	.picture_body1 {
		/*  border: 1px solid #808288; */
		background-color: #050e3a;

		/* background-color: #404a59; */
		text-align: left;
		color: whitesmoke;
		padding: 10px;
	}

	.ass .el-table th,
	.ass .el-table tr {
		background-color: white;
	}

	.ass .el-table,
	.ass .el-table__expanded-cell {
		background-color: white;
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

	/* .ass .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #a0cfff;
} */
.mydialog .el-dialog{
	background:url(../../assets/bg-3.png) no-repeat top left;
	background-size:100% 100%;
	width:874px;
	height: 750px;
}
.mydialog .el-dialog .el-dialog__headerbtn{
	top:30px;right:20px;
}
.mydialog .el-button{border-radius: 14px;border:1px solid #0084ff;background-color: transparent;
box-shadow: 0 0 15px 5px rgba(0,168,255,.5) inset;color:#359eff;font-size: 14px; margin-right:10px;}
.mydialog .el-button img{width:14px;margin-right:5px;}
.mydialog .el-button:hover{
	opacity: .8;
}
.mydialog .text1-title{font-size:14px;color:#0074ff;font-weight: 700;}
.mydialog .el-row i{font-style:normal; font-size:14px;color:#a3a5bc;}
.mydialog .spanbox>span{width:20%; display: inline-block;height: 30px;}
.mydialog .mint-navbar{
	background-color:#0b1a7e !important;
	color:#00deff !important;
	font-weight: 700;
}
.mydialog .mint-navbar .mint-tab-item.is-selected{
	background-color:#0e2da0 !important;
	margin-bottom:0;
	border-width: 1Px;
}
.mydialog .scroll>div>div{
	color:#a3a5bc;
	font-size:14px;
	padding:15px 30px;
}
.mydialog .scroll>div>div:nth-of-type(odd){
	background-color:#2036a5;
}
.mydialog .scroll>div>div:nth-of-type(even){
	background-color:#0d1c8c;
}
.mydialog .scroll .text1-title{font-size:14px;color:#fff;font-weight: 400;}
.mydialog .scroll .text1-time{font-size:14px;color:#ccc;font-weight: 400;}
.mydialog .scroll .text1-content{font-size:14px;color:#ccc;font-weight: 400;}
.mydialog .text-title2{
	display: block;
	padding:20px;
	font-size:16px;
	color:#fff;
}
.mydialog .text-title2 img{width:16px;height: 16px;margin-right:10px;}
.mydialog .has-gutter,.mydialog .has-gutter th{
	background-color:#0b1865 !important;
	color:#00deff !important;
}
.mydialog .el-table__row:nth-of-type(odd) td,.mydialog .el-table__row:nth-of-type(odd):hover td{
	background-color:#2036a5 !important;
	color:#fff !important;
}
.mydialog .el-table__row:nth-of-type(even) td,.mydialog .el-table__row:nth-of-type(even):hover td{
	background-color:#0d1c8c !important;
	color:#fff !important;
}
.mydialog .cell{
	text-align: center;
}
.mydialog .cell .el-button{
	color:#00a8ff !important;
	box-shadow: 0 0 15px 5px rgba(0,168,255,.5) inset;
	border:1px solid #0182fd !important;
}
</style>
