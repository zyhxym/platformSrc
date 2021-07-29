<template>
  <div>
    <el-row style="text-align: left">
      <el-col :span="12">
        <!-- <video width="600"
               poster="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"> -->

        <video width="600"
               poster="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg">

        </video>

      </el-col>
      <el-col :span="12">
        <div style="margin-top:80px;">

          <div class="eventtext">
            活动名称：{{EventName}}
          </div>
          <div class="eventtext">
            开始时间：{{StartTime}}
          </div>
          <div class="eventtext">
            结束时间：{{EndTime}}
          </div>
          <div class="eventtext">
            总指挥：{{EventManager}}
          </div>
        </div>

         <el-row>
           <input v-model="this.val" placeholder="edit me">
           <p>Message is: {{ this.val }}</p>
        </el-row>
        

      </el-col>
    </el-row>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {

      url: '/static/media/1_2.jpg',
      EventName: '',
      StartTime: '',
      EndTime: '',
      EventManager: '',
      val:null,

    }
  },
  mounted() {
    this.getEventInfo()
    this.getResult()

  },
  methods: {

   getResult(){

        this.val = window.localStorage.getItem("pho")

    },
    getEventInfo() {
      axios.get('/getEventInfo', {})
        .then((response) => {

          var cdata = response.data.results[0]

          console.log(cdata)

          this.EventName = cdata.EventName
          this.StartTime = this.formateDate(cdata.StartTime)
          this.EndTime = this.formateDate(cdata.EndTime)
          this.EventManager = cdata.EventManager

        }).catch(function (error) {
          console.log("error", error);
        })
    },
    formateDate(datetime) {
      function addDateZero(num) {
        return (num < 10 ? "0" + num : num);
      }
      var d = new Date(datetime);
      // d = d.getUTCDate();
      // return d
      var formatdatetime = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
      return formatdatetime;

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
.eventtext {
  font-size: 20px;
  padding: 10px;
}
</style>


