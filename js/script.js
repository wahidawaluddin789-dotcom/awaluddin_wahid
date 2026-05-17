// Simple store script: renders products and opens WhatsApp order link
const OWNER_PHONE = '6281234567890'; // ganti dengan nomor Anda (format internasional, tanpa '+')

const products = [
    { id: 'p1', name: 'Diamond 5', diamonds: 5, price: 5000 },
    { id: 'p2', name: 'Diamond 50', diamonds: 50, price: 45000 },
    { id: 'p3', name: 'Diamond 170', diamonds: 170, price: 140000 },
    { id: 'p4', name: 'Diamond 360', diamonds: 360, price: 290000 },
    { id: 'p5', name: 'Diamond 720', diamonds: 720, price: 560000 },
];

function formatRupiah(n){
    return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function renderProducts(){
    const list = document.getElementById('product-list');
    if(!list) return;
    list.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<h4>${p.name} <span class="muted">(${p.diamonds} diamond)</span></h4>
            <div class="price">${formatRupiah(p.price)}</div>
            <div class="muted">Proses cepat, aman</div>
            <a href="#" class="buy" data-id="${p.id}">Beli</a>`;
        list.appendChild(card);
    });
}

function initHandlers(){
    const list = document.getElementById('product-list');
    list?.addEventListener('click', e => {
        if(e.target.matches('.buy')){
            e.preventDefault();
            const id = e.target.dataset.id;
            const product = products.find(x=>x.id===id);
            if(!product) return;

            const userId = prompt('Masukkan User ID Free Fire (opsional):','');
            const server = prompt('Masukkan Server (opsional):','');
            const qty = prompt('Jumlah paket (angka):','1');
            const note = prompt('Catatan tambahan (opsional):','');

            const qtyNum = Math.max(1, parseInt(qty) || 1);
            const total = product.price * qtyNum;

            const message = `Halo, saya mau pesan ${product.name} x${qtyNum} (${product.diamonds} diamond).\nUserID: ${userId || '-'}\nServer: ${server || '-'}\nTotal: ${formatRupiah(total)}\nCatatan: ${note || '-'}\nMohon proses pesanan.`;

            const waUrl = `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        }
    });

    // set contact link
    const waLink = document.getElementById('wa-link');
    if(waLink){
        waLink.href = `https://wa.me/${OWNER_PHONE}`;
        waLink.target = '_blank';
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    renderProducts();
    initHandlers();
});
