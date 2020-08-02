import { Content } from "../src/enum";
import { Cube } from "./../src/cube";

describe("Cube cells testing", () => {
    it("Power and Nb Rows.", () => {
        const cube = new Cube();
        for (let c of cube.AllCells) {
            expect(c.Power).toBe(c.Rows.length, "Cell Power must be equal to nb rows.");
        }
    });

    it("Power and Nb Neighbors.", () => {
        const cube = new Cube();
        for (let c of cube.AllCells) {
            if (c.Power == 3 || c.Power == 1) {
                expect(c.Neighbors.length).toBe(3, "Cell with Power 3 or Power 1 must have 3 neighbors.");
            }
            else {
                expect(c.Neighbors.length).toBe(4, "Cell with Power 2 or 0 must have 4 neighbors.");
            }
        }
    });

    it("AltCell Nb Neighbors.", () => {
        const cube = new Cube();
        for(let i = 0; i < 24; ++i) {
            let c0 = cube.AllCells[i];
            let c1 = cube.AllAltCells[i];
            expect(c0.Neighbors.length).toBe(c1.Neighbors.length, "Cell nb neighbors must be equal to AltCell nb neighbors.");
        }
    });
});

describe("Cube Domination testing.", () => {
    it("Empty Cube.", () => {
        const cube = new Cube();
        const sc1 = cube.ComputeDomination(Content.P1);
        const sc2 = cube.ComputeDomination(Content.P2);

        expect(sc1.ScorePlayer).toBe(0);
        expect(sc1.ScoreOpponent).toBe(0);
        expect(sc2.ScorePlayer).toBe(0);
        expect(sc2.ScoreOpponent).toBe(0);

        expect(sc1.DomPlayer).toBe(0);
        expect(sc1.DomOpponent).toBe(0);
        expect(sc2.DomPlayer).toBe(0);
        expect(sc2.DomOpponent).toBe(0);
    });
    
    it("One Cell Cube.", () => {
        const cube = new Cube();
        cube.SetCellByKey("c000", Content.P1);
        const sc1 = cube.ComputeDomination(Content.P1);
        const sc2 = cube.ComputeDomination(Content.P2);

        expect(sc1.ScorePlayer).toBe(1);
        expect(sc1.ScoreOpponent).toBe(0);
        expect(sc2.ScorePlayer).toBe(0);
        expect(sc2.ScoreOpponent).toBe(1);

        expect(sc1.DomPlayer).toBe(40);
        expect(sc1.DomOpponent).toBe(0);
        expect(sc2.DomPlayer).toBe(0);
        expect(sc2.DomOpponent).toBe(40);
    });
    
    it("Two Cells Cube (1).", () => {
        const cube = new Cube();
        cube.SetCellByKey("c000", Content.P1);
        cube.SetCellByKey("c220", Content.P2);
        const sc1 = cube.ComputeDomination(Content.P1);
        const sc2 = cube.ComputeDomination(Content.P2);

        expect(sc1.ScorePlayer).toBe(1);
        expect(sc1.ScoreOpponent).toBe(1);
        expect(sc2.ScorePlayer).toBe(1);
        expect(sc2.ScoreOpponent).toBe(1);

        expect(sc1.DomPlayer).toBe(28);
        expect(sc1.DomOpponent).toBe(12);
        expect(sc2.DomPlayer).toBe(28);
        expect(sc2.DomOpponent).toBe(12);
    });
    
    it("Two Cells Cube (2).", () => {
        const cube = new Cube();
        cube.SetCellByKey("c000", Content.P1);
        cube.SetCellByKey("c200", Content.P2);
        const sc1 = cube.ComputeDomination(Content.P1);
        const sc2 = cube.ComputeDomination(Content.P2);

        expect(sc1.ScorePlayer).toBe(1);
        expect(sc1.ScoreOpponent).toBe(1);
        expect(sc2.ScorePlayer).toBe(1);
        expect(sc2.ScoreOpponent).toBe(1);

        expect(sc1.DomPlayer).toBe(22);
        expect(sc1.DomOpponent).toBe(18);
        expect(sc2.DomPlayer).toBe(22);
        expect(sc2.DomOpponent).toBe(18);
    });
    
});