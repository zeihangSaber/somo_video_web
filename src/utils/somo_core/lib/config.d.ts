declare const config: {
	wsUrl: string;
	uuid: string;
	mid: number;
	appID: string;
	client: null;
};
export declare const events: {
	2: string;
	3: string;
	4: string;
	6: string;
	7: string;
	8: string;
	9: string;
	10: string;
	11: string;
	12: string;
	20: string;
	21: string;
	23: string;
	25: string;
	41: string;
	65: string;
	66: string;
};
export declare function uuid(): string;
export declare function getOS(): "Windows" | "Mac" | "Unix" | "Linux" | "other";
export declare function getBrowserInfo(): any;
export default config;