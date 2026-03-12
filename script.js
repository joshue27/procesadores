document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFECTO TYPING EN EL HERO SECTION
    const words = ["Computación", "Innovación", "Evolución", "Inteligencia Artificial"];
    let i = 0;
    let timer;

    // Función que simula escritura
    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                document.getElementById('typing-text').innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000); // Espera 2 segundos antes de borrar
                return false;
            }
            timer = setTimeout(loopTyping, 100); // Velocidad al escribir
        };
        loopTyping();
    }

    // Función que simula el borrado
    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                document.getElementById('typing-text').innerHTML = word.join("");
            } else {
                if (words.length > (i + 1)) {
                    i++;
                } else {
                    i = 0; // Reinicia el array de palabras
                }
                typingEffect();
                return false;
            }
            timer = setTimeout(loopDeleting, 50); // Velocidad al borrar
        };
        loopDeleting();
    }

    typingEffect(); // Iniciar typing effect


    // 2. INICIALIZAR SWIPER (CARRUSEL 3D COVERFLOW)
    // Nos aseguramos de inicializarlo solo si el script de Swiper cargó
    if(typeof Swiper !== 'undefined') {
        const swiper = new Swiper(".mySwiper", {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            loop: true,
            coverflowEffect: {
                rotate: 30,       // Rotación lateral
                stretch: 0,       // Espacio entre los slides
                depth: 250,       // Profundidad en el eje Z
                modifier: 1,      // Multiplicador de efecto
                slideShadows: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            }
        });
    }

    // 3. MENÚ HAMBURGUESA PARA MOBILE
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 4. ANIMACIONES AL HACER SCROLL CON INTERSECTION OBSERVER
    const animElements = document.querySelectorAll('.reveal, .fade-in-up');

    const observerOptions = {
        root: null,
        threshold: 0.15, // Activa la animación cuando se vea al menos 15% del elemento
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // observer.unobserve(entry.target); // Descomentar para que solo se anime la primera vez
            }
        });
    }, observerOptions);

    animElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 5. CAMBIO VISUAL DE LA BARRA DE NAVEGACIÓN EN SCROLL
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(3, 7, 18, 0.8)";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
        } else {
            navbar.style.background = "rgba(3, 7, 18, 0.4)";
            navbar.style.boxShadow = "none";
        }
    });

});