// Megkeressük az összes "Részletek" gombot
const infoButtons = document.querySelectorAll('.info-btn');

// JAVÍTÁS: egyszerre csak egy Részletek doboz lehet nyitva - ez a segédfüggvény
// zárja be az összes doboz(oka)t, kivéve amit a paraméterben megadunk (ha megadunk)
function closeAllInfoBoxes(exceptBox) {
    document.querySelectorAll('.info-box.open').forEach(box => {
        if (box === exceptBox) return;
        box.classList.remove('open');
        const cardContent = box.closest('.card-content');
        const otherButton = cardContent ? cardContent.querySelector('.info-btn') : null;
        if (otherButton) otherButton.classList.remove('open');
        const otherCard = box.closest('.card');
        if (otherCard) otherCard.classList.remove('card-open');
    });
}

infoButtons.forEach(button => {
    button.addEventListener('click', () => {
        // JAVÍTÁS: A parentElement helyett a closest() fv-t használjuk,
        // ami felfelé keresve megkeresi a legközelebbi .card-content dobozt, akárhány szinten át
        const cardContent = button.closest('.card-content');

        // Ezen a szülőn belül pontosan megkeressük az .info-box leírást
        const infoBox = cardContent ? cardContent.querySelector('.info-box') : null;

        if (infoBox) {
            const willOpen = !infoBox.classList.contains('open');

            // JAVÍTÁS: mielőtt megnyitnánk az aktuálisat, bezárunk minden mást,
            // hogy mindig csak egy Részletek doboz legyen nyitva egyszerre
            closeAllInfoBoxes(infoBox);

            // Oda-vissza kapcsolgatjuk az open osztályt
            infoBox.classList.toggle('open', willOpen);
            button.classList.toggle('open', willOpen);

            // JAVÍTÁS: a lenyitott doboz lebegő panelként jelenik meg a kártya alatt,
            // ezért a kártyát is kiemeljük (z-index), hogy a panel ne kerüljön a
            // következő sor kártyái mögé - CSS-ben a :has() ezt már megoldja a
            // modern böngészőkben, ez itt csak a régebbi böngészők tartaléka
            const card = button.closest('.card');
            if (card) {
                card.classList.toggle('card-open', willOpen);
            }
        }
    });
});

// Mobil navigáció (hamburger menü)
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        navToggle.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Menü bezárása, ha a látogató egy linkre kattint
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}
