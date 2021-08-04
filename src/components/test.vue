<template>
	<div>
		<el-row :gutter="1">
			<!-- 第一栏 地图：地图只能用mapbox的CSS style调节，但是右边栏的宽度可以靠el-col的span参数 span总值可以超出24-->
			<!-- <el-col :span="17" class="mapbox"> -->
			<el-col :span="12" >
				<div class="wrapper">
					<div element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0,0.8)"
				 		v-loading="loading">
						<Gd_map @transferID="getChange" :openmsg="openmsg" ref="myChild"></Gd_map>
					</div>
					<!-- 右下角语音助手图标 其实在home.vue里面 -->
					<!-- <div>
		               <span class="iconfont" @click="voiceDialogVisible = true">&#xe6c5;</span>
		            </div> -->
				</div>
			</el-col>
			
			<!-- 第二栏 功能区 -->
			<el-col :span="11" :offset="1" style="padding-top:5px;" >
				<!-------------------------------------------------------------第一个表--重点提示栏表 ----------------------------------------------------------->
				<div class="picture_header flex align-center">
					<img src="../assets/icon-6.png" />
					<!-- <span @click="msgclick1()" style="cursor:pointer">重点提示</span>
					<el-divider direction="vertical"></el-divider>
					<span @click="msgclick2()" style="cursor:pointer">紧急配血</span>
					<el-divider direction="vertical"></el-divider>
					<span @click="msgclick3()" style="cursor:pointer">所有提示</span> -->

					<span @click="msgclick1()" style="cursor:pointer">输血需求</span>
					<el-divider direction="vertical"></el-divider>
					<span @click="msgclick2()" style="cursor:pointer">转运消息</span>
					<el-divider direction="vertical"></el-divider>
					<span @click="msgclick3()" style="cursor:pointer">动态预警</span>
				</div>
				<!-------- pictureBody22是带滚动条的形式 ------------滚动部分开始----------------------------------------------->
				<div class="picture_body22" id="myexample">
						<div class="demo-table1">

							<!-- 原版活数据版本 -->
						    <!-- height原来的值是180 -->

							<!-- <div v-if="msgCard=='msgFirst'">
							<el-table :data="tablemsg" height="90" :cell-style="{'font-size':'18px', 'font-weight':'700'}" :show-header="false">
								<el-table-column type="expand">
									<template slot-scope="props">
										<span v-for="i in props.row.detail" style="margin-left:10px;">
											{{i}}</br>
										</span>
									</template>
								</el-table-column>
								<el-table-column prop="title">
								</el-table-column>
							</el-table>
							</div>

							<div v-if="msgCard=='msgFirst'">
							<el-table :data="tablemsg" height="90" :cell-style="{'font-size':'18px', 'font-weight':'700'}" :show-header="false">
								<el-table-column type="expand">
									<template slot-scope="props">
										<span v-for="i in props.row.detail" style="margin-left:10px;">
											{{i}}</br>
										</span>
									</template>
								</el-table-column>
								<el-table-column prop="title">
								</el-table-column>
							</el-table>
							</div>

							<div v-if="msgCard=='msgFirst'">
							<el-table :data="tablemsg" height="90" :cell-style="{'font-size':'18px', 'font-weight':'700'}" :show-header="false">
								<el-table-column type="expand">
									<template slot-scope="props">
										<span v-for="i in props.row.detail" style="margin-left:10px;">
											{{i}}</br>
										</span>
									</template>
								</el-table-column>
								<el-table-column prop="title">
								</el-table-column>
							</el-table>
							</div> -->
                           
						    <!--------------------- 第一版写死的 重点消息栏 分为三栏 重点提示 紧急配血 所有提示 引用tablemsg 和 msglist 表头点击叫 msgclick1() msgclick2() msgclick3()--------------------->

							<!-- 紧急配血 现在为 输血需求-->
								<!-- 假数据版本 :cell-style="cellStyle2"    :cell-style="{'font-size':'18px', 'font-weight':'700'}"-->
								       <!-- msg 由  getMsgList() 函数 得到 -->
                            <div v-if="msgCard=='msgFirst'" >
							     
								 <!-- 假数据版本 -->
								<!-- <el-table :data="msglist" height="90"  :cell-style="{'color':'#DC143C', 'font-size':'18px', 'font-weight': '700'}" :show-header="false" @row-click="rowMsgClick"> -->
								<el-table :data="bloodMsg" max-height="138"  :cell-style="{'color':'#DC143C', 'font-size':'18px', 'font-weight': '700'}" :show-header="false" @row-click="rowMsgClick">
									<el-table-column type="expand">
										<template slot-scope="props">
											<span v-for="i in props.row.detail" style="margin-left:10px;">
												{{i}}</br>
											</span>
										</template>
									</el-table-column>
									<el-table-column prop="title">
									</el-table-column>
								</el-table>
							</div>

							<!-- 重点提示  现在为转运消息-->
							<div v-else-if="msgCard=='msgSecond'">
								<el-table :data="transMsg" max-height="138"  :cell-style="{'color':'#a3a5bc', 'font-size':'18px', 'font-weight': '700'}" :show-header="false" @row-click="rowMsgClick">
									<el-table-column type="expand">
										<template slot-scope="props">
											<span v-for="i in props.row.detail" style="margin-left:10px;">
												{{i}}</br>
											</span>
										</template>
									</el-table-column>
									<el-table-column prop="title">
									</el-table-column>
								</el-table>
							</div>
				
							<!-- 所有提示 现在为动态预警-->
							<div v-else="msgCard=='msgThird'">
								<el-table :data="alertMsg" max-height="138" :cell-style="{'color':'#a3a5bc', 'font-size':'18px', 'font-weight': '700'}"  :show-header="false" @row-click="rowMsgClick">
									<el-table-column type="expand">
										<template slot-scope="props">
											<span v-for="i in props.row.detail" style="margin-left:10px;">
												{{i}}</br>
											</span>
										</template>
									</el-table-column>
									<el-table-column prop="title">
									</el-table-column>
								</el-table>
							</div>
						</div>
                </div>
                <br>
				<!-----------------------------------------------------第二个表 后送状态跟踪表 ---------------------------------------------------->
				<el-row style="margin-top:30px;">
				        <!-- 表头 -->
					<div class="picture_header flex align-center">
						<img src="../assets/icon-6.png" />
						<span @click="" style="cursor:pointer">后送状态跟踪</span>
					</div>
				        <!-- 表体 -->
						<!-- 设置cellStyle是一个函数 判断固定单元格字体为红色 写在下面的methods里面 -->
                 	<el-table  :data="PatientStatus" size="small" height="93" @row-click="rowClick" :cell-style="cellStyle" :header-cell-style="{'background-color': '#a0cfff','color': '#303133', 'text-align':'center',padding:0,'font-size':'18px'}">
				 															<!-- :cell-style="{ padding:0,'background-color': '#c6e2ff','color': '#303133','text-align':'center','font-size':'16px'}" -->
			                                                			
							<el-table-column min-width="50"  prop="PatientId"  			label="编号">
							</el-table-column>
							<el-table-column                 prop="Name"       			label="姓名">
							</el-table-column>
							<el-table-column                 prop="LatestTime" 			label="更新时间">
							</el-table-column>
							<el-table-column min-width="240" prop="StatusDescription" 	label="状态跟踪">
							</el-table-column>

				 	</el-table>
				</el-row>

                <!---------------------------------------------------第三个表 智能调度表 ----------------------------------------------------------->
				<el-row style="margin-top:30px;">
					
				    <!------------------------ 智能调度表头 ----------------->
				   <div class="picture_header flex align-center">
						<img src="../assets/icon-6.png" />
						<span @click="" style="cursor:pointer">智能调度</span>

							<!-- 三个按钮 -->
							<el-row style="margin-top:10px;">
								<!-- <div class="groupbox-boarder" display: flex; flex-direction: row; justify-content: center;> -->
								<!-- 按钮组样式在1379行 -->
								<div class="groupbox-boarder" >
									<el-row style="padding:5px;">

									    <!-- 原来是动画版的 在地图上生成一个动态路线 @click="generate()" -->
										<el-button @click="generateTridgePlan()" style="font-size:20px; padding: 8px 16px;">
										      一键推荐调度方案
										</el-button>	

										<!-- <el-button @click="dialogVisible = true" style="font-size:20px; padding: 8px 16px;"> -->
										<el-button @click="dialogGlobal = true" style="font-size:20px; padding: 8px 16px;">
										      应急预案查询
										</el-button>
										<el-button @click="cancel()" style="font-size:20px; padding: 8px 16px;">
										      取消闪烁
										</el-button>
									</el-row>
								</div>
							</el-row>
				    </div>
				    
					<!--------------------------------------- 智能调度表体 表头列标题字号16 表内字号15------------------------->
                    <el-table  :data="tableData2" size="small" height="210" 
						  	   :header-cell-style ="{'font-size':'17px','background-color': '#a0cfff','color': '#303133', 'text-align':'center',padding:0}"
						       :cell-style ="       {'font-size':'15px','background-color': '#c6e2ff','color': '#303133', 'text-align':'center', padding:0}">

							<el-table-column prop="PatientId"       label="编号" >
							</el-table-column>
							<el-table-column prop="Diagnose"  		label="病情">
							</el-table-column>
							<el-table-column prop="SpecialTag"    		label="特殊标签" >
							</el-table-column>
							<el-table-column prop="CarName"    		label="推荐车辆" > 
							</el-table-column>
							<el-table-column prop="OrganizationName" label="推荐医院" >
							</el-table-column>
							<el-table-column                   		label="通知" >
      							<template slot-scope="scope">
        							<el-button @click="handleClick(scope.row)" type="text" size="medium">一键通知</el-button>
      							</template>
   							</el-table-column>
							<!------ 删除按钮  列标题暂时略去 可以设置 label="移除"-->
							<el-table-column fixed="right"         label="删除">
      							<template slot-scope="scope">  
									
									<!-- deleteRow的方法定义在下面methods内  删除行功能必须使用el-button才能起效 -->
									<el-button @click.native.prevent="deleteRow(scope.$index, tableData2)" type="primary" size="mini" icon="el-icon-minus" circle></el-button>
      							</template>
    						</el-table-column>

							<!-- <el-table-column prop="select"         label="可选" >
							</el-table-column> -->

				    </el-table>
				</el-row>

				<!--------------------------第四个表 后送病人/上报病人表 ---------------------------->
				<el-row style="margin-top:30px;">
					<div class="picture_header flex align-center">
						<img src="../assets/icon-6.png" />
						<span @click="click1()" style="cursor:pointer">后送病人列表</span>
						<el-divider direction="vertical"></el-divider>
						<span @click="click2()" style="cursor:pointer">所有上报病人列表</span>
				   </div>

					<!------------------------------后送病人表----------------------->
					<div class="picture_body22" id="myexample">
						<div v-if="card=='first'">
							
							<!-- handle函数是从下面向上面的表推送 -->
							<el-table :data="PrepareSendList" size="small" height="240" 
							                              :cell-style = "{padding:0,'background-color': '#c6e2ff','color': '#303133','font-size':'16px'}"
							 @cell-click="handleSelect"  :header-cell-style = "{'background-color': '#a0cfff','color': '#303133', 'text-align':'left',padding:0,'font-size':'16px'}">
									
							<el-table-column prop="Select" label="操作" width="50">
								<template slot-scope="scope">      									
									<el-button type="text"  size="medium"  :disabled="scope.row.select">选择</el-button>
								</template>
   							</el-table-column>

							<el-table-column prop="CreateTime"   width = 130	label="时间">
							</el-table-column> 
							<el-table-column prop="PatientId"       		    label="编号">
							</el-table-column>
							<el-table-column prop="EmergencyGroupName"    		label="小组">
							</el-table-column>
							<el-table-column prop="Name"     					label="姓名">
							</el-table-column>
							<el-table-column prop="Diagnose"     width = 130	label="病情">
							</el-table-column>
							<el-table-column prop="StatusNameHos"    			label="状态">
							</el-table-column>
							

							<!-- 栏内表格的按钮 refer to Element-ui官方 ---Table --固定列 -->
			
							<el-table-column prop="Lookup" label="操作" width="50">
								<template slot-scope="scope">
									<el-button type="text" size="medium">查看</el-button>
									<!-- <el-button @click="handleClickAdd(scope.row)" type="text" size="medium">选择</el-button>-->
								</template>
   							</el-table-column>

							<!-- <el-table-column prop="Select" label="操作" width="50">
								<template slot-scope="scope">      									
									<el-button type="text" size="medium">选择</el-button>
								</template>
   							</el-table-column> -->

							</el-table>
						</div>

					  <!--------------------------- 所有上报病人表 ----------------->
					    <!-- <div v-else class="patientbox"> -->
						<div v-else >

						<!-- 原活数据 所有上报病人表 -->
						<!-- <el-table :data="ReportedPatientList" size="small" max-height="180" :cell-style="{padding:0,'background-color': '#c6e2ff','color': '#303133','font-size':'16px'}"
						 @row-click="rowClick" :header-cell-style="{'background-color': '#a0cfff','color': '#303133', 'text-align':'center',padding:0,'font-size':'16px'}">
							<el-table-column prop="PatientId" label="编号">
							</el-table-column>
							<el-table-column prop="Name" label="姓名">
							</el-table-column>
							<el-table-column prop="StatusName" label="状态">
							</el-table-column>
						</el-table> -->

                        <!-- 原假数据  :data="PatientList" -->
						<el-table :data="AllReportedList" size="small" height="240" 
							                              :cell-style = "{padding:0,'background-color': '#c6e2ff','color': '#303133','font-size':'16px'}"
							 @cell-click="handleSelect"  :header-cell-style = "{'background-color': '#a0cfff','color': '#303133', 'text-align':'left',padding:0,'font-size':'16px'}">
							
							<el-table-column prop="CreateTime"   width = 130   label="时间">
							</el-table-column> 
							<el-table-column prop="PatientId"          		   label="编号">
							</el-table-column>
							<el-table-column prop="EmergencyGroupName"  	   label="小组">
							</el-table-column>
							<el-table-column prop="Name"     				   label="姓名">
							</el-table-column>
							<el-table-column prop="Diagnose" 				   label="病情">
							</el-table-column>
							<el-table-column prop="StatusNameHos"    		   label="状态">
							</el-table-column>
							<!-- 仅作为标记 -->
							<el-table-column prop="state"    		           label="">
							</el-table-column>

							<!-- 栏内表格的按钮 refer to Element-ui官方 ---Table --固定列 -->
				
							<el-table-column prop="Lookup" label="操作" width="50">
      								<template slot-scope="scope">
        								<el-button type="text" size="medium">查看</el-button>
        									<!-- <el-button @click="handleClickAdd(scope.row)" type="text" size="medium">选择</el-button>-->
      								</template>
   							</el-table-column>

							<el-table-column prop="Select" label="操作" width="50">
      								<template slot-scope="scope">   
										  <!-- flag平时是false，一旦调度表点了删除，就变成true -->
        								<el-button type="text" size="medium" >选择</el-button>
      								</template>
   							</el-table-column>

							</el-table>

					  </div>
				   </div>
				</el-row>
				<!-- 第四个表结束 -->  
			</el-col>
			<!---右边栏功能区结束 --------------------------------------------->
		</el-row>
		<!-------- 整个页面结束 ----------------------------------------------->
		<!-- <el-dialog title="语音助手"
		           :visible.sync="voiceDialogVisible"
		           :before-close="handleClose"
		           style="text-align:left; font-color: #ffffff" class="mydialog">
			<el-row>
				  <div style="margin-left: 100px">
				   	 	
				      	<i class="el-icon-chat-dot-round" style="font-size: 80px; color: #98FB98"></i>&nbsp;&nbsp;
				    	
				   		<span style="text-align:center;font-size:30px;color: #ffffff;font-weight: 700;">需要我为你做什么？</span>
				   </div>
			</el-row> -->
			 <!--------- 搜索栏 ---------->
			<!-- <el-row>
				<div class="box">
              		<div class="searchBox">
                		<input type="text"  placeholder="请输入关键词进行搜索" class="searchInput" style="padding-left: 10px;">
                		<input type="button"  value="搜索" class="searchButton">
              		</div>
            	</div>

			</el-row>
			<el-row>
				</br>
				</br>
				<div>
					<div style="font-size:25px;color: #ffffff; margin-left: 150px">试着对我说:</div></br></br>

					<p class="app">“搜索车辆”</p></br></br>
			
					<p class="app">“搜索病人”</p></br></br>
				
					<p class="app">“推荐调度方案”</p></br></br>
					
				</div>
			</el-row>
		</el-dialog> -->
        
		<!----------- 应急预案弹窗 与整个页面的row并列---------------------->
		<el-dialog title="应急预案一键启动"  :visible.sync ="dialogGlobal"
		                                    :before-close="handleClose"
										    style="text-align:left;" class="mydialog2">

			<!-- mydialog2样式的弹窗大小 width:500px;
	                     height: 650px; -->

			 <!-- 内部四行按钮组：每行三个按钮，每个按钮绑一个函数共12个 -->
			 <!-- 第一行：聚集踩踏 -->
			
			<el-row style="padding:5px; text-align: center">
				<span class="text-new">聚集踩踏</span><br /><br />
			</el-row>

			 <el-row style="padding:5px; text-align: center">
				<el-button 
							size="large"
							@click="progressBar1()">一级</el-button>
					   
			    <el-button 
							size="large"
							@click="progressBar2()">二级</el-button>
			    <el-button 
							size="large"
							@click="progressBar3()">三级</el-button>
			    <!-- <el-button style="float:left"
		               size="mini"
		               @click="toolipVisible=true">四级</el-button> -->
			</el-row>
			<!-- 第二行：食物中毒 -------------------->
				<br /><br />
			<el-row style="padding:5px; text-align: center">
				<span class="text-new">食物中毒</span><br /><br />
			</el-row>

			 <el-row style="padding:5px; text-align: center">
				<el-button 
		               size="large"
		               @click="progressBar4()">一级</el-button>
			    <el-button 
		               size="large"
		               @click="progressBar5()">二级</el-button>
			    <el-button 
		               size="large"
		               @click="progressBar6()">三级</el-button>
			    <!-- <el-button style="float:left"
		               size="mini"
		               @click="toolipVisible=true">四级</el-button> -->
			</el-row>
			<!-- 第三行：恐怖袭击/爆炸/交通事故 ------->
			<br /><br />
			<el-row style="padding:5px; text-align: center">
				<span class="text-new">恐怖袭击/爆炸/交通事故</span><br /><br />
			</el-row>
			 <el-row style="padding:5px; text-align: center">
				<el-button
		               size="large"
		               @click="progressBar7()">一级</el-button>
			    <el-button 
		               size="large"
		               @click="progressBar8()">二级</el-button>
			    <el-button 
		               size="large"
		               @click="progressBar9()">三级</el-button>
			    <!-- <el-button style="float:left"
		               size="mini"
		               @click="toolipVisible=true">四级</el-button> -->
			</el-row>
			<!-- 第四行：新冠疫情防控 -------------------->
			<br /><br />
			<el-row style="padding:5px; text-align: center">
				<span class="text-new">新冠疫情防控</span><br /><br />
			</el-row>
			<el-row style="padding:5px; text-align: center">
				<el-button 
		               size="large"
		               @click="progressBar10()">一级</el-button>
			    <el-button 
		               size="large"
		               @click="progressBar11()">二级</el-button>
			    <el-button
		               size="large"
		               @click="progressBar12()">三级</el-button>
			    <!-- <el-button style="float:left"
		               size="mini"
		               @click="toolipVisible=true">四级</el-button> -->
			</el-row>
		</el-dialog >
		<!----------- 应急预案弹窗结束------>

		<!----------- 聚集踩踏 “一级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="踩踏事件：一级应急预案" :visible.sync="dialogDetailVisible1"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>

					<el-progress type="circle" :percentage="80"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />				
				</el-row>
                     <!-- 下方data的return里面写上 checkList9数组 -->
				<el-checkbox-group v-model="checkList1">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>
		
       <!----------- 聚集踩踏 “二级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="踩踏事件：二级应急预案" :visible.sync="dialogDetailVisible2"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="70"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList2数组 -->
				<el-checkbox-group v-model="checkList2">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>

          

		 <!----------- 聚集踩踏 “三级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="踩踏事件：三级应急预案" :visible.sync="dialogDetailVisible3"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="85"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList3数组 -->
				<el-checkbox-group v-model="checkList3">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>
		<!----------- 食物中毒“一级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="食物中毒：一级应急预案" :visible.sync="dialogDetailVisible4"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="80"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList数组 -->
				<el-checkbox-group v-model="checkList4">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>
		<!----------- 食物中毒“二级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="食物中毒：二级应急预案" :visible.sync="dialogDetailVisible5"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="45"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList5数组 -->
				<el-checkbox-group v-model="checkList5">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>
		<!----------- 食物中毒“三级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="食物中毒：三级应急预案" :visible.sync="dialogDetailVisible6"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="70"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList6数组 -->
				<el-checkbox-group v-model="checkList6">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>

		<!-----------恐袭“一级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="恐怖袭击/爆炸/交通事故：一级应急预案" :visible.sync="dialogDetailVisible7"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="50"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList7数组 -->
				<el-checkbox-group v-model="checkList7">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>
		<!----------- 恐袭“二级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="恐怖袭击/爆炸/交通事故：二级应急预案" :visible.sync="dialogDetailVisible8"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="70"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList8数组 -->
				<el-checkbox-group v-model="checkList8">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>

		<!----------- 恐袭“三级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="恐怖袭击/爆炸/交通事故：三级应急预案" :visible.sync="dialogDetailVisible9"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="70"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList9数组 -->
				<el-checkbox-group v-model="checkList9">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>

		<!----------- 新冠疫情防控“一级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="新冠疫情防控：一级应急预案" :visible.sync="dialogDetailVisible10"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="80"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList9数组 -->
				<el-checkbox-group v-model="checkList10">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>

		<!----------- 新冠疫情防控“二级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="新冠疫情防控：二级应急预案" :visible.sync="dialogDetailVisible11"
		                                        :before-close="handleClose"
										        style="text-align:left;" class="mydialog2">
				
				<el-row>
					
					<el-progress type="circle" :percentage="80"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				
				</el-row>
                     <!-- 下方data的return里面写上 checkList9数组 -->
				<el-checkbox-group v-model="checkList11">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>

		<!----------- 新冠疫情防控“三级”小按钮点击后 弹窗:四个通知勾选框------>
		<el-dialog title="新冠疫情防控：三级应急预案" :visible.sync="dialogDetailVisible12"
		                                            :before-close="handleClose"
										             style="text-align:left;" class="mydialog2">
		
				<el-row>		
					<el-progress type="circle" :percentage="80"></el-progress>
					<span class="text-new"  style="text-align:center;">自动执行中</span><br /><br /><br /><br />
				</el-row>
                     <!-- 下方data的return里面写上 checkList9数组 -->
				<el-checkbox-group v-model="checkList12">
				   <el-row>
					 <span class="text-new">1.报告上级单位 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					 &nbsp;&nbsp;
					 <el-checkbox label="1">&nbsp;已完成</el-checkbox>
				   </el-row>
			      <el-row>
					<br /><br />
					<span class="text-new">2.通知领导小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="2">&nbsp;已完成</el-checkbox>
				  </el-row>

				<el-row>
					<span class="text-new">3.通知踩踏事件处置小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="3">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">4.通知专家小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>
					<el-checkbox label="4">&nbsp;已完成</el-checkbox>
				</el-row>
				<el-row>
					<span class="text-new">5.通知物资保障小组 &nbsp;&nbsp;&nbsp;&nbsp;</span>  
					<el-checkbox label="5">&nbsp;已完成</el-checkbox>
				</el-row>

				<el-row>
					<span class="text-new">6.通知定点医院做好准备 &nbsp;&nbsp;&nbsp;&nbsp;</span>		
					<el-checkbox label="6">&nbsp;已完成</el-checkbox>
				</el-row>
			</el-checkbox-group>
		</el-dialog>

        <!-- 所有上报病人列表的行点击电子病历 -->
		<el-dialog title="上报病人电子病历"
		           :visible.sync="showPatinfo"
		           :before-close="handleClose"
		           style="text-align:left;" class="mydialog">
		
		  <el-row class="spanbox">
		    <span class="text1-title">姓名：<i>{{perinfo.Name}}</i></span>  
			<span class="text1-title">性别：<i>{{perinfo.Gender}}</i></span>
			<span class="text1-title">年龄：<i>{{perinfo.Age}}</i></span>
		    <el-button style="float:right"
		               size="mini"
		               @click="toolipVisible=true">查看真实姓名</el-button>
		    <el-button style="float:right"
		               size="mini"
		               @click="refresh(perinfo.PatientId)"><div class="flex align-center"><img src="../assets/icon-12.png"> 刷新</div></el-button>
		
		  </el-row>
		  <el-row class="spanbox">
		    <span class="text1-title">状态：  <i>{{perinfo.StatusName}} </i></span> 
		    <span class="text1-title">分级：  <i>{{perinfo.Classification}} </i></span> 
		    <span class="text1-title">现场：  <i>{{perinfo.EmergencyGroupName}}</i></span><br />
		    <span class="text1-title">分配车辆：<i>{{perinfo.CarName}} </i></span>
		    <span class="text1-title">分配医院：<i>{{perinfo.OrganizationName}}</i></span> 
			<span class="text1-title">诊断：<i>{{perinfo.Diagnose}}</i></span>
		  </el-row>
		
		  <el-dialog title="提示"
		             :visible.sync="toolipVisible"
		             width="30%"
		             append-to-body>
		    <span>确认要查看病人真名吗？</span>
		    <span slot="footer"
		          class="dialog-footer">
		      <el-button @click="toolipVisible = false">取 消</el-button>
		      <el-button type="primary"
		                 @click="getMemberInfo(perinfo.memberId)">确 定</el-button>
		    </span>
		  </el-dialog>
		
		  </br>
		           <!-- 诊断：{{perinfo.Diagnose}} -->
		
		  <div>
		    <div>
		      <mt-navbar v-model="selected"
		                 style="backgroundColor:#0e2da0;color:00deff;font-size:14px;">
		        <mt-tab-item id="病史">
		
		          <div style="font-size:16px">病史</div>
		        </mt-tab-item>
		        <mt-tab-item id="体征">
		
		          <div style="font-size:16px">体征</div>
		        </mt-tab-item>
		        <mt-tab-item id="处置">
		
		          <div style="font-size:16px">处置</div>
		        </mt-tab-item>
		      </mt-navbar>
		    </div>
		    <mt-tab-container class="page-tabbar-container"
		                      v-model="selected">
		
		      <mt-tab-container-item id="病史">
		        <div style="overflow:auto;height:250px;" class="scroll">
		          <div>
		            <div>
		              <div class="text1-title"> 主诉</div>
		              <div v-if="zhusu.timevalue!=''">
		                <div class="text1-time">{{zhusu.timevalue}} </div>
		                <div class="text1-content">{{zhusu.content}} </div>
		              </div>
		              <div v-else
		                   class="text1-no">
		                暂无
		              </div>
		            </div>
		          
		            <div>
		              <div class="text1-title"> 现病史</div>
		              <div v-if="xianbingshi.timevalue!=''">
		                <div class="text1-time">{{xianbingshi.timevalue}} </div>
		                <div class="text1-content">{{xianbingshi.content}} </div>
		
		              </div>
		              <div v-else
		                   class="text1-no">
		                暂无
		              </div>
		            </div>
		            
		            <div>		
		              <div class="text1-title"> 过敏史</div>
		
		              <div v-if="guominshi.timevalue!=''">
		                <div class="text1-time">{{guominshi.timevalue}} </div>
		                <div class="text1-content">{{guominshi.content}} </div>
		              </div>
		              <div v-else
		                   class="text1-no">
		                暂无
		              </div>
		            </div>
		            
		            <div>
		              <div class="text1-title"> 疾病史</div>
		              <div v-if="jibingshi.timevalue!=''">
		                <div class="text1-time">{{jibingshi.timevalue}} </div>
		                <div class="text1-content">{{jibingshi.content}} </div>
		              </div>
		              <div v-else
		                   class="text1-no">
		                暂无
		              </div>
		
		            </div>
		           
		            <div>
		              <div class="text1-title"> 目前用药</div>
		              <div v-if="curdrugused.timevalue!=''">
		                <div class="text1-time">{{curdrugused.timevalue}} </div>
		                <div class="text1-content">{{curdrugused.content}} </div>
		              </div>
		              <div v-else
		                   class="text1-no">
		                暂无
		              </div>
		            </div>
		            
		            <div v-show="zhusuphotos.length>0">
		              <div class="text1-title">主诉图片</div>
		              <div class="text1-time">
		                {{zhusuphoto.time}}</div>
		
		              <div v-viewer>
		                <div v-for="(item,index) in zhusuphotos"
		                     :key="index">
		                  <div align="center">
		                    <img :src="item"
		                         style="width: 50%; height: 50%; "
		                         v-show="index==0">
		                  </div>
		                </div>
		              </div>
		            </div>
		          </div>
		
		        </div>
		
		      </mt-tab-container-item>
		
		      <mt-tab-container-item id="体征">
		        <div style="overflow:auto;height:250px;" class="scroll">
		          <div v-if="dataTZ.length>0">
		            <div v-for="(item,index) in dataTZ">
		
		              <div class="text1-title">{{item.OperationName}}</div>
		              <div class="text1-time">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</div>
		
		              <div class="text1-content">{{item.Detail}}</div>
		              
		            </div>
		          </div>
		          <div v-else
		               style="margin:50px;text-align:center;font-size:20px;">
		
		            暂无体征
		          </div>
		        </div>
		
		      </mt-tab-container-item>
		
		      <mt-tab-container-item id="处置">
		        <div style="overflow:auto;height:250px;" class="scroll">
		          <div v-if="dataCZ.length>0">
		            <div v-for="(item,index) in dataCZ" style="">
		
		              <!-- <div class="text-title">{{item.OperationName}}</div>
		              <div class="text-time">{{item.OperationTime}}&nbsp;&nbsp;&nbsp;{{item.Address==1?'地点：会场':'地点：车辆'}}</div>
		
		              <div class="text-content">{{item.Detail}}</div> -->
		              <div class="text1-title">{{item.OperationName}}&nbsp;&nbsp;&nbsp;<span v-show="(item.OperationCode=='P112')"
		                      class="text1-content">检查单号{{item.Detail1}}</span></div>
		              <div class="text1-time">
		                {{item.OperationTime}}&nbsp;&nbsp;&nbsp;
		                {{item.Address==1?'地点：会场':'地点：车辆'}}</div>
		
		              <div class="text1-content"><span>{{item.Detail}}</span></div>
		              <div align="center"
		                   v-show="item.InfoType==3">
		                <div v-viewer>
		                  <img :src="item.FileUrl"
		                       style="width: 50%; height: 50%; ">
		                </div>
		              </div>
		            
		            </div>
		          </div>
		          <div v-else
		               style="margin:50px;text-align:center;font-size:20px;">
		            暂无处置
		          </div>
		        </div>
		
		      </mt-tab-container-item>
		    </mt-tab-container>
		
		  </div>
		  <span class="text-title text-title2"> <img src="../assets/icon-10.png"> 专家列表</span>
		  <div class="ass">
		
		    <el-table :data="expertlist"
		              max-height="250"
		              :header-row-style="{'height':'14px','padding':'2px'}"
		              :header-cell-style="{'background-color': '#0070a8','color': 'white', 'text-align':'center','font-size':'14px'}">
		      <el-table-column prop="PersonnelID"
		                       v-if="false">
			  </el-table-column>
			
		      <el-table-column prop="Name"
		                       label="姓名">
		
		      </el-table-column>
		      <el-table-column prop="DepartmentCode"
		                       label="所在医院">
		
		      </el-table-column>
		      <el-table-column prop="TitleCode"
		                       label="科室">
		
		      </el-table-column>
		      <el-table-column prop="Specialty"
		                       label="专长">
		
		      </el-table-column>
		      <el-table-column label="操作">
		        <!-- <el-button @click="push()">推送</el-button> -->
		        <template slot-scope="scope">
		
		          <el-button class="btn-ts" type="primary"
		                     size="mini"
		                     @click="ptoe(scope.$index)">推送</el-button>
		
		        </template>
		      </el-table-column>
		
		    </el-table>
		  </div>
		</el-dialog>

        <!-- 紧急配血弹窗 -->
		<el-dialog title="无人机配置界面"
		           :visible.sync="blood"
		           :before-close="handleClose"
		           style="text-align:left;" class="mydialog">
             <el-row>
                  <div>
					  <el-tabs>
  							<el-tab-pane>
    							<span slot="label" class="text-new"><i class="el-icon-box"></i> 无人机1</span>
   								 <!-- 这里是无人机1的内容 -->
								<el-row>
									<!-- 引用了原版车辆列表的格式 -->
									<div class="text-group">
										<!-- {{item.CarName}}</br> -->
										</br></br>
										<span style="display: inline-block;width:42%;" >当前位置: &nbsp; &nbsp;&nbsp; &nbsp;省血液中心</span>
										<el-divider direction="vertical"></el-divider>
										&nbsp; &nbsp;&nbsp; &nbsp;当前状态：空闲</br></br></br></br>
										<span style="display: inline-block;width:15%;">血液类型:{{""}}</span>

										    <el-select v-model="value" placeholder="O型Rh+">
												<el-option
												v-for="item in options"
												:key="item.value"
												:label="item.label"
												:value="item.value">
												</el-option>

											</el-select>
										
										<el-divider direction="vertical"></el-divider>&nbsp; &nbsp;&nbsp; &nbsp;
										<span style="display: inline-block;width:8%;">数量: {{""}}</span>

										<!-- 这个num对应了data() return里面的num  -->
										<el-input-number v-model="num" controls-position="right" @change="handleChange" :min="30" :max="100"></el-input-number>
										
										</br></br></br></br>
										<span style="display: inline-block;width:15%;">目的地:{{""}}</span>
										<el-select v-model="desValue" placeholder="浙大二院">
											<el-option
												v-for="item in desOptions"
												:key="item.value"
												:label="item.label"
												:value="item.value">
											</el-option>
										</el-select>

										<!-- <hr> -->
									</div>
								</el-row>

                                </br></br></br></br></br></br></br></br>
                                <!-- 下达指令按钮 ------->
								<el-row>
									<div class="groupbox-boarder">
							            <el-row style="padding:5px; text-align: center">
											<el-button @click="sendBlood()" style="font-size:20px; padding: 4px 16px;">
												下达指令
											</el-button>
										</el-row>
									</div>
								</el-row>
 							</el-tab-pane>

  							 <el-tab-pane>
								<span slot="label" class="text-new"><i class="el-icon-box"></i> 无人机2</span>
								这里是无人机2的内容
							</el-tab-pane>
 							 <el-tab-pane>
							   <span slot="label" class="text-new"><i class="el-icon-box"></i> 无人机3</span>
								这里是无人机3的内容
							</el-tab-pane>
  					
					</el-tabs>
				  </div>
			 </el-row>

		</el-dialog>
	</div>
