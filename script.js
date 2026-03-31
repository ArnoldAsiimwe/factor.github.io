// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollY >= top && scrollY < top + height);
        }
    });
});

// ===== TYPEWRITER EFFECT =====
const typewriterEl = document.getElementById('typewriter');
const roles = ['Web Developer', 'UI/UX Designer', 'Database designer', 'Tech Enthusiast', 'Student at MUST'];
let roleIndex = 0, charIndex = 0, isDeleting = false;

function typeWriter() {
    const current = roles[roleIndex];
    typewriterEl.textContent = isDeleting
        ? current.substring(0, charIndex--)
        : current.substring(0, charIndex++);

    if (!isDeleting && charIndex > current.length) {
        setTimeout(() => { isDeleting = true; typeWriter(); }, 2000);
        return;
    }
    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(typeWriter, isDeleting ? 40 : 80);
}
typeWriter();

// ===== HERO PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    particlesContainer.appendChild(p);
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill bars
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.dataset.width + '%';
            });

            // Animate stat counters
            entry.target.querySelectorAll('.stat-number').forEach(num => {
                animateCounter(num);
            });
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section, .hero').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
    const target = +el.dataset.target;
    const duration = 1500;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ===== PROJECT FILTERS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
        });
    });
});

// ===== TESTIMONIAL SLIDER =====
const testimonials = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.getElementById('testimonialDots');
let currentTestimonial = 0;

testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => showTestimonial(i));
    dotsContainer.appendChild(dot);
});

function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.testimonial-dot').forEach(d => d.classList.remove('active'));
    testimonials[index].classList.add('active');
    dotsContainer.children[index].classList.add('active');
    currentTestimonial = index;
}

setInterval(() => {
    showTestimonial((currentTestimonial + 1) % testimonials.length);
}, 5000);

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#10b981';
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        e.target.reset();
    }, 3000);
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
