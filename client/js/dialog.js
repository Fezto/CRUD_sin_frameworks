export function renderDialog({parent, id, title, button_text, button_on_click, inputs, inputs_class}) {

    //? Generar el <dialog>
    let dialog = document.createElement("dialog");
    dialog.id = id
    styleDialog(dialog);
    parent.appendChild(dialog)

    //? Generar el <div> que contendrá el título
    let div_title = document.createElement("div");
    dialog.appendChild(div_title);

    let h1 = document.createElement("h1");
    h1.textContent = title;
    div_title.appendChild(h1);

    //? Generar el <div> que contendrá todas las columnas y los <input>
    let div_body = document.createElement("div")
    div_body.style.display = "flex"
    div_body.style.width = "100%"
    dialog.appendChild(div_body)

    let div_columns = document.createElement("div")
    div_columns.style.width = "30%"
    div_body.appendChild(div_columns)

    let div_inserts = document.createElement("div")
    div_inserts.style.width = "70%"
    div_body.appendChild(div_inserts)

    for (let inputName of inputs) {

        if (inputName === "id") continue;

        let div_column = document.createElement("div")
        styleDiv({div: div_column, align_items:"center"})
        div_columns.appendChild(div_column)

        let h3 = document.createElement("h3")
        h3.textContent = inputName
        div_column.appendChild(h3)

        let div_insert = document.createElement("div")
        styleDiv({div: div_insert, align_items:"center"})
        div_inserts.appendChild(div_insert)

        let input = document.createElement("input")
        input.className = inputs_class
        input.style.width = "90%"
        div_insert.appendChild(input)
    }

    //? Generar el <div> que contendrá los botones
    let div_buttons = document.createElement("div")
    styleDiv({div: div_buttons, justify_content:"flex-end"})
    dialog.appendChild(div_buttons)

    let button_cancel = document.createElement("button")
    button_cancel.style.marginRight = "1rem"
    button_cancel.textContent = "Cancelar"
    button_cancel.onclick = () => closeDialog(dialog)
    div_buttons.appendChild(button_cancel)

    let button_action = document.createElement("button")
    button_action.textContent = button_text
    button_action.onclick = button_on_click
    div_buttons.appendChild(button_action)

    openDialog(dialog)

}

export function removeDialog(){
    let dialog = document.getElementsByTagName("dialog")
    if(dialog[0]) dialog[0].remove()
}

function openDialog(dialog) {
    document.body.style.overflow = "hidden"
    dialog.show()
}

function closeDialog(dialog) {
    document.body.style.overflow = "visible"
    removeDialog()
    dialog.close()
}

function styleDialog(dialog) {
    dialog.style.position = "fixed";
    dialog.style.zIndex = "1";
    dialog.style.top = `${window.innerHeight / 3}px`;
    dialog.style.left = "0";
    dialog.style.width = "50%";
    dialog.style.height = "auto"
    dialog.style.backgroundColor = "white"
}

function styleDiv({div, justify_content = "flex-start", align_items = "stretch"}) {
    div.style.display = "flex"
    div.style.justifyContent = justify_content
    div.style.alignItems = align_items
    div.style.width = "100%"
    div.style.height = "2rem"
    div.style.marginBottom = "1rem"
}