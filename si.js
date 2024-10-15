const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const productList = document.getElementById('productList');
const userList = document.getElementById('userList');
const tokenInput = document.getElementById('tokenInput');
const fetchUsersBtn = document.getElementById('fetchUsersBtn');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const response = await fetch('https://api-mascoticos.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: name, Password: password }),
        });
        const data = await response.json();
        if (response.ok) {
            alert('Usuario registrado con éxito');
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('loginName').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('https://api-mascoticos.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Name: name, Password: password }),
        });
        const data = await response.json();
        if (response.ok) {
            tokenInput.value = data.token; // Mostrar el token en el campo de entrada
            alert('Inicio de sesión exitoso');
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchProducts() {
    try {
        const response = await fetch('https://api-mascoticos.onrender.com/api/products'); // Asegúrate de que esta ruta esté definida
        const products = await response.json();
        productList.innerHTML = products.map(product => `<div>${product.Name} - $${product.Price}</div>`).join('');
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchUsersBtn.addEventListener('click', async () => {
    const token = tokenInput.value; // Obtener el token del campo de entrada
    try {
        const response = await fetch('https://api-mascoticos.onrender.com/api/users/user', {
            headers: {
                'Authorization': `Bearer ${token}` // Usar el token para la autorización
            }
        });
        const users = await response.json();
        if (response.ok) {
            userList.innerHTML = users.map(user => `<div>${user.Name}</div>`).join('');
        } else {
            alert(`Error: ${users.error}`); // Manejo de errores si hay problemas
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});

// Llama a la función para obtener productos al cargar la página
fetchProducts();
