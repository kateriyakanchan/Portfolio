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

setTheme(localStorage.getItem('kanchan-theme') !== 'light');
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark-mode')));

const whatsappLink = document.createElement('a');
whatsappLink.className = 'whatsapp-float';
whatsappLink.href = 'https://wa.me/918690280307';
whatsappLink.target = '_blank';
whatsappLink.rel = 'noopener noreferrer';
whatsappLink.setAttribute('aria-label', 'Chat with KANC STUDIO on WhatsApp');
whatsappLink.title = 'Chat with KANC STUDIO on WhatsApp';
whatsappLink.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 3.2a12.4 12.4 0 0 0-10.7 18.7L3.7 28l6.3-1.6A12.4 12.4 0 1 0 16 3.2Zm0 22.5a10 10 0 0 1-5.1-1.4l-.4-.2-3.7 1 .9-3.6-.3-.4A10.1 10.1 0 1 1 16 25.7Zm5.5-7.6c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.3 8.3 0 0 1-2.5-1.5 9.2 9.2 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4a12 12 0 0 0 4.6 4c.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4s-.3-.2-.6-.4Z"/></svg>';
document.body.append(whatsappLink);

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
    status.textContent = 'Thanks! Your inquiry has been sent. We’ll get back to you soon.';
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