</template>
<script>
	// import AMap from 'AMap';
	import echarts from 'echarts';
	import axios from 'axios';
	import Gd_map from './Gd_map.vue';
	import chart from './chart.vue'
	import Car from './outline/Car.vue'
	import Ass from './outline/Ass.vue'
	import Hos from './outline/Hos.vue'
	import overall from './outline/overall.vue'
	import global from '../components/global.vue'

	export default {
       
		beforeRouteLeave (to, from, next) { if(this.ws){ this.ws.close() } },
		components: {
			'Gd_map': Gd_map,
			'chart': chart,
			'Hos': Hos,
			'Car': Car,
			'Ass': Ass,
			'overall': overall,
		},
		provide() { // 注册一个方法
			return {

				reload: this.reload
			}
		},
	
		sockets: {
			orderresult: function(data) {

				console.log('orderresult')
				//data表示一条socket消息 即调用一次emerg接口会触发6次orderresult函数
				console.log(data)
				this.doCheck(data)	  

			},
			news: function(data) {
				console.log('news')             
				// 推送来的新消息切换标签页功能
				this.switch(data)

                this.getPatientStatusLog()
				this.getPrepareSendList()
				this.getAllReportedList()

				this.getmsg()
				this.getReportedPatientList()
				

			},
			news1: function(data) {
				console.log('news1')
				this.switch(data)

				this.getPatientStatusLog()
				this.getPrepareSendList()
				this.getAllReportedList()

				this.getmsg()
				this.getReportedPatientList()
				

			},
			alert: function(data) {
				console.log("alert")

				this.switch(data)
				this.getPatientStatusLog()
				this.getPrepareSendList()
				this.getAllReportedList()

				this.getReportedPatientList()
				console.log('上报病人列表闪烁', data.AssemblyGroup)
				this.card = "second"
				this.shake($("#myexample"), "red", 4)
				// this.initialvalue()
				this.getPatientInfo(data.AssemblyGroup)
				this.getPatientRecord(data.AssemblyGroup)
				this.showPatinfo = true
				this.$nextTick(() => {
					this.getmsg()
				})
			},
			help: function(data) {
				this.switch(data)
				this.getPatientStatusLog()
				this.getPrepareSendList()
				this.getAllReportedList()

				this.getmsg()
				this.getReportedPatientList()
				console.log('help信息收到')
			},
		},
		data() {
			return {

			

			// 配血弹窗 血液类型 下拉选择器
				options: [{
					value: '选项1',
					label: 'O型Rh+'
					}, {
					value: '选项2',
					label: 'O型Rh-'
					}, {
					value: '选项3',
					label: 'A型Rh+'
					}, {
					value: '选项4',
					label: 'A型Rh-'
					}, {
					value: '选项5',
					label: 'B型Rh+'
				   },
				   {
					value: '选项6',
					label: 'B型Rh-'
				   },
				   {
					value: '选项7',
					label: 'AB型Rh+'
				   },
				   {
					value: '选项8',
					label: 'AB型Rh-'
				   },
								
				],
                 value: '',


		// 配血弹窗 目的地 下拉选择器
			desOptions: [
				{
					value: '选项1',
					label: '浙大二院'

				}, {
					value: '选项2',
					label: 'A医院'

				}, {
					value: '选项3',
					label: 'B医院'
				}
			],
				desValue: '',
             

			// 配血弹窗里面的数量选择器参数
			 num: 1,

			//全局挂载方法一 将全局变量赋值到data里面
            // dialogGlobal: global.dialogGlobal,

			//全局挂载方法二
			//  dialogGlobal: this.GLOBAL.dialogGlobal,

			//dialogVisible是应急预案 按钮点击 出来的弹窗标记，默认为关闭状态
			dialogVisible: false,

			dialogGlobal: false,

			//dialogDetailVisible1是应急预案弹窗上“一级”小 按钮点击 出来的弹窗标记
			dialogDetailVisible1: false,
			dialogDetailVisible2: false,
			dialogDetailVisible3: false,
			dialogDetailVisible4: false,

			dialogDetailVisible5: false,
			dialogDetailVisible6: false,
			dialogDetailVisible7: false,
			dialogDetailVisible8: false,

			dialogDetailVisible9: false,
			dialogDetailVisible10: false,
			dialogDetailVisible11: false,
			dialogDetailVisible12: false,

			//应急预案查询 template里面的勾选数组
			checkListMain: [],

			// 聚集踩踏一级 doCheck()
			checkList1: [],

		    // 聚集踩踏二级 
			checkList2: [],

			// 聚集踩踏三级 
			checkList3: [],


			// 食物中毒一级 
			checkList4: [],

		    // 食物中毒二级 
			checkList5: [],

			// 食物中毒三级 
			checkList6: [],

			// 恐袭爆炸交通一级
			checkList7: [],

		    // 恐袭爆炸交通二级 
			checkList8: [],

			// 恐袭爆炸交通三级 
			checkList9: [],


			// 新冠疫情防控一级
			checkList10: [],

		    // 新冠疫情防控二级 
			checkList11: [],

			// 新冠疫情防控三级 
			checkList12: [],


            // 语音图标的弹窗标记
			// voiceDialogVisible: false,

			//showPatinfo是所有上报病人列表 单行点击 弹窗电子病历的弹窗标记
			showPatinfo: false,

            //blood是重点提示 红字配血的弹窗标记
			blood: false,
			toolipVisible: false,
			
			// 后送状态跟踪原版假数据
			tableData: [
				{
					PatientId: "A001",
					Name: "张三",
					UpdateTime: "15:20",
					StatusName: "待后送>2号急救车前往中>前往医院B>入院"
					
				},
				{
					PatientId: "A002",
					Name: "李四",
					UpdateTime: "15:42",
					StatusName: "已入院"

				},
				{
					PatientId: "A003",
					Name: "王五",
					UpdateTime: "15:55",
					StatusName: "待后送>5号急救车前往中"
					
				},
			],

			// 后送状态跟踪
			PatientStatus: [],

            //后送病人列表
			PrepareSendList: [],

			//所有上报病人列表
			AllReportedList: [],

            //tableData2的备份
			tempArray: [],

			// 智能调度
			tableData2: [
				
				// {
				// 	PatientId: "11114",
				// 	Diagnose: "急性心肌梗死",
				// 	Request: "胸痛中心",
				// 	// CarName: "急救车1",
				// 	// OrganizationName: "医院3",
				// 	CarName: "",
				// 	OrganizationName: "",
				// 	CarGroup:"C01",
				// 	HosGroup:"O02",

				// 	// CarGroup:"",
				// 	// HosGroup:"",
		
				// },
				// {
				// 	PatientId: "11169",
				// 	Diagnose: "骨折",
				// 	Request: "",
				// 	CarName: "",
				// 	OrganizationName: "",
				// 	CarGroup: "C01",
				// 	HosGroup: "O01",

				// 	// CarGroup: "",
				// 	// HosGroup: ""

				// },
				// {
				// 	PatientId: "11170",
				// 	Diagnose: "外伤",
				// 	Request: "",
				// 	CarName: "",
				// 	OrganizationName: "",
				// 	CarGroup: "",
				// 	HosGroup: ""

				// },
				// {
				// 	PatientId: "11183",
				// 	Diagnose: "昏迷",
				// 	Request: "",
				// 	CarName: "",
				// 	OrganizationName: "",
				// 	CarGroup: "",
				// 	HosGroup: ""

				// },
				// {

				// 	PatientId: "11189",
				// 	Diagnose: "中暑",
				// 	Request: "",
				// 	CarName: "",
				// 	OrganizationName: "",
				// 	CarGroup: "",
				// 	HosGroup: ""

				// },
				
			],

			

			// 后送病人表
			PatientList: [
				{
					Time: "15:34",
					Num: "A001",
					Group: "场馆A1",
					Name: "张三",
					Condition:"心肌梗死",
					Status:"待后送"
				},
				{
					Time: "15:35",
					Num: "A002",
					Group: "场馆A2",
					Name: "李四",
					Condition:"腿外伤",
					Status:"待后送"	
				},
				{
					Time: "15:37",
					Num: "A003",
					Group: "场馆A3",
					Name: "李四",
					Condition:"骨折",
					Status:"待后送"	
				},
				{
					Time: "15:40",
					Num: "A004",
					Group: "场馆A4",
					Name: "李四",
					Condition:"低血压",
					Status:"待后送"	
				},
				{
					Time: "16:20",
					Num: "A005",
					Group: "场馆A5",
					Name: "李四",
					Condition:"心梗",
					Status:"待后送"	
				},
			],
		
				isRouterAlive: true,
				msg1: '世界互联网大会',
				msg2: '2019/3/12 3:27:17',
				msg3: '',
				msg4: '',
				mapd: Gd_map,
				// mapd:map,
				chartVue: '',
				title1: '消息列表',
				eid: '',
				title2: '总体情况',
				ReportedPatientList: [],

				loading: false,

				// 进度条会动
				percen: 50,

				// 重点提示原版
				// tablemsg:[],
                 
				// 输血需求
				bloodMsg: [],

				//转运消息
				transMsg:[],

				//预警消息
				alertMsg: [],

				// 重点提示假数据版本 为了紧急配血显示效果
				tablemsg: [{title:'场馆A发生人流拥堵'},
				           {title:'病人A001需要紧急配血'},
				           {title:'场馆A发生病人倒地事件'},
						   {title:'病人A002待后送'},
						   {title:'病人A006需要紧急配血'},
						   {title:'场馆C发生病人倒地事件'},
						   {title:'病人A010待后送'},
						   {title:'病人A003需要紧急配血'},
						   {title:'病人A004需要紧急配血'},
						   {title:'病人A009需要紧急配血'},
						   {title:'场馆D发生病人倒地事件'},
						   {title:'病人A008待后送'},
				],

				overallVisiable: true,
				showtype: 'overall',
				//小组类型
				grouptype: '',
				carlist: [],
				hoslist: [],
				asslist: [],
				expertlist: [],

				msglist: [],
				openmsg: '',
				
				perinfo: {},
				memberId: '',
				photosrc: global.photoUrl + "zyh_1557216080825test.jpg",
				intervalid1: null,
				watchID1: null,
				card: 'second',
				msgCard: 'msgSecond',
				PatientId: '',
				selected: '病史',

				content: '',

				//过敏史
				guominshi: {
					content: '',
					timevalue: ''
				},
				//疾病史
				jibingshi: {
					content: '',
					timevalue: ''
				},
				curdrugused: {
					timevalue: '',
					content: '',
				},
				zhusu: {
					content: '',
					timevalue: ''

				},
				xianbingshi: {
					content: '',
					timevalue: ''
				},
				// timevalue42: '',
				// timevalue43: '',
				timevalue2: '',
				// 主诉: '',
				// 主诉图片: [],
				zhusuphoto: {

				time: '',
				},
				// 主诉图片是数组,
				zhusuphotos: [],
				体征: '请选择体征',
				// 现病史: '',
				现病史图片: [],
				// 过敏史: '',
				// 疾病史: '',
				// 目前用药: '',
				既往史图片: [],
				初步诊断: '',


				dataTZ: [],
				dataCZ: [],
				patientrecord: [],

			}
		},

		watch: {
            
			//应急预案查询弹窗
			dialogVisible:function(dialogVisible){

                if(dialogVisible == false){
						
					console.log('首页监听到dialogVisible还是false..')

				}	
                if(dialogVisible == true){
						
					console.log('首页监听到dialogVisible变成true,所以弹出弹窗了吗')

				}		
			},		
			
		},
	

		mounted() {

			this.getTime();
			this.loadmap(); //加载地图和相关组件
			// this.$nextTick(() => {
			// this.drawLine();    })
			// this.drawLine();

			this.$nextTick(() => {
				this.getmsg();
			})

			this.getPatientStatusLog();
			this.getPrepareSendList();
			this.getAllReportedList();
			this.getcarlist();
			this.gethoslist();
			this.getasslist();
			this.getexpertlist();
			this.getReportedPatientList();

		    // 重点提示里面将配血字段筛选出来
			this.msglist = [];
			this.getMsgList();

			//---------------------------------- 语音录入部分 --------------------------------//
			this.initWebSocket();
			this.recorder = new this.Recorder({

				sampleBits: 16,               // 采样位数，支持 8 或 16，默认是16
				sampleRate: 16000,           // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
				numChannels: 1,             // 声道，支持 1 或 2， 默认是1
									       // compiling: false,(0.x版本中生效,1.x增加中)  // 是否边录边转换，默认是false
			});

			var that=this

			//  这一段暂时注释掉
			document.onkeydown = function(e) {
					// console.log('触发按下空格事件')
					//事件对象兼容
					let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
					//键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
					//左
					if (e1 && e1.keyCode==32) {
						if(that.recording==0){

							that.recStart()
							that.voiceColor = {
							color: '#FF0000',

							}
						} 
					};
			};

			document.onkeyup = function(e) {
					// console.log('空格键弹起')
					//事件对象兼容
					let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
					//键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
					//左
					if (e1 && e1.keyCode==32) {

						that.recStop()
						console.log('录音结束')
						that.voiceColor = {
						    color: '#000000',
						}
					} 
					// else console.log("333")
			};

		},

		methods: {

			initWebSocket() {

				// 下面这段注释掉是因为会一直报警 连接断开
				// 初始化websocket

				// let wsuri = 'ws://10.11.96.46:12032'
				// this.ws = new WebSocket(wsuri)
				// this.ws.onmessage = this.websocketonmessage
				// this.ws.onopen = this.websocketonopen
				// this.ws.onerror = this.websocketonerror
				// this.ws.onclose = this.websocketclose

			},
			websocketonopen() {
				console.log('识别接口的websocket 连接成功')
			},

			//----- 获取websocket推送的数据
			websocketonmessage(e) {
			
					let msg = JSON.parse(e.data)[0]
			
					console.log('数据已获取,msg为',msg)
					//打印结果是{code: 0, trans: "现在开始第四次测试"}

					//取到返回的信息里的文字字段
					console.log(msg.trans)  

					if(msg.trans == ""){

						msg.trans = '识别内容为空'
					}

					if(msg.score >= 0){        
						msg.trans = msg.trans.concat('是当前说话人') 

					}else{
						msg.trans = msg.trans.concat('不是当前说话人') 
					}

					// 触发应急预案查询按钮: 是否识别结果包含这个字段？
					if(msg.trans.indexOf("应急预案查询") != -1){

						

							// 这里面两个 dialog 值，一个是 dialogVisible(应急预案窗口) 和 dialogDetailVisible1(聚集踩踏窗口), 都要首次在这里创建，而不是在test.vue创建。并设置成全局变量
							// window.localStorage.setItem('diaMain', this.dialogVisible);

							// console.log("检测到说话中含预案查询字样，此时dialogVisible值是",this.dialogVisible);

							// this.dialogVisible = true;

							// console.log("将dialogVisible设成true后，应急dialogVisible值是",this.dialogVisible);
							

							console.log("检测到说话中含预案查询字样，此时dialogVisible值是",this.dialogGlobal);

							this.dialogGlobal = true;

							console.log("将dialogVisible设成true后，应急dialogVisible值是",this.dialogGlobal);
						
				    
					}

					if(msg.trans.indexOf("聚集踩踏一级") != -1){		

								//先弹出当前对话框
								console.log("检测到说话中含踩踏一级字样，这个小dialog值是",this.dialogDetailVisible1);
								this.dialogDetailVisible1 = true;

								console.log("将小dialog设成true后，这个小dialog值是",this.dialogDetailVisible1)
							
								// 让前一步的对话框消失
								this.dialogVisible = false;

								console.log('发起一次应急预案查询请求')
							

								if( this.checkList1.length < 6){
									axios.post('/oneClickEmergPlan', {
										//console.log('发起第二次查询请求'),
											"type": "聚集踩踏",
											"classification": "一级"
										
									}).catch(function(error){
										console.log("error",error);
									})

								}  
						} 
					
					//-----------------------------  弹出文本识别结果 直接写在这里  ------------------------------
					this.$notify.info({
				
							title: '语音内容',
							message: msg.trans,
							position: 'bottom-left',
							duration: 5000
													
					});

				//websocketon 结束

			},
			
			// 连接失败时重新连接
			websocketonerror() {
			this.initWebSocket()
			},

			// 断开链接后报错
			websocketclose(e) {
			console.log('断开连接', e)
			this.initWebSocket() 
			//断开后重新连接
			},

			recStart(){ 
			
			this.recorder.start().then(() => {
				// 开始录音
				this.recording=1;
				console.log("录音开始");
			}, (error) => {
				// 出错了
				console.log("录音出错");
			});
			},

			// ----------------------------------------发送回服务端-----------------
			recStop(){
				// this.recorder.stop();
				console.log("stop")
				this.recording=0;
				var a= this.recorder.getWAVBlob()
				var file 
				a.arrayBuffer().then((result)=> {

					console.log('拿到结果准备发给服务端')
					console.log(result)
					file = new Uint8Array(result)
					
					//取到在voiceinfo.vue里设置的全局变量pho对应的值（即电话号码的值）
					var phoResult = window.localStorage.getItem('pho');

					var j={ 

					//原来是name         
					phone:phoResult,
					file:file
					} 
					console.log('指定说话人的电话号码为',j.phone,'（即将传给服务端）')       
					this.ws.send(JSON.stringify(j))

				})

				// console.log('%o',a.arrayBuffer)
				// console.log('%o',a)

			},
			recPlay(){

				this.recording=0;
				this.recorder.play();
			},
			recDownload(){

				this.recording=0;
				this.recorder.downloadWAV('test');
			},
 
        //=============================================== 语音部分结束 =================================================
		

		//写一个控制checkbox打钩的函数即可
		doCheck(data){

				// 现在的data是一整条的string
			         var type = data.Type
					 var classy = data.Classification
					 var num = data.Num
					
					if(type == "聚集踩踏" && classy == "一级"){
						if(num == 1){
							this.checkList1.push("1")
						}else if (num == 2){
							this.checkList1.push("2")
						}else if(num == 3){
							this.checkList1.push("3")

						}else if(num == 4){
							this.checkList1.push("4")
						}else if(num == 5){
							this.checkList1.push("5")
						}else if(num == 6){
							this.checkList1.push("6")
						}
							  
							//判断checkbox是否全部选中
						if(this.checkList1.length == 6){
								this.$notify.info({
									title: '通知',
									message: '踩踏事件：一级应急预案执行完成',
									// duration: 300000
									duration: 0
								});
						}
					}

					if(type == "聚集踩踏" && classy == "二级"){

							if(num == 1){
								this.checkList2.push("1")
							}else if (num == 2){
								this.checkList2.push("2")
							}else if(num == 3){
								this.checkList2.push("3")
							}else if(num == 4){
								this.checkList2.push("4")
							}else if(num == 5){
								this.checkList2.push("5")
							}else if(num == 6){
								this.checkList2.push("6")
							}

							if(this.checkList2.length == 6){
								this.$notify.info({
									title: '通知',
									message: '踩踏事件：二级应急预案执行完成',
									// duration: 300000
									duration: 0
								});
							}

					}
						if(type == "聚集踩踏" && classy == "三级"){
							  if(num == 1){
							this.checkList3.push("1")
						}else if (num == 2){
							this.checkList3.push("2")
						}else if(num == 3){
							this.checkList3.push("3")
						}else if(num == 4){
							this.checkList3.push("4")
						}else if(num == 5){
							this.checkList3.push("5")
						}else if(num == 6){
							this.checkList3.push("6")
						}
						if(this.checkList3.length == 6){
							this.$notify.info({
								title: '通知',
								message: '踩踏事件：三级应急预案执行完成',
								// duration: 300000
								duration: 0
							});
						}
						}

						if(type == "食物中毒" && classy == "一级"){
							  if(num == 1){
							this.checkList4.push("1")
						}else if (num == 2){
							this.checkList4.push("2")
						}else if(num == 3){
							this.checkList4.push("3")
						}else if(num == 4){
							this.checkList4.push("4")
						}else if(num == 5){
							this.checkList4.push("5")
						}else if(num == 6){
							this.checkList4.push("6")
						}
							if(this.checkList4.length == 6){
								this.$notify.info({
									title: '通知',
									message: '食物中毒：一级应急预案执行完成',
									// duration: 300000
									duration: 0
								});
							}
						}

						if(type == "食物中毒" && classy == "二级"){
							  if(num == 1){
							this.checkList5.push("1")
						}else if (num == 2){
							this.checkList5.push("2")
						}else if(num == 3){
							this.checkList5.push("3")
						}else if(num == 4){
							this.checkList5.push("4")
						}else if(num == 5){
							this.checkList5.push("5")
						}else if(num == 6){
							this.checkList5.push("6")
						}
								if(this.checkList5.length == 6){
									this.$notify.info({
										title: '通知',
										message: '食物中毒：二级应急预案执行完成',
										// duration: 300000
										duration: 0
									});
								}
						}
						if(type == "食物中毒" && classy == "三级"){
							  if(num == 1){
							this.checkList6.push("1")
						}else if (num == 2){
							this.checkList6.push("2")
						}else if(num == 3){
							this.checkList6.push("3")
						}else if(num == 4){
							this.checkList6.push("4")
						}else if(num == 5){
							this.checkList6.push("5")
						}else if(num == 6){
							this.checkList6.push("6")
						}
								if(this.checkList6.length == 6){
									this.$notify.info({
										title: '通知',
										message: '食物中毒：三级应急预案执行完成',
										// duration: 300000
										duration: 0
									});
								}
						}

						if(type == "恐怖袭击/爆炸/交通事故" && classy == "一级"){
						if(num == 1){
							this.checkList7.push("1")
						}else if (num == 2){
							this.checkList7.push("2")
						}else if(num == 3){
							this.checkList7.push("3")
						}else if(num == 4){
							this.checkList7.push("4")
						}else if(num == 5){
							this.checkList7.push("5")
						}else if(num == 6){
							this.checkList7.push("6")
						}
								if(this.checkList7.length == 6){
									this.$notify.info({
										title: '通知',
										message: '恐怖袭击/爆炸/交通事故：一级应急预案执行完成',
										// duration: 300000
										duration: 0
									});
								}
						}
						if(type == "恐怖袭击/爆炸/交通事故" && classy == "二级"){
							  if(num == 1){
							this.checkList8.push("1")
						}else if (num == 2){
							this.checkList8.push("2")
						}else if(num == 3){
							this.checkList8.push("3")
						}else if(num == 4){
							this.checkList8.push("4")
						}else if(num == 5){
							this.checkList8.push("5")
						}else if(num == 6){
							this.checkList8.push("6")
						}
						if(this.checkList8.length == 6){
							this.$notify.info({
								title: '通知',
								message: '恐怖袭击/爆炸/交通事故：二级应急预案执行完成',
								// duration: 300000
								duration: 0
							});
						}
						}
						if(type == "恐怖袭击/爆炸/交通事故" && classy == "三级"){
							  if(num == 1){
							this.checkList9.push("1")
						}else if (num == 2){
							this.checkList9.push("2")
						}else if(num == 3){
							this.checkList9.push("3")
						}else if(num == 4){
							this.checkList9.push("4")
						}else if(num == 5){
							this.checkList9.push("5")
						}else if(num == 6){
							this.checkList9.push("6")
						}
								if(this.checkList9.length == 6){
									this.$notify.info({
										title: '通知',
										message: '恐怖袭击/爆炸/交通事故：三级应急预案执行完成',
										// duration: 300000
										duration: 0
									});
								}
						}

						if(type == "新冠疫情防控" && classy == "一级"){
							  if(num == 1){
							this.checkList10.push("1")
						}else if (num == 2){
							this.checkList10.push("2")
						}else if(num == 3){
							this.checkList10.push("3")
						}else if(num == 4){
							this.checkList10.push("4")
						}else if(num == 5){
							this.checkList10.push("5")
						}else if(num == 6){
							this.checkList10.push("6")
						}
								if(this.checkList10.length == 6){
									this.$notify.info({
										title: '通知',
										message: '新冠疫情防控：一级应急预案执行完成',
										// duration: 300000
										duration: 0
									});
								}
						}
						if(type == "新冠疫情防控" && classy == "二级"){
							  if(num == 1){
							this.checkList11.push("1")
						}else if (num == 2){
							this.checkList11.push("2")
						}else if(num == 3){
							this.checkList11.push("3")
						}else if(num == 4){
							this.checkList11.push("4")
						}else if(num == 5){
							this.checkList11.push("5")
						}else if(num == 6){
							this.checkList11.push("6")
						}
								if(this.checkList11.length == 6){
									this.$notify.info({
										title: '通知',
										message: '新冠疫情防控：二级应急预案执行完成',
										// duration: 300000
										duration: 0
									});
								}
						}
						if(type == "新冠疫情防控" && classy == "三级"){

						if(num == 1){
							this.checkList12.push("1")
						}else if (num == 2){
							this.checkList12.push("2")
						}else if(num == 3){
							this.checkList12.push("3")
						}else if(num == 4){
							this.checkList12.push("4")
						}else if(num == 5){
							this.checkList12.push("5")
						}else if(num == 6){
							this.checkList12.push("6")
						}

						if(this.checkList12.length == 6){
									this.$notify.info({
										title: '通知',
										message: '新冠疫情防控：三级应急预案执行完成',
										// duration: 300000
										duration: 0
									});
								}
						}
						
						// if(str.includes("2") == true){
						// 	this.checkList.push("2")
						// }	
						// if(str.includes("3") == true){
						// 	this.checkList.push("3")
						// }
						// if(str.includes("4") == true){
						// 	this.checkList.push("4")
						// }
						// if(str.includes("5") == true){
						// 	this.checkList.push("5")
						// }
						// if(str.includes("6") == true){
						// 	this.checkList.push("6")
						// }

                        		
		       },
         
		    //一键推荐调度按钮触发 写一个for循环将table里面所有的patientId 弄成一个数组 然后调用该接口/oneClickTridgePlan 把这个数组操作成一组新的对象 排在表格里
            generateTridgePlan(){
                
				//将老调度表tableData2备份 并获取需要调配的病人编号组
				// this.tempArray = 
				var newArray = []
				for(var item = 0; item < this.tableData2.length; item++){
                    
					console.log(this.tableData2[item].PatientId)
					newArray.push(this.tableData2[item].PatientId)

				}
                console.log('我选中的病人列表是这样',newArray)
				
				axios.post('/oneClickTridgePlan', {

						// console.log('发起第二次查询请求'),
						"list": newArray,
						

				}).then((response)=> {

                    //取到了这个数组
					var arrayTridge = response.data.results
					console.log('从后端获取的调度方案数组',arrayTridge)
					
					// 在获取新数据前将老的调度表"清空" 不能设为空，不然属性也会没掉。 而是将每个属性字段里的值清空
					for(var i = 0; i < this.tableData2.length; i++){

					     this.tableData2[i].PatientId = ""
						 this.tableData2[i].CarName= ""
						 this.tableData2[i].OrganizationName  = ""

					}
					console.log('清空后的tableData2长这样',this.tableData2)
					console.log('清空后的tableData2长度为',this.tableData2.length)

				 //把取到的每一项的patientId carName OrganizationName 三项放入tableData2
                    for(var i = 0; i < arrayTridge.length; i++){

                		   console.log(arrayTridge[i].PatientId)	
						   this.tableData2[i].PatientId  = arrayTridge[i].PatientId
						   this.tableData2[i].CarName    = arrayTridge[i].CarName  
						   this.tableData2[i].OrganizationName  = arrayTridge[i].OrganizationName 

                            //这两个属性的赋值在表上看不见，但是在一键通知里 必须会对某个Id取到该对象的CarGroup和HosGroup的属性 
						   this.tableData2[i].CarGroup  = arrayTridge[i].CarGroup   
						   this.tableData2[i].HosGroup  = arrayTridge[i].HosGroup 
						   console.log(this.tableData2[i])	
					}
					console.log(this.tableData2)

				}).catch(function(error){
					console.log("error",error);
				})


			},

            handleChange(value) {
        			console.log(value);
             },

            // 后送病人列表点击函数，
			// 如果点击某行的除“选择”键以外的区域 就跳出弹窗
			handleSelect(row, column, cell, event) {
				if (column.property !== "Select") {
				      
                     console.log("handleSelect")
					 console.log(row.PatientId, '获取一次病历')

					 console.log('select属性是',row.select)
					 this.getPatientInfo(row.PatientId)
					 this.getPatientRecord(row.PatientId)
					 this.showPatinfo = true

			        // 如果点击“选择”键，执行将该行数据推送到上面智能调度的表 tableData2
				}else{

                    //当选择键为可选的时候
					if(row.select == false){
								
								//设置选择键为不可选
								row.select = true;
								console.log('打印出当前行的row是什么',row);
								var x = {
									// Num: row.Num,
									// Condition: row.Condition,
									// blank:'',
									// blank:'',
									// blank:'',
									// blank:'',
									// blank:'',

									//编号
									PatientId: row.PatientId,
									//病情
									Diagnose: row.Diagnose,
									//特殊需求
									blank:'',
									//推荐车辆
									blank:'',
									//推荐医院
									blank:'',
									//通知
									blank:'',
									//删除
									blank:'',
									//可选
									select: row.select,

								}

								//这里应该为true;
								console.log('取到的这行的select属性是',x.select)
							
								// 从下面的表中取一行推到上面的表
								this.tableData2.push(x);

								// console.log(row.select);
							
								// 点击后将原表的该行删掉 已起效 
								// this.PatientList.splice(index,1);

					}
				
				}
           }, 
           
			// 重点提示点击函数
            rowMsgClick(row, column, event){
                // debugger 写了之后 打开console的source 再点击界面行尝试 会在debug页面出现绿色高光
				// console.log("我看到紧急配血了")
				
                if( row.title.indexOf("输血需求") != -1){ 
				     this.blood = true
				}else{
					 this.blood = false
				}

				// 能有效果的写法但是是每行点了都出弹窗
				// this.blood = true;
			},

			// 智能调度表的单行删除按钮函数
			deleteRow(index, rows) {
				// console.log(rows);   整个调度表是个数组rows
				// console.log(index);  当前元素在rows中的index
				//取到当前删除的对象
				console.log('当前元素是', rows[index]);


				//为什么这个打印出是undefined 因为prop没有定义成select
				console.log('当前元素的select值为',rows[index].select);

				//在删除之前先将病人表中按钮恢复蓝色

                //这个循环复杂度太高了 待完善。因为直接更改rows[index].select无效
                for(var i = 0; i < this.PrepareSendList.length; i++){
					if(this.PrepareSendList[i].PatientId == rows[index].PatientId){
						this.PrepareSendList[i].select = false;
					}
				};


				// rows[index].select = false; 无效
                console.log('点击删除后当前元素是', rows[index]);
				console.log('点击删除键之后当前元素的select值为',rows[index].select);
          		rows.splice(index, 1);
				console.log("删除按钮触发");			  
				console.log('上面这个是rows的内容');
				
			
     		},

			reload() {
				this.isRouterAlive = false
				this.$nextTick(function(){

					this.isRouterAlive = true
					//console.log('reload')
				})
			},

			//经典函数 批量修改单元格样式 ：根据列为“状态跟踪”显示字体红色
			     //例： 第三行：rowIndex == 2   第三列：columnIndex == 2
			 cellStyle(row,column,rowIndex,columnIndex){
        		// console.log(row);
        		// console.log(row.column);
				let style = {};
        		if(row.column.label==="状态跟踪"){
					style = {
						color: 	'#DC143C',            //字体颜色
						padding: 0,
						backgroundColor: '#c6e2ff',   //背景颜色
						textAlign:'center',           //居中
						fontSize:'16px',
					};
        		}else{
					style = {
						color: '#303133',
						padding:0,
						backgroundColor: '#c6e2ff',	
						textAlign:'center',
						fontSize:'16px',
					};
				}
				return style;
      		},

			//经典函数2 根据行中出现文本为“紧急配血”字体红色
			    //例： 第三行：rowIndex == 2   第三列：columnIndex == 2

			//   第一个row表示整个表格
			 cellStyle2(row,column,rowIndex,columnIndex){
				//debugger
        		// console.log(row);
        		// console.log(row.column);
				let style = {};

				// 找不到文本返回-1
				// if(columnIndex === 1){
					
				if( row.row.title.indexOf("紧急配血") != -1){ 
					style = {
					color: 	'#DC143C',              //字体红色
					fontSize:'18px',
					fontWeight: '700',
					// padding: 0,
					// backgroundColor: '#c6e2ff',  //背景颜色
					// textAlign:'center',          //居中		
					};
				}else{
					style = {
						color: 	'#a3a5bc',         //字体灰白色
						fontSize:'18px',
						fontWeight: '700',
				    }
				}
        		
				return style;
      		},


			getTime() {
				setInterval(() => {
					//new Date() new一个data对象，当前日期和时间
					// //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
					// this.msg3 = new Date(parseInt(time) * 1000).toLocaleString('chinese', { hour12: false }).replace(/:d{1,2}$/, ' ');

					this.msg3 = new Date().toLocaleString('chinese', {
						hour12: false
					});
					// this.msg4 = this.caltime(s1, this.msg2)
					var a = new Date(this.msg3.replace(/-/g, "/"));
					var b = new Date(this.msg2.replace(/-/g, "/"));
					this.caltime(a, b)
				}, 1000)
			},
			caltime(a, b) {
				var date3 = a - b; //时间差的毫秒数     
				//计算出相差天数
				var days = Math.floor(date3 / (24 * 3600 * 1000))
				//计算出小时数
				var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				var hours = Math.floor(leave1 / (3600 * 1000))
				//计算相差分钟数
				var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				var minutes = Math.floor(leave2 / (60 * 1000))
				//计算相差秒数
				var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
				var seconds = Math.round(leave3 / 1000)
				this.msg4 = days + " 天 " + hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒"
			},
			changecomVisible(val) {
				console.log(val)

				this.showtype = 'overall'
				// this.overallVisiable = val
			},
			getAllStatusCount() {
				axios.get('/getAllStatusCount', {}).then((response) => {
					// console.log(response.data.results)
					var nn = response.data.results
					this.num1 = nn.chuzhiwancheng
					this.num2 = nn.chuzhizhong
					this.num3 = nn.daihousong
					this.num4 = nn.housongzhong
					this.num5 = nn.yichuyuan
					this.num6 = nn.yiruyuan
				}).catch(function(error) {
					console.log("error", error);
				})
			},
			loadmap() {
				const map = new AMap.Map('amap1', {
					zoom: 9
				});
			},

			handleClick(row) {

				console.log('这是一键通知的row')
        		console.log(row);

                //做一个类型转换：下面接口里面的输入三个字段的第一个PatientId的类型必须为 number 而不是String
				var newNum = parseInt(row.PatientId);
				console.log(newNum);
				console.log(typeof(row.PatientId));
				console.log(typeof(newNum));

				axios.post('/confirmCar', {

						// console.log('发起第二次查询请求'),

						"PatientId": newNum,
						"CarGroup": row.CarGroup,
						"HosGroup": row.HosGroup,

				}).then((response) => {
					    var nn = response.data.results
						console.log(nn)

				}).catch(function(error){
						console.log("error",error);
				})
				
      		},
			// -------------------------------很经典--------------这是点击A表的一行，将该行添加到B表的功能------------------------------------------
			  
			// 备注：如果要有下表删掉功能，参数里再加index 写法handleClickAdd(row,index){
			    // 函数使用参见el官方el-table中的handleClick，输入参数row表示所点击行对应的对象,即一组数据,
				// 列数如何对齐：不用index，如果原表栏有缺失列，则设成blank空字符串代替,
			handleClickAdd(row){
				console.log(row);
                var x = {

					Num: row.Num,
					Condition: row.Condition,
					blank:'',
					blank:'',
					blank:'',
					blank:'',
					blank:'',

				}
				// 从下面的表中取一行推到上面的表
				this.tableData2.push(x);

				// 点击后将原表的该行删掉 已起效 
				// this.PatientList.splice(index,1);
			},
        
          
           //重点提示里面筛选出配血消息的筛选函数。
		   getMsgList(){
				this.msglist = this.tablemsg.filter(item => {

					if(item.title.includes( "紧急配血") == true){
							console.log('TESTTEST', item)

							// console.log(item)
							this.msglist.push(item)

							// return一定要加 不然不会显示
							return item
					}
				})
				
				// console.log里面也必须加this
				console.log(this.msglist)
			},

			//获取消息详情 是后端传来的 暂时注释掉
			// getmsg() {
			// 	axios.get('/getAllMessage', {}).then((response) => {
			// 		// console.log(response.data.results)
			// 		//获取消息一次
			// 		var cashdata = response.data.results
			// 		var data1 = []
			// 		for (var i = 0; i < cashdata.length; i++) {
			// 			var a = cashdata[i].MessageTitle
			// 			var b = cashdata[i].MessageDetail
			// 			var c = b.split(/[\r\n]/)         //去除分隔号 
			// 			var d = c.filter(i => i)          //去除为空的项
			// 			data1.push({
			// 				'title': a,
			// 				'detail': d
			// 			})
			// 		}
			// 		this.tablemsg = data1
			// 	}).catch(function(error) {
			// 		console.log("error", error);
			// 	})
			// },


			// 获取消息详情 是后端传来的 暂时注释掉
			getmsg() {
				axios.get('/getAllMessage', {}).then((response) => {
					// console.log(response.data.results)
					//获取消息一次
					var cashdata = response.data.results
					var data1 = []
					var data2 = []
					var data3 = []

					data1 = cashdata.输血
					data2 = cashdata.转运
					data3 = cashdata.预警

					for (var i = 0; i < data1.length; i++) {
						var a = data1[i].MessageTitle
						var b = data1[i].MessageDetail
						var c = b.split(/[\r\n]/)         //去除分隔号 
						var d = c.filter(i => i)          //去除为空的项

						data1[i] = {
							'title': a,
							'detail': d
						}
					}

					for (var i = 0; i < data2.length; i++) {
						var a = data2[i].MessageTitle
						var b = data2[i].MessageDetail
						var c = b.split(/[\r\n]/)         //去除分隔号 
						var d = c.filter(i => i)          //去除为空的项

						data2[i] = {
							'title': a,
							'detail': d
						}
					}

					for (var i = 0; i < data3.length; i++) {
						var a = data3[i].MessageTitle
						var b = data3[i].MessageDetail
						var c = b.split(/[\r\n]/)         //去除分隔号 
						var d = c.filter(i => i)          //去除为空的项

						data3[i] = {
							'title': a,
							'detail': d
						}
					}


					

					// for (var i = 0; i < cashdata.length; i++) {
						
					// 	var a = cashdata[i].MessageTitle
					// 	var b = cashdata[i].MessageDetail
					// 	var c = b.split(/[\r\n]/)         //去除分隔号 
					// 	var d = c.filter(i => i)          //去除为空的项

					// 	if(cashdata[i].MessageType == "输血"){
					// 		this.msgCard = "msgFirst"
					// 		data1.push({
					// 		'title': a,
					// 		'detail': d
					// 	   })
					// 	}
					// 	else if(cashdata[i].MessageType == "转运"){
					// 		this.msgCard = "msgSecond"
					// 		data2.push({
					// 		'title': a,
					// 		'detail': d
					// 	})
					// 	}else if(cashdata[i].MessageType == "预警"){
					// 		 this.msgCard = "msgThird"
					// 		data3.push({
					// 		'title': a,
					// 		'detail': d
					// 	})
					// 	}
						
					// }
					this.bloodMsg = data1
					this.transMsg = data2
					this.alertMsg = data3

				}).catch(function(error) {
					console.log("error", error);
				})
			},

			switch(data){

				if(data.MessageType == "输血"){
						console.log('我现在切换到输血需求啦')
						
					    this.msgCard = "msgFirst"

					 //    var a = data.MessageTitle
						// var b = data.MessageDetail
						// var c = b.split(/[\r\n]/)         //去除分隔号 
						// var d = c.filter(i => i)          //去除为空的项
						
					 //    this.bloodMsg.push({
						//     'title': a,
						// 	'detail': d		
					 //    })
						
				}else if(data.MessageType == "转运"){
					console.log('我现在切换到转运消息啦')

					this.msgCard = "msgSecond"
					//     var a = data.MessageTitle
					// 	var b = data.MessageDetail
					// 	var c = b.split(/[\r\n]/)         //去除分隔号 
					// 	var d = c.filter(i => i)          //去除为空的项
						
					//     this.transMsg.push({
					// 	    'title' : a,
					// 		'detail': d
						
					//     })
					

				}else if(data.MessageType == "预警"){
						console.log('我现在切换到动态预警啦')

					    this.msgCard = "msgThird"
						
					 //    var a = data.MessageTitle
						// var b = data.MessageDetail
						// var c = b.split(/[\r\n]/)         //去除分隔号 
						// var d = c.filter(i => i)          //去除为空的项
						
					 //    this.bloodMsg.push({
						//     'title': a,
						// 	'detail': d
						
					 //    })
						// console.log(this.bloodMsg)
						// console.log('222222222222222222')
					
				}

			},

			getChange(val) {
				//this.overallVisiable = false
				console.log(val)
				this.openmsg = val
				// console.log(this.openmsg)
				this.showtype = 'component'
				if (val.A) {

					this.chartVue = Ass
					this.eid = val.A

				}
				//测试Hos
				else if (val.H) {

					this.chartVue = Hos
					this.eid = val.H

				} else {

					this.chartVue = Car
					this.eid = val.C
				}

			},
			generate() {
				this.loading = true

				setTimeout(() => {
					this.loading = false;
					this.$refs.myChild.generateRecommend()
				}, 2000);

			},
			//无人机配血下达指令函数
			sendBlood(){
				console.log("surprise!!无人机送血配置下达指令成功")
			},

			cancel() {
				this.$refs.myChild.cancelFlash()
			},
			openass() {
				this.showtype = 'grouplist'
				this.grouptype = 'ass'
			},
			chooseass(LocationNo) {

				this.getChange({
					'A': LocationNo
				})
			},
			opencar() {
				this.showtype = 'grouplist'
				this.grouptype = 'car'
			},
			choosecar(CarNo) {

				this.getChange({
					'C': CarNo
				})


			},

			openhos() {
				this.showtype = 'grouplist'
				this.grouptype = 'hos'
			},
			choosehos(OrganizationCode) {
				this.getChange({
					'H': OrganizationCode
				})
			},

			specialist() {
				this.showtype = 'grouplist'
				this.grouptype = 'expert'
			},

			getcarlist() {
				axios.get('/getCarList', {})
					.then((response) => {
						var tempdata = response.data.results
						this.carlist = tempdata.filter(item => {
							if (item.Longitude != null && item.Latitude != null) {
								if (item.CarStatus == 0) {
									item.CarStatus = '空闲'
								} else {
									item.CarStatus = '忙碌'
								}			
								return item
							}
						})
						console.log(this.carlist)

					}).catch(function(error) {
						console.log("error", error);
					})
			},

			gethoslist() {
				axios.get('/getHosList', {})
					.then((response) => {
						this.hoslist = response.data.results
						console.log(this.hoslist, 'hos')
					}).catch(function(error) {
						console.log("error", error);
					})
			},

			getasslist() {
				axios.get('/getAssemblyList', {})
					.then((response) => {
						this.asslist = response.data.results

					}).catch(function(error) {
						console.log("error", error);
					})
			},

			getexpertlist() {
				axios.get('/getExpertList', {})
					.then((response) => {
						this.expertlist = response.data.results
						console.log(this.expertlist, 'expertlist')
					}).catch(function(error) {
						console.log("error", error);
					})
			},
			sendcall(val) {
				axios.post('/pushVideoLeader', {
						"GN": val
					})
					.then((response) => {
						setTimeout(this.$message('已发送邀请'),500000)

					}).catch(function(error) {
						console.log("error", error);
					})

			},
			rowClick(row, column, event) {
				console.log(row.PatientId, 'rowClick')
				//恢复病历初始值
				this.getPatientInfo(row.PatientId)
				this.getPatientRecord(row.PatientId)
				this.showPatinfo = true
			},
			initialvalue() {

				this.PatientId = ''
				this.selected = '病史'
				this.content = ''
				this.guominshi = {
					content: '',
					timevalue: ''
				}
				this.jibingshi = {
					content: '',
					timevalue: ''
				}
				this.curdrugused = {
					timevalue: '',
					content: '',
				}
				this.zhusu = {
					content: '',
					timevalue: ''
				}
				this.xianbingshi = {
					content: '',
					timevalue: ''
				}
				this.timevalue2 = ''
				this.zhusuphoto = {
						time: ''
				},

				this.zhusuphotos = []
				this.体征 = '请选择体征'
				this.现病史图片 = []
				this.既往史图片 = []
				this.初步诊断 = ''
				this.dataTZ = []
				this.dataCZ = []
				this.patientrecord = []
			},
			getReportedPatientList() {
				// console.log('发起一次获取列表请求')
				axios.get('/getReportedPatientList', {}).then((response) => {

					//获取消息一次
					var nn = response.data.results
					const MapTable = new Map([
						[1, '男'],
						[2, '女'],
						[0, '不明']
					])

					this.ReportedPatientList = nn.map(item => {
						item.Gender = MapTable.get(item.Gender)
						return item
					})
				}).catch(function(error) {
					console.log("error", error);
				})
			},

           //后送状态跟踪
			getPatientStatusLog() {
				// console.log('发起一次获取列表请求')
				axios.post('/getPatientStatusLog', {}).then((response) => {

					//获取消息一次					
					var array = response.data.results
					var str = ''
					var time = ''
					var t1 = ''
					var t2 = ''
					var t3 = ''
					for(var i = 0; i < array.length; i++){
						// 将逗号替换成大于号
						str = array[i].StatusDescription
						str = str.replace(/,/g, ">")
						array[i].StatusDescription = str

						// 将更新时间 字符串 提取和拼接成新的字符串
						time = array[i].LatestTime
						time = time.replace(/-/g, "/")
						t1 = time.substring(2, 10)
						t2 = '   '
						t3 = time.substring(11, 16)
						
						array[i].LatestTime = t1.concat(t2, t3)

					}
					this.PatientStatus = array
					
				}).catch(function(error) {
					console.log("error", error);
				})
			},

			//后送病人列表
			getPrepareSendList() {
				axios.get('/getPrepareSendList', {}).then((response) => {
					var array = response.data.results
					var time = ''
					var t1 = ''
					var t2 = ''
					var t3 = ''

					for(var i = 0; i < array.length; i++){
	
						//将更新时间 字符串 提取和拼接成新的字符串
						time = array[i].CreateTime
						time = time.replace(/-/g, "/")
						t1 = time.substring(2, 10)
						t2 = '   '
						t3 = time.substring(11, 16)

                        // 使每个对象都能够被选，设为false是可选，设为true是不可选
						array[i].select = false			
						array[i].CreateTime = t1.concat(t2, t3)

					}
					this.PrepareSendList = array
					this.tableData2 = []
					this.tableData2 = this.PrepareSendList
					
				}).catch(function(error) {
					console.log("error", error);
				})
			},

			//所有上报病人列表
			getAllReportedList() {
				// console.log('发起一次获取列表请求')
				axios.get('/getAllReportedList', {}).then((response) => {

					//获取消息一次
					//获取消息一次
					var array = response.data.results

					var time = ''
					var t1 = ''
					var t2 = ''
					var t3 = ''

					for(var i = 0; i < array.length; i++){
	
						// 将更新时间 字符串 提取和拼接成新的字符串
						time = array[i].CreateTime
						time = time.replace(/-/g, "/")
						t1 = time.substring(2, 10)
						t2 = '   '
						t3 = time.substring(11, 16)						
						array[i].CreateTime = t1.concat(t2, t3)

					}

					this.AllReportedList = array
										
				}).catch(function(error) {
					console.log("error", error);
				})
			},


			getPatientInfo(a) {
				axios.post('/getPatientInfo', {
						"patientId": a
					})
					.then((response) => {
						// console.log(response.data.results[0])
						// const MapTable = new Map([[1, '男'], [2, '女'], [0, '不明']])
						var dd = response.data.results[0];
						// dd.Gender = MapTable.get(dd.Gender)

						// console.log(dd.age+"这是我设置的");
						this.perinfo = dd
						// console.log(this.perinfo)

					}).catch(function(error) {
						console.log("error", error);
					})
			},
			getPatientRecord(ss) {
				//每次获取病历前先清空病历初始值
				this.initialvalue()
				axios.post('/getPatientRecord', {
					patientId: ss
				}).then((response) => {
					this.patientrecord = response.data.results
					//主诉
					// this.zhusu = this.patientrecord.P01;
					if (this.patientrecord.P01.length > 0) {
						this.zhusuphotos = []
						for (var i = 0; i < this.patientrecord.P01.length; i++) {
							if (this.patientrecord.P01[i].InfoType == 3) {
								var fileUrl = this.patientrecord.P01[i].FileUrl
								var time = this.patientrecord.P01[i].OperationTime
								// this.zhusuphoto.fileUrl = global.photoUrl + fileUrl
								this.zhusuphoto.time = time
								// this.zhusuphoto.unshift({
								//   fileUrl: global.photoUrl + fileUrl,
								//   time: time
								// })
								this.zhusuphotos.push(global.photoUrl + fileUrl)
							}
						}

						for (var k = 0; k < this.patientrecord.P01.length; k++) {
							if (this.patientrecord.P01[k].InfoType == 1) {
								this.zhusu.content = this.patientrecord.P01[k].Detail;
								this.zhusu.timevalue = this.patientrecord.P01[k].OperationTime;
								break;
							}
						}
					} else {
						this.zhusu.content = '暂无';
						this.zhusu.timevalue = '';
					}
					//现病史
					if (this.patientrecord.P02.length > 0) {
						for (var i = 0; i < this.patientrecord.P02.length; i++) {
							if (this.patientrecord.P02[i].InfoType == 3) {
								var fileUrl = this.patientrecord.P02[i].FileUrl
								var time = this.patientrecord.P02[i].OperationTime
								this.现病史图片.unshift({
									fileUrl: global.photoUrl + fileUrl,
									time: time
								})
							}
						}
						console.log(this.现病史图片)
						for (var k = 0; k < this.patientrecord.P02.length; k++) {
							if (this.patientrecord.P02[k].InfoType == 1) {
								this.xianbingshi.content = this.patientrecord.P02[k].Detail;
								this.xianbingshi.timevalue = this.patientrecord.P02[k].OperationTime;
								break;
							}
						}
					} else {
						this.xianbingshi.content = '暂无';
						this.xianbingshi.timevalue = '';
					}
					//体征
					this.dataTZ = this.patientrecord.P03

					//既往史
					for (var i = 0; i < this.patientrecord.P04.length; i++) {
						if (this.patientrecord.P04[i].OperationCode == "P041") {
							this.guominshi.content = this.patientrecord.P04[i].Detail
							this.guominshi.timevalue = this.patientrecord.P04[i].OperationTime;
							break;
						}
					}
					for (var k = 0; k < this.patientrecord.P04.length; k++) {
						if (this.patientrecord.P04[k].OperationCode == "P042") {
							this.jibingshi.content = this.patientrecord.P04[k].Detail
							this.jibingshi.timevalue = this.patientrecord.P04[k].OperationTime;
							break;
						}
					}
					// console.log(this.patientrecord.P04[k], 'P04指标')
					for (var j = 0; j < this.patientrecord.P04.length; j++) {
						if (this.patientrecord.P04[j].OperationCode == "P043") {
							this.curdrugused.content = this.patientrecord.P04[j].Detail
							this.curdrugused.timevalue = this.patientrecord.P04[j].OperationTime;
							break;
						}
					}
					for (var j = 0; j < this.patientrecord.P04.length; j++) {
						if (this.patientrecord.P04[j].OperationCode == "P040") {

									var fileUrl = this.patientrecord.P04[j].FileUrl
									var time = this.patientrecord.P04[j].OperationTime
									this.既往史图片.unshift({
										fileUrl: global.photoUrl + fileUrl,
										time: time
									})
						}
					}
					//初步诊断
					if (this.patientrecord.P05.length > 0) {
						this.初步诊断 = this.patientrecord.P05[0].Detail
						this.timevalue2 = this.patientrecord.P05[0].OperationTime
					} else {
						this.初步诊断 = ''
						this.timevalue2 = ''
					}
					//处置方案
					this.dataCZ = this.patientrecord.P11
					for (var j = 0; j < this.patientrecord.P11.length; j++) {
						if (this.patientrecord.P11[j].InfoType == 3) {
							var fileUrl = this.patientrecord.P11[j].FileUrl
							this.dataCZ[j].FileUrl = global.photoUrl + fileUrl
						}
					}
					// console.log(this.dataCZ, '既往处置')
					//医嘱
					if (this.patientrecord.P06.length > 0) {
						this.doctortell = this.patientrecord.P06[0].Detail
					} else {
						this.doctortell = ''
					}
				})
			},
			getMemberInfo(memberId) {
				//确定 取消是否要查看真名
				this.toolipVisible = false
				axios.post('/getMemberInfo', {
						"memberId": memberId
					})
					.then((response) => {

						var cc = response.data.results[0]
						this.perinfo.Name = cc.Name

					}).catch(function(error) {
						console.log("error", error);
					})
			},
			refresh(PatientId) {
				console.log('refresh')
				this.getPatientInfo(PatientId)
				this.getPatientRecord(PatientId)
			},

			// 后送病人列表 和 上报病人列表 两个表头点击之后切换
			click1() {
				this.card = "first"
				console.log('后送病人列表')
			},
			click2() {
				this.card = "second"
				console.log('上报病人列表')
			},

			// 重点提示三个表头点击之后切换
			msgclick1() {
				this.msgCard = "msgFirst"
				console.log('输血需求')
			},
			msgclick2() {
				this.msgCard = "msgSecond"
				console.log('转运消息')
			},
			msgclick3() {
				this.msgCard = "msgThird"
				console.log('动态预警')
			},


			shake(ele, cls, times) { //边框闪烁   
				//ele要闪动的元素 cls闪动的类 times 闪动几次  
				var i = 0,
					t = false,
					o = ele.attr("class") + " ",
					c = "",
					times = times || 2;
				if (t) return;
				t = setInterval(function() {
					i++;
					c = i % 2 ? o + cls : o;
					ele.attr("class", c);
					if (i == 2 * times) {
						clearInterval(t);
						ele.removeClass(cls);
					}
				}, 200);
			},

			handleClose(done) {
				done();
			},

			ptoe(index) {
				axios.post('/newExpertPatient', {
						"patientId": this.perinfo.PatientId,
						"expertId": this.expertlist[index].PersonnelID
					})
					.then(response => {
						// this.$message('推送成功')
						console.log(response.data)

					})
					.catch(function(error) {
						console.log("error", error);
					});
			},


			//应急预案查询对话框中 按类型分级 共12个按钮函数 触发已完成
			progressBar1(){
				
				    // 先弹出当前对话框
				    this.dialogDetailVisible1 = true

					// 让前一步的对话框消失
					this.dialogVisible = false
					console.log(this.dialogDetailVisible1)
					console.log('发起一次应急预案查询请求')

                    if(this.checkList1.length < 6){

						// axios.post('/oneClickEmergPlan',{}).then((response) => {
						axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求'),
							"type": "聚集踩踏",
							"classification": "一级"
							
						}).catch(function(error){

							console.log("error",error);
						})

					}
					

		    },

			progressBar2(){

				    // 先弹出当前对话框
				    this.dialogDetailVisible2 = true

					// 让前一步的对话框消失
					this.dialogVisible = false
					console.log(this.dialogDetailVisible2)
					console.log('发起一次应急预案查询请求')

					if(this.checkList2.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "聚集踩踏",
						"classification": "二级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}

		    },

			progressBar3(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible3 = true

					// 让前一步的对话框消失
					this.dialogVisible = false
					console.log(this.dialogDetailVisible3)
					console.log('发起一次应急预案查询请求')

                    if(this.checkList3.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "聚集踩踏",
						"classification": "三级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}

		    },

			progressBar4(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible4 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible4)

					console.log('发起一次应急预案查询请求')

                    
					 if(this.checkList4.length < 6){

							// axios.post('/oneClickEmergPlan',{}).then((response) => {
							axios.post('/oneClickEmergPlan', {

								// console.log('发起第二次查询请求')
								"type": "食物中毒",
								"classification": "一级"
								
							}).catch(function(error){
								console.log("error",error);
							})
					}

		    },

			progressBar5(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible5 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible5)

					console.log('发起一次应急预案查询请求')
					if(this.checkList5.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "食物中毒",
						"classification": "二级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}
		    },

			progressBar6(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible6 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible6)

					console.log('发起一次应急预案查询请求')

					if(this.checkList6.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "食物中毒",
						"classification": "三级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}

		    },

			progressBar7(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible7 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible7)

					console.log('发起一次应急预案查询请求')

					if(this.checkList7.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "恐怖袭击/爆炸/交通事故",
						"classification": "一级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}

		    },

			progressBar8(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible8 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible8)

					console.log('发起一次应急预案查询请求')

				if(this.checkList8.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "恐怖袭击/爆炸/交通事故",
						"classification": "二级"
						
					}).catch(function(error){
						console.log("error",error);
					})
				}

		    },
			progressBar9(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible9 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible9)

					console.log('发起一次应急预案查询请求')

					if(this.checkList9.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "恐怖袭击/爆炸/交通事故",
						"classification": "三级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}

		    },

			progressBar10(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible10 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible10)

					console.log('发起一次应急预案查询请求')
					if(this.checkList10.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "新冠疫情防控",
						"classification": "一级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}
		    },

			progressBar11(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible11 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible11)

					console.log('发起一次应急预案查询请求')

					if(this.checkList11.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "新冠疫情防控",
						"classification": "二级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}

		    },
			progressBar12(){
				    // 先弹出当前对话框
				    this.dialogDetailVisible12 = true

					// 让前一步的对话框消失
					this.dialogVisible = false

					console.log(this.dialogDetailVisible12)

					console.log('发起一次应急预案查询请求')
                    if(this.checkList12.length < 6){
					// axios.post('/oneClickEmergPlan',{}).then((response) => {
					axios.post('/oneClickEmergPlan', {

						// console.log('发起第二次查询请求')
						"type": "新冠疫情防控",
						"classification": "三级"
						
					}).catch(function(error){
						console.log("error",error);
					})
					}

		    },
		}
	}
