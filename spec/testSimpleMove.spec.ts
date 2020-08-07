import { Content } from "../src/commons"
import { Cube } from "./../src/cube"
import { MovesBattle } from "./../src/movesGenerator"

describe("Simple moves.", () => {
    it("One cell cube.", () => {
        const cube = new Cube();
        cube.SetCellByKey("c000", Content.P1);
        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, 0);
        let exportAfter = cube.Export();

        expect(moves.length).toBe(3, "Cell c000 must has 3 moves.");
        expect(exportBefore).toBe(exportAfter, "Cube state must be unchanged.");

        let coordsBefore = new Set<number>(moves.map(m => m.IdBefore));
        expect(coordsBefore.has(0)).toBe(true, "Moves must start at c000.");
        expect(coordsBefore.size).toBe(1, "Moves must start at same cell.");

        let coordsAfter = new Set<string>(moves.map(m => cube.GetCellById(m.IdAfter).Coords.cxyz));
        expect(coordsAfter.size).toBe(3);
        expect(coordsAfter.has("c001")).toBe(true);
        expect(coordsAfter.has("c010")).toBe(true);
        expect(coordsAfter.has("c100")).toBe(true);
        expect(coordsAfter.has("c000")).toBe(false);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(0);

        for(let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Two cells without obstruction.", () => {
        const cube = new Cube();
        cube.SetCellByKey("c000", Content.P1);
        cube.SetCellByKey("c200", Content.P2);
        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, 0);
        let exportAfter = cube.Export();

        expect(moves.length).toBe(3, "Cell c000 must has 3 moves.");
        expect(exportBefore).toBe(exportAfter, "Cube state must be unchanged.");

        let coordsBefore = new Set<number>(moves.map(m => m.IdBefore));
        expect(coordsBefore.has(0)).toBe(true, "Moves must start at c000.");
        expect(coordsBefore.size).toBe(1, "Moves must start at same cell.");

        let coordsAfter = new Set<string>(moves.map(m => cube.GetCellById(m.IdAfter).Coords.cxyz));
        expect(coordsAfter.size).toBe(3);
        expect(coordsAfter.has("c001")).toBe(true);
        expect(coordsAfter.has("c010")).toBe(true);
        expect(coordsAfter.has("c100")).toBe(true);
        expect(coordsAfter.has("c000")).toBe(false);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(0);

        for(let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });

    it("Two cells with obstruction.", () => {
        const cube = new Cube();
        cube.SetCellByKey("c000", Content.P1);
        cube.SetCellByKey("c001", Content.P2);
        let exportBefore = cube.Export();

        let moves = MovesBattle(cube, Content.P1, 0);
        let exportAfter = cube.Export();

        expect(moves.length).toBe(2, "Cell c000 must has 2 moves.");
        expect(exportBefore).toBe(exportAfter, "Cube state must be unchanged.");

        let coordsBefore = new Set<number>(moves.map(m => m.IdBefore));
        expect(coordsBefore.has(0)).toBe(true, "Moves must start at c000.");
        expect(coordsBefore.size).toBe(1, "Moves must start at same cell.");

        let coordsAfter = new Set<string>(moves.map(m => cube.GetCellById(m.IdAfter).Coords.cxyz));
        expect(coordsAfter.size).toBe(2);
        expect(coordsAfter.has("c001")).toBe(false);
        expect(coordsAfter.has("c010")).toBe(true);
        expect(coordsAfter.has("c100")).toBe(true);
        expect(coordsAfter.has("c000")).toBe(false);

        let nbKills = moves.map(m => m.TotalKills).reduce((a, b) => Math.max(a, b));
        expect(nbKills).toBe(0);

        for(let mv of moves) {
            mv.Do(cube);
            mv.Undo(cube);
            expect(exportBefore).toBe(cube.Export());
        }
    });
});
