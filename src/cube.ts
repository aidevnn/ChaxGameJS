import { Dir, Content, SameContent, GetOpponent } from "./commons";
import { Cell, NullCell, AltCell } from "./cell";
import { DisplayCube } from "./cubeConsole"

export class CubeScore {
    Player: Content;
    DomPlayer: number;
    DomOpponent: number;
    ScorePlayer: number;
    ScoreOpponent: number;
    constructor(player: Content, scPlayer: number, scOpponent: number, domPlayer: number, domOpponent: number) {
        this.Player = player;
        this.ScorePlayer = scPlayer;
        this.ScoreOpponent = scOpponent;
        this.DomPlayer = domPlayer;
        this.DomOpponent = domOpponent;
    }

    GetScore(c: Content): number {
        if (c == Content.Empty)
            return 0;

        if (SameContent(c, this.Player))
            return this.ScorePlayer;

        return this.ScoreOpponent;
    }

    GetDomination(c: Content): number {
        if (c == Content.Empty)
            return 0;

        if (SameContent(c, this.Player))
            return this.DomPlayer;

        return this.DomOpponent;
    }
}

export class Cube {
    AllCells: Array<Cell>;
    AllAltCells: Array<AltCell>;
    Infos: Map<string, Cell>;
    Queue: Array<AltCell>;
    BitPlayer1: number;
    BitPlayer2: number;
    constructor() {
        this.AllCells = [];
        this.AllAltCells = [];
        this.Infos = new Map();
        this.Queue = [];
        this.BitPlayer1 = 0;
        this.BitPlayer2 = 0;
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

    GetCellById(id: number): Cell {
        return this.AllCells[id];
    }

    GetCellByKey(cxyz: string): Cell {
        let c = this.Infos.get(cxyz);

        if (c == undefined)
            return NullCell;

        return c;
    }

    SetCellById(id: number, content: Content): void {
        let c = this.AllCells[id];
        if (c == undefined)
            return;

        this.ChangeBitPlayer(id, c.Content, content);
        c.Content = content;
    }

    SetCellByKey(cxyz: string, content: Content): void {
        let c = this.Infos.get(cxyz);
        if (c == undefined)
            return;

        this.ChangeBitPlayer(c.Id, c.Content, content);
        c.Content = content;
    }

    ChangeBitPlayer(id: number, b: Content, a: Content): void {
        let i = 1 << id;

        if (b == Content.P1 && a == Content.Empty) this.BitPlayer1 ^= i;
        if (b == Content.P2 && a == Content.Empty) this.BitPlayer2 ^= i;

        if (b == Content.Empty && a == Content.P1) this.BitPlayer1 |= i;
        if (b == Content.Empty && a == Content.P2) this.BitPlayer2 |= i;
    }

    Export(): string {
        let s = '';
        for (let c of this.AllCells) {
            s += c.Content;
        }
        return s;
    }

    Import(s: string): void {
        this.BitPlayer1 = 0;
        this.BitPlayer2 = 0;
        for (let i = 0; i < 24; ++i) {
            this.AllCells[i].Content = Content.Empty;
            let c = s[i];

            if (c == "1") this.SetCellById(i, Content.P1);
            else if (c == "2") this.SetCellById(i, Content.P2);
            else this.SetCellById(i, Content.Empty);
        }
    }

    ExportBit(): number {
        return this.BitPlayer1 + 1000000000000 * this.BitPlayer2;
    }

    Clear(): void {
        for (let i = 0; i < 24; ++i) {
            this.SetCellById(i, Content.Empty)
        }
    }

    Render(boardId: string): void {
        let board = $(boardId);
        board.empty();
        for (let c of this.AllCells) {
            if (c.Content == Content.Empty) continue;

            board.append(c.ToHTML());
        }
    }

    ConsoleCube(details: boolean) {
        DisplayCube(this, details);
    }

    ComputeDomination(player: Content): CubeScore {
        let opponent = GetOpponent(player);

        let ScorePlayer = 0;
        let ScoreOpponent = 0;
        let DomPlayer = 0;
        let DomOpponent = 0;

        this.Queue = [];

        for (let i = 0; i < 24; ++i) {
            var cc = this.AllAltCells[i];
            cc.Content = this.AllCells[i].Content;
            cc.AltContent = Content.Empty;
            cc.Step = 0;

            if (cc.Content != Content.Empty) {
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

            for (let n of c.Neighbors) {
                if (n.Content == Content.Empty) {
                    n.Content = c.Content;
                    n.Step = c.Step + 1;
                    this.Queue.push(n);

                    if (n.Content == player) DomPlayer += n.Power;
                    if (n.Content == opponent) DomOpponent += n.Power;
                }
                else if (n.Content != c.Content && n.AltContent == Content.Empty && n.Step == c.Step + 1) {
                    n.AltContent = c.Content;
                    if (n.Content == opponent && c.Content == player) {
                        DomPlayer += n.Power;
                        DomOpponent -= n.Power;
                    }
                }
            }
        }

        return new CubeScore(player, ScorePlayer, ScoreOpponent, DomPlayer, DomOpponent);
    }
}

export const EmptyCube = new Cube();