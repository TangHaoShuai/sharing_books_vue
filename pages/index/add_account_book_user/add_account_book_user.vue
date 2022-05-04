<template>
	<view>
		<u-navbar leftText="返回" title="添加成员" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<view style="margin: 30rpx;">
					<u-search @search="search" @custom="search" placeholder="输入用户的账户" v-model="keyword"></u-search>
				</view>
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
							<u-col v-if="!item.exist" span="3" text-align="center">
								<u-button shape="circle" :ripple="true" ripple-bg-color="#00DB00"
									@click="btn_addAccountBookUser(item)">邀请</u-button>
							</u-col>
							<u-col v-else span="3" text-align="center">
								<u-button shape="circle" :ripple="true" ripple-bg-color="#00DB00">已经存在</u-button>
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
				keyword: '',
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
		},
		onLoad(options) {
			undefined
			this.account_book_id = options.id
		},
		methods: {
			search() {
				let mzz = this
				mzz.getNoAccountBookUser()
			},
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
										let log = {
											accountBookId: mzz.account_book_id,
											message: '用户[' + mzz.user.phone + ':' + mzz.user.username + ']邀请[' +item.phone+':'+item.username+']加入账本'
										}
										mzz.$request('account-book-log/addAccountBookLog', log, 'POST').then(res => {})
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
					phone: mzz.keyword,
					account_book_id : mzz.account_book_id
				}
				if (mzz.user.phone == mzz.keyword) {
					mzz.$refs.uToast.show({
						title: "不能查询自己的手机号！",
						type: 'error',
					})
				} else {
					mzz.$request('account-book-user/getUsers', data, 'POST').then(res => {
						if (res.length > 0) {
							mzz.no_account_book_user = res
							mzz.$refs.uToast.show({
								title: "查询成功",
								type: 'success',
							})
						} else {
							mzz.no_account_book_user = []
							mzz.$refs.uToast.show({
								title: "没有该用户",
								type: 'success',
							})
						}
					}).catch(error => {
						mzz.$u.toast('系统错误');
					})
				}

			}
		}
	}
</script>
<style lang="scss" scoped>

</style>
