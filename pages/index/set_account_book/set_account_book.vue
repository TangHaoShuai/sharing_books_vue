<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="账本设置" :safeAreaInsetTop="false" :background="background"
			:height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-cell-group>
					<u-cell-item @click="btn_del_account_book_user()" icon="setting-fill" title="成员管理"></u-cell-item>
				</u-cell-group>
				<u-cell-group>
					<u-cell-item @click="btn_account_book_log()" icon="setting-fill" title="查看账本日志"></u-cell-item>
				</u-cell-group>
				<view style="margin: 10rpx;">
					<u-input v-model="account_name" type="type" :border="true" />
				</view>
				<view style="margin: 5rpx 10rpx;">
					<u-button type="success" v-on:click="submit">确认</u-button>
				</view>
				<view style="margin: 5rpx 10rpx;" v-if="jurisdiction ||accountBookAdmin == user.uuid">
					<u-button type="error" v-on:click="show = true">删除账本</u-button>
				</view>
			</view>
			<view>
				<u-modal @confirm="deleteAccountBook" v-model="show" title="警告" content="是否删除账本"
					:show-cancel-button="true"> </u-modal>
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
				accountBookAdmin: '',
				jurisdiction: false,
				show: false,
				user: '',
				account_book_id: '',
				account_name: '',
				account_book: "",
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onShow() {
			this.user = this.$t_data.get("user");
			this.getAccount_book();
			this.getJurisdiction();
		},
		onLoad(options) {
			undefined
			this.account_book_id = options.id

		},
		methods: {
			getJurisdiction() {
				let mzz = this
				let from = {
					'accountBookId': mzz.account_book_id,
					'userId': mzz.user.uuid
				}
				mzz.$request('account-book-user/getJurisdiction', from, 'POST').then(res => {
					mzz.jurisdiction = res
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			btn_account_book_log() {
				let mzz = this
				let data = {
					"account_book_id": mzz.account_book_id
				}
				mzz.$u.route('pages/index/account_book_log/account_book_log', data);
			},
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 删除账本
			deleteAccountBook() {
				let mzz = this
				let data = {
					uuid: mzz.account_book_id
				}

				let from = {
					'accountBookId': mzz.account_book_id,
					'userId': mzz.user.uuid
				}
				mzz.$request('account-book-user/getJurisdiction', from, 'POST').then(res => {
					if (mzz.account_book.accountBookAdmin.uuid == mzz.user.uuid || res) {

						mzz.$request('account-book/deleteAccountBook', data, 'POST').then(res => {
							// 打印调用成功回调
							if (res) {
								mzz.$refs.uToast.show({
									title: '删除成功',
									type: 'success',
									duration: 1000,
									isTab: true,
									url: '/pages/index/index'
								})
								mzz.getAccount_book();
							} else {
								mzz.$refs.uToast.show({
									title: '删除失败',
									type: 'error'
								})
							}
						}).catch(error => {
							mzz.$u.toast('系统错误');
						})

					} else {
						mzz.$refs.uToast.show({
							title: '没有权限修改',
							type: 'error',
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})


			},
			//更新账本名字
			submit() {
				let mzz = this
				let data = {
					uuid: mzz.account_book_id,
					name: mzz.account_name
				}
				let from = {
					'accountBookId': mzz.account_book_id,
					'userId': mzz.user.uuid
				}

				mzz.$request('account-book-user/getJurisdiction', from, 'POST').then(res => {
					if (mzz.account_book.accountBookAdmin.uuid == mzz.user.uuid || res) {

						mzz.$request('account-book/updateAccountBookName', data, 'POST').then(res => {
							// 打印调用成功回调
							if (res.state == '200') {
								mzz.$refs.uToast.show({
									title: '更新成功',
									type: 'success'
								})
								let log = {
									accountBookId: mzz.account_book_id,
									message: '用户[' + mzz.user.phone + ':' + mzz.user.username +
										']更新了账本名为' + mzz
										.account_name
								}
								mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(
									res => {})
							} else {
								mzz.$refs.uToast.show({
									title: res.message,
									type: 'error'
								})
							}
						}).catch(error => {
							mzz.$u.toast('系统错误');
						})

					} else {
						mzz.$refs.uToast.show({
							title: '没有权限修改',
							type: 'error',
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})


			},
			//获取账本集合
			getAccount_book() {
				let mzz = this
				mzz.$request('account-book/getAccountBookList', mzz.user, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						for (var i = 0; i < res.length; i++) {
							if (res[i].uuid == mzz.account_book_id) {
								mzz.account_book = res[i]
								mzz.account_name = res[i].name
								mzz.accountBookAdmin = res[i].accountBookAdmin.uuid
								break
							}
						}
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			btn_set_account_book_name() {

			},
			//跳转到成员管理界面
			btn_del_account_book_user() {
				let mzz = this
				let from = {
					'accountBookId': mzz.account_book_id,
					'userId': mzz.user.uuid
				}

				mzz.$request('account-book-user/getJurisdiction', from, 'POST').then(res => {
					if (mzz.account_book.accountBookAdmin.uuid == mzz.user.uuid || res) {


						let data = {
							"id": mzz.account_book_id
						}
						mzz.$u.route('pages/index/del_account_book_user/del_account_book_user', data);

					} else {
						mzz.$refs.uToast.show({
							title: '没有权限操作',
							type: 'error',
						})
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})


			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
