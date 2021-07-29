<template>
  <div class="css2">

    <el-tabs>
      <el-tab-pane label="药品信息">
        <component is="druginfo"></component>
      </el-tab-pane>
      <!-- <el-tab-pane label="人员信息">
        <component is="perinfo"></component>
      </el-tab-pane> -->

    </el-tabs>
  </div>
</template>
<script>
import axios from 'axios';
import druginfo from './medicalresource/druginfo.vue'

export default {
  components: {
    'druginfo': druginfo,

  },
  mounted() {
    console.log('进入药品资源页面')

  }
}
</script>
<style>
.css2 .el-tabs__item:hover {
  color: #fdac60;
}
.css2 .el-tabs__item.is-active {
  color: #fdc577;
}
/* tabs名字改成白色 */
/* .css2 .el-tabs__item.is-active {
  color: #f2f6fc;
} */
.css2 .el-tabs--border-card > .el-tabs__header .el-tabs__item {
  font-size: 16px;
}
</style>


