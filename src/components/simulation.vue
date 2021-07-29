<template>
	<!-- <div>
	  <div style="margin:0 auto;">
      <div style= "width:1000px;height:700px;overflow:hidden;border:0px">
        <div style="width:1000px;height:1000px;margin:-30px 10px 10px 100px;">
            <iframe ref="iframe" width="1000" height="650" allow="fullscreen" scrolling="no" style="width: 150%; height: 100%;"></iframe>
    	 </div>
    	</div>	
       </div>		
	</div> -->


    <div>
	  <div style="margin:0 auto;">
      <div style= "width:1920px;height:890px;overflow:hidden;border:0px">
        <div style= "width:1050px;height:1000px;margin:5px 10px 10px 100px;">
            <iframe ref="iframe" width="1000" height="650" allow="fullscreen" scrolling="no" style="width: 145%; height: 86%;"></iframe>
    	 </div>
    	</div>	
       </div>		
	</div>
</template>

<script>
export default {
   
	methods: {
        getUrl() {
            this.$refs.iframe.contentWindow.location.replace(

                //"https://cloud.anylogic.com/assets/embed?modelId=09128956-1c85-4f36-af6f-0565c62129af"
                "https://cloud.anylogic.com/assets/embed?modelId=f93dedc8-7d2d-4a6c-b0d6-a0643c46c26f"
                
            );
        }
  },

  mounted() {
    this.getUrl();
  }

};


</script>

<style scoped>
	
</style>