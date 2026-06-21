
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


   