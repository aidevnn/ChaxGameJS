var Chax =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var cube_1 = __webpack_require__(/*! ./cube */ "./src/cube.ts");
var benchMoves_1 = __webpack_require__(/*! ./benchMoves */ "./src/benchMoves.ts");
console.log("Chaxgame lib ready");
module.exports = {
    BenchBruteForce: benchMoves_1.BenchBruteForce,
    CellEmpty: commons_1.Content.Empty,
    CellP1: commons_1.Content.P1,
    CellP2: commons_1.Content.P2,
    Cube: function () {
        return new cube_1.Cube();
    }
};


/***/ }),

/***/ "./src/benchMoves.ts":
/*!***************************!*\
  !*** ./src/benchMoves.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BenchBruteForce2 = exports.BenchBruteForce = exports.BenchMoveGen = void 0;
var commons_1 = __webpack_require__(/*! ../src/commons */ "./src/commons.ts");
var cube_1 = __webpack_require__(/*! ./../src/cube */ "./src/cube.ts");
var movesGenerator_1 = __webpack_require__(/*! ./../src/movesGenerator */ "./src/movesGenerator.ts");
exports.BenchMoveGen = function (M) {
    //RandomCubes();
    for (var k = 2; k < 11; ++k) {
        console.log("Players : " + k + " x 2 tokens");
        var lt = Array.from(Array(24), function (e, i) { return i; }).sort(function (a, b) { return 0.5 - Math.random(); });
        var cube = new cube_1.Cube();
        for (var i = 0; i < k; ++i) {
            cube.SetCellById(lt[2 * i], commons_1.Content.P1);
            cube.SetCellById(lt[2 * i + 1], commons_1.Content.P2);
        }
        for (var a = 0; a < 5; ++a) {
            console.time("test");
            var s = 0;
            for (var b = 0; b < M; ++b) {
                var moves = movesGenerator_1.GenMovesBattle(cube, commons_1.Content.P1);
                s += moves.length;
            }
            console.timeEnd("test");
        }
    }
};
var nb = 0;
var BruteForce = function (cube, player, depth) {
    if (depth == 0) {
        ++nb;
        return;
    }
    var moves = movesGenerator_1.GenMovesBattle(cube, player);
    for (var _i = 0, moves_1 = moves; _i < moves_1.length; _i++) {
        var mv = moves_1[_i];
        mv.Do(cube);
        BruteForce(cube, commons_1.GetOpponent(player), depth - 1);
        mv.Undo(cube);
    }
};
exports.BenchBruteForce = function (depth) {
    var totalNb = 0;
    var totalTime = 0;
    movesGenerator_1.RandomCubes();
    for (var k = 2; k < 11; ++k) {
        console.group("Players : " + k + " x 2 tokens");
        for (var a = 0; a < 5; ++a) {
            var lt = Array.from(Array(24), function (e, i) { return i; }).sort(function (a, b) { return 0.5 - Math.random(); });
            var cube = new cube_1.Cube();
            for (var i = 0; i < k; ++i) {
                cube.SetCellById(lt[2 * i], commons_1.Content.P1);
                cube.SetCellById(lt[2 * i + 1], commons_1.Content.P2);
            }
            nb = 0;
            var start = Date.now();
            BruteForce(cube, commons_1.Content.P1, depth);
            var end = Date.now();
            var diff = end - start;
            totalNb += nb;
            totalTime += diff;
            console.log("Nb Games : " + nb + "; Time: " + diff + " ms; Avg: " + Math.round(nb / diff) + " Games/ms");
        }
        console.groupEnd();
    }
    console.log("Global Avg: " + Math.round(totalNb / totalTime) + " Games/ms");
};
exports.BenchBruteForce2 = function (s, depth) {
    var totalNb = 0;
    var totalTime = 0;
    for (var a = 0; a < 5; ++a) {
        var cube = new cube_1.Cube();
        cube.Import(s);
        nb = 0;
        var start = Date.now();
        BruteForce(cube, commons_1.Content.P2, depth);
        var end = Date.now();
        var diff = end - start;
        totalNb += nb;
        totalTime += diff;
        console.log("Nb Games : " + nb + "; Time: " + diff + " ms; Avg: " + Math.round(nb / diff) + " Games/ms");
    }
    console.groupEnd();
    console.log("Global Avg: " + Math.round(totalNb / totalTime) + " Games/ms");
};


