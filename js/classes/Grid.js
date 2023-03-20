import { SoundManager } from "./SoundManager.js";
import { Cell } from "./Cell.js";
import { setup } from "../script.js";

export class Grid{

    constructor(difficulty){

        this.BOMBS = 16;
        this.soundManager = new SoundManager();

        //Creo le righe della matrice
        this.cell = new Array(parseInt(difficulty));
        
        //Creo le colonne della matrice
        for(let i = 0; i < this.cell.length; i++)
            this.cell[i] = new Array(parseInt(difficulty));

        //Creo le singole celle della matrice
        this.cellNum = 0;
        for(let i = 0; i < this.cell.length; i++)
            for(let i2 = 0; i2 < this.cell[i].length; i2++){
                this.cell[i][i2] = new Cell();
                this.cellNum++;
            }

        this.#setBombs();
    }

    #setBombs(){

        let bombsPlaced = 0;
        while(bombsPlaced < this.BOMBS){

            let rowSorted = Math.floor(Math.random() * this.cell.length);
            let colSorted = Math.floor(Math.random() * this.cell[rowSorted].length);

                if(!this.cell[rowSorted][colSorted].hasBomb){
                    this.cell[rowSorted][colSorted].hasBomb = true;
                    bombsPlaced++;
                    this.#setBombsTouched(rowSorted, colSorted);
                }
        }
    }

    #setBombsTouched(indexRow, indexCol){

        if(indexRow == 0){
            if(indexCol == 0){ //Angolo alto a sinistra
                this.cell[indexRow][indexCol + 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol].bombsTouched++;
                this.cell[indexRow + 1][indexCol + 1].bombsTouched++;
            }
            else if(indexCol == this.cell[indexRow].length - 1){ //Angolo alto destra
                this.cell[indexRow][indexCol - 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol].bombsTouched++;
                this.cell[indexRow + 1][indexCol - 1].bombsTouched++;
            }
            else{ //Prima riga
                this.cell[indexRow][indexCol - 1].bombsTouched++;
                this.cell[indexRow][indexCol + 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol - 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol].bombsTouched++;
                this.cell[indexRow + 1][indexCol + 1].bombsTouched++;
            }
        }
        else if(indexRow == this.cell.length - 1){
            if(indexCol == 0){ //Angolo basso sinistra
                this.cell[indexRow][indexCol + 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol].bombsTouched++;
                this.cell[indexRow - 1][indexCol + 1].bombsTouched++;
            }
            else if(indexCol == this.cell[indexRow].length - 1){ //Angolo basso destra
                this.cell[indexRow][indexCol - 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol].bombsTouched++;
                this.cell[indexRow - 1][indexCol - 1].bombsTouched++;
            }
            else{ //Ultima riga
                this.cell[indexRow][indexCol - 1].bombsTouched++;
                this.cell[indexRow][indexCol + 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol - 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol].bombsTouched++;
                this.cell[indexRow - 1][indexCol + 1].bombsTouched++;
            }
        }
        else{
            if(indexCol == 0){ //Prima colonna
                this.cell[indexRow][indexCol + 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol].bombsTouched++;
                this.cell[indexRow - 1][indexCol + 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol].bombsTouched++;
                this.cell[indexRow + 1][indexCol + 1].bombsTouched++;
            }
            else if(indexCol == this.cell[indexRow].length - 1){ //Ultima colonna
                this.cell[indexRow][indexCol - 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol].bombsTouched++;
                this.cell[indexRow - 1][indexCol - 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol].bombsTouched++;
                this.cell[indexRow + 1][indexCol - 1].bombsTouched++;
            }
            else{ //Tutte le celle interne
                this.cell[indexRow][indexCol - 1].bombsTouched++;
                this.cell[indexRow][indexCol + 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol - 1].bombsTouched++;
                this.cell[indexRow - 1][indexCol].bombsTouched++;
                this.cell[indexRow - 1][indexCol + 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol - 1].bombsTouched++;
                this.cell[indexRow + 1][indexCol].bombsTouched++;
                this.cell[indexRow + 1][indexCol + 1].bombsTouched++;
            }
        }
    }

    draw(){

        for(let i = 0; i < this.cell.length; i++){

            let row = document.createElement("div");
            row.classList.add("d-flex");

            for(let i2 = 0; i2 < this.cell[i].length; i2++)
                this.cell[i][i2].draw(row);
            document.getElementsByTagName("main")[0].appendChild(row);
        }
    }

    drawGameOver(){
        
        this.removeCells();

        for(let i = 0; i < this.cell.length; i++){

            for(let i2 = 0; i2 < this.cell[i].length; i2++){

                if(this.cell[i][i2].hasBomb && this.cell[i][i2].element.classList.contains("al-question-mark")){
                    this.cell[i][i2].element.classList.remove("al-question-mark");
                    this.cell[i][i2].element.classList.add("al-bomb");
                    console.log("prova provetta");
                }
                else if(this.cell[i][i2].hasBomb && !this.cell[i][i2].element.classList.contains("al-bomb"))
                    this.cell[i][i2].element.classList.add("al-bomb");
                else if(!this.cell[i][i2].hasBomb && this.cell[i][i2].element.classList.contains("al-bomb"))
                    this.cell[i][i2].element.classList.add("al-cross-mark");


                if(this.cell[i][i2].active){
                    this.cell[i][i2].active = false;
                    this.cell[i][i2].element.classList.remove("al-active");
                }

            }
        }

        let mex = document.createElement("div");
        mex.innerHTML = `<img src="./img/game-over.svg" alt="game-over" class="al-game-mex">`
        mex.classList.add("al-mex");
        mex.addEventListener("click", () => setup(true) );

        document.getElementsByTagName("main")[0].appendChild(mex);
    }

    drawVictory(){

        this.removeCells();

        let mex = document.createElement("div");
        mex.innerHTML = `<img src="./img/victory.svg" alt="victory" class="al-game-mex">`
        mex.classList.add("al-mex");
        mex.addEventListener("click", () => setup(true) );

        document.getElementsByTagName("main")[0].appendChild(mex);
    }

    removeCells(){

        for(let i = 0; i < this.cell.length; i++)
            for(let i2 = 0; i2 < this.cell[i].length; i2++)
                if(this.cell[i][i2].element.classList.contains("al-active"))
                    this.cell[i][i2].removeCell();
    }
}