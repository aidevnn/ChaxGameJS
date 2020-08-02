import {Cube} from "./cube";

let cube = new Cube();
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