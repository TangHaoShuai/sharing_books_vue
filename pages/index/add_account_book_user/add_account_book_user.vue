<template>
	<view>
		<u-navbar leftText="返回" title="添加成员" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-card :show-head="false" v-for="(item,index) in no_account_book_user">
					<view class="" slot="body">
						<u-row gutter="5" justify="start">
							<u-col span="9" text-align="center">
								<u-row gutter="5" justify="start">
									<u-col span="2">
										<u-image shape="circle" width="70rpx" height="70rpx" :src="tx_url+item.url">
										</u-image>
									</u-col>
									<u-col span="8">
										<view>{{item.username}}</view>
									</u-col>
								</u-row>
							</u-col>
							<u-col span="3" text-align="center">
								<u-button shape="circle" :ripple="true" ripple-bg-color="#00DB00"
									@click="btn_addAccountBookUser(item)">邀请</u-button>
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
				account_book_id: '',
				no_account_book_user: [],
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
			this.tx_url = this.$tx_url
			this.getNoAccountBookUser();
		},
		onLoad(options) {
			undefined
			this.account_book_id = options.id
		},
		methods: {
			btn_addAccountBookUser(item) {
				let mzz = this
				let inform = {
					userA: mzz.user.uuid, //发送者ID
					userB: item.uuid, // 接收者ID
					message: '', //消息内容 内容由后端生成
					type: '邀请加入账本', //消息类型
					accountBookId: mzz.account_book_id, //对应的账本ID
				}
				mzz.$request('inform/getInform', inform, 'POST').then( //查询是否已经申请
					res => {
						if (res == "" || res == null) {
							mzz.$request('inform/addInform', inform, 'POST').then( //添加消息
								res => {
									if (res) {
										mzz.$refs.uToast.show({
											title: "邀请成功！请耐心等待对方同意",
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
								title: "已经邀请，请耐心等待对方同意！",
								type: 'error',
							})
						}
					})


			},
			getNoAccountBookUser() {
				let mzz = this
				let data = {
					userid: mzz.user.uuid,
					account_book_id: mzz.account_book_id
				}
				mzz.$request('account-book-user/getNoAccountBookUser', data, 'GET').then(res => {
					if (res) {
						mzz.no_account_book_user = res
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
