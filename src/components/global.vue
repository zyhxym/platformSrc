
<script type="text/javascript">

    // 定义一些公共的属性和方法

    //全局变量专用模块

    var photoUrl = 'http://116.62.108.210:8001/photos/'
    var uploadUrl = "http://116.62.108.210:3000/upload"
    var facecheck = "http://116.62.108.210:3000/facecheck"
    var showVideoAlert = false

    //应急预案查询弹窗可见性设置
    var dialogGlobal = false

        function changeVideoAlert(now) {

          this.showVideoAlert = now

        }

    // 模块里的变量用export暴露出去，当其它地方需要使用时，引入模块便可
        export default {

            photoUrl,
            uploadUrl,
            changeVideoAlert,

            showVideoAlert,

          //应急预案查询弹窗可见性设置 在home.vue（语音识别图标界面） 和 test.vue（首页弹窗界面） 里面都要用到
            dialogGlobal,

        }

</script>