/***/ }),

/***/ "./src/cell.ts":
/*!*********************!*\
  !*** ./src/cell.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AltCell = exports.NullCell = exports.Cell = void 0;
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var coords3D_1 = __webpack_require__(/*! ./coords3D */ "./src/coords3D.ts");
var Cell = /** @class */ (function () {
    function Cell(id, x, y, z) {
        this.Id = id;
        this.Coords = new coords3D_1.Coords(x, y, z);
        this.Power = 0;
        this.Content = commons_1.Content.Empty;
        this.Neighbors = [];
        this.Rows = [];
        var s = 2 * z;
        var d = 6 - 2 * z;
        this.X = s + d * x;
        this.Y = s + d * y;
        var p = Math.abs(x - y);
        if (p == 0 || p == 2) {
            if (z == 0 || z == 2)
                this.Power = 3;
            else
                this.Power = 2;
        }
        else {
            if (z == 0 || z == 2)
                this.Power = 1;
            else
                this.Power = 0;
        }
    }
    Cell.prototype.ToHTML = function () {
        var e = $("<div/>");
        e.attr("id", this.Coords.cxyz);
        e.css("top", this.Y * 32 + 40);
        e.css("left", this.X * 32 + 40);
        if (this.Content == commons_1.Content.P1)
            e.addClass("r1");
        if (this.Content == commons_1.Content.P2)
            e.addClass("r2");
        return e;
    };
    return Cell;
}());
exports.Cell = Cell;
exports.NullCell = new Cell(-1, -1, -1, -1);
var AltCell = /** @class */ (function () {
    function AltCell(id, pow) {
        this.Id = id;
        this.Power = pow;
        this.Content = commons_1.Content.Empty;
        this.AltContent = commons_1.Content.Empty;
        this.Step = 0;
        this.Neighbors = [];
    }
    return AltCell;
}());
exports.AltCell = AltCell;


/***/ }),

/***/ "./src/commons.ts":
/*!************************!*\
  !*** ./src/commons.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.RandInteger = exports.RandSeed = exports.DiffContent = exports.SameContent = exports.GetOpponent = exports.ActionType = exports.Content = exports.Dir = void 0;
var Dir;
(function (Dir) {
    Dir[Dir["R"] = 0] = "R";
    Dir[Dir["L"] = 1] = "L";
    Dir[Dir["D"] = 2] = "D";
    Dir[Dir["U"] = 3] = "U";
    Dir[Dir["F"] = 4] = "F";
    Dir[Dir["B"] = 5] = "B";
})(Dir = exports.Dir || (exports.Dir = {}));
;
var Content;
(function (Content) {
    Content[Content["Empty"] = 0] = "Empty";
    Content[Content["P1"] = 1] = "P1";
    Content[Content["P2"] = 2] = "P2";
})(Content = exports.Content || (exports.Content = {}));
;
var ActionType;
(function (ActionType) {
    ActionType[ActionType["Place"] = 0] = "Place";
    ActionType[ActionType["Remove"] = 1] = "Remove";
    ActionType[ActionType["Pass"] = 2] = "Pass";
    ActionType[ActionType["Battle"] = 3] = "Battle";
})(ActionType = exports.ActionType || (exports.ActionType = {}));
;
function GetOpponent(content) {
    switch (content) {
        case Content.Empty: return Content.Empty;
        case Content.P1: return Content.P2;
        case Content.P2: return Content.P1;
    }
}
exports.GetOpponent = GetOpponent;
function SameContent(c1, c2) {
    if (c1 == Content.Empty || c2 == Content.Empty)
        return false;
    return c1 == c2;
}
exports.SameContent = SameContent;
function DiffContent(c1, c2) {
    if (c1 == Content.Empty || c2 == Content.Empty)
        return false;
    return c1 != c2;
}
exports.DiffContent = DiffContent;
var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;
// Takes any integer
exports.RandSeed = function (i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
};
// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}
exports.RandInteger = function (min, max) {
    return Math.floor(random() * (max - min)) + min;
};


/***/ }),

