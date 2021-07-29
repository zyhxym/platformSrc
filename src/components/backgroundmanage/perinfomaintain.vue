<template>
  <div>

    <el-row style="margin-top:10px;margin-bottom:20px">

      <el-select v-model="select2"
                 placeholder="请选择角色">
        <el-option v-for="item in vp2"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>

      <el-button type="primary"
                 @click="searchList()">确定</el-button>
      <!-- <el-button type="info"
                 @click="searchClear()">清空搜索</el-button> -->
    </el-row>
    <h3 class="text-cyan padding-10">保障人员列表</h3>
    <div class="demo-table table1">

      <el-table :data="AllStaff"
                max-height="350"
                :cell-style="{'text-align':'center'}"
                :row-style="{}"
                :header-row-style="{}"
                @row-click="rowClick1"
                :header-cell-style="{'background-color': '#0b1865','color': '#00deff', 'text-align':'center',padding:0}">
        <el-table-column prop="PersonnelID"
                         label="编号">
        </el-table-column>
        <el-table-column prop="Name"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="gender"
                         label="性别">
        </el-table-column>
        <el-table-column prop="Age"
                         label="年龄">
        </el-table-column>
        <el-table-column prop="RoleName"
                         label="角色">
        </el-table-column>
        <el-table-column prop="GroupName"
                         label="小组">
        </el-table-column>
        <el-table-column prop="GroupPosition"
                         label="职责">
        </el-table-column>
        <el-table-column prop="DepartmentCode"
                         label="单位">
        </el-table-column>
        <el-table-column prop="TitleCode"
                         label="职称">
        </el-table-column>
        <el-table-column v-if="false"
                         prop="Specialty">
        </el-table-column>
        <el-table-column v-if="false"
                         prop="DepartmentName">
        </el-table-column>
        <el-table-column v-if="false"
                         prop="Phone">
        </el-table-column>
      </el-table>
    </div>
    <h3 class="text-cyan padding-10" style="margin-bottom:10px;margin-top:30px">专家列表</h3>
    <div class="demo-table table1">
      <el-table :data="ExpertList"
                max-height="300"
                :cell-style="{'text-align':'center'}"
                :row-style="{}"
                :header-row-style="{}"
                @row-click="rowClick2"
                :header-cell-style="{'background-color': '#0b1865','color': '#00deff', 'text-align':'center',padding:0}">
        <el-table-column prop="PersonnelID"
                         label="编号">
        </el-table-column>
        <el-table-column prop="Name"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="gender"
                         label="性别">
        </el-table-column>
        <el-table-column prop="Age"
                         label="年龄">
        </el-table-column>
        <el-table-column prop="RoleName"
                         label="角色">
        </el-table-column>
        <el-table-column prop="GroupName"
                         label="小组">
        </el-table-column>
        <el-table-column prop="GroupPosition"
                         label="职责">
        </el-table-column>
        <el-table-column prop="DepartmentCode"
                         label="单位">
        </el-table-column>
        <el-table-column prop="TitleCode"
                         label="职称">
        </el-table-column>
        <el-table-column v-if="false"
                         prop="Specialty">
        </el-table-column>
        <el-table-column v-if="false"
                         prop="DepartmentName">
        </el-table-column>
        <el-table-column v-if="false"
                         prop="Phone">
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="personnelvisible"
               :before-close="handleClose"
               width="30%"
               style="text-align:left;">

      <el-row>

        <el-col :span="8">
          <div align="center">
            <img src="~@/assets/UserPhoto.png"
                 style="height:80px;">
          </div>
        </el-col>
        <el-col :span="16">
          <el-row>
            角色：{{currentperson.RoleName}}
          </el-row>
          <el-row>
            姓名：{{currentperson.Name}}
          </el-row>
          <el-row>
            性别：{{currentperson.gender}}
          </el-row>
          <el-row>
            年龄：{{currentperson.Age}}
          </el-row>
          <el-row>
            手机：{{currentperson.Phone}}
          </el-row>
          <el-row>
            单位：{{currentperson.DepartmentCode}}
          </el-row>
          <el-row>
            职称：{{currentperson.TitleCode}}
          </el-row>
          <!-- <el-row>
            科室：{{currentperson.DepartmentName}}
          </el-row> -->
          <!-- <el-row>
            专长：{{currentperson.Specialty}}
          </el-row> -->

        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :visible.sync="personnelvisible2"
               :before-close="handleClose"
               width="30%"
               style="text-align:left;">

      <el-row>

        <el-col :span="8">
          <div align="center">
            <img src="~@/assets/UserPhoto.png"
                 style="height:80px;">
          </div>

        </el-col>
        <el-col :span="16">
          <el-row>
            角色：{{currentperson.RoleName}}
          </el-row>
          <el-row>
            姓名：{{currentperson.Name}}
          </el-row>
          <el-row>
            性别：{{currentperson.gender}}
          </el-row>
          <el-row>
            年龄：{{currentperson.Age}}
          </el-row>
          <el-row>
            手机：{{currentperson.Phone}}
          </el-row>
          <el-row>
            单位：{{currentperson.DepartmentCode}}
          </el-row>
          <el-row>
            职称：{{currentperson.TitleCode}}
          </el-row>
          <!-- <el-row>
            科室：{{currentperson.DepartmentName}}
          </el-row> -->
          <el-row>
            专长：{{currentperson.Specialty}}
          </el-row>

        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      personnelinfo: [{
        'sno': 'z001',
        'name': '张三',
        'sex': '男',
        'age': '30',
        'role': '指挥组',
        'group': '',
        'duty': '总指挥',
        'unit': '浙二',
        'title': '正高'      },
      {
        'sno': '',
        'name': '',
        'sex': '',
        'age': '',
        'role': '',
        'group': '',
        'duty': '',
        'unit': '',
        'title': ''      },
      {
        'sno': '',
        'name': '',
        'sex': '',
        'age': '',
        'role': '',
        'group': '',
        'duty': '',
        'unit': '',
        'title': ''      },

      ],
      AllStaff: [],
      AllStaffcopy: [],
      // select1: '人员库',
      // vp1: [{ 'value': '人员库', 'label': '人员库' },
      // { 'value': '本次活动', 'label': '本次活动' }],
      select2: '',
      vp2: [{ 'value': '全部角色', 'label': '全部角色' },
      { 'value': '现场组', 'label': '现场组' },
      { 'value': '车辆组', 'label': '车辆组' },

      { 'value': '医院组', 'label': '医院组' },
      ],
      searchinput: '',
      // select3: '全部小组',
      // vp3: [{ 'value': '全部小组', 'label': '全部小组' },
      // { 'value': '第一组', 'label': '第一组' },
      // { 'value': '第二组', 'label': '第二组' },
      // { 'value': '第三组', 'label': '第三组' }],
      // select4: '编号正序',
      // vp4: [{ 'value': '编号正序', 'label': '编号正序' },
      // { 'value': '编号倒序', 'label': '编号倒序' }],
      personnelvisible: false,
      personnelvisible2: false,
      ExpertList: [],
      currentperson: {},
    }


  },
  mounted() {
    this.getAllStaff()

  },
  methods: {
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {

      //     done();
      //     this.reload()

      //   })
      //   .catch(_ => { });

      done();
      //     this.reload()
    },
    //   dataFilter(val) {
    //     this.select2 = val;
    //     if (val) { //val存在
    //       this.options = this.optionsCopy.filter((item) => {
    //         if (!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase())) {
    //           return true
    //         }
    //       })
    //     } else { //val为空时，还原数组
    //       this.options = this.optionsCopy;
    //     }
    //   }
    // },

    searchList() {
      // this.select2 = val;
      console.log(this.select2)
      var val = this.select2
      if (val != "全部角色") {
        this.AllStaff = this.AllStaffcopy.filter(item => {
          return item.RoleName == val
        })
      }
      else {
        this.AllStaff = this.AllStaffcopy
      }
      // if (val) { //val存在
      //   this.AllStaff = this.AllStaffcopy.filter((item) => {
      //     if (!!~item.GroupName.indexOf(val) || !!~item.GroupName.toUpperCase().indexOf(val.toUpperCase())) {
      //       return true
      //     }
      //   })
      // } else { //val为空时，还原数组
      //   console.log('aarguments')
      // }


    },
    // searchClear() {

    // },
    rowClick1(row, column, event) {
      this.personnelvisible = true
      // console.log(row)
      this.currentperson = row
      // console.log(this.currentperson)

    },
    rowClick2(row, column, event) {
      this.personnelvisible2 = true
      // console.log(row)
      this.currentperson = row
      // console.log(this.currentperson)

    },
    //修改人员信息
    editp() {

    },
    getAllStaff() {
      axios.get('/getAllStaff', {})
        .then(response => {
          var cc = response.data.results

          // console.log(cc)
          const MapTable = new Map([[1, '男'], [2, '女']])
          // RoleCode

          var data1 = []
          var data2 = []
          for (var i = 0; i < cc.length; i++) {
            if (cc[i].RoleCode == 'R04') {
              data1.push({
                gender: MapTable.get(cc[i].Gender),
                PersonnelID: cc[i].PersonnelID,
                Age: cc[i].Age,
                Name: cc[i].Name,
                RoleName: cc[i].RoleName,
                GroupName: cc[i].GroupName,
                Username: cc[i].Username,
                GroupPosition: cc[i].GroupPosition,
                OrganizationName: cc[i].OrganizationName,
                TitleCode: cc[i].TitleCode,
                DepartmentCode: cc[i].DepartmentCode,
                Specialty: cc[i].Specialty,
                Phone: cc[i].Phone
              })

            } else {
              data2.push({
                gender: MapTable.get(cc[i].Gender),
                PersonnelID: cc[i].PersonnelID,
                Age: cc[i].Age,
                RoleName: cc[i].RoleName,
                Name: cc[i].Name,
                GroupName: cc[i].GroupName,
                Username: cc[i].Username,
                GroupPosition: cc[i].GroupPosition,
                OrganizationName: cc[i].OrganizationName,
                TitleCode: cc[i].TitleCode,
                DepartmentCode: cc[i].DepartmentCode,
                Specialty: cc[i].Specialty,
                Phone: cc[i].Phone
              })
            }
          }
          this.AllStaff = data2
          this.AllStaffcopy = data2
          this.ExpertList = data1
          // console.log(data1, data2)

          // this.AllStaff = cc.map(item => {


          //   return {              Name: item.Name,
          //     gender: MapTable.get(item.Gender),
          //     PersonnelID: item.PersonnelID,
          //     Age: item.Age,
          //     RoleName: item.RoleName,
          //     GroupName: item.GroupName,
          //     GroupPosition: item.GroupPosition,
          //     OrganizationName: item.OrganizationName,
          //     TitleName: item.TitleName,
          //     DepartmentName: item.DepartmentName,
          //     Specialty: item.Specialty,
          //     Phone: item.Phone




          //   }


          // })
        })
        .catch(function (error) {
          console.log("error", error);
        });
    }
  }
}
</script>
<style >
</style>

