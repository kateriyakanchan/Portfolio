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
inquiryForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inquiryForm.reportValidity()) return;

  const formData = new FormData(inquiryForm);
  const name = String(formData.get('name') || '').trim();
  const fields = [
    ['Name', name],
    ['Email', formData.get('email')],
    ['Brand / Business', formData.get('brand')],
    ['Service', formData.get('service')],
    ['Timeline', formData.get('timeline')],
    ['Budget', formData.get('budget')],
    ['Project details', formData.get('message')]
  ].filter(([, value]) => String(value || '').trim());
  const composeUrl = new URL('https://mail.google.com/mail/');
  composeUrl.searchParams.set('view', 'cm');
  composeUrl.searchParams.set('fs', '1');
  composeUrl.searchParams.set('to', 'kateriyakanchan@gmail.com');
  composeUrl.searchParams.set('su', `Shopify project inquiry${name ? ` from ${name}` : ''}`);
  composeUrl.searchParams.set('body', fields.map(([label, value]) => `${label}: ${String(value).trim()}`).join('\n\n'));
  window.location.assign(composeUrl.toString());
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
