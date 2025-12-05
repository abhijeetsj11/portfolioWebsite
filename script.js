// Mobile nav toggle and theme toggle
document.addEventListener('DOMContentLoaded', function () {
	// Mobile nav
	const toggle = document.getElementById('navToggle');
	const nav = document.getElementById('navLinks');
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			const opened = nav.classList.toggle('open');
			toggle.setAttribute('aria-expanded', opened);
			// lock body scroll and show overlay on mobile when nav is open
			document.body.classList.toggle('nav-open', opened);
		});

		// Close menu when a link is clicked (mobile)
		nav.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				nav.classList.remove('open');
				document.body.classList.remove('nav-open');
				toggle.setAttribute('aria-expanded', 'false');
			});
		});

		// Close nav when clicking outside the menu (mobile). This also closes overlay.
		document.addEventListener('click', function (e) {
			if (!nav.classList.contains('open')) return;
			const clickedInsideNav = e.target.closest && e.target.closest('.nav-links');
			const clickedToggle = e.target.closest && e.target.closest('#navToggle');
			if (!clickedInsideNav && !clickedToggle) {
				nav.classList.remove('open');
				document.body.classList.remove('nav-open');
				toggle.setAttribute('aria-expanded', 'false');
			}
		}, {capture: true});
	}

	// Theme toggle with persistence
	const themeToggle = document.getElementById('themeToggle');
	const root = document.documentElement;
	const THEME_KEY = 'site-theme';

	function applyTheme(theme) {
		// set data-theme attribute on the <html> element
		root.setAttribute('data-theme', theme);
		if (themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'dark');
		if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
	}

	// Initialize theme from localStorage or system preference
	let saved = null;
	try { saved = localStorage.getItem(THEME_KEY); } catch (e) { saved = null; }
	if (saved === 'dark' || saved === 'light') {
		applyTheme(saved);
	} else {
		const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		applyTheme(prefersDark ? 'dark' : 'light');
	}

	if (themeToggle) {
		themeToggle.addEventListener('click', function () {
			const current = root.getAttribute('data-theme') || 'light';
			const next = current === 'dark' ? 'light' : 'dark';
			try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
			applyTheme(next);
		});
	}
});

	/* Typed text for hero */
	(function () {
		const typedEl = document.getElementById('typed');
		if (!typedEl) return;

		const words = ['Web Developer', 'UI/UX Designer'];
		const TYPING_SPEED = 80;
		const PAUSE = 1500;
		let wordIndex = 0;
		let charIndex = 0;
		let deleting = false;

		function tick() {
			const current = words[wordIndex];
			if (!deleting) {
				typedEl.textContent = current.slice(0, charIndex + 1);
				charIndex++;
				if (charIndex === current.length) {
					deleting = true;
					setTimeout(tick, PAUSE);
					return;
				}
			} else {
				typedEl.textContent = current.slice(0, charIndex - 1);
				charIndex--;
				if (charIndex === 0) {
					deleting = false;
					wordIndex = (wordIndex + 1) % words.length;
				}
			}
			setTimeout(tick, deleting ? TYPING_SPEED / 2 : TYPING_SPEED);
		}

		// start
		tick();
	})();

	/* Lightweight decorative particles fallback: animated dots */
	(function () {
		const container = document.getElementById('particles-js');
		if (!container) return;
		// create a few subtle floating dots
		for (let i = 0; i < 10; i++) {
			const d = document.createElement('div');
			d.className = 'p-dot';
			const size = 6 + Math.random() * 16;
			d.style.width = d.style.height = size + 'px';
			d.style.left = Math.random() * 100 + '%';
			d.style.top = Math.random() * 100 + '%';
			d.style.opacity = 0.05 + Math.random() * 0.12;
			container.appendChild(d);
		}
	})();

	/* Contact form handling */
	(function () {
		const form = document.getElementById('contact-form');
		if (!form) return;

		const submitBtn = form.querySelector('.submit-btn');
		const msgEl = document.createElement('div');
		msgEl.className = 'form-message';
		form.appendChild(msgEl);

		form.addEventListener('submit', async function (e) {
			e.preventDefault();

			// basic validation
			const name = form.querySelector('#name');
			const email = form.querySelector('#email');
			const message = form.querySelector('#message');
			if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
				msgEl.textContent = 'Please fill in the required fields.';
				msgEl.className = 'form-message error';
				return;
			}

			// prepare submit
			submitBtn.disabled = true;
			const originalText = submitBtn.textContent;
			submitBtn.querySelector('span') ? submitBtn.querySelector('span').textContent = 'Sending...' : submitBtn.textContent = 'Sending...';

			try {
				const action = form.getAttribute('action') || window.location.href;
				const formData = new FormData(form);
				const res = await fetch(action, {
					method: form.getAttribute('method') || 'POST',
					body: formData,
					headers: { 'Accept': 'application/json' }
				});

				if (res.ok) {
					msgEl.textContent = 'Message sent — thanks!';
					msgEl.className = 'form-message success';
					form.reset();
				} else {
					const data = await res.json().catch(() => ({}));
					msgEl.textContent = data.error || 'There was an error sending your message.';
					msgEl.className = 'form-message error';
				}
			} catch (err) {
				msgEl.textContent = 'Network error. Please try again later.';
				msgEl.className = 'form-message error';
			} finally {
				submitBtn.disabled = false;
				if (submitBtn.querySelector('span')) submitBtn.querySelector('span').textContent = 'Send Message';
				else submitBtn.textContent = originalText;
			}
		});
	})();

	/* Footer helpers: set current year and back-to-top button */
	(function () {
		// current year
		const yearEl = document.getElementById('currentYear');
		if (yearEl) yearEl.textContent = new Date().getFullYear();

		// back to top
		const backBtn = document.getElementById('backToTop');
		if (!backBtn) return;

		function onScroll() {
			if (window.scrollY > 400) backBtn.classList.add('show');
			else backBtn.classList.remove('show');
		}

		window.addEventListener('scroll', onScroll, { passive: true });

		backBtn.addEventListener('click', function () {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		});
	})();

