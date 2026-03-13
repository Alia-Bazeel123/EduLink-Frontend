// student.js

const user = JSON.parse(sessionStorage.getItem('edulink_user') || 'null');
if (!user || user.role !== 'student') window.location.href = 'index.html';

// ─── Data ─────────────────────────────────────────────────────────────────
const studentData = { name: 'Ahmed Al Mansouri', id: 'STU-2024-00142', initials: 'AM' };

let documents = [
  { id: 1, name: 'Health Certificate',      type: 'Health Certificate', iconName: 'heart-pulse', expiry: '2025-03-08', status: 'expiring' },
  { id: 2, name: 'Emirates ID Copy',        type: 'Identity Document',  iconName: 'credit-card', expiry: '2027-12-31', status: 'valid'    },
  { id: 3, name: 'Passport Copy',           type: 'Identity Document',  iconName: 'book-open',   expiry: '2028-09-14', status: 'valid'    },
  { id: 4, name: 'High School Certificate', type: 'Academic',           iconName: 'scroll',       expiry: '2099-01-01', status: 'valid'    },
  { id: 5, name: 'Medical Insurance',       type: 'Insurance',          iconName: 'shield-check', expiry: '2025-12-31', status: 'valid'    },
];

const announcements = [
  { id: 1, tag: 'urgent',   title: 'Mid-Term Examination Schedule Released',
    body: 'The mid-term examination schedule for Semester 1, 2024-25 has been published. All students are required to check their personal timetables and ensure they are aware of the dates and venues for each subject.',
    from: 'Academic Office', time: '2 hours ago', unread: true },
  { id: 2, tag: 'academic', title: 'Library Timings Updated for Ramadan',
    body: 'Library operating hours will be adjusted during the Holy Month of Ramadan. The library will be open from 9:00 AM to 6:00 PM on weekdays and 10:00 AM to 2:00 PM on weekends.',
    from: 'Library Services', time: '5 hours ago', unread: true },
  { id: 3, tag: 'admin',    title: 'Student ID Card Renewal Drive',
    body: 'Students whose ID cards expire in 2025 are requested to visit the Administration Office (Block A, Room 101) with their Emirates ID and a passport photo for renewal.',
    from: 'Admin Office', time: 'Yesterday', unread: true },
  { id: 4, tag: 'general',  title: 'Campus WiFi Maintenance Notice',
    body: 'Scheduled maintenance will be conducted on Saturday March 8, 2025 from 2:00 AM to 6:00 AM. Campus WiFi may be temporarily unavailable during this window.',
    from: 'IT Department', time: '2 days ago', unread: false },
  { id: 5, tag: 'academic', title: 'Guest Lecture: AI in Modern Business',
    body: 'The Department of Computer Science is pleased to invite all students to a guest lecture on "Artificial Intelligence in Modern Business" by Dr. Fatima Al Rashidi on March 12, 2025 at 2:00 PM in the Main Auditorium.',
    from: 'CS Department', time: '3 days ago', unread: false },
];

const weekData = [
  { day: 'Sun', present: false, holiday: true },
  { day: 'Mon', present: true },
  { day: 'Tue', present: true },
  { day: 'Wed', present: false },
  { day: 'Thu', present: true },
  { day: 'Fri', present: false, holiday: true },
  { day: 'Sat', present: false, holiday: true },
];

// ─── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupUserInfo();
  setDate();
  setGreeting();
  renderAttendanceChart();
  renderCalendar();
  renderDocuments('all');
  renderAnnouncements('all');
});

function setupUserInfo() {
  const i = studentData.initials;
  ['sidebar-avatar','topbar-avatar','profile-avatar'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = i;
  });
  const sn = document.getElementById('sidebar-name'); if (sn) sn.textContent = 'Ahmed M.';
  const si = document.getElementById('sidebar-id');   if (si) si.textContent = studentData.id;
  const wn = document.getElementById('welcome-name'); if (wn) wn.textContent = studentData.name;
  const pn = document.getElementById('profile-name'); if (pn) pn.textContent = studentData.name;
  const pi = document.getElementById('profile-id-display'); if (pi) pi.textContent = studentData.id;
}

