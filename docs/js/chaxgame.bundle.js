var ChaxGame =
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
var enum_1 = __webpack_require__(/*! ./enum */ "./src/enum.ts");
var cube_1 = __webpack_require__(/*! ./cube */ "./src/cube.ts");
console.log("Chaxgame lib ready");
module.exports = {
    CellEmpty: enum_1.Content.Empty,
    CellP1: enum_1.Content.P1,
    CellP2: enum_1.Content.P2,
    Cube: function () {
        return new cube_1.Cube();
    }
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
exports.AltCell = exports.Cell = void 0;
var enum_1 = __webpack_require__(/*! ./enum */ "./src/enum.ts");
var coords3D_1 = __webpack_require__(/*! ./coords3D */ "./src/coords3D.ts");
var Cell = /** @class */ (function () {
    function Cell(id, x, y, z) {
        this.Id = id;
        this.Coords = new coords3D_1.Coords(x, y, z);
        this.Power = 0;
        this.Content = enum_1.Content.Empty;
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
    return Cell;
}());
exports.Cell = Cell;
var AltCell = /** @class */ (function () {
    function AltCell(id, pow) {
        this.Id = id;
        this.Power = pow;
        this.Content = enum_1.Content.Empty;
        this.AltContent = enum_1.Content.Empty;
        this.Step = 0;
        this.Neighbors = [];
    }
    return AltCell;
}());
exports.AltCell = AltCell;


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
var enum_1 = __webpack_require__(/*! ./enum */ "./src/enum.ts");
var Coords = /** @class */ (function () {
    function Coords(x, y, z) {
        this.X = x;
        this.Y = y;
        this.Z = z;
        this.cxyz = "c" + this.X + "" + this.Y + "" + this.Z;
    }
    Coords.prototype.Next = function (dir) {
        switch (dir) {
            case enum_1.Dir.R: return new Coords(this.X + 1, this.Y, this.Z);
            case enum_1.Dir.L: return new Coords(this.X - 1, this.Y, this.Z);
            case enum_1.Dir.D: return new Coords(this.X, this.Y + 1, this.Z);
            case enum_1.Dir.U: return new Coords(this.X, this.Y - 1, this.Z);
            case enum_1.Dir.F: return new Coords(this.X, this.Y, this.Z + 1);
            case enum_1.Dir.B: return new Coords(this.X, this.Y, this.Z - 1);
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
exports.Cube = exports.CubeScore = void 0;
var enum_1 = __webpack_require__(/*! ./enum */ "./src/enum.ts");
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
        if (c == enum_1.Content.Empty)
            return 0;
        if (enum_1.SameContent(c, this.Player))
            return this.ScorePlayer;
        return this.ScoreOpponent;
    };
    CubeScore.prototype.GetDomination = function (c) {
        if (c == enum_1.Content.Empty)
            return 0;
        if (enum_1.SameContent(c, this.Player))
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
        this.Init();
    }
    Cube.prototype.Init = function () {
        var dirs = [enum_1.Dir.B, enum_1.Dir.D, enum_1.Dir.F, enum_1.Dir.L, enum_1.Dir.R, enum_1.Dir.U];
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
            return null;
        return c;
    };
    Cube.prototype.SetCellById = function (id, content) {
        var c = this.AllCells[id];
        if (c == undefined)
            return;
        c.Content = content;
    };
    Cube.prototype.SetCellByKey = function (cxyz, content) {
        var c = this.Infos.get(cxyz);
        if (c == undefined)
            return;
        c.Content = content;
    };
    Cube.prototype.Clear = function () {
        for (var _i = 0, _a = this.AllCells; _i < _a.length; _i++) {
            var c = _a[_i];
            c.Content = enum_1.Content.Empty;
        }
    };
    Cube.prototype.Render = function (boardId) {
        var board = $(boardId);
        board.empty();
        for (var _i = 0, _a = this.AllCells; _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.Content == enum_1.Content.Empty)
                continue;
            var e = $("<div/>");
            e.attr("id", c.Coords.cxyz);
            e.css("top", c.Y * 32 + 40);
            e.css("left", c.X * 32 + 40);
            if (c.Content == enum_1.Content.P1)
                e.addClass("r1");
            if (c.Content == enum_1.Content.P2)
                e.addClass("r2");
            board.append(e);
        }
    };
    Cube.prototype.ConsoleCube = function (details) {
        cubeConsole_1.DisplayCube(this, details);
    };
    Cube.prototype.ComputeDomination = function (player) {
        var opponent = enum_1.GetOpponent(player);
        var ScorePlayer = 0;
        var ScoreOpponent = 0;
        var DomPlayer = 0;
        var DomOpponent = 0;
        this.Queue = [];
        for (var i = 0; i < 24; ++i) {
            var cc = this.AllAltCells[i];
            cc.Content = this.AllCells[i].Content;
            cc.AltContent = enum_1.Content.Empty;
            cc.Step = 0;
            if (cc.Content != enum_1.Content.Empty) {
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
                if (n.Content == enum_1.Content.Empty) {
                    n.Content = c.Content;
                    n.Step = c.Step + 1;
                    this.Queue.push(n);
                    if (n.Content == player)
                        DomPlayer += n.Power;
                    if (n.Content == opponent)
                        DomOpponent += n.Power;
                }
                else if (n.Content != c.Content && n.AltContent == enum_1.Content.Empty && n.Step == c.Step + 1) {
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
var enum_1 = __webpack_require__(/*! ../src/enum */ "./src/enum.ts");
var EMPTY = "#";
var P1 = "X";
var P2 = "O";
var StrContent = function (c) {
    switch (c) {
        case enum_1.Content.Empty: return EMPTY;
        case enum_1.Content.P1: return P1;
        case enum_1.Content.P2: return P2;
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
}
exports.DisplayCube = DisplayCube;


/***/ }),

/***/ "./src/enum.ts":
/*!*********************!*\
  !*** ./src/enum.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DiffContent = exports.SameContent = exports.GetOpponent = exports.Content = exports.Dir = void 0;
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


/***/ })

/******/ });
//# sourceMappingURL=chaxgame.bundle.js.map