</script>
<style>
   
   /* 需要我为你做什么的对话框 */
   .app {
    	border-radius: 10px 35px 10px;
   		background: #6de4ec;
    	padding: 20px; 
		margin-left: 80px;
    	width: 350px;
    	height: 75px; 
		font-size: 30px;
		font-weight: 700;
		color:rgb(24, 18, 100);
  }

   /* siri图标 */
   .siriSet{
	 width: 30px;
	 height: 30px;
   }
    /* 包裹语音iconfont和地图的外层div */
    .wrapper{
	  position: relative;
    }

	/* 原map宽度的尺寸设定方式 后被格神取消 */
    /* .mapbox{
	   width:55%;
	   
	}  */

    .iconfont{
		position: absolute;
		/* put 语音图标 覆盖 mapbox */
  		z-index: 3; 
  		background: rgb(239, 243, 243);
  		width: 45px;
		/* 语音图标距离外层wrapper左边缘1%，上边缘90% 如果设置成px也可以，就是不会随着浏览器窗口缩小而改变位置了 */
  		left: 1%;
  		top: 90%;
	}

/* ------搜索框样式设置--------- */
  /* border是设置边框 */
.search {
  width: 568px;
  height: 28px;
  border: 1px solid #ccc; 
  background-color: #f2f2f5;
  margin: 10px 0;
}
.search_input {
  width: 520px;
  float: left;
  height: 28px;
  line-height: 28px \9;
  padding: 0 8px;
}
.search_btn {
  width: 18px;
  height: 26px;
  background-color: #f2f2f5;
  float: right;
  margin-right: 10px;
}

