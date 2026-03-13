// parents.js

const user = JSON.parse(sessionStorage.getItem('edulink_user') || 'null');
if (!user || user.role !== 'parent') window.location.href = 'index.html';

// ─── Data ─────────────────────────────────────────────────────────────────
const parentData = {
  name: 'Khalid Al Mansouri',
  email: 'parent@demo.com',
  initials: 'KA',
  children: [
    { id: 'STU-2024-00142', name: 'Ahmed Al Mansouri', program: 'Computer Science', year: 'Year 2', attendance: 87, gpa: 3.8, status: 'Good' },
    { id: 'STU-2024-00234', name: 'Fatima Al Mansouri', program: 'Business Administration', year: 'Year 1', attendance: 92, gpa: 3.4, status: 'Good' }
  ]
};

// Ahmed's grades
const ahmedGrades = [
  { subject: 'Mathematics II', midterm: 34, final: 51, total: 85, grade: 'A', points: 4.0 },
  { subject: 'Physics', midterm: 37, final: 54, total: 91, grade: 'A+', points: 4.0 },
  { subject: 'CS Fundamentals', midterm: 29, final: 47, total: 76, grade: 'B+', points: 3.5 },
  { subject: 'English Communication', midterm: 35, final: 53, total: 88, grade: 'A', points: 4.0 },
  { subject: 'Arabic Language', midterm: 32, final: 44, total: 76, grade: 'B+', points: 3.5 },
  { subject: 'Islamic Studies', midterm: 36, final: 53, total: 89, grade: 'A', points: 4.0 }
];

// Fatima's grades
const fatimaGrades = [
  { subject: 'Business Mathematics', midterm: 28, final: 45, total: 73, grade: 'B', points: 3.0 },
  { subject: 'Economics', midterm: 32, final: 48, total: 80, grade: 'A-', points: 3.7 },
  { subject: 'Accounting', midterm: 30, final: 42, total: 72, grade: 'B', points: 3.0 },
  { subject: 'Marketing', midterm: 35, final: 50, total: 85, grade: 'A', points: 4.0 },
  { subject: 'Business Communication', midterm: 33, final: 51, total: 84, grade: 'A-', points: 3.7 },
  { subject: 'Ethics', midterm: 38, final: 55, total: 93, grade: 'A+', points: 4.0 }
];

// Ahmed's attendance
const ahmedAttendance = [
  { subject: 'Mathematics II', total: 20, attended: 18, missed: 2, percentage: 90, status: 'Good' },
  { subject: 'Physics', total: 18, attended: 16, missed: 2, percentage: 89, status: 'Good' },
  { subject: 'CS Fundamentals', total: 20, attended: 17, missed: 3, percentage: 85, status: 'Good' },
  { subject: 'English Communication', total: 14, attended: 13, missed: 1, percentage: 93, status: 'Good' },
  { subject: 'Arabic Language', total: 16, attended: 12, missed: 4, percentage: 75, status: 'At Risk' },
  { subject: 'Islamic Studies', total: 10, attended: 8, missed: 2, percentage: 80, status: 'Good' }
];

// Fatima's attendance
const fatimaAttendance = [
  { subject: 'Business Mathematics', total: 18, attended: 16, missed: 2, percentage: 89, status: 'Good' },
  { subject: 'Economics', total: 16, attended: 15, missed: 1, percentage: 94, status: 'Good' },
  { subject: 'Accounting', total: 18, attended: 17, missed: 1, percentage: 94, status: 'Good' },
  { subject: 'Marketing', total: 14, attended: 13, missed: 1, percentage: 93, status: 'Good' },
  { subject: 'Business Communication', total: 12, attended: 11, missed: 1, percentage: 92, status: 'Good' },
  { subject: 'Ethics', total: 10, attended: 10, missed: 0, percentage: 100, status: 'Good' }
];