function setDate() {
  const el = document.getElementById('topbar-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-AE', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

function setGreeting() {
  const h = new Date().getHours();
  const g = h < 12 ? 'Good morning,' : h < 17 ? 'Good afternoon,' : 'Good evening,';
  const el = document.getElementById('welcome-greeting'); if (el) el.textContent = g;
}

// ─── Navigation ────────────────────────────────────────────────────────────
function navigateTo(page, el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  const titles = { dashboard:'Dashboard', attendance:'Attendance', marksheet:'Marksheet', documents:'Documents', announcements:'Announcements', profile:'My Profile' };
  const pt = document.getElementById('page-title'); if (pt) pt.textContent = titles[page] || page;
  const bc = document.getElementById('breadcrumb');  if (bc) bc.textContent = `Home / ${titles[page] || page}`;
  document.getElementById('notif-panel').classList.remove('open');
  if (window.innerWidth < 900) document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }

// ─── Notifications ─────────────────────────────────────────────────────────
function toggleNotifications() {
  document.getElementById('notif-panel').classList.toggle('open');
}
document.addEventListener('click', e => {
  const panel = document.getElementById('notif-panel');
  if (!panel.contains(e.target) && !e.target.closest('.notif-btn')) panel.classList.remove('open');
});

// ─── Attendance Chart ──────────────────────────────────────────────────────
function renderAttendanceChart() {
  const c = document.getElementById('attendance-chart'); if (!c) return;
  c.innerHTML = '';
  weekData.forEach(d => {
    const wrap = document.createElement('div'); wrap.className = 'chart-bar-wrap';
    const bar  = document.createElement('div');
    const h    = d.holiday ? 8 : d.present ? Math.floor(Math.random()*40+55) : 8;
    bar.className = 'chart-bar' + (d.holiday || !d.present ? ' absent' : '');
    bar.style.height = h + '%';
    bar.title = d.holiday ? 'Holiday' : d.present ? 'Present' : 'Absent';
    const lbl = document.createElement('div'); lbl.className = 'chart-bar-label'; lbl.textContent = d.day;
    wrap.appendChild(bar); wrap.appendChild(lbl); c.appendChild(wrap);
  });
}

// ─── Calendar ──────────────────────────────────────────────────────────────
function renderCalendar() {
  const cal = document.getElementById('att-calendar'); if (!cal) return;
  cal.innerHTML = '';
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const h = document.createElement('div'); h.className = 'cal-day-header'; h.textContent = d; cal.appendChild(h);
  });
  // March 2025 starts on Saturday (index 6)
  for (let i = 0; i < 6; i++) { const e = document.createElement('div'); e.className = 'cal-day empty'; cal.appendChild(e); }
  const today = 5, holidays = [7,8,14,15,21,22,28,29], absents = [3,10,17,24];
  for (let d = 1; d <= 31; d++) {
    const el = document.createElement('div'); el.className = 'cal-day'; el.textContent = d;
    if (d === today)          el.classList.add('today');
    else if (d > today)       el.classList.add('upcoming');
    else if (holidays.includes(d)) el.classList.add('holiday');
    else if (absents.includes(d))  el.classList.add('absent');
    else                      el.classList.add('present');
    cal.appendChild(el);
  }
}

// ─── Documents ─────────────────────────────────────────────────────────────
let currentDocFilter = 'all';

function renderDocuments(filter) {
  currentDocFilter = filter;
  const grid = document.getElementById('docs-grid'); if (!grid) return;
  grid.innerHTML = '';
  const filtered = filter === 'all' ? documents : documents.filter(d => d.status === filter);
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted);font-size:0.9rem">No documents in this category.</div>`;
    return;
  }
  filtered.forEach(doc => {
    const days = getDaysLeft(doc.expiry);
    let expiryClass = '', expiryText = '';
    if      (days < 0)  { expiryClass = 'danger'; expiryText = 'Expired'; }
    else if (days <= 7) { expiryClass = 'warn';   expiryText = `Expires in ${days} days`; }
    else                { expiryText = `Valid until: ${formatDate(doc.expiry)}`; }

    const card = document.createElement('div');
    card.className = `doc-card ${doc.status}`;
    card.innerHTML = `
      <div class="doc-card-icon-wrap"><i data-lucide="${doc.iconName}" width="28" height="28"></i></div>
      <div class="doc-card-name">${doc.name}</div>
      <div class="doc-card-type">${doc.type}</div>
      <div class="doc-card-meta">
        <span class="doc-expiry ${expiryClass}">${expiryText}</span>
      </div>
      <div class="doc-card-actions">
        <button class="doc-btn" onclick="viewDoc(${doc.id})"><i data-lucide="eye" width="13" height="13"></i> View</button>
        <button class="doc-btn" onclick="downloadDoc(${doc.id})"><i data-lucide="download" width="13" height="13"></i> Download</button>
        <button class="doc-btn red" onclick="deleteDoc(${doc.id},this)" title="Delete"><i data-lucide="trash-2" width="13" height="13"></i></button>
      </div>`;
    grid.appendChild(card);
  });
  lucide.createIcons();
}

