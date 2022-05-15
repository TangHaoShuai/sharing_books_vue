<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="成员管理" :safeAreaInsetTop="false" :background="background"
			:height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-card :show-head="false" v-for="(item,index) in users">
					<view class="" slot="body">
						<u-row gutter="5" justify="start">
							<u-col span="6" text-align="center">
								<u-row gutter="5" justify="start">
									<u-col span="4">
										<u-image shape="circle" width="70rpx" height="70rpx" :src="tx_url+item.userUrl">
										</u-image>
									</u-col>
									<u-col span="6">
										<view>{{item.userName}}</view>
									</u-col>
								</u-row>
							</u-col>
							<u-col span="3" text-align="center">
								<u-button v-if="item.administrator == 0 " type="success" shape="circle" :ripple="true"
									ripple-bg-color="#00DB00" @click="btn_setAdministrator(item)">设为管理员</u-button>
								<u-button v-else-if="item.administrator == 1" type="warning" shape="circle"
									:ripple="true" ripple-bg-color="#00DB00" @click="btn_deleteAdministrator(item)">
									取消管理员
								</u-button>
							</u-col>
							<u-col span="3" text-align="center">
								<u-button type="error" shape="circle" :ripple="true" ripple-bg-color="#00DB00"
									@click="btn_deleteUser(item)">删除</u-button>
							</u-col>
						</u-row>
					</view>
				</u-card>
			</view>
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
				tx_url: '',
				users: [],
				user: '',
				account_book_id: '',
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onShow() {
			this.user = this.$t_data.get("user");
			this.getAccount_book_user();
			this.tx_url = this.$tx_url;
		},
		onLoad(options) {
			undefined
			this.account_book_id = options.id

		},
		methods: {
			btn_deleteAdministrator(item) {
				let mzz = this
				let data = {
					uuid: item.uuid
				}
				mzz.$request('account-book-user/deleteAdministrator', data, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						mzz.$refs.uToast.show({
							title: '取消成功',
							type: 'success'
						})
						let log = {
							accountBookId: mzz.account_book_id,
							message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
								']取消用户[' + item.userName + ':' + item.userPhone +
								']的管理员'
						}
						mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
							res => {})
						mzz.getAccount_book_user();
					} else {
						mzz.$refs.uToast.show({
							title: '取消失败',
							type: 'error'
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			btn_setAdministrator(item) {
				let mzz = this
				let data = {
					uuid: item.uuid
				}
				mzz.$request('account-book-user/setAdministrator', data, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						mzz.$refs.uToast.show({
							title: '设置成功',
							type: 'success'
						})
						let log = {
							accountBookId: mzz.account_book_id,
							message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
								']设置用户[' + item.userName + ':' + item.userPhone +
								']为管理员'
						}
						mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
							res => {})
						mzz.getAccount_book_user();
					} else {
						mzz.$refs.uToast.show({
							title: '设置失败',
							type: 'error'
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			btn_deleteUser(item) {
				let mzz = this
				let data = {
					uuid: item.uuid
				}
				mzz.$request('account-book-user/deleteAccountBookUser', data, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						mzz.$refs.uToast.show({
							title: '移除成功',
							type: 'success'
						})
						let log = {
							accountBookId: mzz.account_book_id,
							message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
								']删除用户[' + item.userName + ':' + item.userPhone +
								']'
						}
						mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
							res => {})

						let inform = {
							userA: mzz.user.uuid, //发送者ID
							userB: item.userUuid, // 接收者ID
							message: '', //消息内容 内容由后端生成
							type: '删除成员', //消息类型
							accountBookId: mzz.account_book_id, //对应的账本ID
						}
						mzz.$request('inform/addInform', inform, 'POST')
							.then( //添加消息
								res => {
									if (res) {
										console.log("消息提醒成功")
									} else {
										console.log("消息提醒失败")
									}
								})

						mzz.getAccount_book_user();
					} else {
						mzz.$refs.uToast.show({
							title: '移除失败',
							type: 'error'
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			getAccount_book_user() {
				let mzz = this
				let data = {
					accountBookId: mzz.account_book_id
				}
				mzz.$request('account-book-user/getAccountBookUser', data, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						for (var i = 0; i < res.length; i++) {
							// debugger
							if (res[i].userId == mzz.user.uuid) {
								res.splice(i, 1);
								console.log(res)
								break
							}
						}
						mzz.users = res

					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			back() {
				let data = {
					"id": this.account_book_id
				}
				this.$u.route('pages/index/set_account_book/set_account_book', data);
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
