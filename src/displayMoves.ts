import { Content, RandSeed } from "../src/commons"
import { Cube } from "./../src/cube"
import { AllCubes, MovesBattle } from "./../src/movesGenerator"
import { GameState } from "./gameState";
import { AlphaBeta } from "./minmaxAlgo";
import { MoveBattle } from "./moveBattle"

export const readlineSync = require('readline-sync');

export const ConsoleReadline = function(s:string):void{
    readlineSync.question(s);
}

export const DisplayMove = function (cube: Cube, mv: MoveBattle): void {
    cube.ConsoleCube(true);
    console.log(mv.ToStr());
    ConsoleReadline("## Start");

    for (let ms of mv.SubMoves) {
        ms.DoStep(cube);
        cube.ConsoleCube(true);
        console.log(ms.ToStr());
        ConsoleReadline("#### Continue");
    }
}

const DisplayMoves = function (cube: Cube, moves: Array<MoveBattle>): void {
    cube.ConsoleCube(true);
    console.log(`Nb moves : ${moves.length}`);
    ConsoleReadline("");

    for (let mv of moves) {
        DisplayMove(cube, mv);
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

export const MovesExamples4 = function (): void {
    const cube = new Cube();
    cube.Import("212211221121122110122221");
    let cell = cube.GetCellByKey("c201");

    let moves = MovesBattle(cube, Content.P1, cell.Id);

    DisplayMoves(cube, moves);
}

export const BenchAB = function (): void {

    RandSeed(12534);

    let g = new GameState();
    //g.cube.Import("112001122011101101000001"); g.turn = 39; g.player = Content.P1;
    //g.cube.Import("101210211000100011000110"); g.turn = 39; g.player = Content.P1;
    //g.cube.Import("212211221121122110122221"); g.turn = 25; g.player = Content.P1;
    g.cube.Import("211210100110001011000110"); g.turn = 49; g.player = Content.P1;

    while (!g.EndGame()) {
        let depth = g.turn < 25 ? 3 : 6;
        g.cube.ConsoleCube(true);
        console.log("Compute...");
        let start = Date.now();

        let mv = AlphaBeta(g, depth);
        ConsoleReadline(`Time : ${Date.now() - start} ms; Enter to continue`);
        g.DoMoveAndConsoleDisplay(mv);

        if (g.turn > 25) {
            AllCubes.push(g.cube.ExportBit());
            if (AllCubes.length > 10) AllCubes.shift();
        }
    }

}