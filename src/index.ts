"use strict";

import { Content } from "./commons"
import { Cube } from "./cube"
import { BenchMoveGen, BenchBruteForce } from "./benchMoves"
import { MovesExamples0, MovesExamples1, MovesExamples2, MovesExamples3 } from "./displayMoves"

//MovesExamples0();
//MovesExamples1();
//MovesExamples2();
//MovesExamples3();

//BenchMoveGen(5000);
BenchBruteForce(6);

/*
const cube = new Cube();
console.log(cube.ExportBit());

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

console.log(cube.ExportBit());
*/