/* 第二种搜索框 */
.box{
    margin: 0 auto;
    padding-top: 80px;
    height: 50px;
    width: 100%;
  }
  .searchBox{
    margin: 0 auto;
    width: 60%;
    position: relative;
	margin-left: 10px;
  }
  .searchInput{
    display: inline-block;
    width: 85%;
    height: 38px;
    border: 1px solid #cccccc;
    float: left;
    box-sizing: border-box;
    -moz-box-sizing:border-box; /* Firefox */
    -webkit-box-sizing:border-box; /* Safari */
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
  }
  .searchButton{
    display: inline-block;
    width: 15%;
    height: 38px;
    line-height: 40px;
    float: left;
    background-color: #00a0e9;
    font-size: 16px;
    cursor: pointer;
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
    border: none;
    color: #fff;
  }
 


	/* 地图边框 */
	.el-col-17 {
		background: url(../assets/bg-map.png) no-repeat left top;
		background-size: 100% 100%;
		padding-top: 10px;
		padding-left: 6px;
		padding-right: 4px;
		padding-bottom: 4px;
	}

	.el-col-6 {
		margin-left: 20px;
	}

	/* 右侧标题 */
	.picture_header {
		width: 100%;
		height: 45px;
		background-color: transparent !important;
		background: url(../assets/bg-title.png) no-repeat left top;
		background-size: 100% 100%;
		font-size: 16px;
		color: white;
		padding: 5px 20px;
		box-sizing: border-box;
		text-align:left;
	}

	.picture_header img {
		margin-right: 10px;
	}

	/* 消息列表 */
	.el-table {
		color: #a3a5bc
	}

	.picture_body22 {
		/* border: 1px solid #808288; */
		text-align: left;
		color: whitesmoke;
		height: 90px;
		width: 100%;
	}

	.el-table th,
	.el-table tr:nth-of-type(odd) {
		background-color: #0b1865;
	}

	.el-table th,
	.el-table tr:nth-of-type(even) {
		background-color: #172d80;
	}

	.el-table td,
	.el-table th.is-leaf {
		border-bottom: 0;
	}
