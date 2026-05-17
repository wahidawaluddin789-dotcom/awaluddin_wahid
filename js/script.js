const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const buyButtons = document.querySelectorAll('.buy-btn');
const packageInput = document.querySelector('#package');
const priceInput = document.querySelector('#price');
const quantityInput = document.querySelector('#quantity');
const totalSpan = document.querySelector('#total');
const orderForm = document.querySelector('#order-form');

// Toggle mobile menu
navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
});

// Close menu when clicking outside
window.addEventListener('click', event => {
    if (!event.target.closest('.nav-menu') && !event.target.closest('.nav-toggle')) {
        navMenu?.classList.remove('open');
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navMenu?.classList.remove('open');
    });
});

// Update total price helper
function updateTotal() {
    const price = Number(priceInput?.value || 0);
    const qty = Number(quantityInput?.value || 1);
    const total = Math.max(0, price * qty);
    if (totalSpan) totalSpan.textContent = total.toLocaleString('id-ID');
}

// Handle buy buttons
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const pkg = button.dataset.package || '';
        const price = button.dataset.price || '';
        if (packageInput) packageInput.value = pkg;
        if (priceInput) priceInput.value = price;
        updateTotal();
        const orderBox = document.querySelector('#order-box');
        orderBox?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Recalculate when quantity changes
quantityInput?.addEventListener('input', updateTotal);

// Form submission (simulated)
orderForm?.addEventListener('submit', event => {
    event.preventDefault();
    const pkg = packageInput?.value.trim();
    const game = document.querySelector('#game')?.value.trim();
    const userId = document.querySelector('#userId')?.value.trim();
    const userName = document.querySelector('#userName')?.value.trim();
    const contact = document.querySelector('#contact')?.value.trim();
    const price = Number(priceInput?.value || 0);
    const qty = Number(quantityInput?.value || 1);
    const total = price * qty;

    if (!pkg || !game || !userId || !userName || !contact) {
        alert('Silakan lengkapi semua data order sebelum mengirim.');
        return;
    }

    // Simulate order send
    const order = {
        game, userId, userName, contact, package: pkg, price, quantity: qty, total
    };

    alert('Order berhasil dikirim!\n' +
        `Paket: ${order.package}\nID: ${order.userId}\nNama: ${order.userName}\nKontak: ${order.contact}\nTotal: Rp ${order.total.toLocaleString('id-ID')}`);
    orderForm.reset();
    if (priceInput) priceInput.value = '';
    if (totalSpan) totalSpan.textContent = '0';
});

// Highlight nav links on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 160;
    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`));
        }
    });
});
