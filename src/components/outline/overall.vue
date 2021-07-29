<template>
	<div class="overallcss">
		<div class="picture_header flex align-center">

			<img src="../../assets/icon-7.png" />总体情况

		</div>
		<div class="picture_bodyo">

			<div ref="barchart111" style="height:260px;"></div>

			<div ref="barchart222" style="height:260px;"></div>

		</div>
	</div>
</template>
<script>
	import echarts from 'echarts';
	import axios from 'axios';

	export default {
		// inject: ['reload'],
		data() {
			return {

			}
		},
		sockets: {
			news: function(data) {

				this.drawbar1()
				this.drawbar2()
			},
			news1: function(data) {
				this.drawbar1()
				this.drawbar2()
			},
			alert: function(data) {
				this.drawbar1()
				this.drawbar2()
			},
			help: function(data) {
				this.drawbar1()
				this.drawbar2()
			},
		},

		mounted() {
			console.log('进入概览页面')
			this.$nextTick(() => {
				this.drawbar1();
				this.drawbar2();
			})
		},
		methods: {
			drawbar1() {
				// console.log('画图1')
				let barchart = this.$echarts.init(this.$refs.barchart111, 'white')
				axios.get('getAllStatusCount', {})
					.then((response) => {
						var tt = response.data.results
						// console.log(tt) 是一个对象


						var data1 = ['处置中', '处置完成', '待后送', '后送中', '已入院', '已出院']
						var data2 = []
						for (let key in tt) {
							data2.push(tt[key])
						}

						barchart.setOption({
							title: {
								text: '病人状态统计',
								textStyle: {
									color: '#0064dd',
									fontSize: 18,
									fontWeight: 'bold'
								},
								top: 10,
								left: 15
							},
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								}
							},
							// legend: {
							//   data: data1
							// },
							grid: {
								top: '20%',
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true //是否包含刻度标签
							},
							xAxis: {
								type: 'category',
								data: data1,
								axisLine: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisTick: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisLabel: {
									color: '#a3a5bc',
									interval: 0
								}

							},
							yAxis: {

								type: 'value',
								axisLine: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisTick: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisLabel: {
									color: '#a3a5bc'
								},
								splitLine: {
									lineStyle: {
										color: '#2b3161',
										type: 'dashed'
									}
								}

							},
							series: [{
									type: 'bar',
									data: data2,
									barWidth: 20,
									itemStyle: {
										// normal: {
										// 	color: function(params) {

										// 		var colorList = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373',
										// 			'#73b9bc', '#7289ab', '#91ca8c', '#f49f42'
										// 		];
										// 		return colorList[params.dataIndex]
										// 	},
										// }
										normal: {
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: "#005ebd"
												},
												{
													offset: 1,
													color: "#14b8ef"
												}
											]),
										},
									},
									label: {
										normal: {
											show: true,
											position: 'top',
											color:'#fff'
										}
									},
								},
								{

									type: 'pictorialBar', //顶部的圆
									tooltip:{show:false},
									data: data2,
									symbolSize: [20, 10],
									symbolOffset: [0, -6],
									symbolPosition: 'end',
									z: 12,
									animationDuration:2000,
									itemStyle: {
										normal: {
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: "#005ebd"
												},
												{
													offset: 1,
													color: "#14b8ef"
												}
											]),
										},
									},
									label: {
										normal: {
											show: false,
											position: 'top'
										}
									},
								},
								{

									type: 'pictorialBar', //底部的圆
									tooltip:{show:false},
									data: data2,
									symbolSize: [20, 10],
									symbolOffset: [0, 6],
									symbolPosition: 'start',
									z: 12,
									itemStyle: {
										normal: {
											color:'#0a98f7'
										},
									},
									label: {
										normal: {
											show: false,
											position: 'top'
										}
									},
								}

							],
						})

					}).catch(function(error) {
						console.log("error", error);
					})
			},
			drawbar2() {
				// console.log('画图2')
				let barchart = this.$echarts.init(this.$refs.barchart222, 'white')
				axios.get('getAllClassificationCount', {})
					.then((response) => {
						var cdata = response.data.results
						console.log(cdata)
						var data1 = ['未分级', 'Ⅰ级', 'Ⅱ级', 'Ⅲ级', 'Ⅳ级', 'Ⅴ级']
						var data2 = []
						var f = 0
						var a = 0
						var b = 0
						var c = 0
						var d = 0
						var e = 0
						cdata.forEach(item => {
							if (item.Classification == 0) {
								f = cdata.find(item => item.Classification == 0).count
							} else if (item.Classification == 1) {
								a = cdata.find(item => item.Classification == 1).count
							} else if (item.Classification == 2) {
								b = cdata.find(item => item.Classification == 2).count
							} else if (item.Classification == 3) {
								c = cdata.find(item => item.Classification == 3).count
							} else if (item.Classification == 4) {
								d = cdata.find(item => item.Classification == 4).count
							} else if (item.Classification == 5) {
								e = cdata.find(item => item.Classification == 5).count
							}
						})
						data2.push(f, a, b, c, d, e)

						barchart.setOption({
							title: {
								text: '病人级别统计',
								textStyle: {
									color: '#0064dd',
									fontSize: 18,
									fontWeight: 'bold'
								},
								top: 10,
								left: 15
							},
							tooltip: {
								trigger: 'axis',
								axisPointer: {
									type: 'shadow'
								}
							},
							// legend: {
							//   data: data1
							// },
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true
							},
							xAxis: {
								type: 'category',
								data: data1,
								axisLine: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisTick: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisLabel: {
									color: '#a3a5bc',
									interval: 0
								}

							},
							yAxis: {

								type: 'value',
								axisLine: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisTick: {
									lineStyle: {
										color: '#525589'
									}
								},
								axisLabel: {
									color: '#a3a5bc'
								},
								splitLine: {
									lineStyle: {
										color: '#2b3161',
										type: 'dashed'
									}
								}

							},
							series: [{

									type: 'bar',
									data: data2,
									barWidth: 20,
									itemStyle: {
										normal: {
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: "#f93e67"
												},
												{
													offset: 1,
													color: "#fe6f8e"
												}
											]),
										},
									},
									label: {
										normal: {
											show: true,
											position: 'top',
											color:'#fff'
										}
									},

								},
								{
								
									type: 'pictorialBar', //顶部的圆
									tooltip:{show:false},
									data: data2,
									symbolSize: [20, 10],
									symbolOffset: [0, -6],
									symbolPosition: 'end',
									z: 12,
									animationDuration:2000,
									itemStyle: {
										normal: {
											color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
													offset: 0,
													color: "#f93e67"
													},
													{
														offset: 1,
														color: "#fe6f8e"
												}
											]),
										},
									},
									label: {
										normal: {
											show: false,
											position: 'top'
										}
									},
								},
								{
								
									type: 'pictorialBar', //底部的圆
									tooltip:{show:false},
									data: data2,
									symbolSize: [20, 10],
									symbolOffset: [0, 6],
									symbolPosition: 'start',
									z: 12,
									itemStyle: {
										normal: {
											color:'#fc577b'
										},
									},
									label: {
										normal: {
											show: false,
											position: 'top'
										}
									},
								}
							]
						})






					}).catch(function(error) {
						console.log("error", error);
					})
			}

		}
	}
</script>
<style>
	/* .overallcss {
  background-color: #c6e2ff;
} */
	.picture_header {
		/* background-color: #808288; */
		background-color: #0070a8;
	}

	.picture_title {
		padding: 2px 15px;
		line-height: 25px;
		font-size: 14px;
		color: white;
		text-align: left;
	}

	.picture_bodyo {
		border: 0;
		text-align: left;
		/* color: cornflowerblue; */
	}

	.picture_bodyo>div {
		background-color: #050e3a;
		margin-bottom: 10px;
	}

	.cardcss1 {
		background-color: #333333;
		color: white;
		font-family: "Helvetica Neue";
		font-size: 20px;
		text-align: center;
	}
</style>
