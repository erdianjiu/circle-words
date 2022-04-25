<template>
	<view class="content">
		
		<view class="top">
			<image class="avatar" :src="avatar" mode="widthFix"></image>
			<view v-if="!s">
			{{name}}
			</view>
		</view>
		
		<view style="margin: 2vh 0;">
			<text>集思广益:</text>
		</view>
		<view class="ipt">
			<input  style="height: 5vh; background-color: #DCDFE6; border-radius: 15rpx; margin: 2vh 0;"  v-model="message.words"  type="text" placeholder="小程序还未开发完,请献上您的宝贵建议吧!" value="" />
			<input style="height: 5vh; background-color: #DCDFE6; border-radius: 15rpx; margin: 2vh 0;" v-model="message.contact" type="text" placeholder="联系方式(手机/微信号)" />
		</view>
		<button type="primary" @click="msg()" :loading="ld">提交</button>
		
	</view>
</template>

<script>
	import {
		getStore
	} from "../../utils/storage.js";
	export default {
		data() {
			return {

				ld:false,
				name: '',
				avatar:'',
				message:{
					words:"",
					contact:""
				}
			}
		},
		onLoad() {
			this.name = wx.getStorageSync("name")
			this.avatar = wx.getStorageSync("avatar")
		},
		methods: {
			contactInput:function(event){
				this.message.contact = event.target.value
			},
			wordsInput: function(event) {
			            this.message.words = event.target.value
			        },
			msg(){
				console.log(this.message)
				this.ld = true
				uni.request({
					url: 'https://thesongof404.top:8080/msg', //仅为示例，并非真实接口地址。
					method: 'POST',
					data:{
						message:this.message
					},
					success: (res) => {
							this.ld = false
					}
				});
			}
		}
	}
</script>

<style scoped>
	.content{
		margin: 3vh 4vw;
	}
	.avatar{
		width: 30vw;
		border-radius: 15vw;
		/* border-radius: 15vw; */
	}
	.top{
		width: 96vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
