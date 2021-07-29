<template>
	<div>
		<div class="picture_header">
			<div class="picture_title">
				<img src="../../assets/icon-9.png" />
				<span class="flex-1">{{title1}}</span>
				<span style="float:right" @click="$emit('comVisible', true)">返回</span>

			</div>
		</div>
		<div class="picture_body2" v-if="cardshow">

			<div class="corner2 padding-10">
				<!-- 这个div是内边框 10px-->
				<el-row class="font-14 text-lightblue">
					<el-col :span="20">

						<span class="font-18 font-blod text-blue block" style="margin-bottom:6px">{{title1}}</span>
						车号:<span>{{CarId}}
						</span></br>
						目的地:<span>{{destination}} </span>
						</br>
						车辆负责人:
						<span>{{CarManager}}</br>
						</span> 联系方式: <span>{{phone}}
						</span>

					</el-col>
					<el-col :span="4">
						<img style="display: block; margin-bottom:5px; margin-left:5px; margin-right:0;" src="../../assets/tel.png"
						 @click="videocall()" />
						<!-- <i style="font-size: 30px; color:#7eb37e"
               class="el-icon-phone"
               @click="videocall()">
            </i></br> -->

						<font size="1"> 视频通话</font>
					</el-col>
				</el-row>
				<el-row style="margin-bottom:10px;">
					<div v-if="!patientshow" style="text-align:center;">
						暂无病人
					</div>
					<div v-else style="padding-left:5px;">
						<div @click="showPatinfo=true" class="tips padding-10 font-14 text-lightblue">

							所载病人:<span class="text-red">{{NowPatient}}</span>
							<el-divider direction="vertical"></el-divider>
							病情分级:<span class="text-blue">{{Classification}}</span> </br>
							<p style="margin-top:5px;">预计送达时间:<span class="text-cyan">{{Estimatedtime}}</span></p>
						</div>
					</div>

				</el-row>

			</div>
			<el-row v-show="patientshow">
				<div ref="barchart" style="height:200px;">
				</div>
			</el-row>
		</div>

		<!-- <el-dialog :visible.sync="showPatinfo"
               width="40%"
               style="text-align:left;">

      <el-row style="font-size:16px;">
        <span class="text1-title">姓名：</span> {{perinfo.Name}} &nbsp;&nbsp;<span class="text1-title">性别：</span>{{perinfo.Gender}}&nbsp;&nbsp;<span class="text1-title">年龄：</span>{{perinfo.Age}} &nbsp;&nbsp;
        <el-button style="float:right"
                   size="mini"
                   @click="toolipVisible=true">查看真实姓名</el-button>
        <el-button style="float:right"
                   size="mini"
                   @click="refresh(perinfo.PatientId)">刷新</el-button>

      </el-row>
      <el-row style="font-size:16px;">
        <span class="text1-title"> 状态：</span> {{perinfo.StatusName}} &nbsp;&nbsp;
        <span class="text1-title">分级：</span> {{perinfo.Classification}} &nbsp;&nbsp;
        <span class="text1-title">诊断：</span>{{perinfo.Diagnose}} </br>
        <span class="text1-title">现场：</span> {{perinfo.EmergencyGroupName}}&nbsp;&nbsp;
        <span class="text1-title">分配车辆：</span> {{perinfo.CarName}} &nbsp;&nbsp;
        <span class="text1-title"> 分配医院：</span> {{perinfo.OrganizationName}}
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
      </el-dialog> -->
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

	export default {

		inject: ['reload'],
		props: ['mid'],
		mounted() {
			this.getcarinfo()
		},
		watch: {
			mid(value, oldvalue) {
				this.reload()
			}
		},
		data() {
			return {
				// cartitle: '',
				cardshow: false, //卡片加载
				title1: '', //名称
				CarId: '', //车号
				nowLocation: '', //当前位置
				CarManager: '', //车辆负责人
				phone: '',

				destination: '', //目的地

				NowPatient: '', //运送病人
				Classification: '', //病情分级
				Estimatedtime: '10分钟', //预计送达时间

				patientshow: false, //病人情况是否展示
				ptshow: false,

				num1: '',
				num2: '',
				num3: '',
				timer: null,
				GNo: '',
				//病人病历对话框是否可见
				showPatinfo: false,
				perinfo: {},
				memberId: '',
				ExpertList: [],
				//提示框可见
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
		beforeDestroy() {

			clearInterval(this.timer)
			this.timer = null

		},

		methods: {

			getcarinfo() {
				axios.post('/getCarInfo', {
						'carNo': this.mid
					})
					.then((response) => {
						// console.log(response.data['results'])
						var cdata = response.data['results'][0]
						this.GNo = cdata.GroupNo
						// console.log(cdata)
						this.title1 = cdata.CarName;
						this.CarId = cdata.CarId;
						this.nowLocation = [cdata.Longitude, cdata.Latitude];
						this.CarManager = cdata.CarManager;
						this.phone = cdata.phone;
						this.NowPatient = cdata.NowPatient;

						switch (cdata.CarStatus) {
							case 0:
								this.destination = '空闲'
								break
							case 1:
								this.destination = cdata.Assembly
								break
							case 2:
								this.destination = cdata.Hospital
								break
						}
						this.cardshow = true
						this.timer = setInterval(() => {
							console.log("car获取位置")
							axios.post('/getCarInfo', {
								'carNo': this.mid
							}).then((response) => {

								var ndata = response.data['results'][0]
								this.nowLocation = [ndata.Longitude, ndata.Latitude];
							}).catch(function(error) {
								console.log("error", error);
							})
						}, 10000) //一分钟刷新一次
						if (cdata.NowPatient != null) {

							this.getPatientInfo(cdata.GroupNo)
						}
						this.getCarStatusCount(cdata.GroupNo)
					}).catch(function(error) {
						console.log("error", error);
					})



				// console.log('第一种')





			},
			getCardetail() {
				// console.log(this.mid)

			},


			//获取病人信息
			getPatientInfo(s) {
				// console.log(s)
				axios.post('/getPatientListCarClass', {
						'groupNo': s

					})
					.then((response) => {

						var ad = response.data['results']
						// console.log(ad)
						if (ad.length > 0) {
							this.patientshow = true

							this.NowPatient = ad[0].Name
							this.Classification = ad[0].Classification
							// this.tablepatient = ad
							//当前病人信息  病历里面用
							this.perinfo = ad[0]


							this.getExpertList()
							this.getPatientRecord(this.perinfo.PatientId)


						}

					}).catch(function(error) {
						console.log("error", error);
					})

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

				console.log('memberId', memberId)

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
			//将病人推送给医生
			ptoe(index) {

				axios.post('/newExpertPatient', {
						// "token": this.GLOBAL.token,
						"patientId": this.perinfo.PatientId,
						"expertId": this.ExpertList[index].PersonnelID
					})
					.then(response => {
						// this.$message('推送成功')

					})
					.catch(function(error) {
						console.log("error", error);
					});

			},



			getCarStatusCount(s) {
				// console.log(s)
				axios.post('/getCarStatusCount', {
						'groupNo': s
					})
					.then((response) => {

						var nn = response.data['results']


						// console.log(nn)
						this.num1 = nn.daihousong;
						this.num2 = nn.housongzhong
						this.num3 = nn.yisongda



						if (this.num1 != 0 || this.num2 != 0 || this.num3 != 0) {

							// this.ptshow = true
							this.drawbar(this.num1, this.num2, this.num3)
							// console.log('pk')

						}



					}).catch(function(error) {
						console.log("error", error);
					})
			},

			videocall() {
				//打开视频通话
				console.log('打开视频通话')


				//传组别过去
				axios.post('/pushVideoLeader', {
						"GN": this.GNo
					})
					.then((response) => {
						this.$message('已发送邀请')

					}).catch(function(error) {
						console.log("error", error);
					})



				// let routeData = this.$router.resolve({
				//   name: "searchGoods",
				//   query: params,
				//   params: { mid: params.mid }
				// });
				// window.open(routeData.href, '_blank');


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
					color: ["#fe3a63", "#4595e6", "#00e9f2"],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					legend: {
						top: '3%',
						data: ['待后送', '后送中', '已送达'],
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
						type: 'category',
						inverse: true,
						axisLine: {
							lineStyle: {
								color: "#12f1fe"
							}
						},
						axisLabel: {
							fontSize: 14,
							color: "#c0c6dc"
						},
						splitLine: {
							lineStyle: {
								color: "#212952"
							}
						}

					},
					series: [

						{
							name: '待后送',
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
							name: '后送中',
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
							name: '已送达',
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
} */
	.picture_body2 {
		/* border: 1px solid #808288; */
		text-align: left;
		color: whitesmoke;
		padding: 10px;
		background-color: #050e3a;
	}

	.text1 {
		color: #d7501a;
		font-size: 20px;
	}

	.text2 {
		color: #5aaee2;
		font-size: 20px;
	}

	.fuzeren {
		color: #fda794;
		font-size: 20px;
	}

	.location {
		color: #d3b29b;
		font-size: 20px;
	}

	.carid {
		color: #f2b05e;
		font-size: 20px;
	}

	.text1-title {
		font-size: 18px;
		font-weight: bold;
	}

	.text1-time {
		font-size: 14px Small;
		color: gray;
		padding: 10px;
	}

	.text1-content {
		font-size: 16px;
		margin: 0px 10px;
	}

	.text1-no {
		font-size: 16px;

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

	.corner2 {
		background-image: url(../../assets/corner.png);
		background-repeat: no-repeat;
		background-position: left top;
		background-size: 100% 100%;
		background-color: #041b52
	}

</style>