/***/ "./src/coords3D.ts":
/*!*************************!*\
  !*** ./src/coords3D.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Coords = void 0;
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var Coords = /** @class */ (function () {
    function Coords(x, y, z) {
        this.X = x;
        this.Y = y;
        this.Z = z;
        this.cxyz = "c" + this.X + "" + this.Y + "" + this.Z;
    }
    Coords.prototype.Next = function (dir) {
        switch (dir) {
            case commons_1.Dir.R: return new Coords(this.X + 1, this.Y, this.Z);
            case commons_1.Dir.L: return new Coords(this.X - 1, this.Y, this.Z);
            case commons_1.Dir.D: return new Coords(this.X, this.Y + 1, this.Z);
            case commons_1.Dir.U: return new Coords(this.X, this.Y - 1, this.Z);
            case commons_1.Dir.F: return new Coords(this.X, this.Y, this.Z + 1);
            case commons_1.Dir.B: return new Coords(this.X, this.Y, this.Z - 1);
        }
    };
    Coords.prototype.InCube = function () {
        if (this.X == 1 && this.Y == 1)
            return false;
        if (this.X < 0 || this.Y < 0 || this.Z < 0 || this.X > 2 || this.Y > 2 || this.Z > 2)
            return false;
        return true;
    };
    return Coords;
}());
exports.Coords = Coords;


/***/ }),

