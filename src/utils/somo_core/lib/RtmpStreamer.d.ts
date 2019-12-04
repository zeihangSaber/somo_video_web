export default class Streamer {
	private client;
	private dom;
	constructor(options: any, client: any);
	init(): void;
	publish(url: string, name: string): void;
	disconnect(): void;
	setScreenSize(w: number, h: number): void;
	setCamMode(w: number, h: number, fps: number): void;
	setCamFrameInterval(frameInterval: number): void;
	setCamQuality(bandwidth: number, quality: number): void;
	setMicQuality(quality: number): void;
	setMicRate(rate: 5 | 8 | 11 | 22 | 44): void;
}
