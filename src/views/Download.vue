<template>
	<div>
		<div class="lbanner"></div>
		<div class="t1">
			<h1>客户端下载</h1>
			<h2>DOWNLOAD</h2>
		</div>

		<div class="download con ck clear">
			<div class="mobile">
				<p class="title">移动端下载</p>
				<div class="download-iPhone downloads" @mouseover="mouseOver(1)" @mouseleave="mouseLeave">
					<div id="download-mobile" class="img-wrapper">
						<img class="platform" src="../assets/download/iPhone.svg" />
						<qrcode-vue
							class="download-icon mobile-qrcode"
							:value="url"
							:size="size"
							level="H"
						></qrcode-vue>
						<!-- <img class="download-icon mobile-qrcode" /> -->
						<p class="hover-message">扫描二维码下载</p>
					</div>
					<p>iPhone 版（支持iPad）</p>
					<h3 v-if="show == 1">（支持iOS 9.0及以上系统）</h3>
				</div>
				<div class="download-Android downloads" @mouseover="mouseOver(2)" @mouseleave="mouseLeave">
					<div class="img-wrapper">
						<img class="platform" src="../assets/download/Android.svg" />
						<qrcode-vue
							class="download-icon mobile-qrcode"
							:value="url"
							:size="size"
							level="H"
						></qrcode-vue>
						<!-- <img class="download-icon mobile-qrcode" /> -->
						<p class="hover-message">扫描二维码下载</p>
					</div>
					<p>Android 版</p>
					<h3 v-if="show == 2">（支持Android 5.0及以上系统）</h3>
				</div>
			</div>
			<div class="pc">
				<p class="title">PC端下载</p>
				<div class="download-Mac downloads" @mouseover="mouseOver(3)" @mouseleave="mouseLeave">
					<a
						href="http://somo-video-update.oss-cn-beijing.aliyuncs.com/release_all/SOMO_Installer.dmg"
						style="text-decoration:none"
					>
						<div class="img-wrapper">
							<img class="platform" src="../assets/download/Mac.svg" />
							<a target="blank" id="macAddress">
								<img class="download-icon" src="../assets/download/download.svg" />
							</a>
							<p class="hover-message">点击直接下载</p>
						</div>

						<p>Mac 版</p>
					</a>
					<h3 v-if="show == 3">
						（用户第一次安装蓝猫微会后，需要在系统偏好设置的“安全性与隐私”中信任客户端。
						<span id="checking" @click="details(1)">查看详细说明</span>）
					</h3>
				</div>
				<div class="download-Windows downloads" @mouseover="mouseOver(4)" @mouseleave="mouseLeave">
					<a
						href="http://somo-video-update.oss-cn-beijing.aliyuncs.com/release_all/SOMO_Setup.exe"
						style="text-decoration:none"
					>
						<div class="img-wrapper ">
							<img class="platform" src="../assets/download/Windows.svg" />
							<a target="blank" id="winAddress">
								<img class="download-icon" src="../assets/download/download.svg" />
							</a>
							<p class="hover-message">点击直接下载</p>
						</div>

						<p>Windows 版</p>
					</a>
					<h3 v-if="show == 4">
						（支持Windows7 64位及以上操作系统）
					</h3>
				</div>
			</div>
		</div>
		<div id="installation" v-if="installation_show == 1">
			<div class="installation-mask"></div>
			<div class="installation-menu">
				<div class="installation-menu-header">
					<span class="header-left">MAC版客户端安装指南</span>
					<span class="header-right" id="installation-close" @click="details(0)"></span>
				</div>
				<div class="installation-menu-content">
					<div class="menu-content">
						<div class="content-title">
							MAC系统第一次启动app，系统提示以下异常：拷贝
						</div>
						<img class="content-img" src="../assets/download/somo_installation_content_img1.png" />
					</div>
					<div class="menu-content">
						<div class="content-title">
							需要在系统偏好设置中打开“安全与隐私”
						</div>
						<img class="content-img" src="../assets/download/somo_installation_content_img2.png" />
					</div>
					<div class="menu-content">
						<div class="content-title">
							切换到“通用”标签页面，选择“仍要打开”
						</div>
						<img class="content-img" src="../assets/download/somo_installation_content_img3.png" />
					</div>
				</div>
			</div>
		</div>
		<div class="foo2">
			<a href="http://somo-video-update.oss-cn-beijing.aliyuncs.com/web_file/somo_install_guide.pdf">
				客户端安装指南 <img src="../assets/download/dow.png" href="" />
			</a>
			<a href="http://somo-video-update.oss-cn-beijing.aliyuncs.com/web_file/somo_imp_plan.pdf">
				设备安装指南 <img src="../assets/download/dow.png" alt="" />
			</a>
			<a href="http://somo-video-update.oss-cn-beijing.aliyuncs.com/web_file/somo_use_book.pdf">
				功能使用说明书 <img src="../assets/download/dow.png" alt="" />
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import QrcodeVue from "qrcode.vue";
@Component({
	components: {
		QrcodeVue
	}
})
export default class Download extends Vue {
	url = "http://www.somo.tech/mobile";
	show = 0;
	size = 160;
	installation_show = 0;
	details(e: number) {
		this.installation_show = e;
	}
	// 移出
	mouseLeave() {
		this.show = 0;
	}
	// 移入
	mouseOver(e: any) {
		this.show = e;
	}
}
</script>

