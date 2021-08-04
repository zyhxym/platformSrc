<template>
	<div align="center">
		<div id="map-container" class="map-root">
			放置地图
		</div>
		<!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle class="loading-circle-1" cx="100" cy="50" r="3" stroke="red" fill="red" />
    </svg> -->
		<router-view></router-view>
	</div>
</template>
<script>

	



	import axios from 'axios';
	/* eslint-disable no-undef */
	import AMap from 'AMap'
	import AMapUI from 'AMapUI'

	export default {
		props: ['openmsg'],
		sockets: {
			news1: function(data) {
				var that = this
				//收到的消息会在这里
				if (data.CarGroup != 'G00') {

					var car;
					var ass;
					var hos;
					var carno;
					var y = data.MessageDetail.indexOf('现场小组')
					var assname = data.MessageDetail.substring(y + 5, y + 8)
					for (var j = 0; j < that.assList.length; j++) {
						if (that.assList[j].LocationName == assname) {
							ass = that.positionAss[j]
							break
						}
					}
					for (var j = 0; j < that.assList.length; j++) {
						if (data.CarGroup == that.carList[j].GroupNo) {
							carno = j;
							car = that.positionCar[j]
							break
						}
					}
					for (var j = 0; j < that.hosList.length; j++) {
						if (data.HosGroup == that.hosList[j].GroupNo) {
							hos = that.positionHos[j]
							break
						}
					}
					that.render(carno, 1, car, ass, hos)
					that.cancelflag1 = 0
					setTimeout(() => {
						this.cancelflag1 = 1
					}, 120000);

				}
			},
			alert: function(data) {
				var that = this;
				var ass;
				console.log(data.MessageDetail)
				var y = data.MessageDetail.indexOf('地点')
				var z = data.MessageDetail.indexOf('编号')
				console.log(y, z)
				var assname = data.MessageDetail.substring(y + 3, z - 4)

				for (var j = 0; j < that.assList.length; j++) {
					if (that.assList[j].LocationName == assname) {

							ass = j
							break

					}
				}
				console.log(ass)
				that.marker[ass].show();
			}
		},
		data() {
			return {

				GNo:'',
				state: window.localStorage.getItem('STATE'),
				hospital: this.$route.params.HOSPITAL,
				carNo: this.$route.params.CARNO,
				mdetail: '',
				intervalid1: null,

				carList: [],
				hosList: [],
				assList: [],

				positionHos: [],
				positionAss: [],
				positionCar: [],

				pathSimplifierIns: [],
				marker: [],
				navg: [],
				map: "",
				cancelflag: 1,
				cancelflag1: 1,
			};
		},

		// created(){},

		mounted() {
			// this.initMap()
			this.initMap2()

			let _this = this;
			window.videocall = _this.videocall;
			console.log(window);
		},

		//监听返回的openmsg GYX
		watch: {

				openmsg: function(Value, oldValue) {
					// console.log(Value)
					if (Value.A) {

						// 这一步用来找到到底是哪一个会场 很重要！！！console.log(Value.A, '会场')
						var i = this.assList.findIndex(item => {
							return item.LocationNo == Value.A
						})

						console.log(i, '找到数组下标')
						// console.log(this.assList, '会场坐标')
						var that = this

						AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {

							var infoWindow = new SimpleInfoWindow({

								infoTitle: '<strong class="text-blue font-18 font-blod">' + that.assList[i].LocationName + '</strong>',
								infoBody: '<div class="text-lightblue" style=\"padding:0px 0px 0px 4px;\">' + that.assList[i].Description + '</div>',
								offset: new AMap.Pixel(0, -20),
								autoMove: true

							})

							infoWindow.open(that.map, that.positionAss[i])
						})

					}
					//测试Hos 
					else if (Value.H) {

						// 这一步用来找到到底是哪一个医院 很重要！！！ 
						//console.log(Value.H, '医院') 

						var i = this.hosList.findIndex(item => {
							return item.OrganizationCode == Value.H
						})

						console.log(i, '找到医院数组下标')
						var that = this
						var item = that.hosList[i]
						var info = [];


						info.push("<div style=\"padding:5px 0px 5px 4px;\">");
						if (item.XiongtongTag == true) {
							info.push("<b class='rcorners1'>胸痛</b>" + "&nbsp;")
						}
						if (item.GanranTag == true) {
							info.push("<b class='rcorners1'>感染</b>" + "&nbsp;")
						}
						if (item.ZhongduTag == true) {
							info.push("<b class='rcorners1'>中毒</b>" + "&nbsp;")
						}
						if (item.CuzhongTag == true) {
							info.push("<b class='rcorners1'>卒中</b>" + "&nbsp;")
						}
						if (item.ChuangshangTag == true) {
							info.push("<b class='rcorners1'>创伤</b>" + "&nbsp;")
						}
						if (item.HefusheTag == true) {
							info.push("<b class='rcorners2'>核辐射</b>")
						}
						if (item.YunchanTag == true) {
							info.push("<b class='rcorners1'>孕产</b>" + "&nbsp;")
						}
						if (item.ErtongTag == true) {
							info.push("<b class='rcorners1'>儿童</b>" + "&nbsp;")
						}
						if (item.ErchuangTag == true) {
							info.push("<b class='rcorners1'>儿创</b>" + "&nbsp;")
						}
						if (item.JingshenTag == true) {
							info.push("<b class='rcorners1'>精神</b>" + "&nbsp;")
						}
						if (item.XinliTag == true) {
							info.push("<b class='rcorners1'>心理</b>" + "&nbsp;")
						}
						if (item.ChuanranTag == true) {
							info.push("<b class='rcorners1'>传染</b>" + "&nbsp;")
						}
						info.push("</br>" + "</br>" + "位置: " + item.LocationDescription + "</div>")


						// 医院信息弹窗   接口 /getHosList
						AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
							var infoWindow = new SimpleInfoWindow({
								// infoTitle: '<strong class="text-blue font-80 font-blod">' + that.hosList[i].OrganizationName + '</strong>',
								// infoBody: info.join(""),

								infoTitle: '<strong class="text-red font-5 font-blod">' + that.hosList[i].OrganizationName + '</strong>',

								infoBody: 
								         '<div>'
								             +'<div class="text-lightblue" style=\"padding:0px 5px 0px 4px;font-size:15px\">' 
												+ info.join("") 
												+  '医院负责人：'     + that.hosList[i].realManager
												+  '<br>联系方式：'   + that.hosList[i].phone
												+ '<br>' + '<br>' 
										     + '</div>' 

											 + '<div style=\"padding:0px 0px 0px 1px;font-size:23px\">'						
												+'<input id="lnglat2container" style=\"font-size:15px;font-color:red;\" type="button" class="btn text-red btn-sm" value="视频通话" onclick="videocall()"/>' 
											 + '</div>' 
										 + '</div>' ,
								

								//弹窗显示位置的偏移量
								offset: new AMap.Pixel(0, -20),
								autoMove: true
							})
							infoWindow.open(that.map, that.positionHos[i])
						})

					} else { //刚刚两个if是用来找医院 会场，接下来开始找车的数组的index！！！！！！！！！！！
						// console.log(Value.C, '车辆')

						var i = this.carList.findIndex(item => {
							return item.CarNo == Value.C
						})
						console.log(i, '找到车辆数组下标')
						var that = this

					     that.GNo = that.carList[i].GroupNo

						// 信息弹窗  车辆弹窗
						AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {

							var infoWindow = new SimpleInfoWindow({

								
								infoTitle: '<strong>' + that.carList[i].CarName + '</strong>',
								
								// infoBody: '<div class="text-lightblue font-3" style=\"padding:0px 0px 0px 4px;\">' 
								    infoBody:  
									    '<div>' +
										'<div class="text-lightblue" style=\"padding:0px 5px 0px 4px;font-size:15px\">' 
													+ '编号：' 		 + that.carList[i].CarNo 
													+ '<br>车牌号：' + that.carList[i].CarId 
													+ '<br>状态：'   + that.carList[i].CarStatus 
													+ '<br>车辆负责人：' + that.carList[i].CarManager 
													+ '<br>联系方式：'   + that.carList[i].phone
													
													+ '<br>'+ '<br>'+
										       '</div>' + 

										   '<div style=\"padding:0px 0px 0px 1px;font-size:23px\">' +
												// '<button  class="text-red font-10 font-blod btn-primary " style=\"padding:0px 0px 0px 4px;\">'+   
												// 		'点击查看' + 
												// '</button>'+ 

												//  '<img src="../assets/tel.png" style="margin-bottom:5px; margin-left:5px; margin-right:0;"  @click="videocall()"/>'+
												//  '<div>' +
												//   '<img src="tel.png"/>'+
												//  '</div>' +
												  '<input id="lnglat2container" style=\"font-size:15px;font-color:red;\" type="button" class="btn text-red btn-sm" value="视频通话" onclick="videocall()"/>' +
										   '</div>' +
										   '</div>' ,

							    isCustom: true,
								offset: new AMap.Pixel(0, -20),
								autoMove: true
							})
							infoWindow.open(that.map, that.positionCar[i])
						})

					}

				}
			},
		beforeDestroy() {
			// console.log(this.intervalid1)
			clearInterval(this.intervalid1)
			this.intervalid1 = null
		},

		methods: {
            videocall() {
				//打开视频通话
				console.log('打开视频通话')

				//传组别过去
				axios.post('/pushVideoLeader', {
						"GN": this.GNo

				}).then((response) => {
						this.$message('已发送邀请')

				}).catch(function(error) {
						console.log("error", error);
				})

					// let routeData = this.$router.resolve({
					//   name: "searchGoods",
					//   query: params,
					//   params: { mid: params.mid }
					// });
					// window.open(routeData.href, '_blank');
			},


			 // 将当前经纬度展示在 infowindow 的 input 中
			getLngLat(){
					var lnglatInput = document.getElementById('lnglat');
					lnglatInput.setAttribute('value', lnglat.toString());
			},

			// Evacuation() {
			//   this.$router.push({ name: 'confirm' })
			// },
			getELID(val) {
				this.$emit('transferID', val)
			},

			//生成推荐方案
			generateRecommend() {
				console.log('生成解决方案')
				//这里加一个2s的loading
				var that = this;
				for (var i = 0; i < that.pathSimplifierIns.length; i++) {
					that.pathSimplifierIns[i].setData([]);
				}
				that.render(0, 1, that.positionCar[0], that.positionAss[0], that.positionHos[0])
				that.marker[0].show();
				that.getELID({
					'C': 'C07'
				})
				that.cancelflag = 0
				setTimeout(() => {
					this.cancelflag = 1
				}, 120000);

			},

			//取消闪烁按钮
			cancelFlash() {
				console.log('收到取消短讯')
				var that = this;
				console.log(that)
				for (var j = 0; j < that.marker.length; j++) {
					that.marker[j].hide();
				}
			},

			render(pathNum, status, poscar, posass, poshos) {
				var that = this
				if (status == 1) {
					AMap.plugin(['AMap.Driving'], function() {
						new AMap.Driving({
							policy: AMap.DrivingPolicy.LEAST_TIME
						}).search(poscar, poshos, {
							waypoints: [posass]
						}, function(status, result) {
							// console.log(result)
							var searchresult = []
							searchresult.push([poscar.lng, poscar.lat])
							for (var i = 0; i < result.routes[0].steps.length; i++) {
								searchresult.push([result.routes[0].steps[i].start_location.lng, result.routes[0].steps[i].start_location.lat])
							}
							searchresult.push([poshos.lng, poshos.lat])
							that.pathSimplifierIns[pathNum].clearPathNavigators()
							that.pathSimplifierIns[pathNum].setData([{
								name: '车辆前往会场',
								path: searchresult
							}]);
							that.navg[pathNum] = that.pathSimplifierIns[pathNum].createPathNavigator(0, {
								loop: true,
								speed: 10000
							});
							that.navg[pathNum] && that.navg[pathNum].start()
						});
					})
				} else if (status == 2) {
					AMap.plugin(['AMap.Driving'], function() {
						new AMap.Driving({
							policy: AMap.DrivingPolicy.LEAST_TIME
						}).search(poscar, poshos, function(status, result) {
							// console.log(result)
							var searchresult = []
							searchresult.push([poscar.lng, poscar.lat])
							for (var i = 0; i < result.routes[0].steps.length; i++) {
								searchresult.push([result.routes[0].steps[i].start_location.lng, result.routes[0].steps[i].start_location.lat])
							}
							searchresult.push([poshos.lng, poshos.lat])
							that.pathSimplifierIns[pathNum].setData([{
								name: '车辆前往医院',
								path: searchresult
							}]);
							that.navg[pathNum] && that.navg[pathNum].start()
						});
					})
				} else {

					that.pathSimplifierIns[pathNum].setData([]);
				}
			},

			creatMarker(mapObj) {
				var that = this
				for (var i = 0; i < that.positionAss.length; i++) {
					(function(j) {
						that.marker[j] = new AMap.Marker({
							content: "<svg xmlns='http://www.w3.org/2000/svg' version='1.1'><circle class='loading-circle-1' cx='100' cy='50' r='3' stroke='red' fill='red' /></svg>",
							position: that.positionAss[j],
							offset: new AMap.Pixel(-100, -50)
						});
						that.marker[j].setMap(mapObj);
						that.marker[j].hide();
					})(i)
				}
			},

			//动态路径
			createPath(num, mapObj) {
				var that = this
				for (var i = 0; i < num; i++) {
					(function(j) {
						AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier) {
							if (!PathSimplifier.supportCanvas) {
								alert('当前环境不支持 Canvas！');
								return;
							}
							that.pathSimplifierIns[j] = new PathSimplifier({
								zIndex: 100,
								map: mapObj,
								getPath: function(pathData, pathIndex) {
									return pathData.path;
								},
								getHoverTitle: function(pathData, pathIndex, pointIndex) {
									if (pointIndex >= 0) {
										return pathData.name + '，点:' + pointIndex + '/' + pathData.path.length;
									}
									return pathData.name + '，点数量' + pathData.path.length;
								},
								autoSetFitView: false,
								renderOptions: {
									pathLineStyle: {
										strokeStyle: '#ff2443',
										lineWidth: 4,
										dirArrowStyle: true
									},
									pathNavigatorStyle: {
										fillStyle: '#23befa',
										pathLinePassedStyle: {
											strokeStyle: '#23befa',
											lineWidth: 4,
											dirArrowStyle: true
										}
									}
								}
							});
						});
					})(i)
				}
				console.log(that.pathSimplifierIns)
			},

			initMap2() {
				var that = this
				var markerCar = [];
				var markerHos = [];
				var markerAss = [];
				var lnglats;
				var marker;


				let mapObj = new AMap.Map('map-container', {
					// center: [120.154539, 30.265048],
					center: [120.581828, 30.621622],
					zoom: 13,
					mapStyle: 'amap://styles/13abf62ec70473a0b00e5e133ba93014',
				})
				//设置主题颜色
				mapObj.setMapStyle('amap://styles/13abf62ec70473a0b00e5e133ba93014');
				that.map = mapObj;

				mapObj.plugin(['AMap.ToolBar', 'AMap.OverView', 'AMap.MapType'], function() {

					mapObj.addControl(new AMap.ToolBar())
					mapObj.addControl(new AMap.OverView({
						isOpen: false
					}))

					mapObj.addControl(new AMap.MapType({
						showTraffic: true,
						showRoad: false
					}))

				})
				var options = {
					enableHighAccuracy: true,
					maximumAge: 0
				}
				var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

				function onSuccess(position) {
					var gps = [position.coords.longitude, position.coords.latitude];

					AMap.convertFrom(gps, 'gps', function(status, result) {
						lnglats = result.locations[0];
						mapObj.setCenter(lnglats)
						marker = new AMap.Marker({
							position: lnglats,
							map: mapObj
						})

						AMap.event.addListener(marker, 'click', (e) => {

							//信息弹窗
							AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
								var infoWindow = new SimpleInfoWindow({
									infoTitle: '<strong class="text-blue font-18 font-blod">我在这里</strong>',
									infoBody: '',
									offset: new AMap.Pixel(0, -20),
									autoMove: true
								})
								infoWindow.open(mapObj, e.target.getPosition())
							})

						})

					});
				};

				function onError(error) {
					// alert('code: ' + error.code    + '\n' + 'message: ' + error.message + '\n');
				}

				AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {

					// if (!SimpleMarker.supportSvg) {
					//   alert('当前环境不支持SVG');
					// }
					axios.get('/getAssemblyList', {}).then((response) => {

						that.assList = response.data.results;
						console.log('当前拿到的会场列表是',assList)
						for (var i = 0; i < that.assList.length; i++) {
							that.positionAss[i] = new AMap.LngLat(that.assList[i].Longitude, that.assList[i].Latitude)
							// console.log(positionAss[i])
							markerAss[i] = new SimpleMarker(
								// new SimpleMarker.Shape.IconFont({
								//   symbolJs: null,
								//   icon: 'icon-yiyuan2',
								//   size: 50,
								//   offset: [-25, -50],
								//   fillColor: 'grey'
								// }),
								{
									iconStyle: require("@/assets/org.png"),
									offset: new AMap.Pixel(-25, -55),       //水平值越小越向左  垂直值越小越向上
									zIndex: 110,
									map: mapObj,
									position: that.positionAss[i],
									showPositionPoint: {
										color: 'red'
									}
								}
							);
							markerAss[i].assinfo = that.assList[i];

							markerAss[i].on('click', function() {
								var thisMarkerAss = this;
								that.getELID({
									'A': thisMarkerAss.assinfo.LocationNo
								})

								//会场信息弹窗
								AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
									var infoWindow = new SimpleInfoWindow({

										infoTitle: '<strong class="text-blue font-5 font-blod">' + thisMarkerAss.assinfo.LocationName + '</strong>',
										infoBody: '<div class="text-blue font-5 font-blod" style=\"padding:0px 0px 0px 4px;\">' +
											thisMarkerAss.assinfo.Description + '</div>',
										
										//新写的 把 assinfo.LocationName 会场1 改成了 assinfo.Description

										// infoTitle: '<strong class="text-red font-5 font-blod">' + thisMarkerAss.assinfo.Description + '</strong>',

										// infoBody: 
										// 		'<div>'
										// 			+'<div class="text-lightblue" style=\"padding:0px 5px 0px 4px;font-size:15px\">' 
										// 				+ info.join("") 
										// 				+  '会场负责人：'    + thisMarkerAss.assinfo.Manager
										// 				+  '<br>联系方式：'  + thisMarkerAss.assinfo.phone
										// 				+ '<br>' + '<br>' 
										// 			+ '</div>' 

										// 			+ '<div style=\"padding:0px 0px 0px 1px;font-size:23px\">'						
										// 				+'<input id="lnglat2container" style=\"font-size:15px;font-color:red;\" type="button" class="btn text-red btn-sm" value="视频通话" onclick="videocall()"/>' 
										// 			+ '</div>' 
										// 		+ '</div>',

										offset: new AMap.Pixel(0, -20),
										autoMove: true

									})
									infoWindow.open(mapObj, thisMarkerAss.C.position)
								})
							})
						}
						that.creatMarker(mapObj);
					}).catch(function(error) {
						console.log("error", error);
					})


					axios.get('/getHosList', {}).then((response) => {
						that.hosList = response.data.results;
						// console.log(hosList)
						for (var i = 0; i < that.hosList.length; i++) {
							that.positionHos[i] = new AMap.LngLat(that.hosList[i].Longitude, that.hosList[i].Latitude)
							// console.log(positionHos[i])

							markerHos[i] = new SimpleMarker(

								// new SimpleMarker.Shape.IconFont({
								//   symbolJs: null,
								//   icon: 'icon-filled_outline_hospital-cross-building',
								//   size: 70,
								//   offset: [-35, -60],
								//   fillColor: 'red'
								// }), 
								{
									iconStyle: require("@/assets/hos.png"),
									offset: new AMap.Pixel(-45, -110), //水平值越小越向左  垂直值越小越向上
									zIndex: 110,
									map: mapObj,
									position: that.positionHos[i],
									showPositionPoint: true,

								});
							markerHos[i].hosinfo = that.hosList[i];
							markerHos[i].on('click', function() {

								var thisMarkerHos = this;

								that.getELID({
									'H': thisMarkerHos.hosinfo.OrganizationCode
								})
								var hosNo = thisMarkerHos.hosinfo.OrganizationCode
								var item = {}
								axios.post('/getHosInfo', {
										'hosNo': hosNo
									})
									.then((response) => {
										item = response.data['results'][0]

										var info = [];

										// info.push("<div class='input-card content-window-card'><div><img style=\"float:left;\" src=\" https://webapi.amap.com/images/autonavi.png \"/></div> ");
										info.push("<div style=\"padding:5px 0px 5px 4px;\">");
										// info.push("<p class='input-item'>电话 : 010-84107000   邮编 : 100102</p>");
										if (item.XiongtongTag == true) {
											info.push("<b class='rcorners1'>胸痛</b>" + "&nbsp;")
										}
										if (item.GanranTag == true) {
											info.push("<b class='rcorners1'>感染</b>" + "&nbsp;")
										}
										if (item.ZhongduTag == true) {
											info.push("<b class='rcorners1'>中毒</b>" + "&nbsp;")
										}
										if (item.CuzhongTag == true) {
											info.push("<b class='rcorners1'>卒中</b>" + "&nbsp;")
										}
										if (item.ChuangshangTag == true) {
											info.push("<b class='rcorners1'>创伤</b>" + "&nbsp;")
										}
										if (item.HefusheTag == true) {
											info.push("<b class='rcorners2'>核辐射</b>")
										}
										if (item.YunchanTag == true) {
											info.push("<b class='rcorners1'>孕产</b>" + "&nbsp;")
										}
										if (item.ErtongTag == true) {
											info.push("<b class='rcorners1'>儿童</b>" + "&nbsp;")
										}
										if (item.ErchuangTag == true) {
											info.push("<b class='rcorners1'>儿创</b>" + "&nbsp;")
										}
										if (item.JingshenTag == true) {
											info.push("<b class='rcorners1'>精神</b>" + "&nbsp;")
										}
										if (item.XinliTag == true) {
											info.push("<b class='rcorners1'>心理</b>" + "&nbsp;")
										}
										if (item.ChuanranTag == true) {
											info.push("<b class='rcorners1'>传染</b>" + "&nbsp;")
										}


										info.push("</br>" + "</br>" + thisMarkerHos.hosinfo.LocationDescription + "</div>")
									

										//医院信息弹窗
										AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
											var infoWindow = new SimpleInfoWindow({
												infoTitle: '<strong class="text-blue font-18 font-blod">' + thisMarkerHos.hosinfo.OrganizationName +
													'</strong>',
												infoBody: info.join(""),

											})
											infoWindow.open(mapObj, thisMarkerHos.C.position)
										})

									}).catch(function(error) {
										console.log("error", error);
									})

							})
						}
					}).catch(function(error) {
						console.log("error", error);
					})

					axios.get('/getCarList', {}).then((response) => {
						that.carList = response.data.results;
						that.carList.shift()
						that.createPath(that.carList.length, mapObj)
						// console.log(that.carList)
						for (var i = 0; i < that.carList.length; i++) {
							if (that.carList[i].Longitude != null && that.carList[i].Latitude != null) {
								if (that.carList[i].CarStatus == 0) {
									that.carList[i].CarStatus = '空闲'
								} else {
									that.carList[i].CarStatus = '忙碌'
								}
								that.positionCar[i] = new AMap.LngLat(that.carList[i].Longitude, that.carList[i].Latitude)
								// console.log(positionCar[i])
								markerCar[i] = new SimpleMarker(
									// new SvgMarker.Shape.IconFont({
									//   symbolJs: null,
									//   icon: 'icon-emergencycar',
									//   size: 40,
									//   offset: [-20, -35],
									//   fillColor: 'blue'
									// }), 
									{
										iconStyle: require("@/assets/car.png"),
										map: mapObj,
										position: that.positionCar[i],
										showPositionPoint: {
											color: 'red'
										}
									});
								markerCar[i].carinfo = that.carList[i];

								markerCar[i].on('click', function() {
									var thisMarkerCar = this;
									that.getELID({
										'C': thisMarkerCar.carinfo.CarNo
									})

                                    //车辆信息弹窗
									AMapUI.loadUI(['overlay/SimpleInfoWindow'], function(SimpleInfoWindow) {
										var infoWindow = new SimpleInfoWindow({

											//标题
											infoTitle: '<strong class="text-blue font-18 font-blod">' + thisMarkerCar.carinfo.CarName + '</strong>',

											//窗体
											infoBody: "<div style=\"padding:0px 0px 0px 4px;\" >" 
											             + '编号：'       + thisMarkerCar.carinfo.CarNo 
														 + '<br>车牌号：' + thisMarkerCar.carinfo.CarId 
														 + '<br>状态：'   + thisMarkerCar.carinfo.CarStatus 
														 + '</div>',

											//偏移量
											offset: new AMap.Pixel(0, -20),
											autoMove: true
										})

										infoWindow.open(mapObj, thisMarkerCar.C.position)
									})

								})
							}
						}
						that.intervalid1 = setInterval(() => {
							// console.log("正在获取新位置")
							axios.get('/getCarList', {}).then((response) => {
								that.carList = [];
								that.carList = response.data.results;
								that.carList.shift();
								// console.log(that.carList)
								for (var i = 0; i < that.carList.length; i++) {

									if (that.carList[i].Longitude != null && that.carList[i].Latitude != null) {
										that.positionCar[i] = new AMap.LngLat(that.carList[i].Longitude, that.carList[i].Latitude)
										if (that.carList[i].CarStatus == 1) {
											var ass;
											var hos;
											for (var j = 0; j < that.assList.length; j++) {
												if (that.carList[j].Assembly == that.assList[j].LocationName) {
													ass = that.positionAss[j]
													break
												}
											}
											for (var j = 0; j < that.hosList.length; j++) {
												if (that.carList[j].Hospital == that.hosList[j].OrganizationName) {
													hos = that.positionHos[j]
													break
												}
											}
											that.render(i, 1, that.positionCar[i], ass, hos)
										} else if (that.carList[i].CarStatus == 2) {

											var ass = null;
											var hos;
											for (var j = 0; j < that.hosList.length; j++) {
												if (that.carList[j].Hospital == that.hosList[j].OrganizationName){
													hos = that.positionHos[j]
													break
												}
											}
											that.render(i, 2, that.positionCar[i], ass, hos)

										} else {
											if (that.cancelflag == 1 && that.cancelflag1 == 1) that.render(i, 0, null, null, null)
										}

										// marker操作
										if (that.carList[i].CarStatus == 0) {
											that.carList[i].CarStatus = '空闲'
										} else {
											that.carList[i].CarStatus = '忙碌'
										}

										delete markerCar[i].carinfo;
										markerCar[i].carinfo = that.carList[i];
										markerCar[i].setPosition(that.positionCar[i])
									}

								}
							}).catch(function(error) {
								console.log("error", error);
							})
						}, 60000)
					}).catch(function(error) {
						console.log("error", error);
					})
				})

			}

		}
	};
