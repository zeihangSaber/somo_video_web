export interface SocketParameter {
	uid: number;
	mid: number;
	cookie: string;
	device: string;
	dt: number;
}
export interface SoketEvent extends SocketParameter {
	event: number;
}
export interface MyObject {
	[key: string]: any;
}
export interface Post {
	[key: string]: {
		url: string;
		defaultData: string[];
	};
}
export interface DefaultData {
	uid?: number | null;
	dt?: number | null;
	os?: string | null;
	device?: any;
	cookie?: string | null;
	tenant?: number | null;
}
export interface AjaxOptions {
	create: {};
	join: {
		mid: number;
	};
	heartBeat: {
		mid: number;
		mic: "on" | "off";
		camera: "on" | "off";
		sharing: "on" | "off";
		tick: number;
	};
	notifyNet: {
		mid: number;
		nettype: number;
		netstatus: number;
	};
	leave: {
		mid: number;
	};
	/**
	 * @reason
	 * CLOSE_REASON_NORMAL = 0;
	 * CLOSE_REASON_ADMIN = 1;
	 * CLOSE_REASON_NOT_PAY = 2;
	 */
	close: {
		mid: number;
		reason: 0 | 1 | 2;
	};
	invite: {
		mid: number;
		mobile: number;
	};
	call: {
		mid: number;
		callee: number;
	};
	lock: {
		mid: number;
	};
	unlock: {
		mid: number;
	};
	tellYou: {
		mid: number;
		mic: "on" | "off";
		volume: string;
	};
	whoOpenMic: {
		mid: number;
	};
	whoCloseMic: {
		mid: number;
	};
	showYou: {
		mid: number;
		camera: number;
		vendor: number;
		url: string;
	};
	whoOpenVideo: {
		mid: number;
		camera: number;
		vendor: number;
		url: string;
	};
	whoCloseVideo: {
		mid: number;
	};
	itsYou: {
		mid: number;
		peer: number;
		select: number;
	};
	tack: {
		mid: number;
		to: number;
		text: string;
	};
	broadcast: {
		mid: number;
		text: string;
	};
	kick: {
		admin: number;
		uid: number;
		mid: number;
	};
	roleSet: {
		admin: number;
		uid: number;
		mid: number;
		role: number;
	};
	typeSet: {
		admin: number;
		type: number;
	};
	ruleSet: {
		admin: number;
		mid: number;
		rule: number;
		value: number;
	};
	nameSet: {
		admin: number;
		mid: number;
		name: string;
	};
	pwdSet: {
		admin: number;
		mid: number;
		password: string;
	};
	vqosSet: {
		admin: number;
		mid: number;
		vqos: number;
	};
	sharing: {
		mid: number;
		vendor: number;
		url: string;
	};
	noSharing: {
		mid: number;
	};
	queryMid: {
		code: number;
		tenant: number;
	};
}
export interface UserInfo {
	os: number;
	device: string;
	dt: number;
	model: string;
	osver: string;
	version: string;
	uid: number | null;
	role: number | null;
	mid: number | null;
	tenant: number | null;
	cookie: string | null;
	tenantName: string | null;
}
export interface Options {
	src: string;
	width: number;
	height: number;
}
