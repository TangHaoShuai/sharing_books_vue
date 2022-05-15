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
								<u-button type="error" size="medium" v-on:click="bookRefuse(item)">拒绝</u-button>
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

					<u-row gutter="5" v-if="['邀请加入账本_拒绝','邀请加入账本_通过','申请加入账本_不通过','申请加入账本_通过'].includes(item.type)">
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								{{item.message}}
							</view>
						</u-col>

						<u-col span="12" text-align="center">
							<view>
								<u-button style="width: 100%;" type="success" size="medium"
									v-on:click="deleteMessage(item)">确认</u-button>
							</view>
						</u-col>
					</u-row>
					
					<u-row gutter="5" v-if="['删除成员'].includes(item.type)">
						<u-col span="12">
							<view style="margin-bottom: 30rpx;">
								{{item.message}}
							</view>
						</u-col>
					
						<u-col span="12" text-align="center">
							<view>
								<u-button style="width: 100%;" type="success" size="medium"
									v-on:click="deleteMessage(item)">确认</u-button>
							</view>
						</u-col>
					
					</u-row>

					<u-row gutter="5" v-if="item.type == '审核通过' || item.type == '审核不通过' && item.billTemp!= null">
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

						<u-col span="12" text-align="center">
							<view>
								<u-button style="width: 100%;" type="success" size="medium"
									v-on:click="deleteMessage(item)">确认</u-button>
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
			//确认 删除消息
			deleteMessage(item) {
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

			//账本审核不通过
			bookRefuse(item) {
				let mzz = this
				let inform = {
					userA: item.userB.uuid, //发送者ID
					userB: item.userA.uuid, // 接收者ID
					message: '', //消息内容 内容由后端生成
					type: '审核不通过', //消息类型
					billTempId: item.billTemp.uuid, // 临时账目ID
					accountBookId: item.accountBook.uuid, //对应的账本ID
				}
				mzz.$request('inform/addInform', inform, 'POST').then( //添加消息
					res => {
						if (res) {
							console.log("消息提醒成功")
						} else {
							console.log("消息提醒失败")
						}
					})
				let log = {
					accountBookId: item.accountBook.uuid,
					message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
						']拒绝发布用户[' + item.userA.phone + ':' + item.userA.username +
						']的待审核账目[账单类型:' + item.billTemp.billType + '][金额:' + item.billTemp.money +
						'][消费类型:' + item.billTemp.consumeType + '][备注:' + item.billTemp.message + ']'
				}
				mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
					res => {})
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
			// 添加账本成员
			addAccountBookUser(item) {
				let mzz = this
				let billTempID = '';
				if (item.billTemp != null) {
					billTempID = item.billTemp.uuid
				}
				let inform = {
					userA: item.userB.uuid, //发送者ID
					userB: item.userA.uuid, // 接收者ID
					message: '', //消息内容 内容由后端生成
					type: '', //消息类型
					billTempId: billTempID, // 临时账目ID
					accountBookId: item.accountBook.uuid, //对应的账本ID
				}

				let data = ''
				let log = ''
				if (item.type == '邀请加入账本') {

					inform.type = '邀请加入账本_通过'
					data = {
						accountBookId: item.accountBook.uuid, //账本ID
						userId: item.userB.uuid //用户ID
					}
					log = {
						accountBookId: item.accountBook.uuid,
						message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
							']同意用户[' + item.userA.phone + ':' + item.userA.username +
							']邀请加入账本'
					}
					mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
						res => {})

				} else if (item.type == '申请加入账本') {

					inform.type = '申请加入账本_通过'
					data = {
						accountBookId: item.accountBook.uuid, //账本ID
						userId: item.userA.uuid //用户ID
					}
					log = {
						accountBookId: item.accountBook.uuid,
						message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
							']同意用户[' + item.userA.phone + ':' + item.userA.username +
							']申请加入账本'
					}


				} else {

					return
				}

				mzz.$request('inform/getInformByUuid', {
					uuid: item.uuid
				}, 'POST').then( //添加消息
					res => {
						if (res && res != null && res != "") {
							console.log("没有被审核")


							mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
								res => {})

							mzz.$request('inform/addInform', inform, 'POST').then( //添加消息
								res => {
									if (res) {
										console.log("消息提醒成功")
									} else {
										console.log("消息提醒失败")
									}
								})
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

						} else {
							mzz.$refs.uToast.show({
								title: '审核失败，已经被其他管理员处理',
								type: 'error'
							})
							this.getMessageList();
							return
						}
					})





			},

			//同意账目审核
			submit(item) {
				let mzz = this
				mzz.$request('inform/getInformByUuid', {
					uuid: item.uuid
				}, 'POST').then( //添加消息
					res => {
						if (res && res != null && res != "") {
							console.log("没有被审核")

							let inform = {
								userA: item.userB.uuid, //发送者ID
								userB: item.userA.uuid, // 接收者ID
								message: '', //消息内容 内容由后端生成
								type: '审核通过', //消息类型
								billTempId: item.billTemp.uuid, // 临时账目ID
								accountBookId: item.accountBook.uuid, //对应的账本ID
							}
							mzz.$request('inform/addInform', inform, 'POST').then( //添加消息
								res => {
									if (res) {
										console.log("消息提醒成功")
									} else {
										console.log("消息提醒失败")
									}
								})
							let log = {
								accountBookId: item.accountBook.uuid,
								message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
									']同意发布用户[' + item.userA.phone + ':' + item.userA.username +
									']的待审核账目[账单类型:' + item.billTemp.billType + '][金额:' + item.billTemp
									.money +
									'][消费类型:' + item.billTemp.consumeType + '][备注:' + item.billTemp
									.message + ']'
							}
							mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
								res => {})
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

						} else {
							mzz.$refs.uToast.show({
								title: '审核失败，已经被其他管理员处理',
								type: 'error'
							})
							this.getMessageList();
							return
						}
					})





			},
			//拒绝
			refuse(item) {
				let mzz = this
				mzz.$request('inform/getInformByUuid', {
					uuid: item.uuid
				}, 'POST').then( //添加消息
					res => {
						if (res && res != null && res != "") {
							console.log("没有被审核")

							let billTempID = '';
							if (item.billTemp != null) {
								billTempID = item.billTemp.uuid
							}
							let inform = {
								userA: item.userB.uuid, //发送者ID
								userB: item.userA.uuid, // 接收者ID
								message: '', //消息内容 内容由后端生成
								type: '', //消息类型
								billTempId: billTempID, // 临时账目ID
								accountBookId: item.accountBook.uuid, //对应的账本ID
							}
							if (item.type == '邀请加入账本') {
								inform.type = '邀请加入账本_拒绝'
								let log = {
									accountBookId: item.accountBook.uuid,
									message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
										']拒绝用户[' + item.userA.phone + ':' + item.userA.username +
										']邀请加入账本'
								}
								mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
									res => {})
							} else if (item.type == '申请加入账本') {
								inform.type = '申请加入账本_不通过'
								let log = {
									accountBookId: item.accountBook.uuid,
									message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
										']拒绝用户[' + item.userA.phone + ':' + item.userA.username +
										']申请加入账本'
								}
								mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
									res => {})
							} else {
								return
							}
							mzz.$request('inform/addInform', inform, 'POST').then( //添加消息
								res => {
									if (res) {
										console.log("消息提醒成功")
									} else {
										console.log("消息提醒失败")
									}
								})
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


						} else {
							mzz.$refs.uToast.show({
								title: '拒绝失败，已经被其他管理员处理',
								type: 'error'
							})
							this.getMessageList();
							return
						}
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