const documents = [
  { id: 1, child: 'Ahmed', name: 'Health Certificate', type: 'Health', iconName: 'heart-pulse', expiry: '2025-03-08', status: 'expiring' },
  { id: 2, child: 'Ahmed', name: 'Emirates ID Copy', type: 'Identity', iconName: 'credit-card', expiry: '2027-12-31', status: 'valid' },
  { id: 3, child: 'Ahmed', name: 'Passport Copy', type: 'Identity', iconName: 'book-open', expiry: '2028-09-14', status: 'valid' },
  { id: 4, child: 'Fatima', name: 'Health Certificate', type: 'Health', iconName: 'heart-pulse', expiry: '2025-06-15', status: 'valid' },
  { id: 5, child: 'Fatima', name: 'Emirates ID Copy', type: 'Identity', iconName: 'credit-card', expiry: '2028-03-20', status: 'valid' },
  { id: 6, child: 'Fatima', name: 'Birth Certificate', type: 'Identity', iconName: 'scroll', expiry: '2099-01-01', status: 'valid' }
];

const announcements = [
  { id: 1, tag: 'urgent', title: 'Parent-Teacher Meeting Scheduled', 
    body: 'The annual Parent-Teacher meeting will be held on March 15, 2025 from 4:00 PM to 7:00 PM in the Main Hall. Parents are requested to confirm attendance through the portal.',
    from: 'Academic Office', time: '2 hours ago', unread: true },
  { id: 2, tag: 'parent', title: 'Ramadan School Hours Update',
    body: 'During the Holy Month of Ramadan, school hours will be from 9:00 AM to 2:00 PM. Please adjust pickup schedules accordingly.',
    from: 'Admin Office', time: '5 hours ago', unread: true },
  { id: 3, tag: 'academic', title: 'Mid-Term Exam Schedule Released',
    body: 'The mid-term examination schedule for all programs has been published. Please review the timetable for your children.',
    from: 'Academic Office', time: 'Yesterday', unread: true },
  { id: 4, tag: 'general', title: 'Campus Security Drill',
    body: 'A mandatory security drill will be conducted on March 10, 2025 at 10:00 AM. Normal activities will resume after the drill.',
    from: 'Security Office', time: '2 days ago', unread: false }
];

const conversations = [
  { id: 1, name: 'Dr. Rania Hassan', avatar: 'RH', lastMsg: 'Ahmed is doing well in class.', time: '10:30 AM', unread: 2, messages: [
    { id: 1, sender: 'Dr. Rania Hassan', content: 'Hello, I wanted to discuss Ahmed\'s progress in Mathematics.', time: 'Yesterday, 2:30 PM', type: 'received' },
    { id: 2, sender: 'me', content: 'Thank you for reaching out. How is he doing?', time: 'Yesterday, 3:15 PM', type: 'sent' },
    { id: 3, sender: 'Dr. Rania Hassan', content: 'He\'s doing very well! He scored 85% on the recent test. I\'m very pleased with his participation.', time: 'Yesterday, 4:00 PM', type: 'received' },
    { id: 4, sender: 'me', content: 'That\'s great news! Thank you for letting me know.', time: 'Yesterday, 5:30 PM', type: 'sent' },
    { id: 5, sender: 'Dr. Rania Hassan', content: 'Ahmed is doing well in class. He\'s been participating actively and his grades are improving.', time: '10:30 AM', type: 'received' }
  ]},
  { id: 2, name: 'Prof. Ahmed Khalid', avatar: 'AK', lastMsg: 'Physics lab schedule changed', time: 'Yesterday', unread: 0, messages: [] },
  { id: 3, name: 'Academic Office', avatar: 'AO', lastMsg: 'PTM schedule released', time: '2 days ago', unread: 0, messages: [] }
];

let currentDocFilter = 'all';
let currentChildFilter = 'all';
let selectedConversation = null;

// ─── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupUserInfo();
  setDate();
  setGreeting();
  renderAttendanceView();
  renderGradesView();
  renderParentDocs();
  renderParentAnnouncements('all');
  renderConversations();
  renderCalendar();
});

