export function renderSelect({parent, options, id, on_change}){
    let select = document.createElement("select");
    select.id = id
    select.onchange = on_change
    parent.appendChild(select)

    for(let optionName of options){
        let option = document.createElement("option")
        option.textContent = optionName;
        select.appendChild(option)
    }
}

