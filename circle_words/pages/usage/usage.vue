<template>
	<view >
		<image class="content" src="../../static/intro.jpg" mode=""></image>
		<button class="btn" type="primary" @click="use">点我使用</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			use(){
				uni.navigateTo({
					url:"../words/words"
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		position: fixed;
		z-index: -1;
		height: 100vh;
		width: 100vw;
	}
	.btn{
		width: 25vw;
		position: absolute;
		z-index: 999;
		right: 0;
		border-radius: 3vw;
		bottom: 6vh;
		padding: 0;
		background-color: #5555ff;
	}

</style>
