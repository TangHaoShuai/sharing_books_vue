<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" title="账本设置" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-cell-group>
					<u-cell-item @click="btn_del_account_book_user()" icon="setting-fill" title="成员管理"></u-cell-item>
				</u-cell-group>
				<view style="margin: 10rpx;">
					<u-input v-model="account_name" type="type" :border="true" />
				</view>
				<view style="margin: 5rpx 10rpx;">
					<u-button type="success" v-on:click="submit">确认</u-button>
				</view>
				<view style="margin: 5rpx 10rpx;">
					<u-button type="error" v-on:click="deleteAccountBook()">删除账本</u-button>
				</view>
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
		},
		onLoad(options) {
			undefined
			this.account_book_id = options.id

		},
		methods: {
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 删除账本
			deleteAccountBook(){
				let mzz = this
				let data = {
					uuid:mzz.account_book_id
				}
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
					}else{
						mzz.$refs.uToast.show({
							title: '删除失败',
							type: 'error'
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
					uuid:mzz.account_book_id,
					name:mzz.account_name
				}
				mzz.$request('account-book/updateAccountBookName', data, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						mzz.$refs.uToast.show({
							title: '更新成功',
							type: 'success'
						})
						mzz.getAccount_book();
					}else{
						mzz.$refs.uToast.show({
							title: '更新失败',
							type: 'error'
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
				let data = {
					"id": this.account_book_id
				}
				this.$u.route('pages/index/del_account_book_user/del_account_book_user', data);
			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