</script>

<style>
    .btn {
            position: relative;
            width: 2.6rem;
            left: 4.2rem;
            margin: 10px 0 15px 0;
    }
	.map-root {
		width: 100%;
		height: 910px;

		/* padding: 10px; */
		/* border: 5px solid gray; */
		/* margin: 0px; */
	}

	.rcorners1 {
		border-radius: 25px;
		background: #409eff;		
		padding: 5px;
		/* font-size: 14px; */
		width: 40px;	
		color: white;
		height: 18px;
		text-align: center;
	}

	.rcorners2 {
		border-radius: 25px;
		background: #409eff;
		padding: 5px;
		width: 60px;
		color: white;
		height: 18px;
		text-align: center;
	}

</style>

<style>
	@keyframes morph {
		0% {
			stroke-width: 0;
			stroke-opacity: 1;
		}

		10% {
			stroke-width: 8;
			stroke-opacity: 0.9;
		}

		20% {
			stroke-width: 16;
			stroke-opacity: 0.8;
		}

		30% {
			stroke-width: 24;
			stroke-opacity: 0.7;
		}

		40% {
			stroke-width: 32;
			stroke-opacity: 0.6;
		}

		50% {
			stroke-width: 40;
			stroke-opacity: 0.5;
		}

		60% {
			stroke-width: 48;
			stroke-opacity: 0.4;
		}

		70% {
			stroke-width: 56;
			stroke-opacity: 0.3;
		}

		80% {
			stroke-width: 64;
			stroke-opacity: 0.2;
		}

		90% {
			stroke-width: 72;
			stroke-opacity: 0.1;
		}

		100% {
			stroke-width: 80;
			stroke-opacity: 0.1;
		}
	}

	.loading-circle-1 {
		-webkit-animation: morph 1s ease infinite;
		animation: morph 1s ease infinite;
	}

	.amap-zoom-ruler {
		left: 0;
	}

	.amap-locate {
		left: 14px !important;
	}
	/* 信息窗口样式 */
	.amap-ui-smp-ifwn-container{
		width:208px;
		background: url(../assets/bg-2.png) no-repeat left top;
		background-size:100% 100%;
		text-align: left;
		padding-top:18px;padding-left:10px;padding-bottom:18px;padding-right:10px;
		position: relative;
		padding:10px;
	}
	.amap-ui-smp-ifwn-content-body{
		background-color: transparent !important;
		border:0 !important;
	}
	.amap-ui-smp-ifwn-def-tr-close{margin:0 !important;}
	.amap-ui-smp-ifwn-info-content{color:#eee !important}
	.amap-ui-smp-ifwn-combo-sharp{display: none;}

	.amap-ui-smp-ifwn-content-body .rcorners1{color:#00deff;font-size:14px;border:1px solid #00749d;background-color:rgba(0,222,255,.15);margin-top:10px !important;}
	.amap-ui-smp-ifwn-container .close{position: absolute;top:5px;right:5px;}
	.amap-ui-smp-ifwn-container h3{padding:0;padding-bottom:3px; font-size:18px;color:#00deff; border-bottom:1px solid #01286a !important;}
	.amap-ui-smp-ifwn-container p{padding:0; font-size:14px;color:#eee;}
</style>
