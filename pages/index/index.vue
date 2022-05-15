<template>
	<view>

		<u-navbar :is-back="false" :background="background" title="我的账本" :height="48">
			<!-- 自定义标题栏 -->
			<view class="slot-wrap" slot="right">
				<!-- <u-icon name="scan" color="#2979ff" size="45" style="margin-right: 15rpx;"></u-icon> -->
				<view v-on:click="btn_message_list()">
					<u-badge type="error" :count="message_list.length" size="mini"></u-badge>
					<u-icon name="../../static/xiaoxi.png" size="45"></u-icon>
				</view>

			</view>
		</u-navbar>
		<view class="u-page">
			<!-- 所有内容的容器 -->
			<view style="margin: 20rpx;">
				<u-row gutter="5" justify="center ">
					<u-col span="6">
						<u-button type="success" v-on:click="btn_add_account_book_list()">创建新的账本</u-button>
					</u-col>
					<u-col span="6">
						<u-button type="warning" v-on:click="btn_user_add_account_book()">加入他人的账本</u-button>
					</u-col>
				</u-row>
			</view>
			<!-- beg 卡片 -->
			<u-card :title="item.name" :sub-title="(item.count == 0 ?'1人独享账本':item.count+'人共享账本')"
				thumb="../../static/zhangben.png" v-for="(item,index) in account_book_list" @click="btn_detail(item)">
				<view class="" slot="body">
					<view>
						<u-row gutter="5" justify="start">
							<u-col span="2" text-align="center" style="margin-top: 10rpx;">
								<u-image shape="circle" width="70rpx" height="70rpx"
									:src="(tx_url+item.accountBookAdmin.url)"></u-image>
							</u-col>
							<u-col span="2" text-align="center" v-for="(item_2,index_2) in item.users"
								style="margin-top: 10rpx;">
								<u-image shape="circle" width="70rpx" height="70rpx" :src="(tx_url+item_2.url)">
								</u-image>
							</u-col>
						</u-row>
					</view>
				</view>

				<view class="" slot="foot">
					<u-row gutter="5" justify="start">
						<u-col span="2" text-align="center" style="margin-top: 10rpx;">
							<u-button  size="mini"
								v-on:click="btn_set_account_book(item)">设置</u-button>
						</u-col>
						<u-col span="2" text-align="center" style="margin-top: 10rpx;">
							<u-button size="mini" v-on:click="btn_detail(item)">明细</u-button>
						</u-col>
						<u-col span="2" text-align="center" style="margin-top: 10rpx;">
							<u-button size="mini" v-on:click="btn_account_book(item)">报表</u-button>
						</u-col>
						<u-col span="2" text-align="center" style="margin-top: 10rpx;">
							<u-button 
								v-on:click="btn_add_account_book_user(item)" size="mini">邀请</u-button>
						</u-col>
						<u-col span="4" text-align="center" style="margin-top: 10rpx;">
							<view style="color: #00aaff;">
								{{item.accountBookType}}
							</view>
						</u-col>

					</u-row>
				</view>
			</u-card>
			<!-- end 卡片 -->
			<view>
				<u-toast ref="uToast" />
			</view>
		</view>
		<!-- 与包裹页面所有内容的元素u-page同级，且在它的下方 -->
		<u-tabbar v-model="current" :list="vuex_tabbar" :mid-button="false" class="u_tab"></u-tabbar>
	</view>
</template>

<script>
	import store from '@/store/index.js'; //需要引入store
	export default {
		data() {
			return {
				message_list: [],
				user: {},
				tx_url: this.$tx_url,
				account_book_list: [],
				tag: '1', //消息
				src: 'https://cdn.uviewui.com/uview/example/button.png',
				current: 0,
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {
			vuex_tabbar() {
				return store.state.vuex_tabbar
			}
		},
		onLoad() {

		},
		onShow() {
			this.user = this.$t_data.get("user");
			this.getAccount_book_list();
			this.getMessageList()
		},
		// 每次刷新页面获取一次高度
		onReady() {

		},
		methods: {
			// 获取消息数据
			getMessageList() {
				let mzz = this
				let data = {
					userB: mzz.user.uuid
				}
				mzz.$request('inform/getUserBInforms', data, 'POST').then(res => {
					mzz.message_list = res
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			//获取账本集合
			getAccount_book_list() {
				let mzz = this
				mzz.$request('account-book/getAccountBookList', mzz.user, 'POST').then(res => {
					// 打印调用成功回调
					console.log(res)
					if (res) {
						mzz.account_book_list = res
					}
				}).catch(error => {
					mzz.$u.toast('系统错误');
				})
			},
			//跳转报表
			btn_account_book(item) {
				console.log(item)
				let data = {
					"id": item.uuid
				}
				this.$u.route('pages/index/account_book/account_book', data);
			},
			//跳转到设置账本页面
			btn_set_account_book(item) {
				let data = {
					"id": item.uuid
				}
				this.$u.route('pages/index/set_account_book/set_account_book', data);
			},
			//跳转到新建账本页面
			btn_add_account_book_list() {
				this.$u.route('pages/index/add_account_book_list/add_account_book_list', {});
			},
			//跳转到消息界面
			btn_message_list() {
				this.$u.route('pages/index/message_list/message_list', {});
			},
			// 跳转到添加账本选择类型页面
			btn_user_add_account_book() {
				this.$u.route('pages/index/user_add_account_book/user_add_account_book', {});
			},
			btn_detail(item) {
				this.$u.route('pages/index/detail/detail', item);
			},
			btn_add_account_book_user(item) {
				let mzz = this
				let from = {
					'accountBookId': item.uuid,
					'userId': mzz.user.uuid
				}
				let data = {
					"id": item.uuid
				}
				mzz.$request('account-book-user/getJurisdiction', from, 'POST').then(res => {
					console.log(res)
					if (item.accountBookAdmin.uuid == mzz.user.uuid || res) {
						mzz.$u.route('pages/index/add_account_book_user/add_account_book_user', data);
					} else {
						mzz.$refs.uToast.show({
							title: '没有权限',
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
	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}

	.u-icon-name {

		word-wrap: break-word;
		word-break: break-all;
		margin-top: 16rpx;
		font-size: 26rpx;
		padding: 0 14rpx;
		// 给定高度是为了图标名超出一行时，进行换行能有更好的效果
		height: 26rpx;
	}

	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		padding: 0 30rpx;
	}
</style>
