// Mobile nav toggle and theme toggle
document.addEventListener('DOMContentLoaded', function () {
	// Mobile nav
	const toggle = document.getElementById('navToggle');
	const nav = document.getElementById('navLinks');
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			const opened = nav.classList.toggle('open');
			toggle.setAttribute('aria-expanded', opened);
		});

		// Close menu when a link is clicked (mobile)
		nav.querySelectorAll('a').forEach(link => {
			link.addEventListener('click', () => {
				nav.classList.remove('open');
				toggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	// Theme toggle with persistence
	const themeToggle = document.getElementById('themeToggle');
	const root = document.documentElement;
	const THEME_KEY = 'site-theme';

	function applyTheme(theme) {
		if (theme === 'dark') {
			root.classList.add('dark');
			themeToggle && themeToggle.setAttribute('aria-pressed', 'true');
			if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = '☀️';
		} else {
			root.classList.remove('dark');
			themeToggle && themeToggle.setAttribute('aria-pressed', 'false');
			if (themeToggle) themeToggle.querySelector('.theme-icon').textContent = '🌙';
		}
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
			const isDark = root.classList.contains('dark');
			const next = isDark ? 'light' : 'dark';
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

