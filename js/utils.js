// Prevedie ISO dátum zo servera na čitateľný text v lokálnom čase

function formatDate(isoString){
    const date = new Date(isoString);
    return date.toLocaleString("sk-SK", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    
}

// Uplynul už termín úlohy? Dokončené úlohy sa za omeškané nepovažujú
function isOverdue(todo) {
    return !todo.is_finished && new Date(todo.date_to) < new Date();
}

