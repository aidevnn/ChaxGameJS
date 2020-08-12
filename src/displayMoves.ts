import { Content } from "../src/commons"
import { Cube } from "./../src/cube"
import { MovesBattle } from "./../src/movesGenerator"
import { MoveBattle } from "./moveBattle"

const readlineSync = require('readline-sync');

const DisplayMoves = function (cube: Cube, moves: Array<MoveBattle>): void {
    console.log(`Nb moves : ${moves.length}`);
    readlineSync.question("");

    for (let mv of moves) {
        cube.ConsoleCube(true);
        readlineSync.question("## Start");

        for (let ms of mv.SubMoves) {
            ms.DoStep(cube);
            cube.ConsoleCube(true);
            readlineSync.question("#### Continue");
        }

        mv.Undo(cube);
    }
}

export const MovesExamples0 = function (): void {
    const cube = new Cube();
    cube.SetCellByKey("c000", Content.P1);
    cube.SetCellByKey("c012", Content.P1);
    cube.SetCellByKey("c011", Content.P2);
    let cell0 = cube.GetCellByKey("c010");

    cube.ConsoleCube(true);
}

export const MovesExamples1 = function (): void {
    const cube = new Cube();
    cube.SetCellByKey("c000", Content.P1);
    cube.SetCellByKey("c012", Content.P1);
    cube.SetCellByKey("c011", Content.P2);
    let cell0 = cube.GetCellByKey("c010");

    let moves = MovesBattle(cube, Content.P1, 0);

    DisplayMoves(cube, moves);
}

export const MovesExamples2 = function (): void {
    const cube = new Cube();

    let cell1 = cube.GetCellByKey("c001");
    let cell2 = cube.GetCellByKey("c002");
    let cell3 = cube.GetCellByKey("c102");
    let cell4 = cube.GetCellByKey("c202");
    let cell5 = cube.GetCellByKey("c012");
    let cell6 = cube.GetCellByKey("c022");

    cube.SetCellById(cell1.Id, Content.P1);
    cube.SetCellById(cell4.Id, Content.P1);
    cube.SetCellById(cell6.Id, Content.P1);

    cube.SetCellById(cell3.Id, Content.P2);
    cube.SetCellById(cell5.Id, Content.P2);

    let moves = MovesBattle(cube, Content.P1, cell1.Id);

    DisplayMoves(cube, moves);
}

export const MovesExamples3 = function (): void {
    const cube = new Cube();

    let cell1 = cube.GetCellByKey("c002");
    let cell2 = cube.GetCellByKey("c102");
    let cell3 = cube.GetCellByKey("c202");
    let cell4 = cube.GetCellByKey("c101");
    let cell5 = cube.GetCellByKey("c100");
    let cell6 = cube.GetCellByKey("c201");
    let cell7 = cube.GetCellByKey("c200");

    cube.SetCellById(cell1.Id, Content.P1);
    cube.SetCellById(cell5.Id, Content.P1);
    cube.SetCellById(cell7.Id, Content.P1);

    cube.SetCellById(cell4.Id, Content.P2);
    cube.SetCellById(cell6.Id, Content.P2);

    let moves = MovesBattle(cube, Content.P1, cell1.Id);

    DisplayMoves(cube, moves);
}
