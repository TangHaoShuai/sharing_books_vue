<template>
	<view>
		<u-navbar leftText="返回" title="加入他人账本" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-card :show-head="false" v-for="(item,index) in account_books">
					<view class="" slot="body">
						<u-row gutter="5" justify="start">
							<u-col span="9" text-align="center">
								<u-row gutter="5" justify="start">
									<u-col span="2">
										<u-image shape="circle" width="70rpx" height="70rpx"
											src="../../../static/zhangben.png"></u-image>
									</u-col>
									<u-col span="8">
										<view>{{item.name}}</view>
									</u-col>
								</u-row>
							</u-col>
							<u-col span="3" text-align="center">
								<u-button shape="circle" :ripple="true" ripple-bg-color="#00DB00"
									@click="btn_account_book(item)">申请</u-button>
							</u-col>
						</u-row>
					</view>
				</u-card>
			</view>

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
				account_books: [],
				user: {},
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onShow() {
			this.user = this.$t_data.get("user");
			this.getAccountBooks();
		},
		onLoad() {

		},
		methods: {
			btn_account_book(item) {
				let mzz = this
				let inform = {
					userA: mzz.user.uuid, //发送者ID
					userB: item.accountBookAdmin, // 接收者ID
					message: '', //消息内容 内容由后端生成
					type: '申请加入账本', //消息类型
					accountBookId: item.uuid, //对应的账本ID
				}
				mzz.$request('inform/getInform', inform, 'POST').then( //查询是否已经申请
					res => {
						if (res == "" || res == null) {
							mzz.$request('inform/addInform', inform, 'POST').then( //添加消息
								res => {
									if (res) {
										mzz.$refs.uToast.show({
											title: "申请成功！请耐心等待账本管理员同意",
											type: 'success',
										})
									} else {
										mzz.$refs.uToast.show({
											title: "申请失败！",
											type: 'error',
										})
									}
								})
						} else {
							mzz.$refs.uToast.show({
								title: "已经申请，请耐心待定管理员同意！",
								type: 'error',
							})
						}
					})
			},
			getAccountBooks() {
				let mzz = this
				mzz.$request('account-book/getAccountBooks', mzz.user, 'POST').then(res => {
					if (res) {
						console.log(res)
						mzz.account_books = res
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
