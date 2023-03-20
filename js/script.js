import { Grid } from "./classes/Grid.js";


let submit = document.getElementById("submit");
submit.addEventListener("click", () => setup(true) );
export let grid;

setup(false);

export function setup(playSound){

    if(playSound)
        grid.soundManager.stop();

    document.getElementsByTagName("main")[0].innerHTML = "";
    grid = new Grid(document.getElementsByTagName("select")[0].value);
    grid.draw();

    if(playSound)
        grid.soundManager.play("new game");
}