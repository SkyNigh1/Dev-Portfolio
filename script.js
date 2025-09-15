// Variables globales
let isLoaded = false;
let animationObserver;

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialisation principale
function initializeApp() {
    try {
        showLoadingScreen();
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                hideLoadingScreen();
                initializeComponents();
                isLoaded = true;
                console.log('App initialized successfully');
            }, 1000);
        });
    } catch (error) {
        console.error('Error initializing app:', error);
        // Ensure sections are visible even if initialization fails
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('visible');
        });
    }
}

// Afficher l'écran de chargement
function showLoadingScreen() {
    const loadingHtml = `
        <div class="loading" id="loading">
            <div class="spinner"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loadingHtml);
}

// Cacher l'écran de chargement
function hideLoadingScreen() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }
}

// Initialiser tous les composants
function initializeComponents() {
    initializeNavbar();
    initializeAnimations();
    initializeSmoothScroll();
    initializeCounter();
    initializeSkills();
    initializeContactForm();
    initializeParallax();
    initializeTypewriter();
}

// Navigation
function initializeNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Effet de scroll sur la navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Mise à jour du lien actif
        updateActiveNavLink();
    });

    // Menu hamburger
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Mettre à jour le lien de navigation actif
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animations d'apparition
function initializeAnimations() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Unobserve after becoming visible to improve performance
                animationObserver.unobserve(entry.target);
            }
        });
    }, options);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // Fallback: Make sections visible after a timeout if observer fails
    setTimeout(() => {
        animatedElements.forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 3000); // 3 seconds fallback
}

// Ajouter les classes d'animation
function addAnimationClasses() {
    // Sections à animer
    const sections = document.querySelectorAll('#about, #skills, #projects, #contact');
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
    });

    // Cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Compétences
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((skill, index) => {
        skill.classList.add('fade-in');
        skill.style.animationDelay = `${index * 0.1}s`;
    });
}

// Scroll fluide
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                console.log(`Scrolled to section: ${targetId}`); // Debug
            } else {
                console.error(`Section not found: ${targetId}`); // Debug
            }
        });
    });
}

// Compteur animé
function initializeCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Animer un compteur
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 30);
}

// Animations des compétences
function initializeSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(skill => {
        // Effet de hover avec délai
        skill.addEventListener('mouseenter', () => {
            skill.style.animationDelay = '0s';
            skill.classList.add('skill-hover');
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.classList.remove('skill-hover');
        });

        // Animation au clic
        skill.addEventListener('click', () => {
            skill.style.transform = 'scale(0.95)';
            setTimeout(() => {
                skill.style.transform = '';
            }, 150);
        });
    });
}

// Formulaire de contact
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        
        // Animation des champs
        const formInputs = form.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// Gérer la soumission du formulaire
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validation simple
    if (validateForm(data)) {
        showNotification('Message envoyé avec succès!', 'success');
        e.target.reset();
    } else {
        showNotification('Veuillez remplir tous les champs.', 'error');
    }
}

// Valider le formulaire
function validateForm(data) {
    return data.name && data.email && data.subject && data.message;
}

// Afficher une notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles de la notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'
    });
    
    document.body.appendChild(notification);
    
    // Animer l'apparition
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Effet de parallaxe
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Effet de machine à écrire
function initializeTypewriter() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;
    
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.classList.add('typing-effect');
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroName.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            heroName.classList.remove('typing-effect');
        }
    };
    
    // Démarrer l'effet après un délai
    setTimeout(typeWriter, 1000);
}

// Utilitaires
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimiser les performances du scroll
const optimizedScrollHandler = throttle(() => {
    if (!isLoaded) return;
    
    // Mise à jour de la navigation
    updateActiveNavLink();
    
    // Parallaxe
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Gestion du redimensionnement
const optimizedResizeHandler = debounce(() => {
    // Recalculer les positions si nécessaire
    updateActiveNavLink();
}, 250);

window.addEventListener('resize', optimizedResizeHandler);

// Préchargement des images
function preloadImages() {
    const imageUrls = [
        // Ajouter ici les URLs des images à précharger
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Animations CSS personnalisées via JavaScript
function addCustomAnimations() {
    // Animation des éléments flottants
    const floatElements = document.querySelectorAll('.float-element');
    floatElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
        element.style.animationDuration = `${3 + index}s`;
    });
    
    // Animation des cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
}

// Initialiser les animations personnalisées après le chargement
window.addEventListener('load', () => {
    setTimeout(addCustomAnimations, 500);
});

// Easter egg : Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konamiSequence.length && 
        konamiCode.every((key, index) => key === konamiSequence[index])) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.filter = 'hue-rotate(180deg)';
    showNotification('🎉 Easter Egg activé! Vous avez trouvé le code secret!', 'success');
    
    setTimeout(() => {
        document.body.style.filter = '';
    }, 5000);
}