let data = loadData();
let activeList = null;

const dashboard = document.getElementById("dashboard");
const listView = document.getElementById("listView");
const listContainer = document.getElementById("listContainer");
const itemContainer = document.getElementById("itemContainer");
const listName = document.getElementById("listName");

// Load lists on start
renderDashboard();

// -------------------------
// DASHBOARD
// -------------------------
document.getElementById("newList").onclick = () => {
    openModal(`
        <h2>Create New List</h2>
        <input id="newListName" placeholder="List name">
        <button onclick="createList()">Create</button>
    `);
};

function createList() {
    const name = document.getElementById("newListName").value;
    if (!name.trim()) return;

    const newList = {
        id: createId(),
        name,
        items: []
    };

    data.lists.push(newList);
    saveData(data);
    closeModal();
    renderDashboard();
}

function renderDashboard() {
    listContainer.innerHTML = "";

    data.lists.forEach(list => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${list.name}</h3>`;
        div.onclick = () => openList(list.id);

        listContainer.appendChild(div);
    });
}

// -------------------------
// LIST VIEW
// -------------------------
function openList(id) {
    activeList = data.lists.find(x => x.id === id);

    listName.textContent = activeList.name;
    dashboard.classList.add("hidden");
    listView.classList.remove("hidden");

    renderItems();
}

document.getElementById("backBtn").onclick = () => {
    listView.classList.add("hidden");
    dashboard.classList.remove("hidden");
    activeList = null;
};

// Add item
document.getElementById("addItem").onclick = () => {
    openModal(`
        <h2>Add Item</h2>
        <input id="newItem" placeholder="Item name">
        <button onclick="addItem()">Add</button>
    `);
};

function addItem() {
    const name = document.getElementById("newItem").value;
    if (!name.trim()) return;

    activeList.items.push({
        id: createId(),
        name,
        done: false
    });

    saveData(data);
    closeModal();
    renderItems();
}

function renderItems() {
    itemContainer.innerHTML = "";

    activeList.items.forEach(item => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
            <span>${item.name}</span>
            <input type="checkbox" ${item.done ? "checked" : ""} onclick="toggleItem('${item.id}')">
        `;
        itemContainer.appendChild(div);
    });
}

function toggleItem(id) {
    const item = activeList.items.find(x => x.id === id);
    item.done = !item.done;
    saveData(data);
}
