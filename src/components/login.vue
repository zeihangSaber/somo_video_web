<template>
	<div>
		<button @click="found()">创建会议</button>
		<input type="text" v-model="mid_" placeholder="请输入会议号">
		<button @click="join()">加入会议</button>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				password: '123456', //密码
				type_version: [], //机型和版本号
				account: 'QAtest027', //账号
				uid: '',
				cookie: '',
				mid_:'',
				tenant:'',
				code_data:{
					mid:'',
					uid:''
				}
			}
		},
		mounted() {
			console.log(this.$add_js.browserORverinfo())
			this.type_version = this.$add_js.browserORverinfo()
			this.login()
		},

		methods: {
			// 加入会议的函数
			join: function() {
				let mid = {
					uid: this.uid,
					dt: 2,
					cookie: this.cookie,
					code:this.mid_,
					tenant:this.tenant
				}
				this.$axios.code(mid).then(data => {
					if (data.code == 0) {
							console.log(data.data.id)
							let join_data = {
								mid: data.data.id,
								uid: this.uid,
								dt: 2,
								os: 3,
								device: this.$add_js.uuid(),
								cookie: this.cookie
							}
							this.$axios.join(join_data).then(data_ => {
								if (data_.code == 0) {
									console.log(data_.data)
									var join_data = JSON.stringify(data_.data)
									this.$router.push({
									    //跳转的页面
									    path: '/index',
									    //跳转传出的参数
									    query: {
									        join_data:join_data,
											login_uid:this.uid
									    }
									})
									
								}
							
							})
						}
						
				})
				
			},
			//创建会议
			found: function() {
				let found_data = {
					uid: this.uid,
					dt: 2,
					os: 3,
					device: this.$add_js.uuid(),
					cookie: this.cookie
				}
				this.$axios.found(found_data).then(data => {
					if (data.code == 0) {
						console.log(data)
						this.mid_ = data.data.code
						this.join()
					}
			
				})
			
			},
			// 登陆的函数
			login: function() {
				let paramObj = {
					account: this.account, //账号
					password: this.$md5(this.password), //密码
					dt: 2, //设备类型
					os: 3, //设备OS
					osver: this.type_version[1], //手机或者浏览器的版本号等等
					model: this.type_version[0], //机型(什么手机||什么浏览器等等)
					version: this.$items_version //项目版本号
				}
				this.$axios.login(paramObj).then(data => {
					console.log(data)
					if (data.code == 1002) {
						alert('密码输入错误,请重新输入')
					} else if (data.code == 1001) {
						alert('账号不存在,请重新输入')
					} else if (data.code == 0) {
						this.uid = data.data.uid
						this.cookie = data.data.cookie
						this.tenant = data.data.tenant
						console.log(this.cookie)
					}
				})
			}
		}
	}
</script>

<style scoped>

</style>
