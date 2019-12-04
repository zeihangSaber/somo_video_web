import { Post, UserInfo } from "./Types";
export default class Ajax {
	static send: (data: any) => any;
	defaultParameter: UserInfo;
	private env;
	ajaxInit(): void;
	postInit(obj: Post): void;
	setTenant(tenant: number): void;
	setMid(mid: number | null): void;
	setUid(uid: number): void;
	setRole(role: number): void;
	setCookie(cookie: string): void;
	setEnv(mode: "dev" | "pro"): void;
	private getUserInfo;
}
