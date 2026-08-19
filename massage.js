// Megkeressük az összes "Részletek" gombot
const infoButtons = document.querySelectorAll('.info-btn');

infoButtons.forEach(button => {
    button.addEventListener('click', () => {
        // JAVÍTÁS: A parentElement helyett a closest() fv-t használjuk, 
        // ami felfelé keresve megkeresi a legközelebbi .card-content dobozt, akárhány szinten át
        const cardContent = button.closest('.card-content');
        
        // Ezen a szülőn belül pontosan megkeressük az .info-box leírást
        const infoBox = cardContent ? cardContent.querySelector('.info-box') : null;
        
        if (infoBox) {
            // Oda-vissza kapcsolgatjuk az open osztályt
            infoBox.classList.toggle('open');
            button.classList.toggle('open');
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