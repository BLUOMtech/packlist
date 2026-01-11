function openModal(html) {
    const container = document.getElementById("modalContainer");

    container.innerHTML = `
        <div class="modal-bg" onclick="closeModal()"></div>
        <div class="modal">${html}</div>
    `;
}

function closeModal() {
    document.getElementById("modalContainer").innerHTML = "";
}
