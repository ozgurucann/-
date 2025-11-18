document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('kelimeFormu');
    const kelimeListesi = document.getElementById('kelimeListesi');

    // Başlangıçta, tarayıcının yerel depolamasındaki (localStorage) kelimeleri yükle.
    let ogrenilenKelimeler = loadKelimeler();

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const dil = document.getElementById('dil').value;
        const kelime = document.getElementById('kelime').value.trim();

        if (dil && kelime) {
            const yeniKelime = {
                dil: dil,
                kelime: kelime
            };

            // Yeni kelimeyi listeye ekle
            ogrenilenKelimeler.push(yeniKelime);

            // 1. Kelimeleri kalıcı olarak kaydet
            saveKelimeler(ogrenilenKelimeler);

            // 2. Listeyi ekranda güncelle
            renderKelimeler(ogrenilenKelimeler);

            // Formu temizle
            form.reset();
        } else {
            alert('Lütfen hem dili hem de kelimeyi giriniz.');
        }
    });

    // --- KALICILIK FONKSİYONLARI ---

    // localStorage'dan veriyi yükle
    function loadKelimeler() {
        const kelimelerJSON = localStorage.getItem('kelimeTakipListesi');
        // JSON formatındaki metni JavaScript listesine çevirir, yoksa boş liste döner
        return kelimelerJSON ? JSON.parse(kelimelerJSON) : [];
    }

    // localStorage'a veriyi kaydet
    function saveKelimeler(kelimeler) {
        // JavaScript listesini JSON metnine çevirir ve kaydeder
        localStorage.setItem('kelimeTakipListesi', JSON.stringify(kelimeler));
    }

    // --- EKRAN GÖRÜNTÜLEME FONKSİYONU ---

    function renderKelimeler(kelimeler) {
        kelimeListesi.innerHTML = '';

        kelimeler.forEach(item => {
            const kart = document.createElement('div');
            kart.classList.add('kelime-kart');
            
            kart.innerHTML = `
                <strong>${item.kelime}</strong>
                <span>(${item.dil.charAt(0).toUpperCase() + item.dil.slice(1)})</span>
            `;
            kelimeListesi.appendChild(kart);
        });
    }

    // İlk yüklemede kelimeleri ekranda göster
    renderKelimeler(ogrenilenKelimeler);
});