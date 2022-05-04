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
							<u-col span="9" text-align="center">
								<u-row gutter="5" justify="start">
									<u-col span="2">
										<u-image shape="circle" width="70rpx" height="70rpx"
											src="../../../static/tx.jpg"></u-image>
									</u-col>
									<u-col span="8">
										<view>{{item.username}}</view>
									</u-col>
								</u-row>
							</u-col>
							<u-col span="3" text-align="center">
								<u-button type="error" shape="circle" :ripple="true" ripple-bg-color="#00DB00"
									@click="btn_addUser(item)">删除</u-button>
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
		},
		onLoad(options) {
			undefined
			this.account_book_id = options.id

		},
		methods: {
			btn_addUser(item) {
				let mzz = this
				let data = {
					accountBookId: mzz.account_book_id,
					userId: item.uuid
				}
				mzz.$request('account-book-user/deleteAccountBookUser', data, 'POST').then(res => {
					// 打印调用成功回调
					if (res) {
						mzz.$refs.uToast.show({
							title: '移除成功',
							type: 'success'
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
