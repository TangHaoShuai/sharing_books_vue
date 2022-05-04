<template>
	<view>
		<u-navbar leftText="返回" title="添加账目" :safeAreaInsetTop="false" :background="background" :height="48">

		</u-navbar>
		<!-- beg 所有内容的容器 -->
		<view class="u-page">
			<!-- beg分段器 -->
			<view style="margin: 20rpx;">
				<u-subsection @change="change" active-color="#00aa00" :list="list" :current="current"></u-subsection>
			</view>
			<!-- end分段器 -->
			<!-- beg金额 -->
			<view class="dev-number">
				<u-input class="input" placeholder-style="font-size:50rpx;" v-model="value" type="number"
					:border="false" placeholder="0.00" />
			</view>
			<!-- end 金额 -->
			<!-- beg 消费类型分类 -->
			<view style="background-color: #f8f9f9;padding: 10rpx;margin-left: 10rpx;">
				请选择分类
			</view>
			<view style="margin: 20rpx;">
				<u-radio-group :size="50" shape="square" v-model="consumption_type" @change="radioGroupChange">
					<u-col span="12" text-align="center">
						<u-radio :label-size="35" @change="radioChange" v-for="(item, index) in consumption_type_list"
							:key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-col>
				</u-radio-group>
			</view>
			<!-- end  消费类型分类-->
			<!-- beg 账户分类 -->
			<view style="background-color: #f8f9f9;padding: 10rpx;margin-left: 10rpx;">
				请选择账户
			</view>
			<view style="margin: 20rpx;">
				<u-radio-group :size="50" shape="square" v-model="wallet_type" @change="radioGroupChange">
					<u-col span="12" text-align="center">
						<u-radio :label-size="35" @change="radioChange" v-for="(item, index) in wallet_type_list"
							:key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-col>
				</u-radio-group>
			</view>
			<!-- end  账户分类-->
			<view style="background-color: #f8f9f9;padding: 10rpx;margin-left: 10rpx;">
				备注
			</view>
			<view>
				<u-row justify="">
					<u-col span="8" text-align="center">
						<view>
							<u-input class="input" :height="170" v-model="comment" type="textarea" :border="true" />
						</view>
					</u-col>
					<u-col span="3" text-align="center">
						<u-upload :max-count="1" ref="uUpload" @on-change="uploaded" :action="action"
							:auto-upload="false" :file-list="fileList" :form-data="from_data">
						</u-upload>
					</u-col>
				</u-row>
			</view>
			<u-picker @confirm="time_selector" v-model="show_time" mode="time"></u-picker>
			<view>
				<u-row justify="">
					<u-col span="1">
						<u-icon :size="50" name="calendar"></u-icon>
					</u-col>
					<u-col span="5" @click="show_time = true">
						<p>{{time}}</p>
					</u-col>
				</u-row>
			</view>
			<view style="margin: 20rpx;">
				<u-button v-on:click="submit()">提交账目</u-button>
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
				tag: 0,
				from_data: {}, //上传图片携带参数
				timestamp: 0, //时间戳
				time: '2022年 04月 22日',
				show_time: false, //时间选择器
				action: '', //图片上传地址
				fileList: [], //待上传文件
				wallet_type_list: [{
						name: '现金',
						disabled: false
					},
					{
						name: '支付宝',
						disabled: false
					},
					{
						name: '微信钱包',
						disabled: false
					},

				],
				consumption_type_list: [ //消费类型集合
					{
						name: '食品饮料',
						disabled: false
					},
					{
						name: '衣服饰品',
						disabled: false
					},
					{
						name: '交通通讯',
						disabled: false
					},
					{
						name: '寝室费用',
						disabled: false
					},
					{
						name: '学习进修',
						disabled: false
					},
					{
						name: '休闲娱乐',
						disabled: false
					},
					{
						name: '恋爱基金',
						disabled: false
					},
					{
						name: '医疗保障',
						disabled: false
					},
					{
						name: '其他杂项',
						disabled: false
					}
				],
				consumption_type: '', //消费类型
				wallet_type: '', //账户类型
				value: '', //金额
				comment: '', //备注
				account_book: '', //账本
				bill_type: '支出',
				user: {},
				list: [{ //分段器值
						name: '支出'
					},
					{
						name: '收入'
					}
				],
				current: 0,
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
			this.account_book = options
			var time = new Date();
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			this.time = y + '年' + m + '月' + d + '日';
		},
		onShow() {
			this.user = this.$t_data.get("user");
		},
		methods: {
			//上传完成的回调
			uploaded(res, index, lists, name) {
				let mzz = this
				let title = ''
				if (mzz.tag == 0) {
					title = '添加成功'
				} else {
					title = '添加成功,等待管理审核！'
				}
				if (lists[index].progress == 100) {
					mzz.$refs.uToast.show({
						title: title,
						isTab: false,
						duration: 1000,
						type: 'success',
						params: mzz.account_book,
						url: '/pages/index/detail/detail'
					})
				}
			},
			submit() {
				let mzz = this
				if (mzz.account_book.uuid && mzz.account_book.uuid != '' && mzz.user.uuid &&
					mzz.user.uuid != '' && mzz.consumption_type != '' && mzz.value != '' && mzz.value != 0 &&
					mzz.wallet_type != '' && mzz.comment != '') {
					var data = {
						'accountBookId': mzz.account_book.uuid, //对应的账本ID
						'accountBookUser': mzz.user.uuid, //发起者ID
						'billType': mzz.bill_type, //账单类型
						'money': mzz.value, //金额
						'consumeType': mzz.consumption_type, //消费类型
						'walletType': mzz.wallet_type, //钱包类型
						'message': mzz.comment, //备注
						'date': mzz.time, //时间
					}
					var tempAccountBookAdmin = ''
					mzz.$request('account-book/getAccountBook', mzz.account_book, 'POST').then(res => {
						tempAccountBookAdmin = String(res.accountBookAdmin)
						if (String(res.accountBookAdmin) == String(mzz.user.uuid)) {
							mzz.action = mzz.$url + 'bill/imgUpload', //设置上传地址
								//添加账单
								mzz.$request('bill/addBill', data, 'POST').then(res => {
									// 打印调用成功回调
									console.log(res)
									if (res.succeed == 200) {
										let files = [];
										files = mzz.$refs.uUpload.lists;
										if (files.length > 0) {
											mzz.tag = 0
											//给准备上传的图片设置ID
											mzz.from_data.uuid = res.message
											mzz.$refs.uUpload.upload(); //上传
										} else {
											mzz.$refs.uToast.show({
												title: '添加成功',
												isTab: false,
												duration: 1000,
												type: 'success',
												params: mzz.account_book,
												url: '/pages/index/detail/detail'
											})
										}
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
							//添加到临时表
							mzz.action = mzz.$url + 'bill-temp/imgUpload', //设置上传地址
								mzz.$request('bill-temp/addBill', data, 'POST').then(res => {
									// 打印调用成功回调
									console.log(res)
									if (res.succeed == 200) {
										mzz.$request('bill-temp/getBillTemp', {
											uuid: res.message
										}, 'POST').then(res => { //查询临时账单
											console.log('临时账单:' + res)
											let inform = {
												userA: mzz.user.uuid, //发送者ID
												userB: tempAccountBookAdmin, // 接收者ID
												message: '', //消息内容 内容由后端生成
												type: '账本审核', //消息类型
												billTempId: res.uuid, // 临时账目ID
												accountBookId: res.accountBookId, //对应的账本ID
											}
											mzz.$request('inform/addInform', inform, 'POST')
												.then( //添加消息
													res => {
														if (res) {
															console.log("消息提醒成功")
														} else {
															console.log("消息提醒失败")
														}
													})
										})
										let files = [];
										files = mzz.$refs.uUpload.lists;
										if (files.length > 0) {
											mzz.tag = 1 //设置标识符
											//给准备上传的图片设置ID
											mzz.from_data.uuid = res.message
											mzz.$refs.uUpload.upload(); //上传
										} else {
											mzz.$refs.uToast.show({
												title: '添加成功,等待管理审核！',
												isTab: false,
												duration: 1000,
												type: 'success',
												params: mzz.account_book,
												url: '/pages/index/detail/detail'
											})
										}
									} else {
										mzz.$refs.uToast.show({
											title: res.message,
											type: 'error'
										})
									}
								}).catch(error => {
									mzz.$u.toast('系统错误');
								})
						}
					})
				} else {
					mzz.$refs.uToast.show({
						title: '请正确填写账单！',
						type: 'error'
					})
				}
			},
			change(index) {
				console.log(index)
				let mzz = this
				if (index == 0) {
					mzz.bill_type = '支出'
					mzz.consumption_type_list = [ //消费类型集合
						{
							name: '食品饮料',
							disabled: false
						},
						{
							name: '衣服饰品',
							disabled: false
						},
						{
							name: '交通通讯',
							disabled: false
						},
						{
							name: '寝室费用',
							disabled: false
						},
						{
							name: '学习进修',
							disabled: false
						},
						{
							name: '休闲娱乐',
							disabled: false
						},
						{
							name: '恋爱基金',
							disabled: false
						},
						{
							name: '医疗保障',
							disabled: false
						},
						{
							name: '其他杂项',
							disabled: false
						}
					]
				} else {
					mzz.bill_type = '收入'
					mzz.consumption_type_list = [{
						name: '职业收入',
						disabled: false
					}, {
						name: '其他收入',
						disabled: false
					}]
				}

			},
			time_selector(e) {
				let mzz = this
				console.log(e);
				mzz.timestamp = e.timestamp
				var test = e.timestamp
				var time = new Date(test * 1000);
				var y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var h = time.getHours();
				var mm = time.getMinutes();
				var s = time.getSeconds();
				this.time = y + '年' + m + '月' + d + '日';
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
			}
		}
	}
</script>
<style lang="scss" scoped>
	.dev-number {
		margin: 20rpx;

		/deep/ .input {
			.u-input__input {
				// color: #fff!important;
				font-size: 50rpx;
			}
		}
	}
</style>