/***/ "./src/cube.ts":
/*!*********************!*\
  !*** ./src/cube.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyCube = exports.Cube = exports.CubeScore = void 0;
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var cell_1 = __webpack_require__(/*! ./cell */ "./src/cell.ts");
var cubeConsole_1 = __webpack_require__(/*! ./cubeConsole */ "./src/cubeConsole.ts");
var CubeScore = /** @class */ (function () {
    function CubeScore(player, scPlayer, scOpponent, domPlayer, domOpponent) {
        this.Player = player;
        this.ScorePlayer = scPlayer;
        this.ScoreOpponent = scOpponent;
        this.DomPlayer = domPlayer;
        this.DomOpponent = domOpponent;
    }
    CubeScore.prototype.GetScore = function (c) {
        if (c == commons_1.Content.Empty)
            return 0;
        if (commons_1.SameContent(c, this.Player))
            return this.ScorePlayer;
        return this.ScoreOpponent;
    };
    CubeScore.prototype.GetDomination = function (c) {
        if (c == commons_1.Content.Empty)
            return 0;
        if (commons_1.SameContent(c, this.Player))
            return this.DomPlayer;
        return this.DomOpponent;
    };
    return CubeScore;
}());
exports.CubeScore = CubeScore;
var Cube = /** @class */ (function () {
    function Cube() {
        this.AllCells = [];
        this.AllAltCells = [];
        this.Infos = new Map();
        this.Queue = [];
        this.BitPlayer1 = 0;
        this.BitPlayer2 = 0;
        this.Init();
    }
    Cube.prototype.Init = function () {
        var dirs = [commons_1.Dir.B, commons_1.Dir.D, commons_1.Dir.F, commons_1.Dir.L, commons_1.Dir.R, commons_1.Dir.U];
        var id = 0;
        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < 3; ++j) {
                for (var k = 0; k < 3; ++k) {
                    if (i == 1 && j == 1)
                        break;
                    var c0 = new cell_1.Cell(id, i, j, k);
                    var c1 = new cell_1.AltCell(id, c0.Power);
                    this.AllCells.push(c0);
                    this.AllAltCells.push(c1);
                    this.Infos.set(c0.Coords.cxyz, c0);
                    ++id;
                }
            }
        }
        for (var _i = 0, _a = this.AllCells; _i < _a.length; _i++) {
            var c0 = _a[_i];
            var cc0 = this.AllAltCells[c0.Id];
            for (var _b = 0, dirs_1 = dirs; _b < dirs_1.length; _b++) {
                var d = dirs_1[_b];
                var coords1 = c0.Coords.Next(d);
                if (!coords1.InCube())
                    continue;
                var c1 = this.Infos.get(coords1.cxyz);
                if (c1 == undefined)
                    continue;
                c0.Neighbors.push(c1);
                cc0.Neighbors.push(this.AllAltCells[c1.Id]);
                var coords2 = c1.Coords.Next(d);
                if (coords2.InCube()) {
                    var c2 = this.Infos.get(coords2.cxyz);
                    if (c2 != undefined)
                        c0.Rows.push([c1, c2]);
                }
            }
        }
    };
    Cube.prototype.GetCellById = function (id) {
        return this.AllCells[id];
    };
    Cube.prototype.GetCellByKey = function (cxyz) {
        var c = this.Infos.get(cxyz);
        if (c == undefined)
            return cell_1.NullCell;
        return c;
    };
    Cube.prototype.SetCellById = function (id, content) {
        var c = this.AllCells[id];
        if (c == undefined)
            return;
        this.ChangeBitPlayer(id, c.Content, content);
        c.Content = content;
    };
    Cube.prototype.SetCellByKey = function (cxyz, content) {
        var c = this.Infos.get(cxyz);
        if (c == undefined)
            return;
        this.ChangeBitPlayer(c.Id, c.Content, content);
        c.Content = content;
    };
    Cube.prototype.ChangeBitPlayer = function (id, b, a) {
        var i = 1 << id;
        if (b == commons_1.Content.P1 && a == commons_1.Content.Empty)
            this.BitPlayer1 ^= i;
        if (b == commons_1.Content.P2 && a == commons_1.Content.Empty)
            this.BitPlayer2 ^= i;
        if (b == commons_1.Content.Empty && a == commons_1.Content.P1)
            this.BitPlayer1 |= i;
        if (b == commons_1.Content.Empty && a == commons_1.Content.P2)
            this.BitPlayer2 |= i;
    };
    Cube.prototype.Export = function () {
        var s = '';
        for (var _i = 0, _a = this.AllCells; _i < _a.length; _i++) {
            var c = _a[_i];
            s += c.Content;
        }
        return s;
    };
    Cube.prototype.Import = function (s) {
        this.BitPlayer1 = 0;
        this.BitPlayer2 = 0;
        for (var i = 0; i < 24; ++i) {
            this.AllCells[i].Content = commons_1.Content.Empty;
            var c = s[i];
            if (c == "1")
                this.SetCellById(i, commons_1.Content.P1);
            else if (c == "2")
                this.SetCellById(i, commons_1.Content.P2);
            else
                this.SetCellById(i, commons_1.Content.Empty);
        }
    };
    Cube.prototype.ExportBit = function () {
        return this.BitPlayer1 + 1000000000000 * this.BitPlayer2;
    };
    Cube.prototype.Clear = function () {
        for (var i = 0; i < 24; ++i) {
            this.SetCellById(i, commons_1.Content.Empty);
        }
    };
    Cube.prototype.Render = function (boardId) {
        var board = $(boardId);
        board.empty();
        for (var _i = 0, _a = this.AllCells; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.Content == commons_1.Content.Empty)
                continue;
            board.append(c.ToHTML());
        }
    };
    Cube.prototype.ConsoleCube = function (details) {
        cubeConsole_1.DisplayCube(this, details);
    };
    Cube.prototype.ComputeDomination = function (player) {
        var opponent = commons_1.GetOpponent(player);
        var ScorePlayer = 0;
        var ScoreOpponent = 0;
        var DomPlayer = 0;
        var DomOpponent = 0;
        this.Queue = [];
        for (var i = 0; i < 24; ++i) {
            var cc = this.AllAltCells[i];
            cc.Content = this.AllCells[i].Content;
            cc.AltContent = commons_1.Content.Empty;
            cc.Step = 0;
            if (cc.Content != commons_1.Content.Empty) {
                this.Queue.push(cc);
                cc.AltContent = cc.Content;
                if (cc.Content == player) {
                    DomPlayer += cc.Power;
                    ++ScorePlayer;
                }
                else if (cc.Content == opponent) {
                    DomOpponent += cc.Power;
                    ++ScoreOpponent;
                }
            }
        }
        while (this.Queue.length != 0) {
            var c = this.Queue.shift();
            if (c == undefined)
                break;
            for (var _i = 0, _a = c.Neighbors; _i < _a.length; _i++) {
                var n = _a[_i];
                if (n.Content == commons_1.Content.Empty) {
                    n.Content = c.Content;
                    n.Step = c.Step + 1;
                    this.Queue.push(n);
                    if (n.Content == player)
                        DomPlayer += n.Power;
                    if (n.Content == opponent)
                        DomOpponent += n.Power;
                }
                else if (n.Content != c.Content && n.AltContent == commons_1.Content.Empty && n.Step == c.Step + 1) {
                    n.AltContent = c.Content;
                    if (n.Content == opponent && c.Content == player) {
                        DomPlayer += n.Power;
                        DomOpponent -= n.Power;
                    }
                }
            }
        }
        return new CubeScore(player, ScorePlayer, ScoreOpponent, DomPlayer, DomOpponent);
    };
    return Cube;
}());
exports.Cube = Cube;
exports.EmptyCube = new Cube();


