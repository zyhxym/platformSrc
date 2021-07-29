<template>
  <div style="100%">
    <el-row style="text-align:left;padding:20px">
      <el-select v-model="select1"
                 @change="selectResource">
        <el-option v-for="item in vp1"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">

        <div class="demo-table table1">

          <el-table :data="drugtable"
                    @row-click="rowClick"
                    :header-row-style="{'height':'16px','padding':'2px'}"
                    :header-cell-style="{'background-color': '#0b1865','color': '#00deff', 'text-align':'center',padding:0}">
            <el-table-column label="名称"
                             prop="name">

            </el-table-column>
            <el-table-column label="总量"
                             prop="count">

            </el-table-column>
            <el-table-column label="现有量"
                             prop="nowAmount">

            </el-table-column>
            <el-table-column label="消耗量"
                             prop="used">

            </el-table-column>
            <el-table-column prop="ResourceDictNo"
                             v-if="false">

            </el-table-column>

          </el-table>
        </div>

        <el-row style="margin-top:50px;">
          <el-button @click="allocate()">分配资源清单</el-button>
        </el-row>
      </el-col>
      <el-col :span="14">
        <fieldset class="groupbox-boarder">
			<div class="chart">
<div class="title flex align-center"><img src="../../assets/icon-11.png" />地理分布</div>
          <div ref="barchart"
               style="width:1000px;height:700px;"></div>
			   </div>
        </fieldset>

      </el-col>
    </el-row>

    <div>
      <el-dialog :visible.sync="allocateVisible"
                 v-if="allocateVisible"
                 width="40%"
                 height="40%"
                 :before-close="handleClose">
        <el-form ref="form"
                 :rules="rules"
                 :model="form"
                 label-width="80px">

          <el-form-item label="分组"
                        prop="groupNo">
            <el-select v-model="form.groupNo"
                       placeholder="请选择分组"
                       @change="selectgroup">
              <el-option v-for="item in groupList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="已有资源"
                        v-if="groupResourevisiable">
            <el-table :data="ResourceListByGroup"
                      style="width:80%;padding-left:20px;"
                      :cell-style="{'background-color': 'white',padding:5}"
                      :header-cell-style="{'background-color': '#909399','color': '#303133', 'text-align':'center',padding:0}">
              <el-table-column label="资源号"
                               prop="ResourceNo"
                               align="center">

              </el-table-column>
              <el-table-column label="名称"
                               prop="ResourceName"
                               align="center">

              </el-table-column>
              <el-table-column label="现有量"
                               prop="Amount"
                               align="center">

              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="药品资源"
                        prop="resourceDictNo">
            <el-select v-model="form.resourceDictNo"
                       placeholder="请选择药品资源类别">
              <el-option v-for="item in ResourceDictList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="数量"
                        prop="amount">

            <el-input-number v-model="form.amount"
                             label="描述文字"
                             :min="0"></el-input-number>

          </el-form-item>

          <el-form-item label="生产厂家"
                        prop="manufacturer">
            <el-input v-model="form.manufacturer"></el-input>
          </el-form-item>
          <el-form-item label="批号"
                        prop="batchNumber">
            <el-input v-model="form.batchNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('form')">立即创建</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {

  data() {
    return {
      select1: 0,
      // vp1: [{ value: 1, label: '药品类别1' }, { value: 2, label: '药品类别2' }, { value: 3, label: '器材' }, { value: 4, label: '其他' }],
      vp1: [{ value: 0, label: '全部' }, { value: 1, label: '药品' }, { value: 2, label: '器材' }, { value: 3, label: '其他' }],
      drugtable: [],
      dataResource: [],
      allocateVisible: false,
      form: {
        groupNo: '',
        amount: '',
        resourceDictNo: '',
        manufacturer: '',
        batchNumber: ''
      },
      rules: {
        groupNo: [{ required: true, message: '请选择分组', trigger: 'change' }],
        amount: [{ required: true, message: '请选择数量', trigger: 'change' }],
        resourceDictNo: [{ required: true, message: '请选择资源类别', trigger: 'change' }],
        manufacturer: [{ required: true, message: '请输入生产厂家', trigger: 'blur' }],
        batchNumber: [{ required: true, message: '请输入批次', trigger: 'blur' }]
      },
      ResourceDictList: [],
      groupList: [],
      //现有资源列表
      ResourceListByGroup: [],
      groupResourevisiable: false,

    }
  },
  mounted() {

    this.getAllResource()

  },
  methods: {
    getAllResource() {
      axios.get('/getAllResource', {})
        .then((response) => {
          var tt = response.data.results
          // this.vp1 = tt.map(item => {
          //   return {              label: item.ResourceName,
          //     value: item.ResourceDictNo            }
          // })
          this.dataResource = tt.map(item => {
            return {
              ResourceDictNo: item.ResourceDictNo,
              ResourceType: item.ResourceType,
              name: item.ResourceName,

              count: item.nowAmount + item.used,
              nowAmount: item.nowAmount,
              used: item.used            }
          })

          this.selectResource(this.select1)
          // console.log(this.dataResource)

        }).catch(function (error) {
          console.log("error", error);
        })

    },
    selectResource(val) {

      // console.log(tt)
      if (val == 0) {
        this.drugtable = this.dataResource
      } else {
        this.drugtable = this.dataResource.filter(item => {
          return item.ResourceType == val

        })
      }




      // this.getResourceDictInfo(val)
      // this.drawbar(val)
      // this.drugtable = this.dataDrug.map(item => {
      //   return item.ResourceNo = val
      // })
      // console.log(this.drugtable)

    },
    allocate() {
      this.allocateVisible = true
      this.getgroupList()
      this.getResourceDictList()
    },
    //获取组别
    getgroupList() {

      var p1 = new Promise((resolve, reject) => {
        this.$axios.get('getHosList', {
        }).then(res => {
          // var aa = res.data.results
          // var bb = aa.map(item => {
          //   if (item.GroupNo != null) {
          //     return {
          //       label: item.OrganizationName,
          //       value: item.GroupNo
          //     }            }
          // }).filter(i => i)
          // console.log(bb)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })

      var p2 = new Promise((resolve, reject) => {
        this.$axios.get('getCarList', {
        }).then(res => {

          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
      var p3 = new Promise((resolve, reject) => {
        this.$axios.get('getAssemblyList', {
        }).then(res => {

          resolve(res)

        }).catch(err => {
          reject(err)
        })
      })
      Promise.all([p1, p2, p3]).then(res => {
        // console.log(res);
        var t1 = res[0].data.results
        var t2 = res[1].data.results
        var t3 = res[2].data.results

        var data1 = []
        for (var i = 0; i < t1.length; i++) {
          if (t1[i].GroupNo != null) {
            data1.push({ label: t1[i].OrganizationName, value: t1[i].GroupNo })
          }
        }

        for (var j = 0; j < t2.length; j++) {
          if (t2[j].GroupNo != null && t2[j].GroupNo != 'G00') {
            data1.push({ label: t2[j].CarName, value: t2[j].GroupNo })
          }
        }
        for (var k = 0; k < t3.length; k++) {
          if (t3[k].GroupNo != null) {
            data1.push({ label: t3[k].LocationName, value: t3[k].GroupNo })
          }
        }
        this.groupList = data1
      })


    },
    //选择组别
    selectgroup(val) {
      console.log(val)
      // this.groupResourevisiable = true
      this.getResourceListByGroup(val)

    },

    getResourceListByGroup(val) {
      axios.post('getResourceListByGroup', {
        "groupNo": val
      })
        .then(res => {
          this.ResourceListByGroup = res.data.results
          // console.log(res.data)

          this.groupResourevisiable = true


        }).catch(function (error) {
          console.log("error", error);
        })
    },
    //获取药品资源列表
    getResourceDictList() {
      axios.get('getResourceDictList', {})
        .then((response) => {
          var tt = response.data.results
          this.ResourceDictList = tt.map(item => {
            return {
              label: item.ResourceName,
              value: item.ResourceDictNo
            }
          })

        }).catch(function (error) {
          console.log("error", error);
        })

    },
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('newResource', {
            "resourceDictNo": this.form.resourceDictNo,
            "amount": this.form.amount,
            "groupNo": this.form.groupNo,
            "userId": "zyh",
            "manufacturer": this.form.manufacturer,
            "batchNumber": this.form.batchNumber
          }).then((response) => {
            this.$alert(response.data.results)
          }).catch(function (error) {
            console.log("error", error);
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.groupResourevisiable = false
    },


    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.reload()
        })
        .catch(_ => { });
    },
    rowClick(row, column, event) {


      console.log(row.ResourceDictNo)
      this.drawbar(row.ResourceDictNo)
    },





    drawbar(val) {


      axios.post('getResourceDictInfo', {
        "resourceDictNo": val
      })
        .then((response) => {
          var tt = response.data.results

          var data1 = []
          var data2 = []
          var data3 = []
          for (var i = 0; i < tt.length; i++) {
            data1.push(tt[i].GroupName)
            data2.push(tt[i].Amount)
            data3.push(tt[i].Used)
          }


          let barchart = this.$echarts.init(this.$refs.barchart, 'white')
          barchart.setOption({
						color:["#fe3a63","#4595e6","#00e9f2","#ffd835","#23befa"],
            title: {
              // text: '地理分布'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['现有量', '消耗量'],
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
              // data: ['会场1', '会场2', '车辆1', '车辆2', '医院1', '医院2']
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
                name: '现有量',
                type: 'bar',
				barWidth:30,
                // data: [6, 1, 1, 2, 10, 15]
                data: data2,
                label: {
                  normal: {
                    show: true,
                    position: 'top'
                  }
                },
              },
              {
                name: '消耗量',
                type: 'bar',
				barWidth:30,
                // data: [4, 6, 2, 1, 4, 8]
                data: data3,
                label: {
                  normal: {
                    show: true,
                    position: 'top'
                  }
                },
              }
            ]

          })

        }).catch(function (error) {
          console.log("error", error);
        })




      // console.log('kaishi')




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
  /* background-color: #428bca; */
  /* color: #fffffb; */
}
.groupbox-boarder{
	border:0 !important;
	margin-top:0 !important;
}
.table1 .el-table--border, .el-table--group{
	border:0;
}
.table1 .has-gutter tr{
	height: 45px !important;
}
.table1 tr.el-table__row:nth-of-type(odd){
    background-color: #172d80;
}
.table1 tr.el-table__row:nth-of-type(even){
    background-color: #0b1865;
}
.table1 tr.el-table__row:nth-of-type(odd):hover td{
    background-color: #172d80 !important;
}
.table1 tr.el-table__row:nth-of-type(even):hover td{
    background-color: #0b1865 !important;
}
</style>


