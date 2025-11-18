document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('kelimeFormu');
    const kelimeListesi = document.getElementById('kelimeListesi');

    let ogrenilenKelimeler = loadKelimeler();

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const dil = document.getElementById('dil').value;
        const kelime = document.getElementById('kelime').value.trim();
        const anlam = document.getElementById('anlam').value.trim(); 

        if (dil && kelime && anlam) { 
            const yeniKelime = {
                dil: dil,
                kelime: kelime,
                anlam: anlam 
            };

            ogrenilenKelimeler.push(yeniKelime);
            saveKelimeler(ogrenilenKelimeler);
            renderKelimeler(ogrenilenKelimeler);
            form.reset();
        } else {
            // Korece Uyarı Mesajı
            alert('언어, 단어, 그리고 터키어 의미를 입력해주세요. (Eon-eo, Dan-eo, Geurigo Teoki-eo Euimireul Ipryeokhaejuseyo.)');
        }
    });

    // --- KALICILIK FONKSİYONLARI (DEĞİŞMEDİ) ---

    function loadKelimeler() {
        const kelimelerJSON = localStorage.getItem('kelimeTakipListesi');
        return kelimelerJSON ? JSON.parse(kelimelerJSON) : [];
    }

    function saveKelimeler(kelimeler) {
        localStorage.setItem('kelimeTakipListesi', JSON.stringify(kelimeler));
    }

    // --- EKRAN GÖRÜNTÜLEME FONKSİYONU (DEĞİŞMEDİ) ---

    function renderKelimeler(kelimeler) {
        kelimeListesi.innerHTML = '';

        kelimeler.forEach(item => {
            const kart = document.createElement('div');
            kart.classList.add('kelime-kart');
            
            kart.innerHTML = `
                <div class="foreign-word">${item.kelime}</div>
                <div class="turkish-meaning">(${item.anlam})</div> 
                <span class="language-tag">${item.dil.charAt(0).toUpperCase() + item.dil.slice(1)}</span>
            `;
            kelimeListesi.appendChild(kart);
        });
    }

    renderKelimeler(ogrenilenKelimeler);
});
