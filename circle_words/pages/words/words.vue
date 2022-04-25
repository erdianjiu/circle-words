<template>
	<view class="content">
		<ksp-cropper mode="free" :width="200" :height="140" :maxWidth="1024" :maxHeight="1024" :url="url"
			@cancel="oncancel" @ok="onok"></ksp-cropper>
		<view class="imgpart">
			<view>
				<image class="img" @click="pre" mode="heightFix" :src="path" />
			</view>

			<view class="btns">
				<button class="btn" type="default" @click="exp">示例</button>
				<button class="btn" type="default" @click="clear">清除</button>
				<button class="btn" type="default" :loading="loadingState" @click="ocr">圈词</button>
			</view>
		</view>


		<!-- <button type="default" @click="test">test</button> -->
		<view class="separate"><text>单词列表</text> <text @click="uploadWord" style="border: #000000;">{{joinText}}</text>
		</view>
		<view style="height: 20vh; width: 100vw; display: flex; align-items: center; justify-content: center;"
			v-if="waiting">
			请等待，数据返回中...
		</view>
		<view class="list">

			<view class="word" v-for="(item,index) in words" :key="index">
				<input type="text" :value="words[index]" />
				<view class="deleteBtn" @click="deleteWord(index)">删除</view>
			</view>
		</view>

	</view>
</template>

<script>
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				waiting:false,
				url: '',
				path: '',
				words: [],
				loadingState: false,
				joinText: "一键加入"
			}
		},
		onLoad: function(option) {
			//option为object类型，会序列化上个页面传递的参数
			this.url = option.imgurl //打印出上个页面传递的参数。
			console.log(this.url)
		},
		methods: {
			uploadWord() {

				if (this.joinText == "一键加入") {
					const token = wx.getStorageSync("token");
					uni.request({
						url: "https://thesongof404.top:8080/word",
						method: "POST",
						header: {
							'Authorization': token //自定义请求头信息
						},
						data: this.words,
						success: res => {
							if (res.data.code = 100) {
								this.joinText = "加入成功"
								console.log(res)
							}

						}
					})
				}

			},
			deleteWord(index) {
				this.words.splice(index, 1)
				console.log(this.words.length)
			},
			clear() {
				this.path = ""
				this.url = ""
				this.words = []
			},
			test() {
				console.log(this.path)
			},
			exp() {
				this.waiting = true
				this.path = "https://thesongof404.top:3000/blog/test.jpg"
				// r.dataco
				setTimeout(() => {
					this.waiting =false
					this.words=["immaculate", "uncrate", "jewelry", "silverware", "engraver", "waddled", "solitary"]
				}, 3000);
			},

			pre() {
				// console.log(this.path)
				let len = this.path.length
				// console.log(len)
				if (len != 0) {
					let that = this;
					let imgsArray = [];
					imgsArray[0] = that.path
					uni.previewImage({
						current: 0,
						urls: imgsArray,
					});
				} else {
					uni.chooseImage({
						success(res) {
							uni.navigateTo({
								url: "../words/words?imgurl=" + res.tempFilePaths
							})
						}
					})
				}
			},
			onok(ev) {
				this.url = "";
				this.path = ev.path;

			},
			oncancel() {
				// url设置为空，隐藏控件
				this.loadingState = false
				this.url = "";
			},
			ocr() {
	
				let len = this.path.length
				if (len != 0 && this.path != "https://thesongof404.top:3000/blog/test.jpg") {
					this.waiting = true
					this.loadingState = true
					let that = this;
					uni.getFileSystemManager().readFile({
						filePath: that.path,
						encoding: 'base64',
						success: r => { // r.data
							// r.data
							let that = this;
							let data64 = {
								"images": [r.data]
							}
							// console.log(data64)
							uni.request({
								url: "https://thesongof404.top:8080/ocr",
								method: "POST",
								data: data64,
								success: res => {
									this.waiting = false
									this.loadingState = false
									let words = []
									let wordList = res.data.results[0]
									for (let i = 0; i < wordList.length; i++) {
										words.push(wordList[i].text)
									}
									this.words = words
								},
								fail: res => {
									console.log("fail")
								}
							})
						}
					})
				}
			},
		}
	}
</script>

<style scoped>
	.content {
		/* padding: 3vh 3vw 0 3vw; */

	}

	.separate {
		background-color: #aaffff;
		height: 4vh;
		padding: 1vh 4vw 0 4vw;
		display: flex;
		justify-content: space-between;
		width: vw;
	}

	.imgpart {
		height: 20vh;
		display: flex;
		padding: 1vh 4vw 0 4vw;
		justify-content: space-between;
	}

	.btns {
		margin-left: 15vw;
		margin-top: -1vh;
		height: 20vh;
	}

	.img {

		height: 16vh;
		width: 16vh;
		background-color: #fffeee;
		border: #ffff7f dashed;
	}

	/* .list {
		padding: 1vh 4vw 5vh 4vw;
	} */
	.word {

		padding: 5rpx 4vw;
		display: flex;
		justify-content: space-between;
	}

	.word:nth-child(2n) {
		background-color: #f3ffd7;
	}

	.word:last-child {
		margin-bottom: 15vh;
	}

	.btn {
		background-color: #f3ffd7;
	}
</style>
