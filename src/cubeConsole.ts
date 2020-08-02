import { Content } from "../src/enum";
import { Cube } from "./../src/cube";

const EMPTY = "#";
const P1 = "X";
const P2 = "O";

const StrContent = function (c: Content): string {
    switch (c) {
        case Content.Empty: return EMPTY;
        case Content.P1: return P1;
        case Content.P2: return P2;
    }
}

const PrepareGrid = function (): string[][] {
    let DGrid = new Array(13);
    for (let i = 0; i < 13; ++i) {
        DGrid[i] = new Array(13);
        for (let j = 0; j < 13; ++j) {
            DGrid[i][j] = ' ';
        }
    }

    for (let k = 0; k < 6; k += 2) {

        for (let i = k; i < 13 - k; ++i) {
            DGrid[i][k] = DGrid[i][12 - k] = '-';
            DGrid[k][i] = DGrid[12 - k][i] = '|';
        }

        DGrid[k][k] = DGrid[6][k] = DGrid[12 - k][k] = EMPTY;
        DGrid[k][12 - k] = DGrid[6][12 - k] = DGrid[12 - k][12 - k] = EMPTY;
        DGrid[k][6] = DGrid[12 - k][6] = EMPTY;
    }

    for (let k = 1; k < 12; k += 2) {
        if (k > 3 && k < 9) continue;
        DGrid[k][k] = '\\';
        DGrid[k][6] = '-';
        DGrid[6][k] = '|';
        DGrid[12 - k][k] = '/';
    }

    return DGrid;
}

export function DisplayCube(cube: Cube, detail: boolean): void {
    let DGrid = PrepareGrid();
    for (let c of cube.AllCells) {
        DGrid[c.X][c.Y] = StrContent(c.Content);
    }

    console.clear();
    let s1 = 0, s2 = 0;
    for (let j = 0; j < 13; ++j) {
        let s = "    ";
        for (let i = 0; i < 13; ++i) {
            var c = DGrid[i][j];
            s += c;
            if (c == P1) ++s1;
            if (c == P2) ++s2;
        }

        if (detail) {
            if (j == 3) s += "        00 10 20      xx0 biggest square";
            if (j == 4) s += "                ";
            if (j == 5) s += "        01    21      xx1 middle square";
            if (j == 6) s += "                ";
            if (j == 7) s += "        02 12 22      xx2 smallest square";
            if (j == 8) s += "                ";
            if (j == 9) s += "                ";
        }

        console.log(s);
    }

    console.log();
    if (detail) {
        console.log(EMPTY, ":", "EmptyCell");
        console.log(P1, ":", "PlayerOne");
        console.log(P2, ":", "PlayerTwo");
        console.log();
        console.log("Remain", P1, "=", s1, " - ", P2, "=", s2);
        console.log();
    }
}