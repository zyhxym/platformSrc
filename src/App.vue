<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view v-if="isRouterAlive">-->
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'App',
  sockets: {
    connect: function () {
      // this.id=this.$socket.id
      console.log('连接成功')
    },
    
    // news: function (data) {
    //   //收到的消息会在这里
    //   console.log('app vue 收到普通消息')
    //   // console.log(data);
    //   // var a = data.MessageTitle
    //   this.$notify({
    //     // title: '通知',
    //     message: data.MessageTitle,
    //     // duration: 0
    //   });
    // },
    // alert: function (data) {
    //   //收到的消息会在这里
    //   console.log(data);

    // },
    // help: function (data) {
    //   //收到的消息会在这里
    //   console.log(data);

    // }
  },

  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
        //console.log('reload')
      })
    },

    // console.log(data)
  }
}

</script>

<style>
	@import url("assets/base.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #74adda;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}

</style>
