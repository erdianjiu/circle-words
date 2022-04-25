<template>
	<view>
		<image @click="btnChange()" style="height: 100vh; width: 100vw;" v-if="startBtn" src="../../static/up-up-man.png" mode="center"> </image>
			<view class="title">
				<text style="font-weight: bold;
								font-size: larger;">{{word.key }}</text>
				<text @click="pronounce" style="margin-left: 15rpx; background-color: #ffff7f;">{{word.p}}</text>
			</view>
			<view v-if="!startBtn">
				<view class="blank" v-if="!showContent" @click="contentBtn">
					点击屏幕查看答案
				</view>
				<view class="content" v-if="showContent">

					<view v-for="(item,index) in word.e" :key="index">
						<view>{{item}}</view>
					</view>
					<view v-if="show_frame" style="background-color: #f4f4f4; margin: 20rpx 0 20rpx 0">
						例句:
					</view>
					<view v-html="word.s"></view>

					<view v-if="showContent" class="btns">
						<button type="primary" style=" border-radius: 3vw; margin-bottom: 2vh; left: 10vw;"
							@click="ik">我认识</button>
						<button type="default" style=" border-radius: 3vw; left: 10vw; background-color: #ffaa00;"
							@click="dk">不认识</button>
					</view>
				</view>
			</view>



	</view>
</template>

<script>
	import HTMLParser from "@/uni_modules/html-parser/js_sdk/index.js"
	import store from '@/store/index.js'
	import {
		setStore,
		getStore
	} from "../../utils/storage.js";
	export default {
		data() {
			return {
				words: [],
				selectItem: 0,
				startBtn: true,
				word: {
					"key": "",
					"p": "",
					"e": "",
					"s": ""
				},
				show_frame: false,
				showContent: true,
			}
		},
		onLoad() {
			this.getData()
			console.log(wx.getStorageSync("selectItem"))
			let num = wx.getStorageSync("selectItem");
			if(num != ""){
				this.selectItem = num
			}
			// console.log(this.selectItem)
			// this.selectItem = getStore("selectItem")
		},
		onHide () {
			setStore("selectItem", this.selectItem)
		},
		methods: {
			ik() {
				this.selectItem = (this.selectItem + 1) % this.words.length
				this.showContent = false
				this.word = {
						"key": "",
						"p": "",
						"e": "",
						"s": ""
					},
					this.search()
			},
			dk() {
				this.selectItem = (this.selectItem + 1) % this.words.length
				this.words.push(this.words[this.selectItem])
				this.showContent = false
				this.word = {
						"key": "",
						"p": "",
						"e": "",
						"s": ""
					},
					this.search()
			},
			contentBtn() {
				this.showContent = true
			},
			btnChange() {
				this.startBtn = false
				this.showContent = false
				this.search()
			},
			getData() {
				const token = wx.getStorageSync("token");
				if (token != "") {
					uni.request({
						url: "https://thesongof404.top:8080/word",
						method: "GET",
						header: {
							'Authorization': token //自定义请求头信息
						},
						success: res => {
							// console.log(res)
							if (res.statusCode != 404) {
								this.words = res.data.data
							} else {
								this.getData()
							}
						},
						fail: res => {
							this.getData()
						}
					})
				}
			},
			pronounce() {
				const src = `https://dict.youdao.com/dictvoice?audio=${this.words[this.selectItem].word}`
				const innerAudioContext = wx.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = src
				innerAudioContext.onError((res) => {
					console.log(res.errMsg)
					console.log(res.errCode)
				})
			},
			search() {
				this.pronounce()
				// console.log(this.words)
				let url = 'https://apii.dict.cn/mini.php?q=' + this.words[this.selectItem].word
				uni.request({
					url: url,
					method: "GET",
					success: (res) => {
						// console.log(res)
						if (res.statusCode == 200) {
							const doc = new HTMLParser(res.data)
							const key = this.words[this.selectItem].word
							let s = doc.getElementById("s")
							// console.log(s)
							if (s != undefined) {
								const e = doc.getElementById("e")['innerHTML'].trim().split("<br>")
								const p = doc.getElementsByClassName("p")[0]['innerHTML'].trim()
								let s = doc.getElementById("s")['innerHTML'].trim().replace(/<em>/g,
									'<em style="color:#cc0066">')
								this.show_frame = true
								this.word = {
									"key": key,
									"p": p,
									"e": e,
									"s": s
								}
							} else {
								this.word = {
									"key": key,
									"p": "",
									"e": "",
									"s": ""
								}
							}

						} else {
							this.search()
						}


					}
				});

			},
		}
	}
</script>

<style scoped>
	.content {
		margin: 10px;
	}

	.title {
		display: flex;
		justify-content: center;
		margin: 2vh 0;
	}

	.blank {
		top: 20vh;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 60vh;
		font-size: x-large;
		color: #afafaf;
	}

	.btns {
		position: fixed;
		width: 70vw;
		top: 80vh
	}
</style>
