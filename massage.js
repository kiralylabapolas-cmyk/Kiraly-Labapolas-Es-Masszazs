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