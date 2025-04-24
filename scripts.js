let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

document.addEventListener('DOMContentLoaded', () => {
    if (cartItems) {
        updateCart();
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            completeOrder(name, email, cart);
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            logout();
        });
    }
});

function addToCart(title, price) {
    cart.push({ title, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${item.title} - $${item.price.toFixed(2)} <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = total.toFixed(2);
    }
}

function completeOrder(name, email, cart) {
    // Calculate total from cart items
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Simulate order processing
    setTimeout(() => {
        try {
            // Clear the cart
            cart = [];
            localStorage.removeItem('cart');
            updateCart();
            
            // Save order to localStorage for history (optional)
            const order = {
                name,
                email,
                items: cart,
                total: total,
                date: new Date().toISOString()
            };
            
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Show success message
            const completeMessage = document.getElementById('complete-message');
            if (completeMessage) {
                completeMessage.textContent = 'Order successful! Thank you for your purchase.';
                completeMessage.style.color = 'green';
                completeMessage.style.display = 'block';
            }
            
            // Reset form
            const checkoutForm = document.getElementById('checkout-form');
            if (checkoutForm) {
                checkoutForm.reset();
            }
        } catch (error) {
            console.error('Error processing order:', error);
            const completeMessage = document.getElementById('complete-message');
            if (completeMessage) {
                completeMessage.textContent = 'Error processing order. Please try again.';
                completeMessage.style.color = 'red';
                completeMessage.style.display = 'block';
            }
        }
    }, 1000); // Simulate network delay
}

function login(username, password) {
    const loginMessage = document.getElementById('login-message');
    if (username === 'default' && password === 'defaultpwd') {
        loginMessage.textContent = 'Login successful!';
        loginMessage.style.color = 'green';
        loginMessage.style.display = 'block';
        // Redirect to home page after successful login
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    } else {
        loginMessage.textContent = 'Invalid username or password.';
        loginMessage.style.color = 'red';
        loginMessage.style.display = 'block';
    }
}

function logout() {
    //alert('You have been logged out.');
    window.location.href = 'login.html';
}
