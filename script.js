
let inventory = JSON.parse(localStorage.getItem('kirana_inventory')) || [];
let editIndex = -1;

function saveData() {
  localStorage.setItem('kirana_inventory', JSON.stringify(inventory));
}

function render() {
  let tbody = document.getElementById('tableBody');
  let search = document.getElementById('search').value.toLowerCase();
  tbody.innerHTML = '';

  inventory
    .filter(item => item.name.toLowerCase().includes(search))
    .forEach((item, index) => {
      let row = `<tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.wholesale}</td>
        <td>${item.sell}</td>
        <td>${item.sell - item.wholesale}</td>
        <td>
          <button class="edit" onclick="editItem(${index})">Edit</button>
          <button class="delete" onclick="deleteItem(${index})">Delete</button>
        </td>
      </tr>`;
      tbody.innerHTML += row;
    });
}

function addOrUpdateItem() {
  let name = document.getElementById('name').value;
  let qty = document.getElementById('qty').value;
  let wholesale = document.getElementById('wholesale').value;
  let sell = document.getElementById('sell').value;

  if (!name || !qty || !wholesale || !sell) {
    alert('Fill all fields');
    return;
  }

  let item = {
    name,
    qty: Number(qty),
    wholesale: Number(wholesale),
    sell: Number(sell)
  };

  if (editIndex === -1) {
    inventory.push(item);
  } else {
    inventory[editIndex] = item;
    editIndex = -1;
  }

  saveData();
  render();
  clearFields();
}

function editItem(index) {
  let item = inventory[index];
  document.getElementById('name').value = item.name;
  document.getElementById('qty').value = item.qty;
  document.getElementById('wholesale').value = item.wholesale;
  document.getElementById('sell').value = item.sell;
  editIndex = index;
}

function deleteItem(index) {
  inventory.splice(index, 1);
  saveData();
  render();
}

function clearFields() {
  document.getElementById('name').value = '';
  document.getElementById('qty').value = '';
  document.getElementById('wholesale').value = '';
  document.getElementById('sell').value = '';
}

render();