/***/ }),

/***/ "./src/cubeConsole.ts":
/*!****************************!*\
  !*** ./src/cubeConsole.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayCube = void 0;
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var EMPTY = "#";
var P1 = "X";
var P2 = "O";
var StrContent = function (c) {
    switch (c) {
        case commons_1.Content.Empty: return EMPTY;
        case commons_1.Content.P1: return P1;
        case commons_1.Content.P2: return P2;
    }
};
var PrepareGrid = function () {
    var DGrid = new Array(13);
    for (var i = 0; i < 13; ++i) {
        DGrid[i] = new Array(13);
        for (var j = 0; j < 13; ++j) {
            DGrid[i][j] = ' ';
        }
    }
    for (var k = 0; k < 6; k += 2) {
        for (var i = k; i < 13 - k; ++i) {
            DGrid[i][k] = DGrid[i][12 - k] = '-';
            DGrid[k][i] = DGrid[12 - k][i] = '|';
        }
        DGrid[k][k] = DGrid[6][k] = DGrid[12 - k][k] = EMPTY;
        DGrid[k][12 - k] = DGrid[6][12 - k] = DGrid[12 - k][12 - k] = EMPTY;
        DGrid[k][6] = DGrid[12 - k][6] = EMPTY;
    }
    for (var k = 1; k < 12; k += 2) {
        if (k > 3 && k < 9)
            continue;
        DGrid[k][k] = '\\';
        DGrid[k][6] = '-';
        DGrid[6][k] = '|';
        DGrid[12 - k][k] = '/';
    }
    return DGrid;
};
function DisplayCube(cube, detail) {
    var DGrid = PrepareGrid();
    for (var _i = 0, _a = cube.AllCells; _i < _a.length; _i++) {
        var c_1 = _a[_i];
        DGrid[c_1.X][c_1.Y] = StrContent(c_1.Content);
    }
    console.clear();
    var s1 = 0, s2 = 0;
    for (var j = 0; j < 13; ++j) {
        var s = "    ";
        for (var i = 0; i < 13; ++i) {
            var c = DGrid[i][j];
            s += c;
            if (c == P1)
                ++s1;
            if (c == P2)
                ++s2;
        }
        if (detail) {
            if (j == 3)
                s += "        00 10 20      xx0 biggest square";
            if (j == 4)
                s += "                ";
            if (j == 5)
                s += "        01    21      xx1 middle square";
            if (j == 6)
                s += "                ";
            if (j == 7)
                s += "        02 12 22      xx2 smallest square";
            if (j == 8)
                s += "                ";
            if (j == 9)
                s += "                ";
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
    console.log("Export", cube.Export());
}
exports.DisplayCube = DisplayCube;


/***/ }),

