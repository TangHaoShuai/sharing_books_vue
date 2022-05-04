<template>
	<view>
		<u-navbar leftText="返回" title="创建新账本" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<view>
				<u-card :show-head="false" v-for=" (item,index) in list_type" @click="btn_add_account_book(item)">
					<view class="" slot="body">
						<u-row gutter="5" justify="start">
							<u-col span="10" text-align="center">
								<u-row gutter="5" justify="start">
									<u-col span="2" style="margin-right: 5rpx;">
										<u-image shape="circle" width="70rpx" height="70rpx" :src="item.img_url">
										</u-image>
									</u-col>
									<u-col span="9">
										<view style="font-size: medium;">{{item.name}}</view>
										<view style="font-size:small;margin-top: 5rpx;">{{item.describe}}</view>
									</u-col>
								</u-row>
							</u-col>
							<u-col span="2" text-align="center">
								<u-icon name="play-right-fill"></u-icon>
							</u-col>
						</u-row>
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
				list_type: [{
						id: 0,
						img_url: '../../../static/b_jt.png',
						name: '家庭/情侣账本',
						describe: '生活日常开销，材米油盐姜醋茶'
					},
					{
						id: 1,
						img_url: '../../../static/b_ly.png',
						name: '旅游账本',
						describe: '多人同行，账目清晰明了'
					},
					{
						id: 2,
						img_url: '../../../static/b_zx.png',
						name: '装修账本',
						describe: '各项目的预算情况，一目了然'
					},
					{
						id: 3,
						img_url: '../../../static/b_sy.png',
						name: '生意账本',
						describe: '收益情况，合伙人随时查看'
					},
					{
						id: 4,
						img_url: '../../../static/b_bj.png',
						name: '班级账本',
						describe: '班费支出全班公开透明'
					},
					{
						id: 5,
						img_url: '../../../static/b_bx.png',
						name: '报销账本',
						describe: '公司出差采购支出报销绝so easy'
					},
					{
						id: 6,
						img_url: '../../../static/b_qt.png',
						name: '其他账本',
						describe: '自己动手添加收支条目'
					},
				],
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {

		},
		onLoad() {

		},
		methods: {
			//跳转添加账本
			btn_add_account_book(item) {
				console.log(111)

				this.$u.route('pages/index/add_account_book/add_account_book', item);
			},
		}
	}
</script>
<style lang="scss" scoped>

</style>
