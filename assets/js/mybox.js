/*
<div id="mybox">
	<div id="mybox_conteneur">
		<div id="mybox_relative">
			<div id="mybox_close"></div>
			<div id="mybox_contenu">
				<img src="assets/videos/imageTest.jpg"/>
			</div>
		</div>
	</div>
</div>
*/

mybox = {
	width : 480,
	height : 360,
	lien : "",

	init : function() {
		$("a[rel='mybox']").click(function(e){
			e.preventDefault();
			$("#mybox").remove();
			mybox.lien = $(this).attr("href");
			mybox.width = $(this).attr("width");
			mybox.height = $(this).attr("height");
			mybox.left = $(this).attr("left") + "px";
			mybox.top = $(this).attr("top") + "px";
			mybox.open(mybox.lien);
			return false;
		});
	},

	open : function(lien) {
		if(document.audioOnPlay) {
			app.pauseAudio();
		};
		mybox.lien = lien;
		$(".whiteArea .content").append('<div id="mybox"><div id="mybox_conteneur"><div id="mybox_relative"><div id="mybox_close"></div><div id="mybox_contenu"></div></div></div></div>');
		$("#mybox_conteneur").hide();
		$("#mybox_conteneur").css({left: mybox.left, top: mybox.top});
		$("#mybox_loader").hide().fadeIn();
		mybox.load();
		$("#mybox_close").click(mybox.close);
	},

	load : function() {
		$("#mybox_conteneur").show();
		// utilisation de videojs
		$("#mybox_contenu").append('<video class="video-js vjs-default-skin" controls autoplay preload="auto" width="'+mybox.width+'" height="'+mybox.height+'" data-setup="{}"><source src="'+mybox.lien+'.webm" type="video/webm" /><source src="'+mybox.lien+'.ogv" type="video/ogg" /><source src="'+mybox.lien+'.mp4" type="video/mp4" /><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p> </video>');
		$("#mybox_contenu img").hide();
		$("#mybox_contenu").css({width:mybox.largeur, height: mybox.hauteur});
		$("#mybox_contenu img").fadeIn();
	},

	close : function() {
		if(document.audioOnPlay) {
			app.startAudio();
		};
		$("#mybox").remove();
	}

}