/***/ "./src/moveBattle.ts":
/*!***************************!*\
  !*** ./src/moveBattle.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveBattle = exports.SubMove = void 0;
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var cube_1 = __webpack_require__(/*! ./cube */ "./src/cube.ts");
var SubMove = /** @class */ (function () {
    function SubMove(player, idBefore, idAfter) {
        this.IdOpponent1 = -1;
        this.IdOpponent2 = -1;
        this.NbKills = 0;
        this.IdBefore = idBefore;
        this.IdAfter = idAfter;
        this.Player = player;
        this.Opponent = commons_1.GetOpponent(player);
    }
    SubMove.prototype.Clone = function () {
        var ms = new SubMove(this.Player, this.IdBefore, this.IdAfter);
        ms.IdOpponent1 = this.IdOpponent1;
        ms.IdOpponent2 = this.IdOpponent2;
        ms.NbKills = this.NbKills;
        return ms;
    };
    SubMove.prototype.ToStr = function () {
        var cb = cube_1.EmptyCube.AllCells[this.IdBefore].Coords.cxyz;
        var ca = cube_1.EmptyCube.AllCells[this.IdAfter].Coords.cxyz;
        var co1 = this.IdOpponent1 == -1 ? "" : cube_1.EmptyCube.AllCells[this.IdOpponent1].Coords.cxyz;
        var co2 = this.IdOpponent2 == -1 ? "" : cube_1.EmptyCube.AllCells[this.IdOpponent2].Coords.cxyz;
        var kills = "";
        if (this.NbKills == 1)
            kills = "Kill one at [" + co1 + "]";
        if (this.NbKills == 2)
            kills = "Kill two at [" + co1 + "] and [" + co2 + "]";
        return "    MOVE from [" + cb + "] to [" + ca + "] " + kills;
    };
    SubMove.prototype.DoStep = function (cube) {
        cube.SetCellById(this.IdBefore, commons_1.Content.Empty);
        cube.SetCellById(this.IdAfter, this.Player);
        if (this.IdOpponent1 != -1)
            cube.SetCellById(this.IdOpponent1, commons_1.Content.Empty);
        if (this.IdOpponent2 != -1)
            cube.SetCellById(this.IdOpponent2, commons_1.Content.Empty);
    };
    SubMove.prototype.UndoStep = function (cube) {
        if (this.IdOpponent1 != -1)
            cube.SetCellById(this.IdOpponent1, this.Opponent);
        if (this.IdOpponent2 != -1)
            cube.SetCellById(this.IdOpponent2, this.Opponent);
        cube.SetCellById(this.IdAfter, commons_1.Content.Empty);
        cube.SetCellById(this.IdBefore, this.Player);
    };
    return SubMove;
}());
exports.SubMove = SubMove;
var MoveBattle = /** @class */ (function () {
    function MoveBattle(player) {
        this.ActionType = commons_1.ActionType.Battle;
        this.Weight = 0;
        this.IdBefore = 0;
        this.IdAfter = 0;
        this.Steps = 0;
        this.TotalKills = 0;
        this.Player = player;
        this.Opponent = commons_1.GetOpponent(player);
        this.SubMoves = new Array();
    }
    MoveBattle.FromPlayerAndCell = function (player, idCell) {
        var mv = new MoveBattle(player);
        mv.IdBefore = idCell;
        mv.IdAfter = idCell;
        return mv;
    };
    MoveBattle.FromPrevious = function (mv0, idBefore, idAfter) {
        var mv = new MoveBattle(mv0.Player);
        mv.IdBefore = idBefore;
        mv.IdAfter = idAfter;
        mv.TotalKills = mv0.TotalKills;
        mv.Steps = mv0.Steps + 1;
        for (var _i = 0, _a = mv0.SubMoves; _i < _a.length; _i++) {
            var ms = _a[_i];
            mv.SubMoves.push(ms.Clone());
        }
        return mv;
    };
    MoveBattle.prototype.ToStr = function () {
        var s = '';
        var cb = cube_1.EmptyCube.AllCells[this.IdBefore].Coords.cxyz;
        var ca = cube_1.EmptyCube.AllCells[this.IdAfter].Coords.cxyz;
        if (this.TotalKills == 0) {
            return "Player:" + this.Player + " MOVEBATTLE from [" + cb + "] to [" + ca + "]";
        }
        s += "Player:" + this.Player + " MOVEBATTLE from [" + cb + "] to [" + ca + "]\n";
        var k = 0;
        for (var _i = 0, _a = this.SubMoves; _i < _a.length; _i++) {
            var ms = _a[_i];
            ++k;
            s += "" + k + " " + ms.ToStr() + '\n';
        }
        s += "  TotalKils: " + this.TotalKills;
        return s;
    };
    MoveBattle.prototype.Do = function (cube) {
        for (var _i = 0, _a = this.SubMoves; _i < _a.length; _i++) {
            var mv = _a[_i];
            mv.DoStep(cube);
        }
    };
    MoveBattle.prototype.Undo = function (cube) {
        for (var _i = 0, _a = this.SubMoves.slice().reverse(); _i < _a.length; _i++) {
            var mv = _a[_i];
            mv.UndoStep(cube);
        }
    };
    return MoveBattle;
}());
exports.MoveBattle = MoveBattle;


