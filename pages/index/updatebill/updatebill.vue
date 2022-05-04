<template>
	<view>
		<u-navbar leftText="返回" title="更新账单数据" :safeAreaInsetTop="false" :background="background" :height="48">

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
				<u-input class="input" placeholder-style="font-size:50rpx;" v-model="detail.money" type="number"
					:border="false" placeholder="0.00" />
			</view>
			<!-- end 金额 -->
			<!-- beg 消费类型分类 -->
			<view style="background-color: #f8f9f9;padding: 10rpx;margin-left: 10rpx;">
				请选择分类
			</view>
			<view style="margin: 20rpx;">
				<u-radio-group :size="50" shape="square" v-model="detail.consumeType" @change="radioGroupChange">
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
				<u-radio-group :size="50" shape="square" v-model="detail.walletType" @change="radioGroupChange">
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
							<u-input class="input" :height="170" v-model="detail.message" type="textarea"
								:border="true" />
						</view>
					</u-col>
					<u-col span="3" text-align="center" :disabled="true">
						<u-upload :max-count="1" ref="uUpload" @on-change="uploaded" :action="action"
							@on-remove="onRemove" :auto-upload="false" :file-list="fileList" :form-data="from_data">
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
						<p>{{detail.date}}</p>
					</u-col>
				</u-row>
			</view>
			<view style="margin: 20rpx;margin-top: 80rpx;margin-bottom: 50rpx;">
				<u-button type="error"  v-on:click="deletesubmit()">删除账目</u-button>
			</view>
			<view style="margin: 20rpx;">
				<u-button type="success" v-on:click="submit()">更新账目</u-button>
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
				from_data: {}, //上传图片携带参数
				timestamp: 0, //时间戳
				time: '2022年 04月 22日',
				show_time: false, //时间选择器
				action: this.$url + 'bill/imgUpload', //图片上传地址
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
				detail: {
					accoutBookId: "",
					accoutBookUser: "",
					billType: "",
					consumeType: "",
					date: "",
					img: '',
					message: "",
					money: "",
					uuid: "",
					walletType: "",
				}, //账单
				user: this.$t_data.get("user"), // 获取登录者信息
				list: [{ //分段器值
						name: '支出'
					},
					{
						name: '收入'
					}
				],
				current: 0, //选择器索引
				background: {
					backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
			}
		},
		computed: {},
		watch: {
			current: {
				handler(newLength, oldLength) {
					var index = newLength
					let mzz = this
					if (index == 0) {
						mzz.detail.billType = '支出'
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
						mzz.detail.billType = '收入'
						mzz.consumption_type_list = [{
							name: '职业收入',
							disabled: false
						}, {
							name: '其他收入',
							disabled: false
						}]
					}
				},
				immediate: true
			}
		},
		onLoad(options) {
			undefined
			console.log(options)
			this.getById(options.uuid)
		},
		methods: {
			deletesubmit() {
				let mzz = this
				mzz.$request('bill/deleteBill', mzz.detail, 'POST').then(res => {
					if (res) {
						mzz.$refs.uToast.show({
							title: '删除成功',
							type: 'success',
						})
						setTimeout(this.delay, 1000)
					} else {
						mzz.$refs.uToast.show({
							title: '删除失败',
							type: 'error',
						})
					}
				})
			},
			//延时
			delay() {
				uni.navigateBack({
					delta: 1, //返回层数，2则上上页
				})
			},
			onRemove(index, lists, name) {
				let mzz = this
				mzz.$request('bill/deleteImg', mzz.detail, 'POST').then(res => {})
			},
			//查询账单
			getById(uuid) {
				let mzz = this
				mzz.$request('bill/getById', uuid, 'POST').then(res => {
					if (res.billType == '支出') {
						mzz.current = 0
					} else {
						mzz.current = 1
					}
					if (res.img) {
						let item = {
							url: mzz.$bill_img_url + res.img,
							name: res.img
						}
						mzz.fileList.push(item);
					}
					mzz.detail = res
				})
			},
			//上传完成的回调
			uploaded(res, index, lists, name) {
				if (lists[index].progress == 100) {
					let mzz = this
					mzz.$refs.uToast.show({
						title: '添加成功',
						type: 'success',
					})
					setTimeout(this.delay, 1000)
				}
			},
			submit() {
				let mzz = this
				if (mzz.detail.accoutBookId != '' && mzz.detail.accoutBookUser != '' && mzz.detail.billType &&
					mzz.detail.consumeType != '' && mzz.detail.date != '' && mzz.detail.message != '' &&
					mzz.detail.money != '' && mzz.detail.uuid != '' && mzz.detail.walletType != '') {
					mzz.$request('bill/updateBill', mzz.detail, 'POST').then(res => {
						// 打印调用成功回调
						console.log(res)
						if (res.succeed == 200) {
							let files = [];
							files = mzz.$refs.uUpload.lists;
							if (files.length > 0 && files[0].progress != 100) {
								//给准备上传的图片设置ID
								mzz.from_data.uuid = res.message
								mzz.from_data.name = mzz.detail.img
								mzz.$refs.uUpload.upload(); //上传
							} else {
								mzz.$refs.uToast.show({
									title: '更新成功',
									isTab: false,
									duration: 1000,
									type: 'success',
								})
								setTimeout(this.delay, 1000)
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
					mzz.$refs.uToast.show({
						title: '请正确填写账单！',
						type: 'error'
					})
				}
			},
			change(index) {
				console.log(index)
				let mzz = this
				mzz.current = index
				mzz.detail.consumeType = ''
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
				mzz.detail.date = y + '年' + m + '月' + d + '日';
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
