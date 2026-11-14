const { createApp, ref, onMounted } = Vue; //deštruktulizacia -> vyberie z objektu vue vlastnosti create app a ref

createApp({ //do funckie create app vkladas jeden objekt, teda stuop funkciu
    setup() { //volanie funckii na zaciatku spustenia programu, prirpavi data
        // Identifikátor, pod ktorým server vedie zoznam úloh
        const userName = ref("");

        // Ktoré zobrazenie je vybrané: "list" alebo "calendar"
        const currentView = ref("list");

        const todos = ref([]); //nacita ulohy zo servera

        const loading = ref(false); //prebieha prave poziadavka na server?

        const error = ref("");// Text chyby, prázdny reťazec znamená "žiadna chyba"


        async function loadTodos() {
            if (userName.value.trim() === "") {
                error.value = "Zadaj svoj identifikátor.";
                return;
            }

            loading.value = true;
            error.value = "";

            try {
                todos.value = await getTodos(userName.value);
                localStorage.setItem("todo_name", userName.value);  //ulozim do local storage
            } catch (e) {
                error.value = "Úlohy sa nepodarilo načítať. " + e.message;
            } finally {
                loading.value = false;
            }
        }


        // Po otvorení stránky obnov uložené meno a rovno načítaj úlohy
        onMounted(function () {
            const savedName = localStorage.getItem("todo_name");
            if (savedName) {
                userName.value = savedName;
                loadTodos();
            }
        });


        // Všetko, čo má byť dostupné v HTML, musí byť v tomto objekte
        return { userName, currentView, todos, loading, error, loadTodos };
    }
}).mount("#app");