/***/ }),

/***/ "./src/moves.ts":
/*!**********************!*\
  !*** ./src/moves.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveFirst = exports.MovePlace = exports.MovePass = exports.MoveComparer = void 0;
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var cube_1 = __webpack_require__(/*! ./cube */ "./src/cube.ts");
exports.MoveComparer = function (m0, m1) {
    return m0.Weight > m1.Weight ? -1 : 1;
};
var MovePass = /** @class */ (function () {
    function MovePass(player) {
        this.Player = player;
        this.ActionType = commons_1.ActionType.Pass;
        this.Weight = 0;
    }
    MovePass.prototype.ToStr = function () {
        return "Player:" + this.Player + " PASS";
    };
    MovePass.prototype.Do = function (cube) { };
    MovePass.prototype.Undo = function (cube) { };
    return MovePass;
}());
exports.MovePass = MovePass;
var MovePlace = /** @class */ (function () {
    function MovePlace(player, idCell) {
        this.Player = player;
        this.ActionType = commons_1.ActionType.Place;
        this.Weight = 0;
        this.IdCell = idCell;
    }
    MovePlace.prototype.ToStr = function () {
        var c = cube_1.EmptyCube.AllCells[this.IdCell].Coords.cxyz;
        return "Player:" + this.Player + " PLACE AT " + c;
    };
    MovePlace.prototype.Do = function (cube) {
        cube.SetCellById(this.IdCell, this.Player);
    };
    MovePlace.prototype.Undo = function (cube) {
        cube.SetCellById(this.IdCell, commons_1.Content.Empty);
    };
    return MovePlace;
}());
exports.MovePlace = MovePlace;
var MoveFirst = /** @class */ (function () {
    function MoveFirst(player, idCell) {
        this.Player = player;
        this.ActionType = commons_1.ActionType.Remove;
        this.Weight = 0;
        this.IdCell = idCell;
    }
    MoveFirst.prototype.ToStr = function () {
        var c = cube_1.EmptyCube.AllCells[this.IdCell].Coords.cxyz;
        return "Player:" + this.Player + " REMOVE AT " + c;
    };
    MoveFirst.prototype.Do = function (cube) {
        cube.SetCellById(this.IdCell, commons_1.Content.Empty);
    };
    MoveFirst.prototype.Undo = function (cube) {
        cube.SetCellById(this.IdCell, this.Player);
    };
    return MoveFirst;
}());
exports.MoveFirst = MoveFirst;


/***/ }),

