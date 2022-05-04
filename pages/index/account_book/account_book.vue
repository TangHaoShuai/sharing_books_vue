<template>
	<view>
		<u-navbar leftText="返回" :title="'账本['+account_book.name+']报表'" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<view>
					<u-row gutter="5" justify="start">
						<u-col span="4" text-align="center" style="margin-top: 10rpx;">
							<view class="div_mzz"> 账本总收入 </view>
						</u-col>
						<u-col span="4" text-align="center" style="margin-top: 10rpx;">
							<view class="div_mzz"> 总结余 </view>
						</u-col>
						<u-col span="4" text-align="center" style="margin-top: 10rpx;">
							<view class="div_mzz"> 账本总支出 </view>
						</u-col>
					</u-row>
					<u-row gutter="5" justify="start">
						<u-col span="4" text-align="center" style="margin-top: 10rpx;">
							<view class="div_mzz"> {{account_book.income}}元 </view>
						</u-col>
						<u-col span="4" text-align="center" style="margin-top: 10rpx;">
							<view class="div_mzz"> {{account_book.surplus}}元 </view>
						</u-col>
						<u-col span="4" text-align="center" style="margin-top: 10rpx;">
							<view class="div_mzz"> {{account_book.expend}}元 </view>
						</u-col>
					</u-row>
				</view>
				<!-- beg折线图 -->
				<u-card :show-head="false">
					<view class="" slot="body">
						<view style="color: #000;font-weight: bold;">
							<p>收支折线图</p>
						</view>
						<view class="charts-box">
							<qiun-data-charts type="line" :opts="opts" :chartData="chartData" :ontouch="true" />
						</view>
						<view>
							<u-row>
								<u-col text-align="center">7天内收支情况</u-col>
							</u-row>
						</view>
					</view>
				</u-card>
				<!-- end折线图 -->

				<!-- beg 支出比例 饼图 -->
				<u-card :show-head="false">
					<view class="" slot="body">
						<view style="color: #000;font-weight: bold;">
							<p>支出比例</p>
						</view>
						<view class="charts-box">
							<qiun-data-charts type="pie" :chartData="expendPieChartData" />
						</view>
						<u-row>
							<u-col text-align="center">账本全部支出比例图</u-col>
						</u-row>
					</view>
				</u-card>
				<!-- end 支出比例 饼图 -->
				<!-- beg 收入比例 饼图 -->
				<u-card :show-head="false">
					<view class="" slot="body">
						<view style="color: #000;font-weight: bold;">
							<p>收入比例</p>
						</view>
						<view class="charts-box">
							<qiun-data-charts type="pie" :chartData="incomePieChartData" />
						</view>
						<u-row>
							<u-col text-align="center">账本全部收入比例图</u-col>
						</u-row>
					</view>
				</u-card>
				<!-- end 收入比例 饼图 -->
			</view>
		</view>
		<!-- beg 所有内容的容器 -->

	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				account_book: [],
				user: '',
				account_book_id: '',
				opts: {
					touchMoveLimit: 60,
					enableScroll: true,
					xAxis: {
						itemCount: 5,
						scrollShow: true,
					}
				},
				chartData: {}, //折线图
				expendPieChartData: {}, //支出饼图
				incomePieChartData: {}, //收入饼图
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		onShow() {
			this.user = this.$t_data.get("user");
			this.getAccount_book();
		},
		onReady() {
			this.getServerData();
			this.getExpendPieChartData();
			this.getIncomePieChartData();
		},
		computed: {

		},
		onLoad(options) {
			undefined
			this.account_book_id = options.id

		},
		methods: {
			//获取账本集合
			getAccount_book() {
				let mzz = this
				mzz.$request('account-book/getAccountBookList', mzz.user, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						for (var i = 0; i < res.length; i++) {
							if (res[i].uuid == mzz.account_book_id) {
								mzz.account_book = res[i]
								break
							}
						}
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			
			//收入比例
			getIncomePieChartData() {
				let mzz = this
				let data = {
					accountBookId: mzz.account_book_id,
					billType: "收入"
				}
				mzz.$request('bill/getBillPieData', data, 'POST').then(res => {
					// mzz.chartData = res
					if (res == "" || res == null) {
						mzz.incomePieChartData = {
							series: [{
								data: [{
									"name": "",
									"value": 0
								}]
							}]
						}
					} else {
						mzz.incomePieChartData = JSON.parse(JSON.stringify(res));
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			//支出比例
			getExpendPieChartData() {
				let mzz = this
				let data = {
					accountBookId: mzz.account_book_id,
					billType: "支出"
				}
				mzz.$request('bill/getBillPieData', data, 'POST').then(res => {
					// mzz.chartData = res
					if (res == "" || res == null) {
						mzz.expendPieChartData = {
							series: [{
								data: [{
									"name": "",
									"value": 0
								}]
							}]
						}
					} else {
						mzz.expendPieChartData = JSON.parse(JSON.stringify(res));
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			// 收支折现图数据
			getServerData() {
				let mzz = this
				let data = {
					accountBookId: mzz.account_book_id
				}
				mzz.$request('bill/getBillLineChartData', data, 'POST').then(res => {
					// mzz.chartData = res
					if (res == "") {
						mzz.chartData = {
							"categories": [
								""
							],
							"series": [{
									"name": "收入",
									"data": [
										0.0,
									]
								},
								{
									"name": "支出",
									"data": [
										0.0
									]
								}
							]
						}
					} else {
						mzz.chartData = JSON.parse(JSON.stringify(res));
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
		}
	}
</script>
<style lang="scss" scoped>

</style>
