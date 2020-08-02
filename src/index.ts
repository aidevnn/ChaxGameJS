import { Content } from "./enum"
import { Cube } from "./cube";
import { DisplayCube } from "./cubeConsole"

let cube = new Cube();
cube.SetCellByKey("c000", Content.P1);
cube.SetCellByKey("c200", Content.P2);

cube.SetCellByKey("c001", Content.P1);
cube.SetCellByKey("c220", Content.P2);

DisplayCube(cube, true);

/*
for(let c of cube.AllCells){
    let s = "Id:" + c.Id + " " + c.Coords.cxyz + "[" + c.Power + "] [" + c.Neighbors.length + "]\n";
    s += "Rows: " + c.Rows.length + "\n";
    for(let c1 of c.Rows)
        s += "    " + c.Coords.cxyz + " => " + c1[0].Coords.cxyz + " => " + c1[1].Coords.cxyz + "\n";

    s += "Neighbors:\n"
    for(let n of c.Neighbors)
        s += "    " + n.Coords.cxyz;

    s += "\n";
    console.log(s);
}
*/