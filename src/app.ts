
"use strict";

import { Content } from "./commons"
import { Cube } from "./cube";
import { BenchBruteForce } from "./benchMoves";

console.log("Chaxgame lib ready");

module.exports = {
    BenchBruteForce: BenchBruteForce,
    CellEmpty: Content.Empty,
    CellP1: Content.P1,
    CellP2: Content.P2,
    Cube: function (): Cube {
        return new Cube();
    }
};