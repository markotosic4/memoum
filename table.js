import { data } from "./data.js";
import { permutation } from "./permutation.js";

let main = document.querySelector("#main");
let table = document.querySelector("#mainTable");

export class Table{
    constructor(rowsAndColumns){
        this.rowsAndColumns = rowsAndColumns;
    }

    set rowsAndColumns(rowsAndColumns){
        this._rowsAndColumns = rowsAndColumns;
    }

    get rowsAndColumns(){
        return this._rowsAndColumns;
    }

    createTable(){
        
        /* let table = document.createElement("table"); */
        if(this.rowsAndColumns == 4){
            table.style.gap ="11px";
        }else if(this.rowsAndColumns == 6){
            table.style.gap ="7px";
        } else if(this.rowsAndColumns == 8){
            table.style.gap ="6px";
        }else if(this.rowsAndColumns == 10){
            table.style.gap ="4px";
        }
        for(let i=0; i< this.rowsAndColumns; i++){
            let tr = document.createElement("tr");
            if(this.rowsAndColumns == 4){
                tr.style.gap ="11px";
            }else if(this.rowsAndColumns == 6){
                tr.style.gap ="7px";
            } else if(this.rowsAndColumns == 8){
                tr.style.gap ="6px";
            }else if(this.rowsAndColumns == 10){
                tr.style.gap ="4px";
            }
            for(let j =0; j< this.rowsAndColumns; j++){
                let td = document.createElement("td");
                
                tr.append(td);
                
            }
            table.append(tr);
        }
        return table;

    }

    displayImages(){
        let tds = table.querySelectorAll('td');
        permutation(data);
        let arr = [];
        for(let i=0; i< tds.length/2; i++){
            arr.push(data[i]);
        }

        arr.push(...arr);
        permutation(arr);
        for(let j=0; j < tds.length; j++){
             let img = document.createElement("img");
             img.id = j;
             img.style.border = "1px solid black"
             if(this.rowsAndColumns == 4){
                img.style.borderRadius ="22px";
            }else {
                img.style.borderRadius ="8px";
            }
             img.src = `assets/${arr[j].back}`;
             img.setAttribute("front_src", `assets/${arr[j].front}`)
             img.style.display= "block";
             tds[j].append(img);
        }

    }

}



