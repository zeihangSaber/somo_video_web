import { SocketParameter } from "./Types";
declare const EventEmitter: any;
export declare let eventPool: number[];
export declare class Socket extends EventEmitter {
	private ws;
	private readonly heartBitHz;
	private readonly heartBitHzHttp;
	private readonly reconnectHz;
	private socketParameter;
	private client;
	constructor(data: SocketParameter, client: any);
	private createWebSocket;
	private init;
	private send;
	private close;
}
export {};