function setupUserInfo() {
  const i = parentData.initials;
  ['sidebar-avatar','topbar-avatar','profile-avatar'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = i;
  });
  const sn = document.getElementById('sidebar-name'); if (sn) sn.textContent = parentData.name;
  const si = document.getElementById('sidebar-id'); if (si) si.textContent = parentData.email;
  const wn = document.getElementById('welcome-name'); if (wn) wn.textContent = parentData.name;
  const pn = document.getElementById('profile-name-display'); if (pn) pn.textContent = parentData.name;
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
function parentsNav(page, el, childName = null) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  
  const titles = {
    'parents-overview': 'Dashboard',
    'parents-children': 'My Children',
    'parents-attendance': 'Attendance',
    'parents-grades': 'Grades',
    'parents-announcements': 'Announcements',
    'parents-messages': 'Messages',
    'parents-documents': 'Documents',
    'parents-profile': 'My Profile',
    'parents-settings': 'Settings'
  };
  
  const pt = document.getElementById('page-title'); if (pt) pt.textContent = titles[page] || page;
  const bc = document.getElementById('breadcrumb-span'); if (bc) bc.textContent = titles[page] || page;
  
  if (childName && page === 'parents-attendance') {
    const select = document.getElementById('attendance-child-select');
    if (select) select.value = childName.toLowerCase();
    renderAttendanceView();
  }
  
  if (childName && page === 'parents-grades') {
    const select = document.getElementById('grades-child-select');
    if (select) select.value = childName.toLowerCase();
    renderGradesView();
  }
  
  document.getElementById('notif-panel').classList.remove('open');
  if (window.innerWidth < 900) document.getElementById('sidebar').classList.remove('open');
}

function toggleNotifications() {
  document.getElementById('notif-panel').classList.toggle('open');
}

document.addEventListener('click', e => {
  const panel = document.getElementById('notif-panel');
  if (!panel.contains(e.target) && !e.target.closest('.notif-btn')) panel.classList.remove('open');
});

