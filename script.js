const giftButton = document.getElementById("giftButton");

function showConfetti(count = 45) {
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = "50%";
        confetti.style.top = "30%";

        const x = (Math.random() - 0.5) * 700;
        const y = Math.random() * 500 + 150;
        const rotation = Math.random() * 720;

        confetti.style.setProperty("--x", `${x}px`);
        confetti.style.setProperty("--y", `${y}px`);
        confetti.style.setProperty("--rotation", `${rotation}deg`);

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2500);
    }
}

function showExeScreen() {
    document.querySelector(".container").innerHTML = `
        <div class="exe-screen">
            <div class="exe-window">
                <div class="exe-icon">🎂</div>
                <div class="exe-title">ÖMER.EXE</div>
                <div class="exe-subtitle">Birthday.exe başlatılıyor...</div>

                <div class="exe-status" id="exeStatus">Yeni yaş yükleniyor...</div>

                <div class="exe-age">
                    <span>16</span>
                    <span class="arrow">→</span>
                    <strong>17</strong>
                </div>

                <div class="exe-loading">
                    <div class="exe-loading-bar" id="exeLoadingBar"></div>
                </div>

                <div class="exe-percent" id="exePercent">0%</div>
                <div class="exe-small" id="exeSmall">17. seviye hazırlanıyor...</div>
            </div>
        </div>
    `;

    const status = document.getElementById("exeStatus");
    const bar = document.getElementById("exeLoadingBar");
    const percent = document.getElementById("exePercent");
    const small = document.getElementById("exeSmall");

    const stages = [
        [0, "Yeni yaş yükleniyor...", "16 → 17 geçişi hazırlanıyor..."],
        [28, "Yaş güncelleniyor...", "17. seviye dosyaları yükleniyor..."],
        [55, "17. seviye yükleniyor...", "Birthday Mode kuruluyor..."],
        [82, "Son kontroller yapılıyor...", "Mutluluk.exe çalışmaya hazır..."],
        [100, "Birthday Mode Activated 🎂", "Ömer artık 17 yaşında."]
    ];

    let i = 0;
    function step() {
        const [value, text, sub] = stages[i];
        bar.style.width = `${value}%`;
        percent.textContent = `${value}%`;
        status.textContent = text;
        small.textContent = sub;

        if (i < stages.length - 1) {
            i++;
            setTimeout(step, 650);
        } else {
            setTimeout(showGiftScreen, 1000);
        }
    }

    step();
}

function showGiftScreen() {
    const gifts = [
        { img: "assets/gift1.png", label: "Hediye #1" },
        { img: "assets/gift2.png", label: "Hediye #2" },
        { img: "assets/gift3.png", label: "Hediye #3" },
        { img: "assets/gift4.png", label: "Hediye #4" },
        { img: "assets/gift5.png", label: "Hediye #5" }
    ];

    document.querySelector(".container").innerHTML = `
        <div class="gifts-screen">
            <h1>Hediyeni Seç 🎁</h1>
            <p>Hepsinin içinde küçük bir sürpriz var. ♡</p>

            <div class="gift-grid">
                ${gifts.map((gift, index) => `
                    <button class="gift-box" data-index="${index}" aria-label="${gift.label}">
                        <span class="gift-lid"></span>
                        <span class="gift-ribbon-v"></span>
                        <span class="gift-ribbon-h"></span>
                        <span class="gift-bow">🎀</span>
                        <span class="gift-box-body"></span>
                    </button>
                `).join("")}
            </div>

            <div class="gift-progress" id="giftProgress">0 / 5 hediye açıldı</div>

            <button id="allGiftsButton" class="all-gifts-button" disabled>
                Hepsini Açtım! ✨
            </button>

            <div id="giftModal" class="gift-modal hidden">
                <div class="gift-modal-card">
                    <button id="closeGiftModal" class="close-gift">×</button>
                    <div class="revealed-image-wrap">
                        <img id="revealedGift" src="" alt="Açılan hediye">
                    </div>
                    <p id="giftLabel">Bir sürpriz! ♡</p>
                </div>
            </div>
        </div>
    `;

    const opened = new Set();
    const modal = document.getElementById("giftModal");
    const revealed = document.getElementById("revealedGift");
    const giftLabel = document.getElementById("giftLabel");
    const progress = document.getElementById("giftProgress");
    const allButton = document.getElementById("allGiftsButton");

    document.querySelectorAll(".gift-box").forEach(box => {
        box.addEventListener("click", () => {
            const index = Number(box.dataset.index);
            if (opened.has(index)) return;

            opened.add(index);
            box.classList.add("opened");
            revealed.src = gifts[index].img;
            giftLabel.textContent = `${gifts[index].label} açıldı. ♡`;
            modal.classList.remove("hidden");
            showConfetti(35);

            progress.textContent = `${opened.size} / 5 hediye açıldı`;

            if (opened.size === 5) {
                allButton.disabled = false;
                allButton.classList.add("ready");
            }
        });
    });

    document.getElementById("closeGiftModal").addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", event => {
        if (event.target === modal) modal.classList.add("hidden");
    });

    allButton.addEventListener("click", () => {
        if (opened.size === 5) showWishScreen();
    });
}

