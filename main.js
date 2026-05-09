
document.addEventListener('DOMContentLoaded', () => {
    const catalogGrid = document.getElementById('catalog-grid');
    
    if (catalogGrid) {
        loadCatalog();
    }

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleFormSubmission);
    }
});


async function loadCatalog() {
    try {
       
        const products = [
            { id: 1, title: 'Poster Minimalista', price: '$150', category: 'Posters', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80' },
            { id: 2, title: 'Sticker Pack 90s', price: '$80', category: 'Stickers', img: 'https://images.unsplash.com/photo-1589384416891-83a9930c3ad1?w=500&q=80' },
            { id: 3, title: 'Sudadera Custom', price: '$450', category: 'Clothing', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' },
            { id: 4, title: 'The Weeknd After Hours Poster', price: '$180', category: 'Posters', img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80' }
        ];

        const catalogGrid = document.getElementById('catalog-grid');
        catalogGrid.innerHTML = ''; 

        products.forEach(product => {
            const card = `
                <div class="product-card">
                    <img src="${product.img}" alt="${product.title}">
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p>${product.category}</p>
                        <strong>${product.price}</strong>
                    </div>
                </div>
            `;
            catalogGrid.innerHTML += card;
        });
    } catch (error) {
        console.error("Error cargando la API:", error);
    }
}

async function handleFormSubmission(e) {
    e.preventDefault();
    const responseDiv = document.getElementById('form-response');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    responseDiv.innerHTML = '<p style="color: blue;">Enviando solicitud a la API...</p>';

    try {
       
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (response.ok) {
            responseDiv.innerHTML = `
                <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-top: 20px;">
                    ¡Solicitud enviada con éxito! ID de operación: 10293. Pronto nos contactaremos.
                </div>
            `;
            e.target.reset();
        }
    } catch (error) {
        responseDiv.innerHTML = '<p style="color: red;">Error al conectar con el servidor.</p>';
    }
}
