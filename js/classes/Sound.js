export class Sound{

    constructor(url, volume){

        this.track = new Audio(url);
        this.track.volume  = volume;
    }

    play(){
        this.track.play();
    }

    stop(){
        if(!this.track.paused)
            this.track.pause();
    }
}