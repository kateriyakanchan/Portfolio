const nav = document.querySelector('.nav');
const toggle = document.querySelector('.menu-toggle');
const main = document.querySelector('main');

if (main) {
  main.id = 'main-content';
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  document.body.prepend(skipLink);
}

document.querySelectorAll('.nav-links a').forEach(link => {
  const linkPath = new URL(link.href, window.location.href).pathname;
  if (linkPath === window.location.pathname && !link.href.endsWith('#home')) {
    link.setAttribute('aria-current', 'page');
  }
});

const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.type = 'button';
themeToggle.setAttribute('aria-label', 'Switch to dark mode');
(nav || document.body).append(themeToggle);

const setTheme = (isDark) => {
  document.body.classList.toggle('dark-mode', isDark);
  themeToggle.textContent = isDark ? '☼' : '☾';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#171819' : '#f4f0e9');
  localStorage.setItem('kanchan-theme', isDark ? 'dark' : 'light');
};

setTheme(localStorage.getItem('kanchan-theme') === 'dark');
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark-mode')));

toggle?.setAttribute('aria-controls', 'site-navigation');
document.querySelector('.nav-links')?.setAttribute('id', 'site-navigation');

const setMenuOpen = (open) => {
  nav?.classList.toggle('open', open);
  toggle?.setAttribute('aria-expanded', String(open));
  toggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (toggle) toggle.textContent = open ? '×' : '☰';
};

toggle?.addEventListener('click', () => {
  setMenuOpen(!nav.classList.contains('open'));
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

const inquiryForm = document.querySelector('.inquiry-form');
inquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const status = inquiryForm.querySelector('.form-status');
  const submitButton = inquiryForm.querySelector('button[type="submit"]');
  const originalButtonContent = submitButton.innerHTML;
  submitButton.disabled = true;
  submitButton.textContent = 'SENDING...';
  status.dataset.state = 'pending';
  status.textContent = 'Sending your inquiry...';

  try {
    const response = await fetch(inquiryForm.action, {
      method: 'POST',
      body: new FormData(inquiryForm),
      headers: { Accept: 'application/json' }
    });
    const result = response.headers.get('content-type')?.includes('application/json')
      ? await response.json()
      : null;

    if (!response.ok) {
      const formErrors = result?.errors?.map(error => error.message).filter(Boolean).join(' ');
      throw new Error(formErrors || result?.error || 'Please try again in a moment.');
    }

    inquiryForm.reset();
    status.dataset.state = 'success';
    status.textContent = 'Thanks! Your inquiry has been sent. I’ll get back to you soon.';
  } catch (error) {
    status.dataset.state = 'error';
    status.textContent = error instanceof Error
      ? `We couldn’t send your inquiry. ${error.message}`
      : 'We couldn’t send your inquiry. Please try again in a moment.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonContent;
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
