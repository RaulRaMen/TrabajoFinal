async function Prediccion() {

    const bloques = document.querySelectorAll(".estaciones");

    const rentalPlace = [];
    const returnPlace = [];

    const now = new Date();

    const start = [];
    const day = [];
    const month = [];
    const pais = [];

    const horaActual = now.getHours();
    const diaActual = now.getDate();
    const mesActual = now.getMonth() + 1;

    bloques.forEach(bloque => {

        const inputs = bloque.querySelectorAll("input");

        const salida = inputs[0].value;
        const llegada = inputs[1].value;

        rentalPlace.push(salida);
        returnPlace.push(llegada);

        start.push(horaActual);
        day.push(diaActual);
        month.push(mesActual);
        pais.push("España");
    });

    const data = {
        "Start": start,
        "Rental place": rentalPlace,
        "Return place": returnPlace,
        "PAÍS": pais,
        "Day": day,
        "Month": month
    };

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        console.log("Predicción total:", result.prediction);

        document.getElementById("result").innerText =
            "Tiempo total estimado: " + result.prediction + " minutos";

    } catch (error) {
        console.error("Error en la predicción:", error);
    }
}

function añadirEstacion() {
    const contenedor = document.querySelector(".contenedorEstaciones");
    const plantilla = document.querySelector(".estaciones");

    const nuevo = plantilla.cloneNode(true);

    // limpiar inputs
    nuevo.querySelectorAll("input").forEach(input => input.value = "");

    contenedor.appendChild(nuevo);
}