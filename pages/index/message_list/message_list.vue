<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="消息" :safeAreaInsetTop="false" :background="background"
			:height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<u-card :show-head="false" v-for="(item,index) in message_list">
				<view class="" slot="body">
					<view style="font-weight: bold;text-align: center;margin-bottom: 10rpx;margin-top: -10rpx;">系统消息
					</view>
					<u-row gutter="5" v-if="item.type == '账本审核'">
						<!-- text-align="center " -->
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								{{item.message}}
							</view>
						</u-col>
						<!-- 账目内容 -->
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								收入/支出:{{item.billTemp.billType}}
							</view>
						</u-col>
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								账目类型:{{item.billTemp.consumeType}}
							</view>
						</u-col>
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								账目备注:{{item.billTemp.message}}
							</view>
						</u-col>
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								金额:{{item.billTemp.money}}
							</view>
						</u-col>
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								时间:{{item.billTemp.date}}
							</view>
						</u-col>
						<u-col span="12" v-if="item.billTemp.img">
							<view style="margin-bottom: 30rpx;">
								<u-image width="100%" height="300rpx" :src="bill_img_url + item.billTemp.img"></u-image>
							</view>
						</u-col>

						<u-col span="6" text-align="center">
							<view>
								<u-button type="success" size="medium" v-on:click="submit(item)">同意</u-button>
							</view>
						</u-col>
						<u-col span="6" text-align="center">
							<view>
								<u-button type="error" size="medium" v-on:click="refuse(item)">拒绝</u-button>
							</view>
						</u-col>
					</u-row>

					<u-row gutter="5" v-if="item.type == '邀请加入账本'">
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								{{item.message}}
							</view>
						</u-col>
						<u-col span="6" text-align="center">
							<view>
								<u-button type="success" size="medium" v-on:click="addAccountBookUser(item)">同意
								</u-button>
							</view>
						</u-col>
						<u-col span="6" text-align="center">
							<view>
								<u-button type="error" size="medium" v-on:click="refuse(item)">拒绝</u-button>
							</view>
						</u-col>
					</u-row>

					<u-row gutter="5" v-if="item.type == '申请加入账本'">
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								{{item.message}}
							</view>
						</u-col>
						<u-col span="6" text-align="center">
							<view>
								<u-button type="success" size="medium" v-on:click="addAccountBookUser(item)">同意
								</u-button>
							</view>
						</u-col>
						<u-col span="6" text-align="center">
							<view>
								<u-button type="error" size="medium" v-on:click="refuse(item)">拒绝</u-button>
							</view>
						</u-col>
					</u-row>

				</view>
			</u-card>
			<view>
				<u-toast ref="uToast" />
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
				bill_img_url: this.$bill_img_url,
				message_list: [],
				user: {},
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad() {

		},
		onShow() {
			this.user = this.$t_data.get("user");
			this.getMessageList();
		},
		methods: {
			addAccountBookUser(item) {
				let mzz = this
				let data = ''
				if(item.type == '邀请加入账本'){
					data = {
						accountBookId: item.accountBook.uuid, //账本ID
						userId: item.userB.uuid //用户ID
					}
				}else if(item.type == '申请加入账本'){
					data = {
						accountBookId: item.accountBook.uuid, //账本ID
						userId: item.userA.uuid //用户ID
					}
				}else{
					return
				}
				mzz.$request('account-book-user/addAccountBookUser', data, 'POST').then(res => {
					if (res) {
						mzz.$request('inform/deleteInform', item, 'POST').then(res => {
							mzz.$refs.uToast.show({
								title: '操作成功',
								type: 'success',
							})
							this.getMessageList();
						})
					} else {
						mzz.$refs.uToast.show({
							title: '操作失败',
							type: 'error'
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},

			//同意账目审核
			submit(item) {
				let mzz = this
				mzz.$request('inform/consent', item, 'POST').then(res => {
					if (res) {
						mzz.$refs.uToast.show({
							title: '操作成功',
							type: 'success',
						})
						this.getMessageList();
					} else {
						mzz.$refs.uToast.show({
							title: '操作失败',
							type: 'error'
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			//拒绝
			refuse(item) {
				let mzz = this
				mzz.$request('inform/deleteInform', item, 'POST').then(res => {
					if (res) {
						mzz.$refs.uToast.show({
							title: '操作成功',
							type: 'success',
						})
						this.getMessageList();
					} else {
						mzz.$refs.uToast.show({
							title: '操作失败',
							type: 'error'
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			// 获取消息数据
			getMessageList() {
				let mzz = this
				let data = {
					userB: mzz.user.uuid
				}
				mzz.$request('inform/getUserBInforms', data, 'POST').then(res => {
					mzz.message_list = res
					console.log(res)
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
