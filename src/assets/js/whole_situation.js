
var all_export = {
	//接入声网的函数
	voice_band:function(mid,appid,_uid){
		// alert(mid.toString())
		// console.log("start voice logic, uid/mid=" + this.router_data.uid + "/" + mid)
		var that = this
		var client, localStream, camera, microphone;
		var channel_key = null;
		var num = mid.toString()
		client = AgoraRTC.createClient({//创建客户端。
			mode: 'rtc',
			codec: 'h264'
		});
		// 初始化客户端对象。
		client.init(appid, function() {
			//console.log(that.$route.query.uid,'自己的uid打印')
			// join;加入 AgoraRTC 频道。
			client.join(channel_key, num, _uid, function(uid) {
				// console.log("join channel successfully, uid=" + uid);
				AgoraRTC.getDevices(function(devices) {
					
				});
				localStream = AgoraRTC.createStream({//创建音视频流对象。
					streamID: _uid,
					audio: true,
					//cameraId: camera,
					//microphoneId: microphone,
					//video: document.getElementById("video").checked,
					video: true,
					screen: false
				});
				localStream.init(function() {
					console.log("getUserMedia successfully");
					localStream.play('agora_local');//播放音视频流。
	
					client.publish(localStream, function(err) {//发布本地音视频流至 SD-RTN。
						console.log("Publish local stream error: " + err);
					});
	
					client.on('stream-published', function(evt) {
						alert('发布本地音视频流成功')
						console.log("Publish local stream successfully");
					});
				}, function(err) {
					console.log("getUserMedia failed", err);
				});
				
			}, function(err) {
				console.log("Join channel failed", err);
			});
		}, function(err) {
			console.log("AgoraRTC client init failed", err);
		});
		//监听新人加入的事件
		client.on('stream-added', function(evt) {
			alert("加入新人")
			//console.log("peer stream add, uid=" + evt.stream)
			var stream = evt.stream;
			console.log("subscribe new stream, stream=" + stream.getId());
			client.subscribe(stream, function(err) {
				
				console.log("subscribe stream failed", err);
			});
			
			
		});
		//订阅远程流(获取会议室内的视频音频流)
		client.on('stream-subscribed', function(evt) {
			console.log('获取订阅远程音视频流',evt)
			var stream = evt.stream;
			console.log("stream subscribed, stream=" + stream.getId())
			if ($('div#video #agora_remote' + stream.getId()).length === 0) {
				$('div#video').append('<div id="agora_remote' + stream.getId() +
					'" style="float:left; width:810px;height:607px;display:inline-block;"></div>');
			}
	
			console.log("play remote stream, stream=" + stream.getId());
			stream.play('agora_remote' + stream.getId());
		});
		
		client.on('stream-removed', function(evt) {
			var stream = evt.stream;
			stream.stop();
			$('#agora_remote' + stream.getId()).remove();//stream.getId();获取stream音视频流 ID
			console.log("Remote stream is removed " + stream.getId());
		});
		// 退出会议
		client.on('peer-leave', function(evt) {
			//alert('退出会议')
			console.log("peer leave meeting, peer=" + evt.uid)
			var stream = evt.stream;
			if (stream) {
				stream.stop();
				$('#agora_remote' + stream.getId()).remove();
				console.log(evt.uid + " leaved from this channel");
			}
		});
	},
	// 数组中对象的排序
	 sortKey:function (array, key) {
		return array.sort(function(a, b) {
			var x = a[key];
			var y = b[key];
			return ((x < y) ? -1 : (x > y) ? 1 : 0)
		})
	},
	// 获取当前是什么浏览器和当前版本号
	browserORverinfo:function () {
		var browserORverinfo = []
		browserORverinfo[0] = (getBrowserInfo() + "").replace(/[^a-z]/ig, "")
		browserORverinfo[1] = (getBrowserInfo() + "").replace(/[^0-9.]/ig, "")
		return browserORverinfo
	},
	// 获取随机字符串的函数
	uuid:function () {
		const s = []
		const hexDigits = '0123456789abcdef'
		for (let i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
		}
		s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] && 0x3) || 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = '-'
		s[13] = '-'
		s[18] = '-'
		s[23] = '-'
		return s.join('')
	}
}
// 获取当前是什么浏览器和当前版本号
	function getBrowserInfo() {
		var agent = navigator.userAgent.toLowerCase();
		var regStr_ie = /msie [\d.]+;/gi;
		var regStr_ff = /firefox\/[\d.]+/gi;
		var regStr_chrome = /chrome\/[\d.]+/gi;
		var regStr_saf = /safari\/[\d.]+/gi;
		//IE
		if (agent.indexOf("msie") > 0) {
			return agent.match(regStr_ie);
		}
		//firefox
		if (agent.indexOf("firefox") > 0) {
			return agent.match(regStr_ff);
		}
		//Safari
		if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
			return agent.match(regStr_saf);
		}
		//Chrome
		if (agent.indexOf("chrome") > 0) {
			return agent.match(regStr_chrome);
		}
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
export default all_export

