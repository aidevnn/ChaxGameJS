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