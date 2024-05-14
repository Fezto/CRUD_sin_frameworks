import {renderSelect} from "./js/select.js";
import {renderTable, removeTable} from "./js/table.js";
import {renderButton} from "./js/button.js";
import {renderDialog, removeDialog} from "./js/dialog.js";
import {get, getTables, getColumns, post} from "../server/js/api.js";

//? "tables" es un arreglo con todas las tablas.
//? "actualTable" es un string con el nombre de la tabla en pantalla.
//? "actualData" es un objeto con los registros de la tabla en pantalla.
//? "actualColumns" es un arreglo con los nombres de las columnas
//? "actualInputsData" es un arreglo con los valores insertados dentro de los <input>

let tables = (await getTables()).filter(table => table !== "sqlite_sequence");
let actualTable = tables[0];
let actualData = await get({table: actualTable});
let actualColumns = await getColumns({table: actualTable});
let actualInputsData = {}

let body_main = document.getElementById("body_main")
let div_table = document.getElementById("div_table");
let div_select = document.getElementById("div_select");
let div_button = document.getElementById("div_button")

renderTable({parent: div_table, data: actualData, id: "main_table"});
renderSelect({parent: div_select, options: tables, id: "main_select", on_change: onChange});
renderButton({parent: div_button, name: "Añadir registro", id: "main_button_post", on_click: onClickPost})

let select = document.getElementById("main_select")
let inputs = document.querySelectorAll(".dialog_input")

callLiveFunctions()

//! Área de declaración de funciones ----------------------------------------------

//? Función que se llama al cambiar la opción en el <select>
async function onChange() {

    removeDialog();
    removeTable({id: "main_table"})
    actualTable = tables[tables.indexOf(select.value)];
    actualData = await get({table: actualTable});
    actualColumns = await getColumns({table: actualTable});
    renderTable({parent: div_table, data: actualData, id: "main_table"})

}

//? Función que se llama al querer agregar un registro
async function onClickPost() {
    actualInputsData = {}
    //? Muestra el <dialog>
    renderDialog({
        parent: body_main,
        id: "main_dialog",
        title: "Añadir registro",
        button_text: "Añadir",
        button_on_click: () => addRegistry({table: actualTable, data: actualInputsData}),
        inputs: actualColumns,
        inputs_class: "dialog_input"
    })

    //
}

async function addRegistry({table, data}) {
    await post({table, data})
    removeDialog()
    actualData.push(data)
    removeTable({id: "main_table"})
    renderTable({parent: div_table, data: actualData, id: "main_table"})
}

// Agregando cualquier cosa para git
function callLiveFunctions() {
    setInterval(updateInputs, 500)
}

//? Actualiza dinámicamente el valor de "actualInputsData"
function updateInputs() {
    inputs = document.querySelectorAll(".dialog_input")
    if (inputs[0]) {
        let inputsValues = (Array.from(inputs)).map(input => input.value)
        let inputsKeys = actualColumns.filter(column => column !== "id")

        actualInputsData = inputsKeys.reduce((object, key, index) => {
            object[key] = inputsValues[index]
            return object
        }, {})
    }
}