function showWishScreen() {
    document.querySelector(".container").innerHTML = `
        <div class="wish-screen">
            <div class="wish-title">💌</div>
            <h1>Bir Dilek Tut</h1>
            <p>
                Yeni yaşında gerçekleşmesini istediğin
                bir dileğini buraya yaz. ♡
            </p>

            <div class="letter">
                <div class="letter-top">Sevgili yeni yaşım...</div>
                <textarea
                    id="wishText"
                    placeholder="Dileğini buraya yaz..."
                    maxlength="500"
                ></textarea>
                <div class="letter-bottom">♡</div>
            </div>

            <button id="saveWishButton">Dileğimi Sakla 💌</button>
        </div>
    `;

    document.getElementById("saveWishButton").addEventListener("click", async () => {
        const wishText = document.getElementById("wishText").value.trim();
        const button = document.getElementById("saveWishButton");

        if (!wishText) {
            document.getElementById("wishText").focus();
            return;
        }

        button.disabled = true;
        button.textContent = "Dileğin Saklanıyor... 💌";

        try {
            const formData = new FormData();
            formData.append("wish", wishText);
            formData.append("_subject", "Ömer'in Doğum Günü Dileği 🎂");

            const response = await fetch("https://formspree.io/f/mqpkqdyo", {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) throw new Error("Form gönderilemedi.");

            showFinalScreen();
        } catch (error) {
            console.error(error);
            button.disabled = false;
            button.textContent = "Dileğimi Sakla 💌";
            alert("Dilek gönderilirken bir sorun oluştu. Lütfen tekrar dene.");
        }
    });
}

function showFinalScreen() {
    document.querySelector(".container").innerHTML = `
        <div class="final-screen">
            <div class="final-envelope">💌</div>
            <h1>Son Bir Şey...</h1>
            <div class="final-letter">
                <p>
                    Yapabildiklerim bu kadardı, gönül isterdi ki yanında kutlamak.
                    Adres falan olsa hediye gonderecektim oda olmayınca böyle kutlamak istedim,
                    umarım beğenmişsindir.
                </p>
                <p>Yeni yaşın sana mutluluk getirsin.</p>
                <p>İyi ki doğdun, nice şeyhli senelere ;) ♡</p>
            </div>
            <div class="final-heart">♡</div>
        </div>
    `;
    showConfetti(55);
}

giftButton.addEventListener("click", () => {
    document.querySelector(".container").innerHTML = `
        <div class="message-screen">
            <div class="heart">♡</div>
            <h1>Happy Birthday, Ömer! 🎀</h1>
            <p>
                Doğum günün kutlu olsun Ömer.<br>
                İyiki varsın, iyi ki doğdun 🤍.
            </p>
            <div class="little-note">Nice güzel yaşların olsun. ♡</div>
            <button id="nextButton">Devam 🎀</button>
        </div>
    `;

    document.getElementById("nextButton").addEventListener("click", () => {
        document.querySelector(".container").innerHTML = `
            <div class="cake-screen">
                <h1>Kendi Pastanı Yap! 🎂</h1>
                <p>Pastanı istediğin gibi süsle ♡</p>

                <div class="cake-area">
                    <div class="cake">
                        <div class="cake-top"></div>
                        <div class="cake-body"></div>
                    </div>
                </div>

                <div class="cake-options">
                    <button class="cake-item">🍓</button>
                    <button class="cake-item">🍒</button>
                    <button class="cake-item">🍫</button>
                    <button class="cake-item">💗</button>
                    <button class="cake-item">⭐</button>
                    <button class="cake-item">🕯️</button>
                </div>

                <button id="resetCakeButton" class="reset-cake">↻ Pastayı Sıfırla</button>
                <button id="wishButton" class="wish-button">Pastam Hazır! 💌</button>
            </div>
        `;

        showConfetti(45);

        document.querySelectorAll(".cake-item").forEach(button => {
            button.addEventListener("click", () => {
                const decoration = document.createElement("span");
                decoration.className = "cake-decoration";
                decoration.textContent = button.textContent;
                decoration.style.left = `${20 + Math.random() * 60}%`;
                decoration.style.top = `${20 + Math.random() * 45}%`;
                document.querySelector(".cake-area").appendChild(decoration);
            });
        });

        document.getElementById("resetCakeButton").addEventListener("click", () => {
            document.querySelectorAll(".cake-decoration").forEach(decoration => decoration.remove());
        });

        document.getElementById("wishButton").addEventListener("click", showExeScreen);
    });
});
