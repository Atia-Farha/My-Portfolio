
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* Custom cursor */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function tick() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(tick);
})();
document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(ring, { width: 56, height: 56, borderColor: 'rgba(255,255,255,0.9)', duration: 0.3 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(255,255,255,0.55)', duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
    });
});

/* Scroll progress bar */
const progressBar = document.getElementById('progress-bar');
window.addEventListener('scroll', () => {
    progressBar.style.width =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
});

/* Glassmorphic Nav */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

/* Active Nav Link on Scroll */
const navLinks = document.querySelectorAll('#nav .nav-links a');
const sections = ['about', 'education', 'skills', 'projects', 'achievements', 'github-stats', 'contact'];

function setActiveLink() {
    let current = '';

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollY >= sectionTop - 150) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

const style = document.createElement('style');
style.textContent = `
			.nav-links a.active {
				color: var(--ghost);
				font-weight: 500;
			}
			.nav-links a.active::after {
				width: 100% !important;
				background: var(--ghost);
			}
		`;

document.head.appendChild(style);

window.addEventListener('scroll', () => {
    setActiveLink();
});

window.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
});

/* Hero section */
window.addEventListener('DOMContentLoaded', () => {
    gsap.from(document.querySelectorAll('.hero-name .word span'), {
        y: '110%', opacity: 0, duration: 1.0, stagger: 0.045, ease: 'expo.out', delay: 0.1
    });
    gsap.from('.hero-label span', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.4 });
    gsap.from('.hero-role span', { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.6 });
    gsap.to('#hero-scroll', { opacity: 1, duration: 1, delay: 1.0 });
    gsap.to('#hero-year', { opacity: 1, duration: 1, delay: 1.1 });
});

