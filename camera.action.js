"use stric";

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

var video = document.querySelector("video"),
	videos = document.querySelectorAll("video"),
	shoot = document.querySelector("#shoot"),
	//canvas = document.createElement("canvas"),
	img = document.createElement("img"),
	body = document.body,
	//canvas = document.querySelector("canvas"),
	onFailSoHard = function () {
		console.log("Fail!");
	},
	snapshoot = function () {
		var canvas = document.createElement("canvas");

		canvas.width = video.width;
		canvas.height = video.height;
		//canvas.width = video.videoWidth;
		//canvas.height = video.videoHeight;
		var sourceX = 0,
			sourceY = 0,
			sourceWidth = canvas.width,
			sourceHeight = canvas.height;

		canvas.getContext("2d").drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight);
		
		// img.src = canvas.toDataURL("image/png");
		// canvas.toDataURL('image/webp');
		// body.appendChild(img);
		
		//var data = canvas.toDataURL("image/octet-stream");
		//window.location.href = data;

		body.appendChild(canvas);
		
		

		// canvas.toDataURL(); // Returns base64
		// canvas.toDataURL("image/jpeg");
	};


navigator.getUserMedia("video", function (LocalMediaStream) {
	Array.prototype.forEach.call(videos, function (e, i) {
		e.src = window.webkitURL.createObjectURL(LocalMediaStream);
	});
	//video.src = window.webkitURL.createObjectURL(LocalMediaStream);
}, onFailSoHard);

shoot.addEventListener("click", snapshoot);

window.unload = function () {
	body.removeChild(video);
};


/*

navigator.getUserMedia({video: true}, success, fallback);

navigator.getUserMedia({audio: true, video: true}, function(stream) {
	video.src = window.webkitURL.createObjectURL(stream);
}, onFailSoHard);

*/