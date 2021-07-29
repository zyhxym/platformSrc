<template>
  <div style="height:100%;">
    <el-row>
      <el-container>
        <el-aside  width="600px">
          <div style="height: 30px; text-align: right; font-size: 30px; color: #ffffff; margin-top: 10px; margin-left: 50px"> 当前平台共接诊50人 转送10人</div>
        </el-aside>
        <el-main>
                <el-col :offset="6">
                    <el-date-picker v-model="value1"
                                    type="date"
                                    :editable="false"
                                    :clearable="false"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions"
                                    @change="choosedate1()"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                    &nbsp; &nbsp;
                    <el-button @click="reset()">重置</el-button>
                </el-col>
        </el-main>
      </el-container>
    </el-row>

    <el-row :gutter="20"
            style="padding:10px">
      <!----------------------------- 第一列 病人状态统计图 --------------->
      <el-col :span="8">
        <div class="chart chartbg">
		      <div class="title flex align-center"><img src="../assets/icon-11.png" />病人状态统计</div>
		      <div ref="chart1"
		        style="height:340px;"></div>
	      </div>
      </el-col>
      <!----------------------------- 第二列 病情级别统计图 --------------->
      <el-col :span="8">
        <div class="chart chartbg">
       		<div class="title flex align-center"><img src="../assets/icon-11.png" />病情级别统计</div>
       		<div ref="chart2"
       		        style="height:340px;"></div>
        </div>
      </el-col>
      <!----------------------------- 第三列 处置情况统计图 -------------->
      <el-col :span="8">
        <div class="chart chartbg">
       		   <div class="title flex align-center"><img src="../assets/icon-11.png" />疾病种类统计</div>
       		   <div ref="chart3"
       		        style="height:340px;"></div>
        </div>
      </el-col>
    </el-row>
                  <!----------------- 第二行柱状图开始 ---------->
    <el-row :gutter="20"
            style="padding:10px">
      <!------------------------------ 第一列 场馆工作量统计 ------------------>
      <el-col :span="8">
        <div class="chart">
		      <div class="title flex align-center"><img src="../assets/icon-11.png" />场馆工作量统计</div>
		      <div ref="barchart1"
		           style="height:360px;"></div>
	      </div>
      </el-col>
      <!------------------------------ 第二列 车辆工作量统计 ----------------->
      <el-col :span="8">
        <div class="chart">
		      <div class="title flex align-center"><img src="../assets/icon-11.png" />车辆工作量统计</div>
	      	<div ref="carchart"
		            style="height:360px;"></div>
	      </div>
      </el-col>
      <!------------------------------ 第三列 医院工作量统计 ----------------->
      <el-col :span="8">
        <div class="chart">
		      <div class="title flex align-center"><img src="../assets/icon-11.png" />医院工作量统计</div>
	      	<div ref="barchart2"
		            style="height:360px;"></div>
	      </div>
      </el-col>
    </el-row>
  </div>
  <!------============================ 页面视图template结束===============================-->
</template>
    
