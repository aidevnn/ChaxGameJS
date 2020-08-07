
"use strict";

import { Content } from "./enum"
import { Cube } from "./cube";

console.log("Chaxgame lib ready");

module.exports = {
    CellEmpty: Content.Empty,
    CellP1: Content.P1,
    CellP2: Content.P2,
    Cube: function (): Cube {
        return new Cube();
    }
};