let playerPool = [1,2,3,4,5,6,7,8,9,10];

function createPlayer() {
    let dom = document.createElement('div');
    dom.style.cssText = "width: 100%; height: 100%;";
    let video = document.createElement('video');
    video.className = 'video-js vjs-default-skin';
    dom.append(video);
    dom.player = window["videojs"](video, {
        techOrder: ["flash"],
        aspectRatio: "16:9",
        preload: "none",
        autoplay: false
    });
    return dom
}

playerPool = playerPool.map((i) => {
    return createPlayer();
});

export default playerPool;