tr.el-table__row td .cell{
	text-overflow: ellipsis;
	white-space: nowrap;
}
	tr.el-table__row:nth-of-type(odd):hover td {
		background-color: #0b1865 !important;
	}

	tr.el-table__row:nth-of-type(even):hover td {
		background-color: #172d80 !important;
	}

	tr.el-table__row:hover td {
		color: #ccc;
		cursor: pointer;
	}

	.el-table--border::after,
	.el-table--group::after,
	.el-table::before {
		background-color: transparent;
	}

	/* 按钮组 */
	.groupbox-boarder {
		/* border: 1px solid #ccc; */
		box-shadow: 0px 0px 0px 0px #000;
		background-color: #050e3a;
		margin-top: 20px;
		margin-bottom: 30px;
		margin-left: 10px;
	    
	}

	.groupbox-boarder .el-button {
		background: url(../assets/bg-btn.png) no-repeat center;
		background-size: 100% 100%;
		width: 187px;
		height: 30px;
		border: 0;
		font-size: 20px !important;
		font-weight: 700;
		color: #a8dcf7;
		
	}

	.groupbox-boarder .el-row {
		padding: 0 !important;
			
	}

	.groupbox-boarder .el-button:focus,
	.groupbox-boarder .el-button:hover {
		filter: blur(0px) !important;
		background-color: transparent !important;
		box-shadow: none !important;
		border: 0 !important;
		width: 182px !important;
		height: 39px !important;
		background-color: transparent;
		background: url(../assets/bg-btn-active.png) no-repeat top left;
		background-size: 182px 39px;
		color: #00e4ff;
	}

	/* =============================按钮组2被注释掉了暂时用不上================================*/
	.groupbox-boarder2 {
		margin-bottom: 15px;
		/* border: 1px solid #ccc; */
		box-shadow: 0px 0px 0px 0px #000;
		background-color: #050e3a;
	}

	.groupbox-boarder2 .el-button {
		background: url(../assets/bg-btn2.png) no-repeat center;
		background-size: 100% 100%;
		width: 85px;
		height: 30px;
		border: 0;
		font-size: 14px !important;
		color: #007ac3;
	}

	.groupbox-boarder2 .el-row {
		padding: 0 !important;
	}

	.groupbox-boarder2 .el-button:focus,
	.groupbox-boarder .el-button:hover {
		background-color: transparent;
		background: url(../assets/bg-btn2-active.png) no-repeat center;
		background-size: 100% 100%;
		color: #00aec2;
	}

	.groupbox-boarder .el-button+.el-button,
	.groupbox-boarder2 .el-button+.el-button {
		margin-left: 20px;
	}

	.one-of-groupbox-boarder {
		padding: 0 10px;
		text-align: left;
		font-size: 14px;
	}
	

	/* .demo-table .el-table th,
.demo-table .el-table tr {
  background-color: #c6e2ff;
} */
	/* .demo-table .el-table,
.demo-table .el-table__expanded-cell {
  background-color: #d9ecff;
} */
	/* .demo-table .el-table--enable-row-hover .el-table__body tr:hover > td {
  opacity: .8;
} */
	.text-group {

		padding: 5px;
		color: white;
		font-size:20px;
		color:#f2f4f7;
		font-weight: 700;
	}

    .el-title .el-dialog__title{

		color: #f1ecec!important;
    }
	.picture_bodyy {

		padding: 10px;
		background-color: #050e3a;
		/* border: 1px solid #808288; */

		text-align: left;
		color: whitesmoke;
		max-height: 510px;
		overflow: auto;
	}

	.picture_bodyy>div {

		width: 100%;
		height: 100%;
		background: url(../assets/bg-1.png) no-repeat top center;
		background-size: 100% 100%;
		margin-bottom: 10px;
		padding:10px;
		font-size:14px;
		color:#a3a5bc;
	}

	.picture_bodyy>div:before .red {
		border: 4px solid #d00;
	}

	.text-title {
		font-size: 18px;
		font-weight: bold;
	}

	.text-time {
		font-size: 14px Small;
		color: gray;
		padding: 10px;
	}

	.text-content {
		font-size: 16px;
		margin: 0px 10px;
	}

	.text-no {
		font-size: 16px;

		margin: 10px;
	}

	.card-title {
		display: block;
		font-size: 18px;
		font-weight: bold;
		color:#0074ff;
		margin-bottom:10px;
	}

			/* .demo-table1 .el-table th,
		.demo-table1 .el-table tr {
		background-color: #c6e2ff;
		} */
			/* .demo-table1 .el-table,
		.demo-table1 .el-table__expanded-cell {
		background-color: #adcbe9;
		}
		.demo-table1 .el-table--enable-row-hover .el-table__body tr:hover > td {
		background-color: #a0cfff;
		} */

