import { Dir } from "./enum";

export class Coords {
    X: number;
    Y: number;
    Z: number;
    cxyz: string;
    constructor(x: number, y: number, z: number) {
        this.X = x;
        this.Y = y;
        this.Z = z;
        this.cxyz = "c" + this.X + "" + this.Y + "" + this.Z;
    }

    Next(dir: Dir): Coords {
        switch (dir) {
            case Dir.R: return new Coords(this.X + 1, this.Y, this.Z);
            case Dir.L: return new Coords(this.X - 1, this.Y, this.Z);
            case Dir.D: return new Coords(this.X, this.Y + 1, this.Z);
            case Dir.U: return new Coords(this.X, this.Y - 1, this.Z);
            case Dir.F: return new Coords(this.X, this.Y, this.Z + 1);
            case Dir.B: return new Coords(this.X, this.Y, this.Z - 1);
        }
    }

    InCube(): boolean {
        if (this.X == 1 && this.Y == 1) return false;
        if (this.X < 0 || this.Y < 0 || this.Z < 0 || this.X > 2 || this.Y > 2 || this.Z > 2) return false;
        return true;
    }
}