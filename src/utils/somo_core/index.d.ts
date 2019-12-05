import { Options } from "./lib/Types";
import Ajax from "./lib/ajax";
export default class Somo extends Ajax {
	static ajax: typeof Ajax;
	join: any;
	leave: any;
	private socket;
	init(): void;
	initStreamer(options: Options): void;
	joinMid(...arg: any[]): any;
	leaveMid(...arg: any[]): any;
	[key: string]: any;
}