/* Section title */
document.querySelectorAll('.section-title .line span').forEach(el => {
    gsap.from(el, {
        y: '105%', duration: 1.0, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
});
document.querySelectorAll('.section-label').forEach(el => {
    gsap.from(el, {
        opacity: 0, x: -20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
});

/* About */
gsap.from('.about-portrait', {
    opacity: 0, x: -60, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
});
gsap.from('.about-bio', {
    opacity: 0, x: 40, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }
});
document.querySelectorAll('.stat-counter[data-count]').forEach(el => {
    const target = +el.getAttribute('data-count');
    gsap.to({ val: 0 }, {
        val: target, duration: 1.8, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(this.targets()[0].val); },
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
});

/* Timeline */
document.querySelectorAll('.timeline-item').forEach((el, i) => {
    gsap.from(el, {
        opacity: 0, x: 40, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
    });
});

/* Skill tags */
document.querySelectorAll('.skill-category').forEach(cat => {
    gsap.from(cat.querySelectorAll('.skill-tag'), {
        opacity: 0, y: 24, scale: 0.9, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: cat, start: 'top 85%', toggleActions: 'play none none none' }
    });
});

/* Project cards */
async function loadProjects() {
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';

    try {
        const response = await fetch('https://pinned.berrysauce.dev/get/Atia-Farha');
        const projects = await response.json();

        projects.forEach((project, index) => {
            const isFeatured = index === 0;

            const cardHTML = `
						<div class="project-card ${isFeatured ? 'featured' : ''}">
							<div class="project-number">${(index + 1).toString().padStart(2, '0')}</div>
							<div class="project-name">${project.name.replace(/-/g, ' ')}</div>
							<p class="project-desc">${project.description || ''}</p>
							<div class="project-tags">
								${project.language ? `<span class="project-tag">${project.language}</span>` : ''}
							</div>
							<div class="project-footer">
								<a href="https://github.com/${project.author}/${project.name}" 
								target="_blank" 
								class="project-link">
									${project.stars > 0 ? 'View Project' : 'View on GitHub'}
								</a>
								<span class="project-arrow">↗</span>
							</div>
						</div>
            `;

            grid.innerHTML += cardHTML;
        });

        applyProjectAnimations();

    } catch (error) {
        console.error('Failed to load projects:', error);
        grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #888;">Failed to load projects. Please try again later.</p>`;
    }
}

function applyProjectAnimations() {
    document.querySelectorAll('.project-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.9,
            ease: 'power3.out',
            delay: (i % 2) * 0.15,
            scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                toggleActions: 'play none none none'
            }
        });

        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            gsap.to(card, {
                rotateY: ((e.clientX - r.left - r.width / 2) / r.width) * 6,
                rotateX: ((e.clientY - r.top - r.height / 2) / r.height) * -6,
                transformPerspective: 800,
                ease: 'power1.out',
                duration: 0.4
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', loadProjects);

/* Github Stats */
async function loadGitHubStats() {
    const grid = document.getElementById('github-stats-grid');

    try {
        const res = await fetch(`https://awesome-github-stats.azurewebsites.net/user-stats/Atia-Farha/stats`);
        const data = await res.json();

        const statsData = {
            'total-repos': data.createdRepositories || 0,
            'total-stars': data.directStars || 0,
            'total-followers': data.followers || 0,
            'total-commits': data.commits || 0,
            'pull-requests': data.pullRequests || 0,
            'created-issues': data.issues || 0
        };

        grid.innerHTML = '';

        const statItems = [
            {
                key: 'total-repos',
                title: 'Total Repositories',
                desc: 'Public repositories I have created and maintained on GitHub, showcasing my independent development work and open-source contributions.'
            },
            {
                key: 'total-stars',
                title: 'Total Stars',
                desc: 'Stars received across all repositories, reflecting community recognition, adoption, and the real-world impact of my projects.'
            },
            {
                key: 'total-followers',
                title: 'Total Followers',
                desc: 'Developers, collaborators, and recruiters following my GitHub activity from around the world.'
            },
            {
                key: 'total-commits',
                title: 'Total Commits',
                desc: 'Commits contributed across all repositories, demonstrating consistent coding activity and dedication to software development.'
            },
            {
                key: 'pull-requests',
                title: 'Pull Requests',
                desc: 'Pull requests opened and merged, highlighting my experience in collaborative development and code review processes.'
            },
            {
                key: 'created-issues',
                title: 'Created Issues',
                desc: 'Issues created across repositories, reflecting my ability to identify problems, drive discussions, and improve project quality.'
            }
        ];

        statItems.forEach((item, i) => {
            const value = statsData[item.key] || 0;

            const cellHTML = `
                <div class="github-stats-cell">
                    <span class="github-stats-icon">✦</span>
                    <div class="github-stats-count" data-count="${value}">0</div>
                    <div class="github-stats-title">${item.title}</div>
                    <div class="github-stats-desc">${item.desc}</div>
                </div>
            `;

            grid.innerHTML += cellHTML;
        });

        setTimeout(() => {
            applyGitHubStatsAnimations();
        }, 100);

    } catch (error) {
        console.error('Failed to load GitHub stats:', error);
        grid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: #888; padding: 2rem;">Failed to load GitHub statistics. Please try again later.</p>`;
    }
}

function applyGitHubStatsAnimations() {
    document.querySelectorAll('.github-stats-count[data-count]').forEach(el => {
        const target = +el.getAttribute('data-count');
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter() {
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate() {
                        el.textContent = Math.round(this.targets()[0].val);
                    }
                });
            }
        });
    });

    document.querySelectorAll('.github-stats-cell').forEach((cell, i) => {
        gsap.from(cell, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            delay: (i % 3) * 0.1,
            scrollTrigger: {
                trigger: cell,
                start: 'top 88%',
                toggleActions: 'play none none none'
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', loadGitHubStats);

/* Contact */
gsap.from('.contact-info', {
    opacity: 0, x: -50, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-grid', start: 'top 82%' }
});
gsap.from('.contact-form', {
    opacity: 0, x: 50, duration: 1.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.contact-grid', start: 'top 82%' }
});

/* Dividers */
document.querySelectorAll('.divider').forEach(div => {
    gsap.from(div, {
        scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: div, start: 'top 90%' }
    });
});

document.getElementById('hero-year').textContent = `© ${new Date().getFullYear()}`;

/* Mobile menu */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const hl1 = document.getElementById('hl1');
const hl2 = document.getElementById('hl2');
const hl3 = document.getElementById('hl3');
let menuOpen = false;

hamburger.addEventListener('click', () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
        document.body.classList.add('menu-open');   // ← This prevents page scroll
        mobileMenu.classList.add('open');

        gsap.set(mobileMenu, { opacity: 1 });
        gsap.from(mobileMenu.querySelectorAll('a'), {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power3.out'
        });

        gsap.to(hl1, { rotate: 45, y: 6.5, duration: 0.3 });
        gsap.to(hl2, { opacity: 0, duration: 0.3 });
        gsap.to(hl3, { rotate: -45, y: -6.5, duration: 0.3 });
    } else {
        document.body.classList.remove('menu-open'); // ← Re-enable scrolling

        gsap.to(mobileMenu, {
            opacity: 0,
            duration: 0.3,
            onComplete() {
                mobileMenu.classList.remove('open');
                mobileMenu.style.opacity = '';
            }
        });

        gsap.to(hl1, { rotate: 0, y: 0, duration: 0.3 });
        gsap.to(hl2, { opacity: 1, duration: 0.3 });
        gsap.to(hl3, { rotate: 0, y: 0, duration: 0.3 });
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (menuOpen) {
            hamburger.click();
        }
    });
});

/* Contact form */
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const txt = document.getElementById('submit-text');
    const suc = document.getElementById('form-success');
    const form = e.target;

    txt.textContent = 'Sending…';
    btn.disabled = true;

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    })
        .then(() => {
            txt.textContent = 'Send Message';
            btn.disabled = false;
            form.reset();
            suc.style.display = 'block';
            gsap.from(suc, { opacity: 0, y: 10, duration: 0.5 });
            setTimeout(() => {
                gsap.to(suc, { opacity: 0, duration: 0.5, onComplete: () => suc.style.display = 'none' });
            }, 4000);
        })
        .catch(() => {
            txt.textContent = 'Failed — try again';
            btn.disabled = false;
        });
}