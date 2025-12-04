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

		const words = ['Web Developer', 'UI/UX Designer (animation)'];
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

