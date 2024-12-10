// URL da imagem padrão a ser utilizada
const defaultImageUrl = 'https://via.placeholder.com/50'; // Imagem padrão

// Itens pré-cadastrados para a primeira visita
const defaultItems = [
    { text: "Maçã", quantity: 3, unit: "unidade", image: "imagens/maca.png" },
    { text: "Banana", quantity: 6, unit: "unidade", image: "imagens/banana.png" },
    { text: "Leite", quantity: 1, unit: "litros", image: "imagens/leite.png" },
    { text: "Pão", quantity: 2, unit: "unidade", image: "imagens/pao.png" },
];

// Função que carrega os itens padrão e itens do localStorage ao abrir a página
window.onload = function() {
    clearList(); // Limpa a lista atual para garantir que os itens padrão apareçam
    loadDefaultItems(); // Carrega os itens padrão
};

// Função que adiciona um novo item à lista de compras
function addItem() {
    const itemInput = document.getElementById("itemInput");
    const quantityInput = document.getElementById("quantityInput");
    const unitSelect = document.getElementById("unitSelect");
    const imageInput = document.getElementById("imageInput");

    const itemValue = itemInput.value.trim();
    const quantityValue = quantityInput.value.trim() || "1";
    const unitValue = unitSelect.value;
    const imageValue = imageInput.value.trim() || defaultImageUrl;

    if (itemValue && quantityValue > 0) {
        addItemToList(itemValue, quantityValue, unitValue, imageValue);
        saveItems(); // Salva a lista após adicionar um item
        itemInput.value = ""; // Limpa o campo de entrada
        quantityInput.value = ""; // Limpa o campo de quantidade
        unitSelect.value = "unidade"; // Reseta o campo da unidade
        imageInput.value = ""; // Limpa o campo da imagem
    }
}

// Função que apaga todos os itens da lista
function clearList() {
    const shoppingList = document.getElementById("shoppingList");
    shoppingList.innerHTML = ""; // Remove todos os itens da lista
}

// Função que salva os itens da lista no localStorage
function saveItems() {
    const items = [];
    const shoppingListItems = document.querySelectorAll("#shoppingList li");

    shoppingListItems.forEach(item => {
        const img = item.querySelector("img"); // Obtém a imagem do item
        const textAndDetails = item.childNodes[1].nodeValue.split(" - ");
        const quantityAndUnit = textAndDetails[1].split(" ");
        items.push({
            text: textAndDetails[0], // Adiciona o texto do item
            quantity: quantityAndUnit[0], // Adiciona a quantidade do item
            unit: quantityAndUnit[1], // Adiciona a unidade do item
            image: img.src, // Adiciona a URL da imagem
        });
    });

    localStorage.setItem("shoppingList", JSON.stringify(items)); // Salva a lista no localStorage
}

// Função que carrega os itens padrão na lista
function loadDefaultItems() {
    defaultItems.forEach(itemData => {
        addItemToList(itemData.text, itemData.quantity, itemData.unit, itemData.image);
    });
}

// Função auxiliar para adicionar item à lista
function addItemToList(itemText, itemQuantity, itemUnit, itemImage) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    // Cria a imagem do item
    const img = document.createElement("img");
    img.src = itemImage; // Define a URL da imagem
    img.alt = itemText; // Define um texto alternativo
    img.className = "item-image"; // Adiciona a classe para estilização

    // Adiciona a imagem, texto, quantidade e unidade do item ao li
    li.appendChild(img);
    li.appendChild(document.createTextNode(`${itemText} - ${itemQuantity} ${itemUnit}`));

    // Botão para remover o item da lista
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger btn-sm";
    removeButton.textContent = "Remover";

    removeButton.onclick = function() {
        li.remove();
        saveItems();
    };

    li.appendChild(removeButton);
    document.getElementById("shoppingList").appendChild(li);
}