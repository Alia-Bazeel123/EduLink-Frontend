// landing.js

// Animate hero elements on load
document.addEventListener('DOMContentLoaded', () => {
  // Trigger animations
  setTimeout(() => {
    document.querySelectorAll('.animate-in').forEach(el => {
      el.classList.add('animated');
    });
  }, 100);

  // Count up stats
  setTimeout(() => {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.target);
      animateCount(el, 0, target, 1800);
    });
  }, 600);

  // Progress bar animation
  setTimeout(() => {
    document.querySelectorAll('.prog-fill').forEach(el => {
      el.style.width = el.style.width;
    });
  }, 800);

  // Nav scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav-bar');
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Feature cards animate on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .about-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});

function animateCount(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (end - start) * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = end.toLocaleString() + (end >= 1000 ? '' : '');
  }
  requestAnimationFrame(update);
}

// Modal handling
let currentTab = 'student';

function showLoginModal() {
  document.getElementById('login-modal').style.display = 'flex';
  switchTab(currentTab);
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('login-modal').style.display = 'none';
  document.body.style.overflow = '';
}

function switchTab(type) {
  currentTab = type;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + type).classList.add('active');
  document.getElementById('login-hint').textContent = '';
  const placeholders = {
    student: 'e.g. student@demo.com',
    faculty: 'e.g. faculty@demo.com',
    admin:   'e.g. admin@demo.com',
    parent:  'e.g. parent@demo.com'
  };
  document.getElementById('login-email').placeholder = placeholders[type];
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value.trim();
  const hint  = document.getElementById('login-hint');

  const creds = {
    student: { 
      email: 'student@demo.com', 
      pass: 'demo123', 
      page: 'student.html', 
      name: 'Ahmed Al Mansouri', 
      studentId: 'STU-2024-00142' 
    },
    faculty: { 
      email: 'faculty@demo.com', 
      pass: 'demo123', 
      page: 'faculty.html', 
      name: 'Dr. Rania Hassan' 
    },
    admin: { 
      email: 'admin@demo.com',   
      pass: 'admin123', 
      page: 'admin.html',   
      name: 'Administrator' 
    },
    parent: { 
      email: 'parent@demo.com',  
      pass: 'parent123', 
      page: 'parents.html', 
      name: 'Khalid Al Mansouri' 
    }
  };

  const c = creds[currentTab];
  if (email === c.email && pass === c.pass) {
    sessionStorage.setItem('edulink_user', JSON.stringify({
      role: currentTab, 
      email, 
      name: c.name, 
      studentId: c.studentId || null
    }));
    closeLoginModal();
    window.location.href = c.page;
  } else {
    hint.textContent = 'Invalid credentials. Use the demo credentials below.';
    const box = document.querySelector('.modal-box');
    box.style.animation = 'none';
    box.offsetHeight;
    box.style.animation = 'shake 0.4s ease';
  }
}

function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Close modal on overlay click
document.getElementById('login-modal').addEventListener('click', function(e) {
  if (e.target === this) closeLoginModal();
});

// Keyboard shortcut
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLoginModal();
  if (e.key === 'Enter' && document.getElementById('login-modal').style.display === 'flex') {
    handleLogin();
  }
});

// CSS for shake
const style = document.createElement('style');
style.textContent = `@keyframes shake { 
  0%,100%{transform:translateX(0)} 
  20%{transform:translateX(-8px)} 
  40%{transform:translateX(8px)} 
  60%{transform:translateX(-6px)} 
  80%{transform:translateX(6px)} 
}`;
document.head.appendChild(style);

function handleContactForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type=submit]');
  btn.innerHTML = '<i data-lucide="check" width="17" height="17"></i><span>Message Sent!</span>';
  btn.style.background = 'var(--success)';
  lucide.createIcons();
  setTimeout(() => {
    e.target.reset();
    btn.innerHTML = '<i data-lucide="send" width="17" height="17"></i><span>Send Message</span>';
    btn.style.background = '';
    lucide.createIcons();
  }, 3000);
}