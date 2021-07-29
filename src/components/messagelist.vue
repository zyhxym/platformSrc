<template>
  <div style="heigth:100%">

    <el-row style="margin-top:30px;">
      <div class="demo-table table1">
        <el-table :data="msgtable.slice((currentPage-1)*pagesize, currentPage*pagesize)"
                  style="margin-left:20px;width:90%"
                  @row-click="rowClick"
                  :header-row-style="{'height':'16px','padding':'2px'}"
                  :header-cell-style="{'background-color': '#0b1865','color': '#00deff', 'text-align':'center',padding:0}">
          <el-table-column label="是否紧急"
                           prop="Mark"
                           width="100">

          </el-table-column>
          <el-table-column label="标题"
                           prop="title"
                           width="450">

          </el-table-column>

          <el-table-column label="时间"
                           prop="time"
                           width="180">

          </el-table-column>

          <el-table-column label="内容概要"
                           prop="summary"
                           show-overflow-tooltip
                           disabled>

            <template slot-scope="scope">

              <el-tooltip popper-class="ssss"
                          placement="top">
                <span>{{scope.row.details}}</span>
                <div slot="content">

                  <span v-for="i in msgtable[scope.$index].summary">
                    {{i}}
                  </br>
                  </span>
                </div>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column prop="MessageNo"
                           v-if="false">

          </el-table-column>

        </el-table>
      </div>
      </br>
     <div class="pagebox" style="margin-top:30px">
          <el-pagination @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page.sync="currentPage"
                          :page-sizes="[15, 30]"
                          :page-size="pagesize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="msgtable.length">
          </el-pagination>
	 </div>
    </el-row>

  </div>
</template>
<script>
import axios from 'axios';
export default {

  sockets: {
    news: function (data) {
      this.getmsglist()
    },
    news1: function (data) {
      this.getmsglist()
    },
    alert: function (data) {
      this.getmsglist()
    },
    help: function (data) {
      this.getmsglist()
    },
  },
  data() {
    return {
      select1: 1,
      vp1: [{ value: 1, label: '全部' }, { value: 2, label: '紧急' }, { value: 3, label: '非紧急' }],
      select2: 1,
      vp2: [{ value: 1, label: '全部' }, { value: 2, label: '全体成员' }, { value: 3, label: '组内成员' }, { value: 4, label: '指挥中心' }],
      select3: 1,
      vp3: [{ value: 1, label: '时间正序' }, { value: 2, label: '时间倒序' }],
      msgtable: [],
      currentPage: 1,

      // total: 1000,
      pagesize: 15,
      loading: true,
      total: '',
    }
  },
  mounted() {
    this.getmsglist()
  },
  methods: {
    searchList() {

    },
    getmsglist() {
      axios.get('/getAllMessage', {}).then((response) => {
        // console.log(response.data.results)
        var nn = response.data.results

        // const MapTable = new Map([[1, '定性'], [2, '定量'], [0, '默认变量'], [3, '定性'], [4, '定量']])
        const MapTable = new Map([[1, '是'], [0, '否']])
        this.msgtable = nn.map(item => {

          return {
            MessageNo: item.MessageNo,
            Mark: MapTable.get(item.Mark),
            title: item.MessageTitle,
            summary: item.MessageDetail.split(/[\r\n]/).filter(i => i),
            details: item.MessageDetail,
            time: item.SendTime,
            addresser: item.InputUserId,
            // featureId: parseInt(item.featureId),
            // type: MapTable.get(parseInt(item.type))
          }


        })
        this.total = this.msgtable.length;


      }).catch(function (error) {
        console.log("error", error);
      })
    },
    rowClick(row, column, event) {

      // console.log(row.MessageNo)
      // this.getMessageDetail(row.MessageNo)
      // console.log(this.currentperson)

    },
    getMessageDetail(val) {
      axios.post('getMessageDetail', {
        "messageNo": val
      }).then(res => {
        console.log(res.data.results[0])
      }).catch(function (error) {
        console.log("error", error)
      })
    },

    handleSizeChange(val){
      this.pagesize = val
    },

    handleCurrentChange(val){
      this.currentPage = val
    },

  }
}
</script>
<style>
/* .el-tooltip__popper {
  max-width: 40%;
} */

/* .el-tooltip__popper[x-placement^="left"] .popper__arrow::after {
  border-left-color: #515b62;
}

.el-tooltip__popper[x-placement^="left"] .popper__arrow {
  border-left-color: #515b62;
} */
.el-tooltip__popper {
  display: none;
}
.el-tooltip__popper.ssss {
  display: block;
}
.pagebox .el-pagination{
	/* margin-top:5px; */
	color:#a3a5bc 
}
.pagebox .el-pagination__total{
	color:#a3a5bc 
}
.pagebox .el-input__inner{
	background-color: #a3a5bc;
	border:0;
	color:#444
}
.pagebox .el-pagination button{
	color: #444;
	border-radius: 5px;
	margin:0 5px;
	    background-color: #a3a5bc !important;
}
.pagebox .el-pager{
	margin:0 5px;
}
.pagebox .el-pager li {
	border-radius: 5px;
	margin:0 5px;
	color: #444;
  background: #a3a5bc !important;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}
.pagebox .el-pager li.active{
	 background: #a3a5bc !important;
}
</style>

