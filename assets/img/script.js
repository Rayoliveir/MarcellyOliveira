var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,      // 1 card no celular
    spaceBetween: 30,     // Espaço entre eles
    loop: true,           // Infinito
    grabCursor: true,     // Mãozinha de arrastar
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        // Quando a tela for >= 768px (Tablet)
        768: {
            slidesPerView: 2,
        },
        // Quando a tela for >= 1024px (Desktop)
        1024: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});