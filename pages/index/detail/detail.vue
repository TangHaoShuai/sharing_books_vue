<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" :title="account_book.name" :safeAreaInsetTop="false"
			:background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<!-- style="background-image:url(../../../static/detail_bj.png); " -->
			<!-- beg 头部信息栏 -->
			<view style="background-color: #55c078;padding-bottom: 20rpx;padding-top: 10rpx;">
				<u-row gutter="5" justify="start">
					<u-col span="1.5" text-align="center" style="margin-left: 10rpx;">
						<u-image shape="circle" width="70rpx" height="70rpx" :src="tx_url+user.url"></u-image>
					</u-col>
					<u-col span="3">
						<view v-if="account_book.count == 1" class="div_mzz"> 一人独享 </view>
						<view v-else class="div_mzz"> {{account_book.count}}人共享 </view>
					<!-- 	<u-button v-if="account_book.count == 1" :plain="true" :hair-line="true" size="mini"
							shape="circle">一人独享</u-button>
						<u-button v-else :plain="true" :hair-line="true" size="mini" shape="circle">
							{{account_book.count}}人共享
						</u-button> -->
					</u-col>
					<u-col span="1" @click="btn_account_book(1)">
						<u-image width="50rpx" height="50rpx" src="../../../static/baobiao.png">
						</u-image>
					</u-col>
					<u-col span="3" @click="btn_account_book()">
						<view style="color: #ECF5FF;">账本报表</view>
					</u-col>
					<u-col span="1" @click="refresh()">
						<u-image shape="circle" width="50rpx" height="50rpx" src="../../../static/shuaxin.png">
						</u-image>
					</u-col>
					<u-col span="1" @click="refresh()">
						<view style="color: #ECF5FF;">刷新</view>
					</u-col>
				</u-row>
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
			<!-- end 头部信息栏 -->
			<!-- beg搜索框 -->
			<view style="margin: 10rpx;">
				<u-search @search="search" placeholder="输入账单备注搜索" v-model="keyword" :show-action="false"></u-search>
			</view>
			<!-- end搜索框 -->
			<!-- beg 添加账目 -->
			<view style="margin: 10rpx;">
				<u-button shape="circle" :ripple="true" ripple-bg-color="#00DB00" @click="btn_addbill()">添加账目
				</u-button>
			</view>
			<!-- end 添加账目 -->
			<!-- beg账单 -->
			<view>
				<u-card :show-head="false" @click="btn_updatedetail(item)" v-for="(item,index) in bills">
					<view class="" slot="body">
						<u-row gutter="5" justify="start">
							<u-col span="9" text-align="center">
								<u-row gutter="5" justify="start">
									<u-col span="2">
										<u-image shape="circle" width="70rpx" height="70rpx"
											:src="(tx_url+item.accoutBookUser.url)"></u-image>
									</u-col>
									<u-col span="2">
										<u-image v-if="item.billType == '收入'" shape="circle" width="70rpx"
											height="70rpx" src="../../../static/dian_lvse.png"></u-image>
										<u-image v-else shape="circle" width="70rpx" height="70rpx"
											src="../../../static/dian_red.png"></u-image>
									</u-col>
									<u-col span="5">
										<view style="font-size: medium;">{{item.consumeType}}</view>
										<view style="font-size:small;margin-top: 5rpx;">{{item.message}}</view>
									</u-col>
									<u-col span="2" v-if="item.img">
										<u-image  width="70rpx" height="70rpx"
											:src="(bill_img_url+item.img)"></u-image>
									</u-col>
								</u-row>
							</u-col>
							<u-col span="3" text-align="center">
								<view> {{item.money}}元 </view>
							</u-col>
						</u-row>
						<u-row gutter="5">
							<u-col span="6">
								<view style="font-size:small;margin-top: 5rpx;">
									{{item.accoutBookUser.username}}
								</view>
							</u-col>
							<u-col span="6">
								<view style="text-align: end;font-size:small;margin-top: 5rpx;">
									{{item.date}}
								</view>
							</u-col>
						</u-row>
					</view>
				</u-card>
			</view>
			<!-- end账单 -->
		</view>
		<!-- beg 所有内容的容器 -->
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				bills: [{
					accoutBookId: "65de62f644a44d5b8e85e47111b9ff4a",
					accoutBookUser: {
						age: 19,
						password: "123123",
						phone: "18077229249",
						sex: "男",
						url: "tx.png",
						username: "黄二狗",
						uuid: "8f5340ca325c4bb7b68235b63eac2e8b"
					},
					billType: "收入",
					consumeType: "其他收入",
					date: "2022年4月25日",
					img: '',
					message: "滚动",
					money: 6565,
					uuid: "55d888107d4a413395181475e39d13ed",
					walletType: "现金",
				}],
				user: this.$t_data.get("user"),
				tx_url: this.$tx_url,
				bill_img_url:this.$bill_img_url,
				account_book: {}, //账本数据
				keyword: '', //搜索框值
				src: 'https://cdn.uviewui.com/uview/example/button.png',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad(options) {
			undefined
			console.log(options)
			this.account_book = options
			this.getAccount_book()
			this.getBills()
		},
		onShow() {
			this.getBills()
			this.getAccount_book()
		},
		methods: {
			//刷新
			refresh() {
				let mzz = this
				mzz.getBills()
				mzz.getAccount_book()
				mzz.$refs.uToast.show({
					title: '刷新成功',
					type: 'success',
				})
			},
			// 跳转到跟新账单界面
			btn_updatedetail(item) {
				let data = {
					'uuid': item.uuid
				}
				this.$u.route('pages/index/updatebill/updatebill', data);
			},
			//搜索按钮 模糊查询
			search(value) {
				let mzz = this
				if (mzz.account_book.uuid && mzz.account_book.uuid != "") {
					var data = {
						'accoutBookId': mzz.account_book.uuid,
						'keyword': mzz.keyword
					}
					mzz.$request('bill/getBills', data, 'POST').then(res => {
						// 打印调用成功回调
						console.log(res)
						if (res) {
							mzz.bills = res
						}
					}).catch(error => {
						mzz.$u.toast('系统错误');
					})
				}
			},
			//获取账单
			getBills() {
				let mzz = this
				if (mzz.account_book.uuid && mzz.account_book.uuid != "") {
					var data = {
						'accoutBookId': mzz.account_book.uuid
					}
					mzz.$request('bill/getBills', data, 'POST').then(res => {
						// 打印调用成功回调
						console.log(res)
						if (res) {
							mzz.bills = res
						}
					}).catch(error => {
						mzz.$u.toast('系统错误');
					})
				}
			},
			//获取账本集合
			getAccount_book() {
				let mzz = this
				mzz.$request('account-book/getAccountBookList', mzz.user, 'POST').then(res => {
					// 打印调用成功回调
					console.log(res)
					if (res) {
						for (var i = 0; i < res.length; i++) {
							if (res[i].uuid == mzz.account_book.uuid) {
								mzz.account_book = res[i]
								break
							}
						}
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			//返回
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			//跳转报表
			btn_account_book() {
				let data = {
					"id": this.account_book.uuid
				}
				this.$u.route('pages/index/account_book/account_book', data);
			},
			btn_addbill(item) {
				this.$u.route('pages/index/addbill/addbill', this.account_book);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.div_mzz {
		color: #ECF5FF;
		font-size: 30rpx;
	}
</style>
