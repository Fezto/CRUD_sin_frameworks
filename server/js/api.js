export async function getTables() {
    let response = await fetch("http://localhost:3000/tables");
    return response.json();
}

export async function get({table}) {
    let response = await fetch(`http://localhost:3000/${table}`);
    return response.json();
}

export async function getColumns({table, property = "name"}) {
    let response = await fetch(`http://localhost:3000/${table}/${property}`);
    return response.json();
}

export async function post({table, data}) {
  console.log("Antes de funcion", table, data)
    let response = await fetch(`http://localhost:3000/${table}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
