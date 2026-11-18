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

        const loaded = ref(false);

        function changeUser() {
            loaded.value = false;
            todos.value = [];
            error.value = "";
        }



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
                loaded.value = true;
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



        // Id úlohy, na ktorej práve beží operácia
        const busyId = ref(null);

        async function toggleDone(todo, event) {
            busyId.value = todo.id;
            error.value = "";

            try {
                if (todo.is_finished) {
                    await setUndone(userName.value, todo.id);
                } else {
                    await setDone(userName.value, todo.id);
                }
                // Stav meníme až po úspešnej odpovedi servera
                todo.is_finished = !todo.is_finished;
            } catch (e) {
                error.value = "Stav úlohy sa nepodarilo zmeniť. " + e.message;
                // Na serveri sa nič nezmenilo, vrátime políčko do pôvodného stavu
                event.target.checked = todo.is_finished;
            } finally {
                busyId.value = null;
            }
        }



        // Všetko, čo má byť dostupné v HTML, musí byť v tomto objekte

        return { userName, currentView, todos, loading, error, loaded, busyId, loadTodos, changeUser, toggleDone, formatDate, isOverdue };
    }
}).mount("#app");