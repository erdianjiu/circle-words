//这里添加token

export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	wx.setStorage({
		key: name,
		data: content
	});
}
// export const getStore = name => {
// 	if (!name) return;
// 	wx.getStorageSync({
// 		key: name,
// 		success(res) {
// 			console.log(res.data)
// 			return res.data
// 		}
// 	})
// }
export const removeStore = name => {
	if (!name) return;
	wx.removeStorage({
		key: name
	});

}
