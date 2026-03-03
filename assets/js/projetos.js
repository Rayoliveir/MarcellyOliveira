var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,     
    spaceBetween: 30,     
    loop: true,           
    grabCursor: true,      
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});