<template>
  <div>
    <el-row class="picture_header">
      <div class="picture_title">{{title}}</div>
    </el-row>
    <el-row class="picture_body">
      <!-- <div class="picture"> -->
      <slot>内容</slot>
      <!-- </div> -->
      <!-- 假如不注释该div，那父组件里插入内容的sytle只要写height为100%就好了（因为height不能继承）。但为了这个框框能容纳更多种类，里面东西的样式还是不要统一了 -->
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style>
.picture_header {
  /* background-color: #808288; */
  background-color: #53a8ff;
}
.picture_title {
  padding: 2px 15px;
  line-height: 25px;
  font-size: 14px;
  color: white;
  text-align: left;
}
.picture_body {
  border: 1px solid #808288;
  /* background-color: #d9ecff; */
}
</style>