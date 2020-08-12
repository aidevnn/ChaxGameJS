"use strict";

import { Content, RandSeed } from "./commons"
import { Cube } from "./cube"
import { BenchMoveGen, BenchBruteForce, BenchBruteForce2 } from "./benchMoves"
import { BenchAB, ConsoleReadline, MovesExamples0, MovesExamples1, MovesExamples2, MovesExamples3, MovesExamples4 } from "./displayMoves"
import { GameState } from "./gameState";
import { AlphaBeta } from "./minmaxAlgo";
import { AllCubes } from "./movesGenerator";

//MovesExamples0();
//MovesExamples1();
//MovesExamples2();
//MovesExamples3();
//MovesExamples4();

//BenchMoveGen(5000);
//BenchBruteForce(5);
//BenchBruteForce2("112001122011101101000001", 6);

BenchAB();
