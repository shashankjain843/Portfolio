/* =================================================================
   PORTFOLIO WEBSITE JAVASCRIPT - SHASHANK JAIN
   ================================================================= */

// -----------------------------------------------------------------
// 1. TYPED.JS ROTATING ROLES EFFECT
// -----------------------------------------------------------------
const typed = new Typed('.text', {
    strings: [
        'Data Analyst',
        'Data Scientist',
        'Software Developer'
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// -----------------------------------------------------------------
// 2. MOBILE MENU / NAVBAR TOGGLE
// -----------------------------------------------------------------
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });
}

// -----------------------------------------------------------------
// 3. SCROLL SECTIONS ACTIVE LINK & STICKY HEADER
// -----------------------------------------------------------------
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Sticky header
    if (header) {
        header.classList.toggle('sticky', scrollY > 100);
    }

    // Active nav link highlight on scroll
    sections.forEach(sec => {
        const top = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const targetLink = document.querySelector(`header nav a[href*='${id}']`);
                if (targetLink) {
                    targetLink.classList.add('active');
                }
            });
        }
    });

    // Close mobile menu on scroll if open
    if (menuIcon && navbar && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Close mobile menu when clicking any nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    });
});

// -----------------------------------------------------------------
// 4. ANIMATE SKILLS PROGRESS BARS ON SCROLL
// -----------------------------------------------------------------
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add('animate-skills');
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
}

// -----------------------------------------------------------------
// 5. DUAL RESUME SELECTOR LOGIC
// -----------------------------------------------------------------
const resumeSelect = document.getElementById('resume-select');
const resumeBtn = document.getElementById('resume-btn');
const resumePreviewBtn = document.getElementById('resume-preview-btn');

function updateResumeLinks() {
    if (!resumeSelect) return;
    const selectedOption = resumeSelect.options[resumeSelect.selectedIndex];
    if (!selectedOption) return;

    const filePath = selectedOption.value;
    const downloadName = selectedOption.getAttribute('data-filename') || filePath;

    if (resumeBtn) {
        resumeBtn.setAttribute('href', filePath);
        resumeBtn.setAttribute('download', downloadName);
    }
    if (resumePreviewBtn) {
        resumePreviewBtn.setAttribute('href', filePath);
    }
}

if (resumeSelect) {
    resumeSelect.addEventListener('change', updateResumeLinks);
    // Initialize on page load so links always match the selected option
    updateResumeLinks();
}

// -----------------------------------------------------------------
// 6. CONTACT FORM HANDLER
// -----------------------------------------------------------------
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('form-feedback');

if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();

        if (name && email) {
            formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
            formFeedback.className = 'form-feedback success';
            contactForm.reset();

            setTimeout(() => {
                formFeedback.textContent = '';
                formFeedback.className = 'form-feedback';
            }, 6000);
        } else {
            formFeedback.textContent = 'Please fill out all required fields.';
            formFeedback.className = 'form-feedback error';
        }
    });
}
