<template>
	<view class="bg">
		<view @click="search">
			<view class="search_bar">
				<uni-section title="自定义样式" type="line">
					<uni-search-bar placeholder="输入要查询的单词" bgColor="#EEEEEE" />
				</uni-section>
			</view>
		</view>
		<view class="content">
			<view class="wordInfo">
				<view>
					<text>日复习量</text>
					<view class="pw">
						<image src="../../static/面无表情.png" class="login_logo" mode="heightFix"></image>
						<text>100</text>
					</view>
				</view>
				<view>
					<text>总单词量</text>
					<view class="pw">
						<image src="../../static/B.png" class="login_logo" mode="heightFix"></image>
						<text>3000</text>
					</view>
				</view>
			</view>
			<view>
				<image class="logo" src="/static/icon/wordscan.png" @click="getWords()"></image>
			</view>

			<view>
				<button type="default" @click="login" v-if="!state" class="login_btn">
					<text>快来点我使用吧</text>
					<image class="login_logo" src="../../static/开心.png" mode="heightFix">
					</image>
				</button>
			</view>
		</view>
<!-- <button @click="test">test</button> -->
	</view>
</template>

<script>
	import {
		setStore
	} from "../../utils/storage.js";
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				img: '',
				state: false
			}
		},
		onLoad() {
			this.islogin()
			this.state = store.state.loginState
		},
		methods: {
			// test(){
			// 	uni.navigateTo({
			// 		url:"../usage/usage"
			// 	})
			// },
			getWords() {
				let state = store.state.loginState
				if (state == true) {
					uni.chooseImage({
						success(res) {
							uni.navigateTo({
								url: "../words/words?imgurl=" + res.tempFilePaths
							})
						}
					})
				} else {
					this.login()
				}
			},
			search() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			login() {
				let code = ''
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						let Info = JSON.parse(res.rawData)
						console.log(Info.avatarUrl)
						setStore("name", Info.nickName)
						setStore("avatar", Info.avatarUrl)
						wx.login({
							provider: 'weixin',
							success: (loginRes) => {
								code = loginRes.code
								console.log(code)
								uni.request({
									url: "https://thesongof404.top:8080/login",
									method: 'POST',
									data: {
										"code": code,
										"info": res.rawData
									},
									success: res => {
										this.state = true
										console.log(res)
										if (res.data.code == 200) {
											let token = res.data.token;
											setStore("token", token);
											store.commit('ISLOGIN');
											uni.navigateTo({
												url: "../usage/usage"
											})
										}
									},
									fail: () => {
										this.login()
									}
								});
							}
						});
					}
				})
			},
			islogin() {

				const token = wx.getStorageSync("token");
				uni.request({
					url: 'https://thesongof404.top:8080/validate', //仅为示例，并非真实接口地址。
					method: 'POST',
					header: {
						'Authorization': token //自定义请求头信息
					},
					success: (res) => {
						// console.log(res.data.state)
						if (res.data.state != true) {
							//用户未登录
							this.state = false
							store.commit('NEEDLOGIN')
						} else {
							//已登录变更登录状态
							this.state = true
							store.commit('ISLOGIN');
						}
					}
				});
			},

		}
	}
</script>

<style scoped>
	.pw{
		display: flex;
		flex-direction: row;
		margin: 2vh 0;
		/* width: 60vw; */
		align-items: center;
		justify-content: center
	}
	.wordInfo {
		display: inline-flex;
		flex-direction: row;
		width: 60vw;
		/* align-items: center; */
		justify-content: space-around;
	}

	.bg {
		height: 100vh;
		background: url(../../static/4.jpg) repeat fixed center;
	}

	.content {
		width: 100vw;
		display: inline-flex;
		height: 65vh;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		margin: 2vh 0;
		width: 40vw;
		height: 40vw;
	}

	.login_btn {
		background-color: #55aaff;
		border-radius: 20rpx;
		width: 75vw;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap
	}

	.login_logo {
		height: 50rpx;
		width: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	button {
		background-color: #55aaff;
	}

	.search_bar {
		pointer-events: none;
	}
</style>