// Scroll-based active section highlighting using IntersectionObserver
(function () {
	const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
	const sections = Array.from(document.querySelectorAll('section[id]'));
	if (!navLinks.length || !sections.length) return;

	// helper: remove active from all links
	function clearActive() {
		navLinks.forEach(l => l.classList.remove('active'));
	}

	// when a nav link is clicked, make it active immediately (improves perceived responsiveness)
	navLinks.forEach(link => {
		link.addEventListener('click', () => {
			clearActive();
			link.classList.add('active');
		});
	});

	// Map section id to link element for quick lookup
	function linkForSectionId(id) {
		return document.querySelector('.nav-links a[href="#' + id + '"]');
	}

	// IntersectionObserver callback: pick the entry with largest intersectionRatio
	const observer = new IntersectionObserver((entries) => {
		let best = null;
		entries.forEach(entry => {
			if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
		});

		if (best && best.isIntersecting) {
			const id = best.target.id;
			const link = linkForSectionId(id);
			if (link) {
				clearActive();
				link.classList.add('active');
			}
		} else {
			// If no section is intersecting enough, clear active states
			// (this keeps UI predictable when scrolling fast)
			// but don't clear if a link has focus (keyboard nav)
			const focused = document.activeElement;
			if (!focused || !focused.closest || !focused.closest('.nav-links')) {
				clearActive();
			}
		}
	}, {
		root: null,
		rootMargin: '-30% 0% -40% 0%',
		threshold: [0.25, 0.5, 0.75]
	});

	sections.forEach(s => observer.observe(s));

	// Initial check: highlight the section in view on load
	window.addEventListener('load', function () {
		// give the observer a tick; fallback: find section nearest viewport center
		setTimeout(() => {
			const inView = sections.map(s => ({
				id: s.id,
				rect: s.getBoundingClientRect(),
				distance: Math.abs((s.getBoundingClientRect().top + s.getBoundingClientRect().bottom) / 2 - (window.innerHeight / 2))
			})).sort((a,b) => a.distance - b.distance);
			if (inView.length) {
				const link = linkForSectionId(inView[0].id);
				if (link) {
					clearActive();
					link.classList.add('active');
				}
			}
		}, 50);
	});
})();

