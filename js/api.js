//komunikacia so serverom

const API_URL = "https://wt1zadanie.iolab.sk/api";


// Pomocná funkcia: pošle požiadavku a vráti odpoveď prevedenú z JSON
async function request(path, options) { //fetch berie 2 argumenty, adresa a nastavenie poziadavky
    const response = await fetch(API_URL + path, options);

    if (!response.ok) {
        throw new Error("Server vrátil chybu " + response.status);
    }

    // Niektoré operácie (napr. DELETE) vracajú prázdnu odpoveď
    if (response.status === 204) {
        return null;
    }

    return await response.json();
}

// Načíta zoznam úloh daného používateľa
function getTodos(name) {
    return request("/" + encodeURIComponent(name)); //ošetri identifikator pre url
}