/***/ "./src/movesGenerator.ts":
/*!*******************************!*\
  !*** ./src/movesGenerator.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GenMovesBattle = exports.MovesBattle = exports.BuildMoveBattle = exports.RandomCubes = exports.AllCubesClear = exports.AllCubes = exports.BuildSubMoves = exports.FirstTurn = exports.Placement = void 0;
var commons_1 = __webpack_require__(/*! ./commons */ "./src/commons.ts");
var cube_1 = __webpack_require__(/*! ./cube */ "./src/cube.ts");
var moves_1 = __webpack_require__(/*! ./moves */ "./src/moves.ts");
var moveBattle_1 = __webpack_require__(/*! ./moveBattle */ "./src/moveBattle.ts");
exports.Placement = function (cube, player, randomize) {
    var moves = new Array();
    for (var idCell = 0; idCell < 24; ++idCell) {
        var c = cube.GetCellById(idCell);
        if (c.Content != commons_1.Content.Empty)
            continue;
        var mv = new moves_1.MovePlace(player, idCell);
        mv.Do(cube);
        mv.Weight = (cube.ComputeDomination(player).DomPlayer * 100 + c.Power * 10000);
        if (randomize)
            mv.Weight += commons_1.RandInteger(0, 100);
        moves.push(mv);
        mv.Undo(cube);
    }
    return moves.sort(moves_1.MoveComparer);
};
exports.FirstTurn = function (cube, player, randomize) {
    var moves = new Array();
    for (var idCell = 0; idCell < 24; ++idCell) {
        var c = cube.GetCellById(idCell);
        if (c.Content != player)
            continue;
        var mv = new moves_1.MoveFirst(player, idCell);
        mv.Do(cube);
        mv.Weight = -(cube.ComputeDomination(player).DomPlayer * 100 + c.Power * 10000);
        if (randomize)
            mv.Weight -= commons_1.RandInteger(0, 100);
        moves.push(mv);
        mv.Undo(cube);
    }
    return moves.sort(moves_1.MoveComparer);
};
exports.BuildSubMoves = function (cube, player, idBefore, idAfter) {
    var cell = cube.GetCellById(idAfter);
    var ms = new moveBattle_1.SubMove(player, idBefore, idAfter);
    for (var _i = 0, _a = cell.Rows; _i < _a.length; _i++) {
        var row = _a[_i];
        var row0 = row[0];
        var c0 = row0.Content;
        var c1 = row[1].Content;
        if (commons_1.DiffContent(player, c0) && commons_1.SameContent(player, c1)) {
            if (ms.NbKills == 0)
                ms.IdOpponent1 = row0.Id;
            else
                ms.IdOpponent2 = row0.Id;
            ++ms.NbKills;
        }
    }
    return ms;
};
exports.AllCubes = new Array();
exports.AllCubesClear = function () {
    exports.AllCubes = new Array();
};
exports.RandomCubes = function () {
    exports.AllCubesClear();
    for (var k = 2; k < 11; ++k) {
        console.group("Players : " + k + " x 2 tokens");
        for (var j = 0; j < 2; ++j) {
            console.log(j);
            var lt = Array.from(Array(24), function (e, i) { return i; }).sort(function (a, b) { return 0.5 - Math.random(); });
            var cube = new cube_1.Cube();
            for (var i = 0; i < k; ++i) {
                cube.SetCellById(lt[2 * i], commons_1.Content.P1);
                cube.SetCellById(lt[2 * i + 1], commons_1.Content.P2);
            }
            exports.AllCubes.push(cube.ExportBit());
        }
        console.groupEnd();
    }
    console.log("NbAllCubes", exports.AllCubes.length);
};
exports.BuildMoveBattle = function (cube, current, moves) {
    var cell = cube.GetCellById(current.IdAfter);
    if (current.Steps == 0 && commons_1.DiffContent(cell.Content, current.Player))
        throw new Error("exception");
    for (var _i = 0, _a = cell.Neighbors; _i < _a.length; _i++) {
        var n = _a[_i];
        if (n.Content != commons_1.Content.Empty)
            continue;
        var mv = moveBattle_1.MoveBattle.FromPrevious(current, current.IdBefore, n.Id);
        var ms = exports.BuildSubMoves(cube, current.Player, current.IdAfter, n.Id);
        mv.TotalKills += ms.NbKills;
        mv.SubMoves.push(ms);
        ms.DoStep(cube);
        var e = cube.ExportBit();
        if (!exports.AllCubes.includes(e)) {
            if (mv.Steps == 1 || ms.NbKills != 0) {
                var sc = cube.ComputeDomination(current.Player);
                mv.Weight = commons_1.RandInteger(0, 100) + sc.DomPlayer * 100 + mv.TotalKills * 10000;
                moves.push(mv);
            }
            if (ms.NbKills != 0)
                exports.BuildMoveBattle(cube, mv, moves);
        }
        ms.UndoStep(cube);
    }
};
exports.MovesBattle = function (cube, player, idCell) {
    var root = moveBattle_1.MoveBattle.FromPlayerAndCell(player, idCell);
    var moves = new Array();
    exports.BuildMoveBattle(cube, root, moves);
    return moves;
};
exports.GenMovesBattle = function (cube, player) {
    var moves = new Array();
    for (var i = 0; i < 24; ++i) {
        var cell = cube.GetCellById(i);
        if (cell.Content != player)
            continue;
        var root = moveBattle_1.MoveBattle.FromPlayerAndCell(player, cell.Id);
        exports.BuildMoveBattle(cube, root, moves);
    }
    if (moves.length == 0) {
        var pass = new Array();
        pass.push(new moves_1.MovePass(player));
        return pass;
    }
    return moves.sort(moves_1.MoveComparer);
};


/***/ })

/******/ });
//# sourceMappingURL=chaxgame.bundle.js.map