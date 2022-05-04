<template>
	<view>
		<u-navbar :custom-back="back" leftText="返回" :title="'['+account_name+']日志'" :safeAreaInsetTop="false"
			:background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-card :show-head="false" v-for="(item,index) in account_book_log">
					<view class="" slot="body">
						<view style="text-align: center;margin-bottom: 10rpx;">
							系统日志
						</view>
						<view>
							{{item.message}}
						</view>
					</view>
					<view style="height: 15rpx;" slot="foot">
						<view>
							时间:{{item.date}}
						</view>
					</view>
				</u-card>
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
				account_book_log: [],
				account_book: {},
				account_name: {},
				account_book_id: '',
				user: '',
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
			this.getAccount_book_log1();
		},
		onLoad(options) {
			undefined
			this.account_book_id = options.account_book_id
		},
		methods: {
			getAccount_book_log1() {
				let mzz = this
				let data = {
					accountBookId: mzz.account_book_id
				}
				mzz.$request('account-book-log/getAccountBookLog', data, 'POST').then(res => {
					// 打印调用成功回调
					if (res.length > 0) {
						mzz.account_book_log = res
						console.log(res)
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
		}
	}
</script>
<style lang="scss" scoped>

</style>
