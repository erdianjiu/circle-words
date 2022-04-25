<template>
	<view>
		<view>
			<uni-section type="line">
				<uni-search-bar placeholder="输入要查询的单词" v-model="searchValue" bgColor="#EEEEEE" @cancel="cancel"
					@confirm="search" />
			</uni-section>
		</view>
		<hr />
		<view class="content">
			<view class="top">
				<view>
					<text>{{word.key }}</text>
					<text @click="pronounce" style="margin-left: 15rpx; background-color: #ffff7f; ">{{word.p}}</text>

				</view>
				<text v-if="join" @click="joinWord()"
					style="background-color: #E43D33; color: white; border-radius: 1vw; padding: 0 1vw;"> 加入 </text>
			</view>

			<hr />
			<view v-for="(item,index) in word.e" :key="index">
				<view>{{item}}</view>
			</view>
			<view v-if="show_row" style="background-color: #EEEEEE; margin: 10rpx 0 10rpx 0">
				例句:
			</view>
			<view v-html="word.s"></view>
		</view>

	</view>
</template>

<script>
	import HTMLParser from "@/uni_modules/html-parser/js_sdk/index.js"
	export default {
		data() {
			return {
				join: false,
				searchValue: "",

				word: {
					"key": "",
					"p": "",
					"e": [],
					"s": ""
				},
				show_row: false
			}
		},
		methods: {
			joinWord() {

				const token = wx.getStorageSync("token");
				uni.request({
					url: "https://thesongof404.top:8080/word",
					method: "POST",
					header: {
						'Authorization': token //自定义请求头信息
					},
					data: [this.word.key],
					success: res => {
						if (res.data.code = 100) {
							this.join = false
							console.log(res)
						}

					}
				})

			},
			search() {
				let url = 'https://apii.dict.cn/mini.php?q=' + this.searchValue
				uni.request({
					url: url,
					method: "GET",
					success: (res) => {
						const doc = new HTMLParser(res.data)
						const key = doc.getElementsByClassName("k")[0]['innerHTML'].trim()
						const p = doc.getElementsByClassName("p")[0]['innerHTML'].trim()

						const e = doc.getElementById("e")['innerHTML'].trim().split("<br>")
						let s = doc.getElementById("s")['innerHTML'].trim().replace(/<em>/g,
							'<em style="color:#cc0066">')
						this.join = true
						this.word = {
							"key": key,
							"p": p,
							"e": e,
							"s": s
						}
						this.show_row = true
					}
				});
			},
			cancel() {
				this.join = false
				this.word = {
					"key": "",
					"p": "",
					"e": [],
					"s": ""
				}
				this.text = ""
				this.show_row = false
			},
			pronounce() {
				const src = `https://dict.youdao.com/dictvoice?audio=${this.word.key}`
				const innerAudioContext = wx.createInnerAudioContext()
				innerAudioContext.autoplay = true
				innerAudioContext.src = src
				innerAudioContext.onError((res) => {
					console.log(res.errMsg)
					console.log(res.errCode)
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		margin: 10px;
	}

	.top {
		display: flex;
		justify-content: space-between;
	}
</style>
