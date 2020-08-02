import { Dir, Content } from "./enum";
import { Cell, AltCell } from "./cell";

export class Cube {
    AllCells: Array<Cell>;
    AllAltCells: Array<AltCell>;
    Infos: Map<string, Cell>;
    constructor() {
        this.AllCells = [];
        this.AllAltCells = [];
        this.Infos = new Map();
        this.Init();
    }

    private Init(): void {
        let dirs = [Dir.B, Dir.D, Dir.F, Dir.L, Dir.R, Dir.U];

        let id = 0;
        for (let i = 0; i < 3; ++i) {
            for (let j = 0; j < 3; ++j) {
                for (let k = 0; k < 3; ++k) {
                    if (i == 1 && j == 1) break;

                    let c0 = new Cell(id, i, j, k);
                    let c1 = new AltCell(id, c0.Power);
                    this.AllCells.push(c0);
                    this.AllAltCells.push(c1);
                    this.Infos.set(c0.Coords.cxyz, c0);
                    ++id;
                }
            }
        }

        for (let c0 of this.AllCells) {
            let cc0 = this.AllAltCells[c0.Id];
            for (let d of dirs) {
                let coords1 = c0.Coords.Next(d);
                if (!coords1.InCube()) continue;

                let c1 = this.Infos.get(coords1.cxyz);
                if (c1 == undefined)
                    continue;
                    
                c0.Neighbors.push(c1);
                cc0.Neighbors.push(this.AllAltCells[c1.Id]);

                let coords2 = c1.Coords.Next(d);
                if (coords2.InCube()) {
                    let c2 = this.Infos.get(coords2.cxyz);
                    if (c2 != undefined)
                        c0.Rows.push([c1, c2]);
                }
            }
        }
    }
}