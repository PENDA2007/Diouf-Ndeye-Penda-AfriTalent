// DARK MODE
document.addEventListener('DOMContentLoaded', function() {
    const darkToggle = document.getElementById('darkModeToggle');
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkToggle) darkToggle.innerHTML = '☀️ Light';
    }
    
    if (darkToggle) {
        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkToggle.innerHTML = '☀️ Light';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkToggle.innerHTML = '🌙 Dark';
            }
        });
    }
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

const backBtn = document.createElement('button');
backBtn.innerHTML = '⬆️';
backBtn.id = 'backToTop';
backBtn.style.position = 'fixed';
backBtn.style.bottom = '30px';
backBtn.style.right = '30px';
backBtn.style.display = 'none';
backBtn.style.padding = '12px 16px';
backBtn.style.borderRadius = '50%';
backBtn.style.border = 'none';
backBtn.style.backgroundColor = '#0d6efd';
backBtn.style.color = 'white';
backBtn.style.fontSize = '20px';
backBtn.style.cursor = 'pointer';
backBtn.style.zIndex = '1000';
document.body.appendChild(backBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backBtn.style.display = 'block';
    } else {
        backBtn.style.display = 'none';
    }
});
backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
// COMPTEURS ANIMES
document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 80;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            setTimeout(updateCounter, 16);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }
});
// FILTRAGE DES FREELANCES
document.addEventListener('DOMContentLoaded', function () {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {

            const category = this.dataset.category;

            freelanceCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            filterButtons.forEach(btn => {
                btn.classList.remove('btn-primary', 'active');
                btn.classList.add('btn-outline-primary');
            });

            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-primary', 'active');
        });
    });

});
// FORNULAIRE DE CONTACT
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const sujet = document.getElementById('sujet');
    const message = document.getElementById('message');
    let isValid = true;

    
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    if (!nom.value.trim()) {
      shadowError(nom, 'le nom est requis');
      isValid = false;
    }

    if (!prenom.value.trim()) {
      shadowError(prenom, 'le prenom est requis');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      shadowError(email, "l'email est requis");
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      shadowError(email, 'Email invalide');
      isValid = false;
    }

    if (!message.value.trim()) {
      shadowError(message, 'le message est requis');
      isValid = false;
    } else if (message.value.trim().length < 20) {
      shadowError(message, 'le message doit contenir au moins 20 caractères');
      isValid = false;
    }

    if (isValid) {
      document.getElementById('formSuccess').style.display = 'block';
      form.reset();
      setTimeout(() => {
        document.getElementById('formSuccess').style.display = 'none';
      }, 5000);
    }

    function shadowError(input, message) {
      input.classList.add('is-invalid');
      const div = document.createElement('div');
      div.className = 'error-message text-danger small mt-1';
      div.textContent = message;
      input.parentNode.insertBefore(div, input.nextSibling);
    }
  });
});