<script>
import axios from 'axios';
export default {
  inject: ['reload'],
  data() {
    return {
      value1: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },

      carChartData: {
        cardata1: ['车辆1', '车辆2', '车辆3', '车辆4'],
        cardata2: [17, 20, 38, 5]
      }
    }
  },
  mounted() {
    console.log('进入医疗业务页面')
    this.$nextTick(() => {
      this.drawpie1();
      this.drawpie2();
      this.drawpie3();
      this.drawbar1()
      this.drawbar2()

      // 车辆表格
      this.drawbar()
    })
  },
  methods: {
    choosedate1() {
      console.log(this.value1)
      this.Redrawpie1(this.value1);
      this.Redrawpie2(this.value1);
      this.Redrawpie3(this.value1);
      this.Redrawbar1(this.value1)
      this.Redrawbar2(this.value1)
    },
    confirm() {

    },
    reset() {
      console.log('重置')
      this.value1 = ''
      this.drawpie1();
      this.drawpie2();
      this.drawpie3();
      this.drawbar1()
      this.drawbar2()
    },
    
    // ================================================ 第一个饼图 病人状态统计 处置中 待后送 后送中 已入院 ============================================================
    drawpie1() {
      let chart = this.$echarts.init(this.$refs.chart1, 'white')
      // console.log(response.data.results)
      axios.get('/getAllStatusCount', {}).then((response) => {
        var data1 = [];
        var a = response.data.results.chuzhizhong;
        var b = response.data.results.chuzhiwancheng;
        var c = response.data.results.daihousong;
        var d = response.data.results.housongzhong;
        var e = response.data.results.yiruyuan;
        var f = response.data.results.yichuyuan;

        if (a > 0) {
          data1.push({ name: '处置中', value: a })
        }
        if (b > 0) {
          data1.push({ name: '处置完成', value: b })
        }
        if (c > 0) {
          data1.push({ name: '待后送', value: c })
        }
        if (d > 0) {
          data1.push({ name: '后送中', value: d })
        }
        if (e > 0) {
          data1.push({ name: '已入院', value: e })
        }
        if (f > 0) {
          data1.push({ name: '已出院', value: f })
        }
        if (data1.length < 1) {
          data1.push({ name: '处置中', value: a }, { name: '处置完成', value: b }, { name: '待后送', value: c }, { name: '后送中', value: d }, { name: '已入院', value: e }, { name: '已出院', value: f })
        }

        //data1.push({ name: '处置中', value: a }, { name: '处置完成', value: b }, { name: '待后送', value: c }, { name: '待后送', value: c },{ name: '待后送', value: c }, { name: '已出院', value: f })
        chart.setOption({
			    color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
          title: {
            // text: '病人状态统计'

          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },

          series: [
            {
              name: '病人状态统计',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['55%', '50%'],
              avoidLabelOverlap: false,
              data: data1
            }
          ]
        })
      }).catch(function (error) {
        console.log("error", error);
      })
    },
    // ----------------------------------------第一个饼图   病人状态统计---------------------------------------------------
    Redrawpie1(val) {
      let chart = this.$echarts.init(this.$refs.chart1, 'white')
      // console.log(response.data.results)
      axios.post('/getAllStatusCountbyDate', {
        "time": val
      }).then((response) => {
        console.log('根据日期获取一次数据')

        var data1 = [];
        var a = response.data.results.chuzhizhong;
        var b = response.data.results.chuzhiwancheng;
        var c = response.data.results.daihousong;
        var d = response.data.results.housongzhong;
        var e = response.data.results.yiruyuan;
        var f = response.data.results.yichuyuan;

        if (a > 0) {
          data1.push({ name: '处置中', value: a })
        }
        if (b > 0) {
          data1.push({ name: '处置完成', value: b })
        }
        if (c > 0) {
          data1.push({ name: '待后送', value: c })
        }
        if (d > 0) {
          data1.push({ name: '后送中', value: d })
        }
        if (e > 0) {
          data1.push({ name: '已入院', value: e })
        }
        if (f > 0) {
          data1.push({ name: '已出院', value: f })
        }
        if (data1.length < 1) {
          data1.push({ name: '处置中', value: 0 }, { name: '处置完成', value: 0 }, { name: '待后送', value: 0 }, { name: '后送中', value: 0 }, { name: '已入院', value: 0 }, { name: '已出院', value: 0 })
        }

        chart.setOption({
		    	color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
          title: {
            // text: '病人状态统计'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
            {
              name: '病人状态统计',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['55%', '50%'],
              avoidLabelOverlap: false,
              data: data1
            }
          ]
        })
      }).catch(function (error) {
        console.log("error", error);
      })
    },

   //=========================================== 第二个饼图 病情级别统计=== I级 II级 III级 IV级 V级 未分级 ====================================
    drawpie2() {
      let chart = this.$echarts.init(this.$refs.chart2, 'white')
      axios.get('/getAllClassificationCount', {})
        .then((response) => {
          var cdata = response.data.results
          console.log(cdata, 'pie2')

          var f = 0
          var a = 0
          var b = 0
          var c = 0
          var d = 0
          var e = 0
          var data1 = [];
          cdata.forEach(item => {
            if (item.Classification == 0) {
              f = cdata.find(item => item.Classification == 0).count

              data1.push({ name: '未分级', value: f })
            }
            else {
              f = 0
            }
            if (item.Classification == 1) {
              a = cdata.find(item => item.Classification == 1).count

              data1.push({ name: 'Ⅰ级', value: a })            }
            else {
              a = 0
            }
            if (item.Classification == 2) {
              b = cdata.find(item => item.Classification == 2).count

              data1.push({ name: 'Ⅱ级', value: b })            }
            else {
              b = 0
            }
            if (item.Classification == 3) {
              c = cdata.find(item => item.Classification == 3).count

              data1.push({ name: 'Ⅲ级', value: c })            }
            else {
              c = 0
            }
            if (item.Classification == 4) {
              d = cdata.find(item => item.Classification == 4).count

              data1.push({ name: 'Ⅳ级', value: d })            }
            else {
              d = 0
            }
            if (item.Classification == 5) {
              e = cdata.find(item => item.Classification == 5).count

              data1.push({ name: 'Ⅴ级', value: e })            }
            else {
              e = 0
            }
          })
          if (data1.length < 1) {
            data1.push({ name: 'Ⅰ级', value: 0 }, { name: 'Ⅱ级', value: 0 }, { name: 'Ⅲ级', value: 0 }, { name: 'Ⅳ级', value: 0 }, { name: '未分级', value: 0 }, { name: 'Ⅴ级', value: 0 })
          }

          // var data1 = [];
          // data1.push({ name: 'Ⅰ级', value: a }, { name: 'Ⅱ级', value: b }, { name: 'Ⅲ级', value: c }, { name: 'Ⅳ级', value: d }, { name: '未分级', value: f })
          chart.setOption({
			      color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
            title: {
              // text: '病情级别统计'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
              {
                name: '病情级别统计',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['55%', '50%'],
                avoidLabelOverlap: false,
                data: data1
              }
            ]
          })
        })
        .catch(function (error) {
          console.log("error", error);
        })

    },
    // -------------------------------第二个饼图--病情级别统计------------------------------------------------
    Redrawpie2(val) {
      let chart = this.$echarts.init(this.$refs.chart2, 'white')
      axios.post('/getAllClassificationCountbyDate', {
        time: val
      })
        .then((response) => {
          console.log('根据日期获取一次数据pie2')
          var cdata = response.data.results
          var f = 0
          var a = 0
          var b = 0
          var c = 0
          var d = 0
          var e = 0
          var data1 = [];
          cdata.forEach(item => {
            if (item.Classification == 0) {
              f = cdata.find(item => item.Classification == 0).count

              data1.push({ name: '未分级', value: f })
            }
            else {
              f = 0
            }
            if (item.Classification == 1) {
              a = cdata.find(item => item.Classification == 1).count

              data1.push({ name: 'Ⅰ级', value: a })            }
            else {
              a = 0
            }
            if (item.Classification == 2) {
              b = cdata.find(item => item.Classification == 2).count

              data1.push({ name: 'Ⅱ级', value: b })            }
            else {
              b = 0
            }
            if (item.Classification == 3) {
              c = cdata.find(item => item.Classification == 3).count

              data1.push({ name: 'Ⅲ级', value: c })            }
            else {
              c = 0
            }
            if (item.Classification == 4) {
              d = cdata.find(item => item.Classification == 4).count
              data1.push({ name: 'Ⅳ级', value: d })            }
            else {
              d = 0
            }
            if (item.Classification == 5) {
              e = cdata.find(item => item.Classification == 5).count

              data1.push({ name: 'Ⅴ级', value: e })            }
            else {
              e = 0
            }
          })
          if (data1.length < 1) {
            data1.push({ name: 'Ⅰ级', value: 0 }, { name: 'Ⅱ级', value: 0 }, { name: 'Ⅲ级', value: 0 }, { name: 'Ⅳ级', value: 0 }, { name: '未分级', value: 0 }, { name: 'Ⅴ级', value: 0 })
          }
          chart.setOption({
			      color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
            title: {
              // text: '病情级别统计'

            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            series: [
              {
                name: '病情级别统计',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['55%', '50%'],
                avoidLabelOverlap: false,
                data: data1
              }
            ]
          })
        })
        .catch(function (error) {
          console.log("error", error);
        })
    },
    
    // ==================================== 第三个饼图  处置情况统计 ====== 吸氧 心电图 止血包扎 支具固定============================================
    drawpie3() {
      let chart = this.$echarts.init(this.$refs.chart3, 'white')

      axios.get('/getAllOperationCount', {}).then((response) => {

        var cdata = response.data.results
        // console.log(cdata)
        var ddata = []
        cdata.forEach(item => {
          if (['P111', 'P112', 'P113', 'P114', 'P115', 'P116', 'P117'].includes(item.OperationCode)) {            
            ddata.push({ name: item.OperationName, value: item.count })
          }

        })

        chart.setOption({
			    color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
          title: {
            // text: '处置情况统计'

          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },

          series: [
            {
              name: '处置情况统计',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['55%', '50%'],
              avoidLabelOverlap: false,

              data: ddata
            }
          ]        
        })

      })
        .catch(function (error) {
          console.log("error", error);
        })
    },

    // -----------------------第三个饼图-------处置情况统计---------------------------------------------------
    Redrawpie3(val) {
      let chart = this.$echarts.init(this.$refs.chart3, 'white')

      axios.post('/getAllOperationCountbyDate', {
        "time": val
      }).then((response) => {

        var cdata = response.data.results
        // console.log(cdata)
        var ddata = []

        cdata.forEach(item => {
          if (['P111', 'P112', 'P113', 'P114', 'P115', 'P116', 'P117'].includes(item.OperationCode)) {
            ddata.push({ name: item.OperationName, value: item.count })
          }

        })
        if (ddata.length < 1) {
          ddata.push(
            { name: '吸氧', value: 0 },
            { name: "心电图", value: 0 },
            { name: "止血包扎", value: 0 },
            { name: "支具固定", value: 0 },
            { name: "口服药物", value: 0 },
            { name: "静脉给药", value: 0 },
            { name: "其它处理", value: 0 }
          )
        }

        chart.setOption({
			    color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
          title: {
            // text: '处置情况统计'

          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },

          series: [
            {
              name: '处置情况统计',
              type: 'pie',
              radius: ['30%', '60%'],
              center: ['55%', '50%'],
              avoidLabelOverlap: false,
              data: ddata,
            }
          ]        
        })
      })
        .catch(function (error) {
          console.log("error", error);
        })
    },

   // ====================== 第一个柱状图 === 会场情况统计 现场处置人数 后送人数 ====================================
    drawbar1() {
      let barchart = this.$echarts.init(this.$refs.barchart1, 'white')
      axios.get('/getAssemblyList', {})
        .then((response) => {
          var tt = response.data.results
          var data1 = []
          var data2 = []
          var data3 = []
          var p1 = []
          for (var i = 0; i < tt.length; i++) {
            if (tt[i].GroupNo != null) {
              data1.push(tt[i].LocationName)

              p1.push(
                this.$axios.post('getEmergencyStatusCount', {
                  "groupNo": tt[i].GroupNo
                }))
            }
          }
          Promise.all(p1).then(res => {
            console.log(res);
            for (var j = 0; j < res.length; j++) {
              data2.push(res[j].data.results.chuzhizhong + res[j].data.results.chuzhiwancheng)
              data3.push(res[j].data.results.daihousong + res[j].data.results.yihousong)
            }
            console.log('会场处置统计')


            barchart.setOption({

               // =============================================================滚动条的设置
              dataZoom: [{
                type: 'slider',
                show: true,      //false直接隐藏图形
                xAxisIndex: [0],
                left: '5%',     //滚动条靠左侧的百分比
                
                start: 0,       //滚动条的起始位置
                end: 50,        //滚动条的截止位置（按比例分割你的柱状图x轴长度）
              
             }],
							color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
              title: {
                // text: '会场情况统计'

              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['现场处置人数', '后送人数'],
								textStyle:{
										color:"#c0c6dc",
										fontSize:14
								}
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: data1,
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
                type: 'value',
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
              series: [
                {
                  name: '现场处置人数',
                  type: 'bar',
                  data: data2,
				          barWidth:'14%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
                {
                  name: '后送人数',
                  type: 'bar',
                  data: data3,
				          barWidth:'14%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
              ]
            })
          }).catch(
            (err) => {
              console.log(err)
            }
          )
        }).catch(function (error) {
          console.log("error", error);
        })
    },
    //------------------------第一个柱状图 --------  会场情况统计  ----------------------------------------------------------------
    Redrawbar1(val) {
      let barchart = this.$echarts.init(this.$refs.barchart1, 'white')
      axios.get('/getAssemblyList', {})
        .then((response) => {
          var tt = response.data.results
          var data1 = []
          var data2 = []
          var data3 = []
          var p1 = []
          for (var i = 0; i < tt.length; i++) {
            if (tt[i].GroupNo != null) {
              data1.push(tt[i].LocationName)
              // console.log(tt[i].GroupNo)
              p1.push(
                this.$axios.post('getEmergencyStatusCountbyDate', {
                  "groupNo": tt[i].GroupNo,
                  "time": val
                }))
            }
          }
          Promise.all(p1).then(res => {
            // console.log(res);
            for (var j = 0; j < res.length; j++) {
              data2.push(res[j].data.results.chuzhizhong + res[j].data.results.chuzhiwancheng)
              data3.push(res[j].data.results.daihousong + res[j].data.results.yihousong)
            }
            console.log('会场处置统计')
            barchart.setOption({
      
				      color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
              title: {
                // text: '会场情况统计'

              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['现场处置人数', '后送人数'],
				        textStyle:{
						  			  color:"#c0c6dc",
						  			  fontSize:14
						    }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: data1,
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

              type: 'value',
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
              series: [
                {
                  name: '现场处置人数',
                  type: 'bar',
                  data: data2,
				          barWidth:'14%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
                {
                  name: '后送人数',
                  type: 'bar',
				          barWidth:'14%',
                  data: data3,
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
              ]
            })

          }).catch(
            (err) => {
              console.log(err)
            }
          )
        }).catch(function (error) {
          console.log("error", error);
        })

    },
    // --------------------------------------------------车辆工作量柱状图
    drawbar() {
      var myChart = this.$echarts.init(this.$refs.carchart);
      myChart.setOption({

    // ========滚动条的设置

        dataZoom: [{
          type: 'slider',
          show: true,      //false直接隐藏图形
          xAxisIndex: [0],
          left: '5%',     //滚动条靠左侧的百分比    
          start: 0,       //滚动条的起始位置
          end: 50,        //滚动条的截止位置（按比例分割你的柱状图x轴长度）
        }],
        
          color: ["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
          grid: {
            left: "3%",  
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
          legend: {
                data: ['工作量'],
				        textStyle:{
						  			  color:"#c0c6dc",
						  			  fontSize:14
						    }
              },
          xAxis: {
            type: 'category',
                data: this.carChartData.cardata1,
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
            type: 'value',
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
          series: [
            {
              name: '工作量',
              barWidth: '22%',
              type: "bar",
              data: this.carChartData.cardata2,
              label: {
                normal: {
                  show: true,
                  position: "top"
                },
               
              }
            }
          ]
        },
        true
      );
    },
    // ====================== 第二个柱状图 ===============  医院情况统计 待后送 已入院 已出院  ====================================
    drawbar2() {
      let barchart = this.$echarts.init(this.$refs.barchart2, 'white')

      axios.get('/getHosList', {})
        .then((response) => {
          var tt = response.data.results
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var p1 = []

          for (var i = 0; i < tt.length; i++) {
            if (tt[i].GroupNo != null) {
              data1.push(tt[i].OrganizationName)
              // console.log(tt[i].GroupNo)
              p1.push(
                this.$axios.post('getHosStatusCount', {
                  "groupNo": tt[i].GroupNo
                }))
            }
          }

          Promise.all(p1).then(res => {
            // console.log(res);

            for (var j = 0; j < res.length; j++) {
              data2.push(res[j].data.results.daisongda)
              data3.push(res[j].data.results.yiruyuan)
              data4.push(res[j].data.results.yichuyuan)
            }

            // console.log('第二步')

            barchart.setOption({

              // =============================================================滚动条的设置
              dataZoom: [{
                type: 'slider',
                show: true,      //false直接隐藏图形
                xAxisIndex: [0],
                left: '5%',     //滚动条靠左侧的百分比
                
                start: 0,       //滚动条的起始位置
                end: 50,        //滚动条的截止位置（按比例分割你的柱状图x轴长度）
              
             }],
			      	color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
              title: {
                // text: '医院情况统计',

              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['待后送', '已入院', '已出院'],
				        textStyle:{
						  			  color:"#c0c6dc",
						  			  fontSize:14
						    }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: data1,
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

                type: 'value',
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
              series: [
                {
                  name: '待后送',
                  type: 'bar',
                  data: data2,
				          barWidth:'22%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },

                },
                {
                  name: '已入院',
                  type: 'bar',
                  data: data3,
				          barWidth:'22%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
                {
                  name: '已出院',
                  type: 'bar',
                  data: data4,
                  barWidth:'22%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
              ]
            })

          }).catch(
            (err) => {
              console.log(err)
            }
          )
        }).catch(function (error) {
          console.log("error", error);
        })
    },
    // ---------------------- 第二个柱状图 -------- 医院情况统计 -----------------------------------------------------------------
    Redrawbar2(val) {
      let barchart = this.$echarts.init(this.$refs.barchart2, 'white')

      axios.get('/getHosList', {})
        .then((response) => {
          var tt = response.data.results
          var data1 = []
          var data2 = []
          var data3 = []
          var data4 = []
          var p1 = []
          for (var i = 0; i < tt.length; i++) {
            if (tt[i].GroupNo != null) {
              data1.push(tt[i].OrganizationName)
              // console.log(tt[i].GroupNo)
              p1.push(
                this.$axios.post('getHosStatusCountbyDate', {
                  "groupNo": tt[i].GroupNo,
                  "time": val
                }))
            }
          }

          Promise.all(p1).then(res => {
            // console.log(res);

            for (var j = 0; j < res.length; j++) {
              data2.push(res[j].data.results.daisongda)
              data3.push(res[j].data.results.yiruyuan)
              data4.push(res[j].data.results.yichuyuan)
            }

            // console.log('第二步')
            barchart.setOption({
				      color:["#fa2e71","#23befa","#23fac5","#2a4dd2","#ffd835","#00e188"],
              title: {
                // text: '医院情况统计',

              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['待后送', '已入院', '已出院'],
				        textStyle:{
						  			  color:"#c0c6dc",
						  			  fontSize:14
						    }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: data1,
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

              type: 'value',
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
              series: [
                {
                  name: '待后送',
                  type: 'bar',
				          barWidth:'22%',
                  data: data2,
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },

                },
                {
                  name: '已入院',
                  type: 'bar',
                  data: data3,
				          barWidth:'22%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
                {
                  name: '已出院',
                  type: 'bar',
                  data: data4,
				          barWidth:'22%',
                  label: {
                    normal: {
                      show: true,
                      position: 'top'
                    }
                  },
                },
              ]
            })
          }).catch(
            (err) => {
              console.log(err)
            }
          )
        }).catch(function (error) {
          console.log("error", error);
        })
    }
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
  font-size: 14px;
}
.cardcss1 {
  background-color: #333333;
  color: white;
  font-family: "Helvetica Neue";
  font-size: 20px;
}
.chart{
	background-color: #050e3a !important;
	margin-top:10px;
}
.chartbg{
	background: url(../assets/chart-bg2.png) no-repeat top left;
	background-size:300px 300px;
	background-position: 158px 66px;
}

.chart .title{
	text-align: left;
	color:#fff;
	font-size:16px;
	height: 45px;
	background: url(../assets/chart-bg.png) no-repeat top left;
	background-size:100% 100%;
	padding:0 20px;
	margin-bottom:20px;
	
}
.chartbg .title{margin-bottom:0;}
.chart .title img{
	margin-right:10px;
}
</style>