function filterDocs(filter, btn) {
  document.querySelectorAll('.doc-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderDocuments(filter);
}

function getDaysLeft(dateStr) {
  return Math.ceil((new Date(dateStr) - new Date('2025-03-05')) / 86400000);
}
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-AE', { day:'numeric', month:'short', year:'numeric' });
}

function viewDoc(id)     { showToast('Opening document preview...'); }
function downloadDoc(id) { showToast('Downloading document...'); }
function deleteDoc(id, btn) {
  const card = btn.closest('.doc-card');
  card.style.transition = 'all 0.3s ease'; card.style.opacity = '0'; card.style.transform = 'scale(0.95)';
  setTimeout(() => {
    documents = documents.filter(d => d.id !== id);
    renderDocuments(currentDocFilter);
    showToast('Document deleted.');
  }, 300);
}

// ─── Upload Modal ──────────────────────────────────────────────────────────
function showUploadModal()  { document.getElementById('upload-modal').style.display = 'flex'; }
function closeUploadModal() { document.getElementById('upload-modal').style.display = 'none'; }
document.getElementById('upload-modal').addEventListener('click', function(e) { if (e.target === this) closeUploadModal(); });

function handleFileSelect(e) {
  const file = e.target.files[0]; if (!file) return;
  const el = document.getElementById('selected-file');
  el.style.display = 'block';
  el.textContent = `${file.name} (${(file.size/1024).toFixed(1)} KB)`;
}

function uploadDocument() {
  const name   = document.getElementById('doc-name').value.trim();
  const type   = document.getElementById('doc-type').value;
  const expiry = document.getElementById('doc-expiry').value;
  if (!name || !expiry) { showToast('Please fill in all fields.'); return; }
  const iconMap = { 'Health Certificate':'heart-pulse','Emirates ID':'credit-card','Passport Copy':'book-open','Academic Certificate':'scroll','Bank Statement':'building','Other':'file' };
  documents.push({ id: Date.now(), name, type, iconName: iconMap[type] || 'file', expiry, status: getDaysLeft(expiry) <= 7 ? 'expiring' : 'valid' });
  closeUploadModal();
  renderDocuments(currentDocFilter);
  showToast(`"${name}" uploaded successfully.`);
}

// ─── Announcements ─────────────────────────────────────────────────────────
function renderAnnouncements(filter) {
  const list = document.getElementById('ann-list'); if (!list) return;
  list.innerHTML = '';
  const filtered = filter === 'all' ? announcements : announcements.filter(a => a.tag === filter);
  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:48px;color:var(--text-muted);font-size:0.9rem">No announcements in this category.</div>`;
    return;
  }
  filtered.forEach(ann => {
    const card = document.createElement('div');
    card.className = 'ann-card' + (ann.unread ? ' unread' : '');
    card.innerHTML = `
      <div class="ann-card-header">
        <div>
          <span class="ann-tag tag-${ann.tag}">${getTagLabel(ann.tag)}</span>
          <div class="ann-title">${ann.title}</div>
        </div>
        ${ann.unread ? '<span class="unread-dot"></span>' : ''}
      </div>
      <div class="ann-body-text">${ann.body}</div>
      <div class="ann-footer">
        <span>${ann.from}</span>
        <span>${ann.time}</span>
        ${ann.unread ? '<span class="unread-label">Unread</span>' : ''}
      </div>`;
    card.addEventListener('click', () => { ann.unread = false; card.classList.remove('unread'); card.querySelector('.unread-dot, .unread-label') && card.querySelectorAll('.unread-dot,.unread-label').forEach(e=>e.remove()); });
    list.appendChild(card);
  });
}

function filterAnn(filter, btn) {
  document.querySelectorAll('.ann-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAnnouncements(filter);
}

function getTagLabel(tag) {
  return { urgent:'Urgent', academic:'Academic', admin:'Administrative', general:'General' }[tag] || tag;
}

// ─── Profile ───────────────────────────────────────────────────────────────
function saveProfile() {
  const name = document.getElementById('field-name').value;
  document.getElementById('welcome-name').textContent = name;
  document.getElementById('sidebar-name').textContent = name.split(' ').slice(0,2).join(' ');
  document.getElementById('profile-name').textContent = name;
  showToast('Profile updated successfully.');
}

// ─── Marksheet ─────────────────────────────────────────────────────────────
function downloadMarksheet() {
  showToast('Preparing PDF...');
  setTimeout(() => showToast('Marksheet downloaded.'), 1500);
}

// ─── Auth ──────────────────────────────────────────────────────────────────
function logout() {
  if (confirm('Sign out of EduLink?')) { sessionStorage.removeItem('edulink_user'); window.location.href = 'index.html'; }
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg, duration = 3200) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), duration);
}

// ─── Keyboard ──────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeUploadModal(); document.getElementById('notif-panel').classList.remove('open'); }
});