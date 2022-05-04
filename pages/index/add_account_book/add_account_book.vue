<template>
	<view>
		<u-navbar leftText="返回" title="" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view style="background-color: #f8f9f9;padding: 10rpx;margin-left: 10rpx;">
				账本名称
			</view>
			<view style="margin: 0 10rpx;">
				<u-input placeholder="请输入账本名字" v-model="account_book_name" type="type" :border="true" />
			</view>
			<view style="background-color: #f8f9f9;padding: 10rpx;margin-left: 10rpx;">
				账本类型
			</view>
			<u-card :show-head="false">
				<view class="" slot="body">
					<u-row gutter="5" justify="start">
						<u-col span="12" text-align="center">
							<u-row gutter="5" justify="start">
								<u-col span="2" style="margin-right: 5rpx;">
									<u-image shape="circle" width="70rpx" height="70rpx"
										:src="account_book_type.img_url">
									</u-image>
								</u-col>
								<u-col span="8">
									<view style="font-size: medium;">{{account_book_type.name}}</view>
									<view style="font-size:small;margin-top: 5rpx;">{{account_book_type.describe}}
									</view>
								</u-col>
							</u-row>
						</u-col>
					</u-row>
				</view>
			</u-card>
			<view style="margin: 0 10rpx;">
				<u-button type="success" v-on:click="submit()">确认</u-button>
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
				user: {},
				account_book_type: {},
				account_book_name: '',
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
			this.account_book_type = options
			this.user = this.$t_data.get("user") // 获取登录者信息
		},
		methods: {
			//延时
			delay() {
				// this.$u.route('pages/index/service/service');
				// uni.navigateBack(2)
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			submit() {
				let mzz = this
				var data = {
					'accountBookAdmin':mzz.user.uuid,
					'name': mzz.account_book_name,
					'accountBookType': mzz.account_book_type.name
				}
				mzz.$request('account-book/addAccountBook', data, 'POST').then(res => {
					// 打印调用成功回调
					console.log(res)
					if (res) {
						mzz.$refs.uToast.show({
							title: '添加成功',
							isTab: true,
							duration: 1000,
							type: 'success',
							url: '/pages/index/index'
						})
						// mzz.$u.toast('');
						// setTimeout(mzz.delay, 1000)
					} else {
						mzz.$refs.uToast.show({
							title: '添加失败',
							type: 'error'
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