.mint-badge{
	background-color: #03386c !important;
	border:1px solid #027da9;
	font-size:14px;
	color:#00deff;
	margin-bottom:10px;
}
.picture_bodyy .el-divider{
	background-color:#344572;
}
.patientbox .has-gutter th{
	background-color: transparent !important;
	font-weight: 700;
	font-size:14px;
	color:#00deff !important;
	height: 38px;
}
.patientbox .el-table__row td{
	background-color: transparent !important;
	height: 38px;
	color:#a3a5bc !important;
	text-align: center;
	font-size:14px !important;
}
.patientbox .el-table__row:nth-of-type(odd){
	background-color: #172d80;
}
.patientbox .el-table__row:nth-of-type(even){
	background-color: #0b1865;
}
.patientbox .el-table__row:hover{
	opacity: .8;
}
.el-table__row:nth-of-type(odd)+tr>.el-table__expanded-cell{
	background-color:#172d80;
	color:#a3a5bc;
}
.el-table__row:nth-of-type(even)+tr>.el-table__expanded-cell{
	background-color:#0b1865;
	color:#a3a5bc;
}
.el-table__empty-block{
	background-color:#2036a5;
	color:#aaa;
}
.el-table__empty-block .el-table__empty-text{color:#ccc;}

/* 弹窗样式修改 */
.mydialog .el-dialog__title{
	color:#fff;
	font-weight: 700;
}
.mydialog .el-dialog{
	background:url(../assets/bg-3.png) no-repeat top left;
	background-size:100% 100%;
	width:874px;
	height: 750px;
	/* width:500px;
	height: 650px; */
}
.mydialog .el-dialog .el-dialog__headerbtn{
	top:30px;right:20px;
}
.mydialog .el-button{border-radius: 14px;border:1px solid #0084ff;background-color: transparent;
box-shadow: 0 0 15px 5px rgba(0,168,255,.5) inset;color:#359eff;font-size: 14px; margin-right:10px;}
.mydialog .el-button img{width:14px;margin-right:5px;}
.mydialog .el-button:hover{
	opacity: .8;
}

/* 应急预案弹窗内部小title的字体 text-new */
.mydialog .text-new{font-size:18px;color:#f2f4f7;font-weight: 700;}
.mydialog .text1-title{font-size:14px;color:#0074ff;font-weight: 700;}
.mydialog .el-row i{font-style:normal; font-size:14px;color:#a3a5bc;}
.mydialog .spanbox>span{width:20%; display: inline-block;height: 30px;}
.mydialog .mint-navbar{
	background-color:#0b1a7e !important;
	color:#00deff !important;
	font-weight: 700;
}
.mydialog .mint-navbar .mint-tab-item.is-selected{
	background-color:#0e2da0 !important;
	margin-bottom:0;
	border-width: 1Px;
}
.mydialog .scroll>div>div{
	color:#a3a5bc;
	font-size:14px;
	padding:15px 30px;
}
.mydialog .scroll>div>div:nth-of-type(odd){
	background-color:#2036a5;
}
.mydialog .scroll>div>div:nth-of-type(even){
	background-color:#0d1c8c;
}
.mydialog .scroll .text1-title{font-size:14px;color:#fff;font-weight: 400;}
.mydialog .scroll .text1-time{font-size:14px;color:#ccc;font-weight: 400;}
.mydialog .scroll .text1-content{font-size:14px;color:#ccc;font-weight: 400;}
.mydialog .text-title2{
	display: block;
	padding:20px;
	font-size:16px;
	color:#fff;
}
.mydialog .text-title2 img{width:16px;height: 16px;margin-right:10px;}
.mydialog .has-gutter,.mydialog .has-gutter th{
	background-color:#0b1865 !important;
	color:#00deff !important;
}
.mydialog .el-table__row:nth-of-type(odd) td,.mydialog .el-table__row:nth-of-type(odd):hover td{
	background-color:#2036a5 !important;
	color:#fff !important;
}
.mydialog .el-table__row:nth-of-type(even) td,.mydialog .el-table__row:nth-of-type(even):hover td{
	background-color:#0d1c8c !important;
	color:#fff !important;
}
.mydialog .cell{
	text-align: center;
}
.mydialog .cell .el-button{
	color:#00a8ff !important;
	box-shadow: 0 0 15px 5px rgba(0,168,255,.5) inset;
	border:1px solid #0182fd !important;
}


/* =====================================   用于应急预案查询的小型弹窗 mydialog2 仅仅更改窗口宽高 */
.mydialog2 .el-dialog__title{
	color:#fff;
	font-weight: 700;
}
.mydialog2 .el-dialog{
	background:url(../assets/bg-3.png) no-repeat top left;
	background-size:100% 100%;
	/* width:874px;
	height: 750px; */
	width:500px;
	height: 650px;
}
.mydialog2 .el-dialog .el-dialog__headerbtn{
	top:30px;right:20px;
}
.mydialog2 .el-button{border-radius: 14px;border:1px solid #0084ff;background-color: transparent;
box-shadow: 0 0 15px 5px rgba(0,168,255,.5) inset;color:#359eff;font-size: 14px; margin-right:10px;}
.mydialog2 .el-button img{width:14px;margin-right:5px;}
.mydialog2 .el-button:hover{
	opacity: .8;
}

/* 应急预案弹窗内部小title的字体 text-new */
.mydialog2 .text-new{font-size:18px;color:#f2f4f7;font-weight: 700;}
.mydialog2 .text1-title{font-size:14px;color:#0074ff;font-weight: 700;}
.mydialog2 .el-row i{font-style:normal; font-size:14px;color:#a3a5bc;}
.mydialog2 .spanbox>span{width:20%; display: inline-block;height: 30px;}
.mydialog2 .mint-navbar{
	background-color:#0b1a7e !important;
	color:#00deff !important;
	font-weight: 700;
}
.mydialog2 .mint-navbar .mint-tab-item.is-selected{
	background-color:#0e2da0 !important;
	margin-bottom:0;
	border-width: 1Px;
}
.mydialog2 .scroll>div>div{
	color:#a3a5bc;
	font-size:14px;
	padding:15px 30px;
}
.mydialog2 .scroll>div>div:nth-of-type(odd){
	background-color:#2036a5;
}
.mydialog2 .scroll>div>div:nth-of-type(even){
	background-color:#0d1c8c;
}
.mydialog2 .scroll .text1-title{font-size:14px;color:#fff;font-weight: 400;}
.mydialog2 .scroll .text1-time{font-size:14px;color:#ccc;font-weight: 400;}
.mydialog2 .scroll .text1-content{font-size:14px;color:#ccc;font-weight: 400;}
.mydialog2 .text-title2{
	display: block;
	padding:20px;
	font-size:16px;
	color:#fff;
}
.mydialog2 .text-title2 img{width:16px;height: 16px;margin-right:10px;}
.mydialog2 .has-gutter,.mydialog2 .has-gutter th{
	background-color:#0b1865 !important;
	color:#00deff !important;
}
.mydialog2 .el-table__row:nth-of-type(odd) td,.mydialog2 .el-table__row:nth-of-type(odd):hover td{
	background-color:#2036a5 !important;
	color:#fff !important;
}
.mydialog2 .el-table__row:nth-of-type(even) td,.mydialog2 .el-table__row:nth-of-type(even):hover td{
	background-color:#0d1c8c !important;
	color:#fff !important;
}
.mydialog2 .cell{
	text-align: center;
}
.mydialog2 .cell .el-button{
	color:#00a8ff !important;
	box-shadow: 0 0 15px 5px rgba(0,168,255,.5) inset;
	border:1px solid #0182fd !important;
}
</style>
