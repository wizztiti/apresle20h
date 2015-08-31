audioPlayer = {
    audio : null,

    init : function(){
        audio = $(".audioDemo");
        //this.addEventHandlers();
    },

    addEventHandlers : function() {
        $("a.load").click(this.loadAudio);
        $("a.start").click(this.startAudio);
        $("a.forward").click(this.forwardAudio);
        $("a.back").click(this.backAudio);
        $("a.pause").click(this.pauseAudio);
        $("a.stop").click(this.stopAudio);
        $("a.volume-up").click(this.volumeUp);
        $("a.volume-down").click(this.volumeDown);
        $("a.mute").click(this.toggleMuteAudio);
    },

    loadAudio : function(){ 
        audio.bind("load",function(){
            //alert("Audio Loaded succesfully");
        });
        audio.trigger('load');
    },

    startAudio : function(){
        audio.trigger('play');
    },

    pauseAudio : function(){
        audio.trigger('pause');
    },

    stopAudio : function(){
        audioPlayer.pauseAudio();
        audio.prop("currentTime",0);
    },

    forwardAudio : function(){
        audioPlayer.pauseAudio();
        audio.prop("currentTime",audio.prop("currentTime")+5);
        startAudio();
    },

    backAudio : function(){
        audioPlayer.pauseAudio();
        audio.prop("currentTime",audio.prop("currentTime")-5);
        audio.startAudio();
    },

    volumeUp : function(){
        var volume = audio.prop("volume")+0.2;
        if(volume >1){
            volume = 1;
        }
        audio.prop("volume",volume);
    },

    volumeDown : function(){
        var volume = audio.prop("volume")-0.2;
        if(volume <0){
            volume = 0;
        }
        audio.prop("volume",volume);
    },

    toggleMuteAudio : function(){
        audio.prop("muted",!audio.prop("muted"));
    }

}