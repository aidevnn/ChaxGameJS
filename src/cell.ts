import { Content } from "./enum";
import { Coords } from "./coords3D";

export class Cell {
    Content: Content;
    Coords: Coords;
    X: number;
    Y: number;
    Power: number;
    Id: number;

    Neighbors: Array<Cell>;
    Rows: Array<Cell[]>;

    constructor(id: number, x: number, y: number, z: number) {
        this.Id = id;
        this.Coords = new Coords(x, y, z);
        this.Power = 0;
        this.Content = Content.Empty;
        this.Neighbors = [];
        this.Rows = [];

        let s = 2 * z;
        let d = 6 - 2 * z;
        this.X = s + d * x;
        this.Y = s + d * y;

        let p = Math.abs(x - y);
        if (p == 0 || p == 2) {
            if (z == 0 || z == 2) this.Power = 3;
            else this.Power = 2;
        }
        else {
            if (z == 0 || z == 2) this.Power = 1;
            else this.Power = 0;
        }
    }
}

export class AltCell {
    Content: Content;
    AltContent: Content;
    Id: number;
    Power: number;
    Step: number;

    Neighbors: Array<AltCell>;
    constructor(id: number, pow: number) {
        this.Id = id;
        this.Power = pow;
        this.Content = Content.Empty;
        this.AltContent = Content.Empty;
        this.Step = 0;
        this.Neighbors = [];
    }
}