// ─── Attendance ────────────────────────────────────────────────────────────
function renderAttendanceView() {
  const child = document.getElementById('attendance-child-select')?.value || 'ahmed';
  const data = child === 'ahmed' ? ahmedAttendance : fatimaAttendance;
  
  // Update summary stats
  const overall = data.reduce((sum, item) => sum + item.percentage, 0) / data.length;
  const attended = data.reduce((sum, item) => sum + item.attended, 0);
  const missed = data.reduce((sum, item) => sum + item.missed, 0);
  
  document.getElementById('att-overall').textContent = Math.round(overall) + '%';
  document.getElementById('att-overall-bar').style.width = overall + '%';
  document.getElementById('att-attended').textContent = attended;
  document.getElementById('att-missed').textContent = missed;
  
  // Render table
  const tbody = document.getElementById('attendance-tbody');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  data.forEach(item => {
    const statusClass = item.status === 'Good' ? 'status-good' : 'status-warn';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.subject}</td>
      <td>${item.total}</td>
      <td>${item.attended}</td>
      <td>${item.missed}</td>
      <td><div class="mini-prog"><div class="mini-prog-fill ${item.percentage < 80 ? 'warn' : ''}" style="width:${item.percentage}%"></div></div> ${item.percentage}%</td>
      <td><span class="status-badge ${statusClass}">${item.status}</span></td>
    `;
    tbody.appendChild(row);
  });
  
  renderCalendar(child);
}

function renderCalendar(child = 'ahmed') {
  const cal = document.getElementById('parents-att-calendar');
  if (!cal) return;
  
  cal.innerHTML = '';
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => {
    const h = document.createElement('div'); h.className = 'cal-day-header'; h.textContent = d; cal.appendChild(h);
  });
  
  // March 2025 starts on Saturday
  for (let i = 0; i < 6; i++) {
    const e = document.createElement('div'); e.className = 'cal-day empty'; cal.appendChild(e);
  }
  
  const today = 5;
  // Different absence patterns for different children
  const holidays = [7,8,14,15,21,22,28,29];
  const absents = child === 'ahmed' ? [3,10,17,24,31] : [4,11,18,25];
  
  for (let d = 1; d <= 31; d++) {
    const el = document.createElement('div'); el.className = 'cal-day'; el.textContent = d;
    if (d === today) el.classList.add('today');
    else if (d > today) el.classList.add('upcoming');
    else if (holidays.includes(d)) el.classList.add('holiday');
    else if (absents.includes(d)) el.classList.add('absent');
    else el.classList.add('present');
    cal.appendChild(el);
  }
}

// ─── Grades ────────────────────────────────────────────────────────────────
function renderGradesView() {
  const child = document.getElementById('grades-child-select')?.value || 'ahmed';
  const data = child === 'ahmed' ? ahmedGrades : fatimaGrades;
  const childName = child === 'ahmed' ? 'Ahmed Al Mansouri' : 'Fatima Al Mansouri';
  
  // Update GPA circle and meta
  const gpa = (data.reduce((sum, item) => sum + (item.points || 0), 0) / data.length).toFixed(1);
  document.getElementById('gpa-circle-value').textContent = gpa;
  document.getElementById('gpa-student-name').textContent = childName;
  document.getElementById('gpa-standing').textContent = gpa >= 3.6 ? 'Dean\'s List' : gpa >= 3.0 ? 'Good Standing' : 'Academic Probation';
  
  // Update quick stats
  document.getElementById('stats-subjects').textContent = data.length;
  const totalMarks = data.reduce((sum, item) => sum + item.total, 0);
  document.getElementById('stats-total').textContent = totalMarks;
  document.getElementById('stats-average').textContent = (totalMarks / data.length).toFixed(1);
  document.getElementById('stats-rank').textContent = child === 'ahmed' ? '12' : '8';
  
  // Update semester GPAs
  document.getElementById('sem1-gpa').textContent = gpa;
  document.getElementById('sem2-gpa').textContent = child === 'ahmed' ? '3.6' : '3.2';
  document.getElementById('sem3-gpa').textContent = child === 'ahmed' ? '3.4' : '3.0';
  
  // Render grades table
  const container = document.getElementById('grades-table-container');
  if (!container) return;
  
  let html = '<div class="marks-thead"><span>Subject</span><span>Midterm (40)</span><span>Final (60)</span><span>Total (100)</span><span>Grade</span><span>Points</span></div>';
  
  data.forEach(item => {
    const gradeClass = `g-${item.grade.replace('+', 'plus')}`;
    html += `<div class="marks-row">
      <span class="marks-subj">${item.subject}</span>
      <span>${item.midterm}</span>
      <span>${item.final}</span>
      <span class="marks-total">${item.total}</span>
      <span class="grade-pill ${gradeClass}">${item.grade}</span>
      <span>${item.points.toFixed(1)}</span>
    </div>`;
  });
  
  html += `<div class="marks-row marks-total-row">
    <span class="marks-subj"><strong>Total / GPA</strong></span>
    <span><strong>${data.reduce((sum, i) => sum + i.midterm, 0)}</strong></span>
    <span><strong>${data.reduce((sum, i) => sum + i.final, 0)}</strong></span>
    <span class="marks-total"><strong>${data.reduce((sum, i) => sum + i.total, 0)}/${data.length * 100}</strong></span>
    <span>—</span>
    <span><strong>${gpa}</strong></span>
  </div>`;
  
  container.innerHTML = html;
}

// ─── Documents ─────────────────────────────────────────────────────────────
function renderParentDocs() {
  const childFilter = document.getElementById('docs-child-select')?.value || 'all';
  const statusFilter = currentDocFilter;
  
  let filtered = documents;
  if (childFilter !== 'all') {
    filtered = filtered.filter(d => d.child.toLowerCase() === childFilter);
  }
  if (statusFilter !== 'all') {
    filtered = filtered.filter(d => d.status === statusFilter);
  }
  
  const grid = document.getElementById('parent-docs-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted);font-size:0.9rem">No documents in this category.</div>`;
    return;
  }
  
  filtered.forEach(doc => {
    const days = getDaysLeft(doc.expiry);
    let expiryClass = '', expiryText = '';
    if (days < 0) { expiryClass = 'danger'; expiryText = 'Expired'; }
    else if (days <= 7) { expiryClass = 'warn'; expiryText = `Expires in ${days} days`; }
    else { expiryText = `Valid until: ${formatDate(doc.expiry)}`; }
    
    const card = document.createElement('div');
    card.className = `doc-card ${doc.status}`;
    card.innerHTML = `
      <div class="doc-card-icon-wrap"><i data-lucide="${doc.iconName}" width="28" height="28"></i></div>
      <div class="doc-card-name">${doc.name}</div>
      <div class="doc-card-type">${doc.child} · ${doc.type}</div>
      <div class="doc-card-meta">
        <span class="doc-expiry ${expiryClass}">${expiryText}</span>
      </div>
      <div class="doc-card-actions">
        <button class="doc-btn" onclick="viewParentDoc(${doc.id})"><i data-lucide="eye" width="13" height="13"></i> View</button>
        <button class="doc-btn" onclick="downloadParentDoc(${doc.id})"><i data-lucide="download" width="13" height="13"></i> Download</button>
      </div>`;
    grid.appendChild(card);
  });
  
  lucide.createIcons();
}

