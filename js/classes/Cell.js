import { grid } from "../script.js";

export class Cell{

    constructor(){

        this.listener;
        this.bombsTouched = 0;
        this.hasBomb = false;
        this.active = true;
        this.element = document.createElement("div");
    }

    draw(row){

        this.element.classList.add("al-cell");
        
        if(this.active){
            this.element.classList.add("al-active");
            this.element.addEventListener("mousedown", this.listener = ((e) => this.#interact(e)), false);
        }
        row.appendChild(this.element);
    }

    #interact(e){
        
        switch(e.button){
            case 0: //Left click
            
                if(this.hasBomb){
                    grid.soundManager.stop();
                    grid.soundManager.play("game over");
                    grid.drawGameOver();
                }
                else{
                    grid.soundManager.play("cell cleared");
                    switch(this.bombsTouched){

                        case 0: 
                            this.element.classList.add("al-0");
                            break;

                        case 1: 
                            this.element.classList.add("al-1");
                            break;

                        case 2: 
                            this.element.classList.add("al-2");
                            break;

                        case 3: 
                            this.element.classList.add("al-3");
                            break;

                        case 4:
                            this.element.classList.add("al-4");
                            break;

                        default:
                            this.element.classList.add("al-default");
                    }
                    grid.soundManager.play("cell cleared");
                    this.element.textContent = this.bombsTouched;
                    this.removeCell();
                    grid.cellNum--;

                    if(grid.cellNum == grid.BOMBS){
                        grid.soundManager.stop();
                        grid.soundManager.play("victory");
                        grid.drawVictory();
                    }
                }
                break;
    
            case 2: //Right click

                if(this.element.classList.contains("al-bomb")){
                    grid.soundManager.play("question mark placed")
                    this.element.classList.remove("al-bomb");
                    this.element.classList.add("al-question-mark");
                }
                else if(this.element.classList.contains("al-question-mark")){
                    grid.soundManager.play("cell reset")
                    this.element.classList.remove("al-question-mark");
                }
                else{
                    grid.soundManager.play("bomb placed");
                    this.element.classList.add("al-bomb");
                }

                break;
        }
    }

    removeCell(){
        this.element.classList.remove("al-active");
        this.element.removeEventListener("mousedown", this.listener, false);
    }
}