<style lang="less" scoped>
@import "../common/common";

.inthemiddle {
	left: 50%;
	transform: translate(-50%, 0);
}

@displaytitle {
	font-size: 32px;
	line-height: 45px;
	color: rgba(0, 0, 0, 0.87);
}

.content(@rgba: rgba(0, 0, 0, 0.54), @size: 18px, @height: 25px) {
	font-size: @size;
	color: @rgba;
	line-height: @height;
}

.box (@width, @height) {
	width: @width;
	height: @height;
}

* {
	text-align: center;
	font-weight: normal;
}

.lbanner {
	background: url(../assets/download/head.png) no-repeat;
	height: 233px;
	background-position: center center;
	background-size: cover;
}
.t1 {
	margin: 68px auto;
	margin-bottom: 0px;
	text-align: center;

	h1 {
		font-size: 30px;
		font-weight: normal;
		font-stretch: normal;
		color: #5482f8;
	}

	h2 {
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		margin-top: 10px;
		color: #a0a1a2;
	}
}

.ck {
	> div {
		float: left;
		width: 50%;
		text-align: center;

		h1 {
			font-size: 24px;
			font-weight: normal;
			font-stretch: normal;
			color: #282828;
			margin-bottom: 50px;
		}

		&:first-child {
			.f2 {
				border-right: 1px solid #ddd;
			}
		}
	}

	.f2 {
		display: flex;
		align-items: center;
		justify-content: center;

		a {
			margin: 0 47px;
			display: block;
		}
	}

	p {
		font-size: 18px;
		font-weight: normal;
		font-stretch: normal;
		color: #282828;
		margin-top: 15px;
	}
}

