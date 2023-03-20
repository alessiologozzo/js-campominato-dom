import { Sound } from "./Sound.js"; 

export class SoundManager{

    constructor(){

        this.sound = [];
        
        this.sound.push(new Sound("./sound/cell-cleared.wav", 0.9));
        this.sound.push(new Sound("./sound/bomb-placed.wav", 0.9));
        this.sound.push(new Sound("./sound/question-mark-placed.wav", 0.4));
        this.sound.push(new Sound("./sound/cell-reset.wav", 0.3));
        this.sound.push(new Sound("./sound/victory.wav", 0.8));
        this.sound.push(new Sound("./sound/game-over.wav", 0.8));
        this.sound.push(new Sound("./sound/new-game.wav", 0.8));

    }

    play(soundToPlay){
        
        switch(soundToPlay){

            case "cell cleared":
                this.sound[0].play();
                break;

            case "bomb placed":
                this.sound[1].play();
                break;

            case "question mark placed":
                this.sound[2].play();
                break;
    
            case "cell reset":
                this.sound[3].play();
                break;

            case "victory":
                this.sound[4].play();
                break;
        
            case "game over":
                this.sound[5].play();
                break;

            case "new game":
                this.sound[6].play();
                break;

            default:
                console.log("Class Sound: Errore. Comando non riconosciuto");
        }
    }

    stop(){
        for(let i = 0; i < this.sound.length; i++)
            this.sound[i].stop();
    }
}