const STORAGE_KEY = "packlist_v1";

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { lists: [] };
}

function clearData() {
    localStorage.removeItem(STORAGE_KEY);
}
