const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const buyButtons = document.querySelectorAll('.buy-btn');
const packageInput = document.querySelector('#package');
const orderForm = document.querySelector('#order-form');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

window.addEventListener('click', event => {
    if (!event.target.closest('.nav-menu') && !event.target.closest('.nav-toggle')) {
        navMenu.classList.remove('open');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        navMenu.classList.remove('open');
    });
});

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedPackage = button.dataset.package;
        if (packageInput) {
            packageInput.value = selectedPackage;
            packageInput.focus();
        }
        const orderBox = document.querySelector('#order-box');
        orderBox?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

if (orderForm) {
    orderForm.addEventListener('submit', event => {
        event.preventDefault();
        const packageValue = packageInput.value.trim();
        const gameValue = document.querySelector('#game').value.trim();
        const userId = document.querySelector('#userId').value.trim();
        const userName = document.querySelector('#userName').value.trim();
        const contact = document.querySelector('#contact').value.trim();

        if (!packageValue || !gameValue || !userId || !userName || !contact) {
            alert('Silakan lengkapi semua data order sebelum mengirim.');
            return;
        }

        alert(`Order berhasil dikirim!\nPaket: ${packageValue}\nGame: ${gameValue}\nID: ${userId}\nNama: ${userName}\nKontak: ${contact}\nTim kami akan menghubungi kamu segera.`);
        orderForm.reset();
    });
}

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 180;
    sections.forEach(section => {
        if (section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
            });
        }
    });
});
