package {

import flash.display.MovieClip;
import flash.display.DisplayObject;
import flash.external.ExternalInterface;
import flash.net.NetConnection;
import flash.net.NetStream;
import flash.events.NetStatusEvent;
import flash.events.IOErrorEvent;
import flash.events.StatusEvent;
import flash.media.Video;
import flash.media.VideoCodec;
import flash.media.VideoStatus;
import flash.media.VideoStreamSettings;
import flash.utils.*;

public class Player extends MovieClip {

    internal var nc:NetConnection;
    internal var nsPlayer:NetStream;
    internal var vidPlayer:Video;

    internal var _screenWidth:int = 320;
    internal var _screenHeight:int = 240;
    internal var _screenX:int = 0;
    internal var _screenY:int = 0;

    internal var _bufferTime:int = 1;

    public function Player() {
        ExternalInterface.addCallback("setScreenSize", setScreenSize);
        ExternalInterface.addCallback("setScreenPosition", setScreenPosition);

        ExternalInterface.addCallback("play", playVideo);
        ExternalInterface.addCallback("disconnect", disconnect);

        ExternalInterface.addCallback("setBufferTime", setBufferTime);

        ExternalInterface.call("setSWFIsReady");
    }

    public function setScreenSize(width:int, height:int):void {
        _screenWidth = width;
        _screenHeight = height;
    }

    public function setScreenPosition(x:int, y:int):void {
        _screenX = x;
        _screenY = y;
    }

    public function playVideo(url:String, name:String):void {
        this.connect(url, name, function (name:String):void {
            displayPlaybackVideo(name);
        });
    }

    public function disconnect():void {
        nc.close();
    }

    public function setBufferTime(num: int): void {
        _bufferTime = num;
    }

    private function connect(url:String, name:String, callback:Function):void {
        nc = new NetConnection();
        nc.addEventListener(NetStatusEvent.NET_STATUS, function (event:NetStatusEvent):void {
            ExternalInterface.call("console.log", "try to connect to " + url);
            ExternalInterface.call("console.log", "Player." + event.info.code);
            if (event.info.code == "NetConnection.Connect.Success") {
                callback(name);
            }
            if (event.info.code == "NetConnection.Connect.Closed") {
                ExternalInterface.call("console.log", "播发器连接断开~~~~~~~~~~~~~~");
            }
        });
        nc.proxyType = "best";
        nc.connect(url);
    }

    private function displayPlaybackVideo(name:String):void {
        nsPlayer = new NetStream(nc);
        setInterval(function ():void {
            ExternalInterface.call("console.log", "bufferLength:" + nsPlayer.bufferLength + "~~~bufferTime:" + nsPlayer.bufferTime + "~~~bufferTimeMax:" + nsPlayer.bufferTimeMax);
            ExternalInterface.call("console.log", "currentFPS:" + nsPlayer.currentFPS + "~~~liveDelay:" + nsPlayer.liveDelay);
            ExternalInterface.call("console.log", "connected:" + nsPlayer.info);
        }, 1000);

        nsPlayer.addEventListener(NetStatusEvent.NET_STATUS, function (event: NetStatusEvent): void {
            ExternalInterface.call("console.log", event.info.code);
            ExternalInterface.call("handlePlayer", name, event.info.code);
        });

        nsPlayer.bufferTime = _bufferTime;
        nsPlayer.bufferTimeMax = 1;
        nsPlayer.inBufferSeek  = false;
        nsPlayer.checkPolicyFile = false;
        nsPlayer.play(name);

        vidPlayer = getPlayer();
        vidPlayer.attachNetStream(nsPlayer);
        addChild(vidPlayer);
    }

    private function getPlayer():Video {
        vidPlayer = new Video(_screenWidth, _screenHeight);
        vidPlayer.deblocking = 1;
        vidPlayer.smoothing = false;
        vidPlayer.x = _screenX;
        vidPlayer.y = _screenY;
        return vidPlayer;
    }

}

}
