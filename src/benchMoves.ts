import { Content, GetOpponent } from "../src/commons"
import { Cube } from "./../src/cube"
import { GenMovesBattle, RandomCubes } from "./../src/movesGenerator"

export const BenchMoveGen = function (M: number): void {
    //RandomCubes();

    for (let k = 2; k < 11; ++k) {
        console.log(`Players : ${k} x 2 tokens`);
        let lt = Array.from(Array(24), (e, i) => i).sort((a, b) => 0.5 - Math.random());
        let cube = new Cube();
        for (let i = 0; i < k; ++i) {
            cube.SetCellById(lt[2 * i], Content.P1);
            cube.SetCellById(lt[2 * i + 1], Content.P2);
        }

        for (let a = 0; a < 5; ++a) {
            console.time("test");
            let s = 0;
            for (let b = 0; b < M; ++b) {
                let moves = GenMovesBattle(cube, Content.P1);
                s += moves.length;
            }
            console.timeEnd("test");
        }
    }
}

let nb = 0;
const BruteForce = function (cube: Cube, player: Content, depth: number): void {
    if (depth == 0) {
        ++nb;
        return;
    }

    let moves = GenMovesBattle(cube, player);
    for (let mv of moves) {
        mv.Do(cube);
        BruteForce(cube, GetOpponent(player), depth - 1);
        mv.Undo(cube);
    }
}

export const BenchBruteForce = function (depth: number): void {
    let totalNb = 0;
    let totalTime = 0;
    RandomCubes();
    for (let k = 2; k < 11; ++k) {
        console.group(`Players : ${k} x 2 tokens`);

        for (let a = 0; a < 5; ++a) {

            let lt = Array.from(Array(24), (e, i) => i).sort((a, b) => 0.5 - Math.random());
            let cube = new Cube();
            for (let i = 0; i < k; ++i) {
                cube.SetCellById(lt[2 * i], Content.P1);
                cube.SetCellById(lt[2 * i + 1], Content.P2);
            }

            nb = 0;
            let start = Date.now();
            BruteForce(cube, Content.P1, depth);
            let end = Date.now();
            let diff = end - start;
            totalNb += nb;
            totalTime += diff;
            console.log(`Nb Games : ${nb}; Time: ${diff} ms; Avg: ${Math.round(nb / diff)} Games/ms`);
        }
        console.groupEnd();
    }
    console.log(`Global Avg: ${Math.round(totalNb / totalTime)} Games/ms`);
}