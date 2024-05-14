import { isArrayOfObjects } from "./support.js";

export function renderTable({ parent, data, id }) {
  let columnNames = Object.keys(data[0]);
  let rows = data.length;
  let columns = Object.keys(data[0]).length;

  let table = document.createElement("table");
  table.id = id;
  parent.appendChild(table);

  renderRows({ rows: 1, columns, parent: table, data: columnNames });
  renderRows({ rows, columns, parent: table, data: data });
}

function renderRows({ rows, columns, parent, data }) {
  for (let currentRow = 0; currentRow < rows; ++currentRow) {
    let tr = document.createElement("tr");
    parent.appendChild(tr);
    renderCells({ currentRow, columns, parent: tr, data: data });
  }
}

function renderCells({ currentRow, columns, parent, data }) {
  if (isArrayOfObjects(data)) {
    for (let currentColumn = 0; currentColumn < columns; ++currentColumn) {
      let columnNames = Object.keys(data[0]);
      let currentColumnName = columnNames[currentColumn];

      let td = document.createElement("td");
      td.textContent = data[currentRow][currentColumnName];
      parent.appendChild(td);
    }
  } else if (!isArrayOfObjects(data)) {
    for (let currentColumn = 0; currentColumn < columns; ++currentColumn) {
      let td = document.createElement("th");
      td.textContent = data[currentColumn];
      parent.appendChild(td);
    }
  }
}

export function removeTable({ id }) {
  let table = document.getElementById(id);
  if (table) table.remove();
}