.download {
	display: flex;
	justify-content: center;
	// align-items: center;
	.mobile {
		height: 500px !important;
		&::after {
			content: "";
			background: rgba(0, 0, 0, 0.1);
			height: 180px;
			position: absolute;
			width: 1px;
			margin-top: 130px;
			// margin-left: 40px;
			right: 0px;
		}

		// border-right: 1px solid rgba(0, 0, 0, 0.1);
	}

	.mobile,
	.pc {
		.box (600px, 100%);
		position: relative;
		// display: inline-block;
		display: flex;

		p.title {
			.content (rgba(0, 0, 0, 0.87), 24px, 32px);
			.inthemiddle ();
			position: absolute;
			top: 80px;
		}

		div {
			.box (50%, 100%);
			display: inline-block;

			.img-wrapper {
				.box (160px, 160px);
				box-sizing: border-box;
				position: relative;
				margin-top: 128px;
				background: #fff;
				border: 1px solid rgba(0, 0, 0, 0.05);

				.download-icon {
					visibility: hidden;
					position: absolute;
					top: 36px;
					left: 36px;
					border: none;
				}

				.mobile-qrcode {
					.box (160px, 160px);
					top: 0;
					left: 0;
				}

				&:hover {
					.download-icon {
						visibility: visible;
					}

					border: none;
					background-color: #118bfb;
					filter: progid:dximagetransform.microsoft.gradient(startColorstr='#27bffd', endColorstr='#118bfb', GradientType=0);
					filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);
					background: linear-gradient(-90deg, #27bffd 0%, #118bfb 100%);

					.platform {
						visibility: hidden;
					}

					.hover-message {
						visibility: visible;
					}
				}

				img {
					.box (88px, 88px);
					position: absolute;
					top: 36px;
					left: 36px;
				}

				.hover-message {
					.inthemiddle();
					.content (rgba(0, 0, 0, 0.38), 14px, 20px);
					top: 213px;
					position: absolute;
					width: 100px;
					visibility: hidden;
					margin-top: 4px;
				}
			}

			p {
				.content (rgba(0, 0, 0, 0.87));
				margin-top: 24px;
			}

			h3 {
				// opacity: 0;
				margin-left: 30px;
				margin-top: 35px;
				max-width: 200px;
				overflow-x: hidden;
				text-overflow: ellipsis;
				font-size: 16px;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				line-height: 24px;
				text-align: left;
				transition: opacity 0.5s;

				span {
					color: #0359d5;
					text-decoration: underline;
					cursor: pointer;
				}
			}

			.show {
				opacity: 1;
			}
		}

		// .download-iPhone {
		//   position: relative;
		//   top: -24px;
		// }
		// .download-Windows {
		//   position: relative;
		//   top: -48px;
		// }
	}
}

#installation {
	// display: none;

	.installation-mask {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		background-color: #080102;
		opacity: 0.5;
		z-index: 100;
		transition: all 0.2 ease-in-out;
	}

	.installation-menu {
		width: 1170px;
		z-index: 101;
		background: #ffffff;
		border: 4px solid rgba(221, 221, 221, 1);
		position: fixed;
		left: 50%;
		top: 10%;
		transform: translateX(-50%);

		.installation-menu-header {
			width: 100%;
			height: 60px;
			background: #f2f2f2;
			position: relative;
			text-align: left;

			.header-left {
				margin-left: 40px;
				font-size: 20px;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				line-height: 60px;
			}

			.header-right {
				cursor: pointer;
				width: 17px;
				height: 20px;
				position: absolute;
				right: 36px;
				top: 50%;
				transform: translateY(-50%);
				background-image: url("../assets/download/somo_installation_close.png");
				background-size: 100% 100%;
			}
		}

		.installation-menu-content {
			padding: 50px 145px 0 110px;
			max-height: 800px;
			overflow-y: auto;

			.menu-content {
				margin-bottom: 70px;

				.content-title {
					text-align: left;
					font-size: 22px;
					font-weight: 400;
					color: rgba(51, 51, 51, 1);
					margin-bottom: 20px;
				}
			}
		}
	}
}

.foo2 {
	background: #ededed;
	display: flex;
	justify-content: center;
	height: 100px;
	align-items: center;
	margin-top: 150px;

	a {
		display: flex;
		align-items: center;
		font-size: 14px;
		font-weight: normal;
		font-stretch: normal;
		color: #666666;
		margin: 0 30px;

		img {
			height: 14px;
			margin-left: 10px;
		}
	}
}

@media screen and (max-height: 1000px) {
	#installation > .installation-menu > .installation-menu-content {
		max-height: 600px;
	}
}
</style>