function filterParentDocs(filter, btn) {
  document.querySelectorAll('.doc-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentDocFilter = filter;
  renderParentDocs();
}

function getDaysLeft(dateStr) {
  return Math.ceil((new Date(dateStr) - new Date()) / 86400000);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-AE', { day:'numeric', month:'short', year:'numeric' });
}

function viewParentDoc(id) { showToast('Opening document preview...'); }
function downloadParentDoc(id) { showToast('Downloading document...'); }

// ─── Announcements ─────────────────────────────────────────────────────────
function renderParentAnnouncements(filter) {
  const list = document.getElementById('parent-ann-list');
  if (!list) return;
  
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
      </div>`;
    card.addEventListener('click', () => { 
      ann.unread = false; 
      card.classList.remove('unread'); 
      const dot = card.querySelector('.unread-dot');
      if (dot) dot.remove();
    });
    list.appendChild(card);
  });
}

function filterParentAnn(filter, btn) {
  document.querySelectorAll('.ann-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderParentAnnouncements(filter);
}

function getTagLabel(tag) {
  return { urgent:'Urgent', academic:'Academic', parent:'Parent', general:'General' }[tag] || tag;
}

// ─── Messages ──────────────────────────────────────────────────────────────
function renderConversations() {
  const container = document.getElementById('messages-conversations');
  if (!container) return;
  
  container.innerHTML = '';
  conversations.forEach(conv => {
    const item = document.createElement('div');
    item.className = `conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''}`;
    item.onclick = () => selectConversation(conv.id);
    item.innerHTML = `
      <div class="conversation-avatar">${conv.avatar}</div>
      <div class="conversation-info">
        <div class="conversation-name">${conv.name}</div>
        <div class="conversation-preview">${conv.lastMsg}</div>
      </div>
      <div class="conversation-meta">
        <div class="conversation-time">${conv.time}</div>
        ${conv.unread > 0 ? `<div class="conversation-badge">${conv.unread}</div>` : ''}
      </div>`;
    container.appendChild(item);
  });
}

function selectConversation(id) {
  selectedConversation = conversations.find(c => c.id === id);
  renderConversations();
  renderMessageThread();
  
  // Mark as read
  if (selectedConversation) {
    selectedConversation.unread = 0;
    renderConversations();
  }
}

function renderMessageThread() {
  const container = document.getElementById('messages-content');
  if (!container || !selectedConversation) {
    container.innerHTML = `<div class="no-conversation-selected">
      <i data-lucide="mail" width="48" height="48"></i>
      <p>Select a conversation to view messages</p>
    </div>`;
    lucide.createIcons();
    return;
  }
  
  let html = `
    <div class="message-thread">
      <div class="message-header">
        <button class="message-back-btn" onclick="hideMessagesSidebar()"><i data-lucide="arrow-left" width="20" height="20"></i></button>
        <div class="message-avatar">${selectedConversation.avatar}</div>
        <div class="message-info">
          <div class="message-sender">${selectedConversation.name}</div>
          <div class="message-subject">${selectedConversation.messages.length > 0 ? 'Conversation' : 'No messages yet'}</div>
        </div>
      </div>
      <div class="message-body" id="message-body">`;
  
  selectedConversation.messages.forEach(msg => {
    html += `
      <div class="message-bubble ${msg.type}">
        <div class="bubble-content">${msg.content}</div>
        <div class="bubble-time">${msg.time}</div>
      </div>`;
  });
  
  html += `
      </div>
      <div class="message-reply">
        <input type="text" class="form-input" placeholder="Type your message..." id="reply-input">
        <button class="btn-primary-action" onclick="sendReply()">Send</button>
      </div>
    </div>`;
  
  container.innerHTML = html;
  lucide.createIcons();
  
  // Scroll to bottom
  const body = document.getElementById('message-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function sendReply() {
  const input = document.getElementById('reply-input');
  const msg = input.value.trim();
  if (!msg || !selectedConversation) return;
  
  selectedConversation.messages.push({
    id: Date.now(),
    sender: 'me',
    content: msg,
    time: 'Just now',
    type: 'sent'
  });
  
  selectedConversation.lastMsg = msg;
  selectedConversation.time = 'Just now';
  
  input.value = '';
  renderMessageThread();
  renderConversations();
  showToast('Message sent.');
}

function showComposeModal() {
  document.getElementById('compose-modal').style.display = 'flex';
}

function closeComposeModal() {
  document.getElementById('compose-modal').style.display = 'none';
}

document.getElementById('compose-modal')?.addEventListener('click', function(e) {
  if (e.target === this) closeComposeModal();
});

function sendMessage() {
  const to = document.getElementById('message-to').value;
  const subject = document.getElementById('message-subject').value.trim();
  const body = document.getElementById('message-body').value.trim();
  
  if (!subject || !body) {
    showToast('Please fill in subject and message.');
    return;
  }
  
  showToast('Message sent successfully.');
  closeComposeModal();
  
  // Clear form
  document.getElementById('message-subject').value = '';
  document.getElementById('message-body').value = '';
}

function hideMessagesSidebar() {
  if (window.innerWidth < 900) {
    document.querySelector('.messages-sidebar').classList.remove('active');
  }
}

// ─── Profile ───────────────────────────────────────────────────────────────
function saveParentProfile() {
  const name = document.getElementById('parent-field-name').value;
  document.getElementById('welcome-name').textContent = name;
  document.getElementById('sidebar-name').textContent = name;
  document.getElementById('profile-name-display').textContent = name;
  showToast('Profile updated successfully.');
}

// ─── Reports ───────────────────────────────────────────────────────────────
function downloadReport() {
  showToast('Preparing report...');
  setTimeout(() => showToast('Report downloaded.'), 1500);
}

// ─── Auth ──────────────────────────────────────────────────────────────────
function logout() {
  if (confirm('Sign out of EduLink?')) {
    sessionStorage.removeItem('edulink_user');
    window.location.href = 'index.html';
  }
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg, duration = 3200) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), duration);
}

// ─── Keyboard ──────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeComposeModal();
    document.getElementById('notif-panel').classList.remove('open');
  }
});

// Update login handling in landing.js to include parent role