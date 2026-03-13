// admin.js

const user = JSON.parse(sessionStorage.getItem('edulink_user') || 'null');
if (!user || user.role !== 'admin') window.location.href = 'index.html';

// ─── Data ─────────────────────────────────────────────────────────────────
let studentsData = [
  { id:'STU-2024-00142', name:'Ahmed Al Mansouri',  program:'Computer Science',        gpa:3.8, attendance:87, status:'Active'  },
  { id:'STU-2024-00201', name:'Fatima Al Zaabi',    program:'Computer Science',        gpa:4.0, attendance:96, status:'Active'  },
  { id:'STU-2024-00334', name:'Sara Khalid',         program:'Business Administration', gpa:3.7, attendance:91, status:'Active'  },
  { id:'STU-2024-00456', name:'Mohammed Rahman',     program:'Electrical Engineering',  gpa:3.7, attendance:89, status:'Active'  },
  { id:'STU-2024-00567', name:'Layla Mohammed',      program:'Business Administration', gpa:3.2, attendance:72, status:'At Risk' },
  { id:'STU-2024-00678', name:'Omar Hassan',         program:'Electrical Engineering',  gpa:2.8, attendance:68, status:'At Risk' },
  { id:'STU-2024-00789', name:'Noor Al Rashidi',     program:'Media Studies',           gpa:3.5, attendance:94, status:'Active'  },
  { id:'STU-2024-00891', name:'Zaid Al Rashid',      program:'Computer Science',        gpa:3.1, attendance:74, status:'At Risk' },
  { id:'STU-2024-00912', name:'Hana Abdulla',        program:'Business Administration', gpa:3.9, attendance:98, status:'Active'  },
  { id:'STU-2024-01023', name:'Khalid Al Nasser',    program:'Electrical Engineering',  gpa:3.4, attendance:82, status:'Active'  },
];

let pendingDocs = [
  { id:1, iconName:'heart-pulse',  name:'Health Certificate',          student:'Ahmed Al Mansouri',  sid:'STU-2024-00142', date:'5 Mar 2025' },
  { id:2, iconName:'scroll',       name:'Academic Transfer Certificate',student:'Noor Al Rashidi',    sid:'STU-2024-00789', date:'4 Mar 2025' },
  { id:3, iconName:'building',     name:'Bank Guarantee Letter',        student:'Khalid Al Nasser',   sid:'STU-2024-01023', date:'3 Mar 2025' },
  { id:4, iconName:'book-open',    name:'Passport Copy (Renewal)',      student:'Layla Mohammed',     sid:'STU-2024-00567', date:'2 Mar 2025' },
  { id:5, iconName:'credit-card',  name:'Emirates ID Renewal',         student:'Sara Khalid',         sid:'STU-2024-00334', date:'28 Feb 2025' },
  { id:6, iconName:'clipboard',    name:'Medical Fitness Certificate',  student:'Mohammed Rahman',    sid:'STU-2024-00456', date:'27 Feb 2025' },
  { id:7, iconName:'file-text',    name:'Police Clearance Certificate', student:'Omar Hassan',        sid:'STU-2024-00678', date:'26 Feb 2025' },
  { id:8, iconName:'shield-check', name:'Health Insurance Update',      student:'Fatima Al Zaabi',   sid:'STU-2024-00201', date:'25 Feb 2025' },
];
let approvedDocs = [], rejectedDocs = [];

let adminAnnouncements = [
  { id:1, tag:'urgent',   title:'Mid-Term Examination Schedule Released',  body:'The mid-term examination schedule for all programs in Semester 1, 2024-25 has been published. Students and faculty are requested to review and confirm attendance at each venue.', from:'Academic Office',   time:'2 hours ago' },
  { id:2, tag:'academic', title:'Library Timings Updated for Ramadan',     body:'Library hours are revised during Ramadan: open 9 AM – 6 PM weekdays, 10 AM – 2 PM weekends. Digital library resources remain available 24/7.',                              from:'Library Services', time:'5 hours ago' },
  { id:3, tag:'admin',    title:'Student ID Renewal Drive – March 2025',   body:'Students with ID cards expiring in 2025 should visit Administration Office (Block A, Room 101) with Emirates ID and one passport photo for renewal.',                        from:'Admin Office',     time:'Yesterday' },
];

let currentDocFilter = 'pending';

// ─── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setDate();
  renderStudents(studentsData);
  renderAdminDocs('pending');
  renderAdminAnnouncements();
});

function setDate() {
  const el = document.getElementById('topbar-date');
  if (el) el.textContent = new Date().toLocaleDateString('en-AE', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

// ─── Navigation ────────────────────────────────────────────────────────────
function adminNav(page, el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');
  const titles = { 'admin-overview':'Overview','admin-students':'Students','admin-documents':'Documents','admin-announcements':'Announcements','admin-settings':'Settings' };
  const pt = document.getElementById('page-title'); if (pt) pt.textContent = titles[page] || page;
  const bc = document.getElementById('breadcrumb');  if (bc) bc.textContent = titles[page] || page;
  if (window.innerWidth < 900) document.getElementById('sidebar').classList.remove('open');
}

// ─── Students ──────────────────────────────────────────────────────────────
function renderStudents(data) {
  const tbody = document.getElementById('students-tbody'); if (!tbody) return;
  tbody.innerHTML = '';
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted)">No students found.</td></tr>`;
    return;
  }
  data.forEach(s => {
    const attClass = s.attendance >= 80 ? 'status-good' : s.attendance >= 75 ? 'status-warn' : 'status-danger';
    const stClass  = s.status === 'Active' ? 'status-good' : 'status-warn';
    const tr = document.createElement('tr'); tr.id = 'row-' + s.id;
    tr.innerHTML = `
      <td><code style="font-family:'Space Mono',monospace;font-size:0.73rem;color:var(--text-muted)">${s.id}</code></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.program}</td>
      <td><strong style="color:var(--primary);font-family:'Cormorant Garamond',serif;font-size:1.1rem">${s.gpa.toFixed(1)}</strong></td>
      <td><span class="status-badge ${attClass}">${s.attendance}%</span></td>
      <td><span class="status-badge ${stClass}">${s.status}</span></td>
      <td>
        <button class="tbl-btn" onclick="viewStudent('${s.id}')">View</button>
        <button class="tbl-btn" onclick="editStudent('${s.id}')">Edit</button>
        <button class="tbl-btn red" onclick="removeStudent('${s.id}')">Remove</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function searchStudents(q) {
  q = q.toLowerCase();
  const prog = document.getElementById('student-program-filter').value;
  renderStudents(studentsData.filter(s =>
    (!q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)) &&
    (!prog || s.program === prog)
  ));
}

function viewStudent(id)   { showToast(`Viewing profile: ${id}`); }
function editStudent(id)   { showToast(`Edit mode: ${id}`); }
function removeStudent(id) {
  const s = studentsData.find(x => x.id === id);
  if (!s || !confirm(`Remove ${s.name}? This cannot be undone.`)) return;
  studentsData = studentsData.filter(x => x.id !== id);
  const row = document.getElementById('row-' + id);
  if (row) { row.style.transition='all 0.3s'; row.style.opacity='0'; row.style.transform='translateX(20px)'; setTimeout(()=>row.remove(),300); }
  showToast(`${s.name} removed.`);
}

function showAddStudentModal() { document.getElementById('add-student-modal').style.display = 'flex'; }
document.getElementById('add-student-modal').addEventListener('click', function(e) { if (e.target===this) this.style.display='none'; });

function addStudent() {
  const name  = document.getElementById('new-stu-name').value.trim();
  const email = document.getElementById('new-stu-email').value.trim();
  const prog  = document.getElementById('new-stu-program').value;
  if (!name || !email) { showToast('Please fill in Name and Email.'); return; }
  const newId = `STU-${new Date().getFullYear()}-${String(Math.floor(Math.random()*90000+10000))}`;
  studentsData.unshift({ id:newId, name, program:prog, gpa:0.0, attendance:0, status:'Active' });
  renderStudents(studentsData);
  document.getElementById('add-student-modal').style.display = 'none';
  document.getElementById('new-stu-name').value = '';
  document.getElementById('new-stu-email').value = '';
  showToast(`${name} added — ID: ${newId}`);
}

// ─── Documents ─────────────────────────────────────────────────────────────
function renderAdminDocs(filter) {
  currentDocFilter = filter;
  const list = document.getElementById('admin-doc-list'); if (!list) return;
  list.innerHTML = '';
  let data = filter === 'pending' ? pendingDocs : filter === 'approved' ? approvedDocs : filter === 'rejected' ? rejectedDocs : [];
  if (!data.length) {
    list.innerHTML = `<div style="text-align:center;padding:48px;color:var(--text-muted);background:white;border-radius:var(--radius-lg);border:1px solid var(--gray-100)">No documents in this category.</div>`;
    return;
  }
  data.forEach(doc => {
    const item = document.createElement('div');
    item.className = 'admin-doc-item'; item.id = `adoc-${doc.id}`;
    item.style.transition = 'all 0.35s ease';
    item.innerHTML = `
      <div class="admin-doc-icon"><i data-lucide="${doc.iconName}" width="22" height="22"></i></div>
      <div class="admin-doc-info">
        <div class="admin-doc-name">${doc.name}</div>
        <div class="admin-doc-meta">${doc.student} &nbsp;·&nbsp; ${doc.sid} &nbsp;·&nbsp; Submitted: ${doc.date}</div>
      </div>
      <div class="admin-doc-actions">
        <button class="tbl-btn" onclick="previewAdminDoc(${doc.id})">Preview</button>
        <button class="approve-btn" onclick="approveDoc(${doc.id})">Approve</button>
        <button class="reject-btn"  onclick="rejectDoc(${doc.id})">Reject</button>
      </div>`;
    list.appendChild(item);
  });
  lucide.createIcons();
}

function adminDocFilter(filter, btn) {
  document.querySelectorAll('.doc-review-tabs .doc-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderAdminDocs(filter);
}

function previewAdminDoc(id) { showToast('Opening document preview...'); }

function approveDoc(id) {
  const idx = pendingDocs.findIndex(d => d.id === id); if (idx === -1) return;
  const doc = pendingDocs[idx];
  const el  = document.getElementById(`adoc-${id}`);
  if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(16px)'; }
  approvedDocs.push({ ...doc });
  pendingDocs.splice(idx, 1);
  setTimeout(() => { renderAdminDocs(currentDocFilter); showToast(`"${doc.name}" approved. Student notified.`); }, 380);
}

function rejectDoc(id) {
  const reason = prompt('Optional reason for rejection:') || '';
  const idx = pendingDocs.findIndex(d => d.id === id); if (idx === -1) return;
  const doc = pendingDocs[idx];
  const el  = document.getElementById(`adoc-${id}`);
  if (el) { el.style.opacity = '0'; el.style.transform = 'translateX(-16px)'; }
  rejectedDocs.push({ ...doc, reason });
  pendingDocs.splice(idx, 1);
  setTimeout(() => { renderAdminDocs(currentDocFilter); showToast(`"${doc.name}" rejected.`); }, 380);
}

// ─── Announcements ─────────────────────────────────────────────────────────
function renderAdminAnnouncements() {
  const list = document.getElementById('admin-ann-list'); if (!list) return;
  list.innerHTML = '';
  if (!adminAnnouncements.length) {
    list.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-muted);background:white;border-radius:var(--radius-lg);border:1px solid var(--gray-100)">No announcements published yet.</div>`;
    return;
  }
  adminAnnouncements.forEach(ann => {
    const card = document.createElement('div');
    card.className = 'ann-card'; card.id = `ann-${ann.id}`;
    card.style.marginBottom = '12px'; card.style.transition = 'all 0.3s ease';
    card.innerHTML = `
      <div class="ann-card-header">
        <div style="flex:1">
          <span class="ann-tag tag-${ann.tag}">${getTagLabel(ann.tag)}</span>
          <div class="ann-title" style="margin-top:6px">${ann.title}</div>
        </div>
        <button class="tbl-btn red" onclick="deleteAnnouncement(${ann.id})" style="flex-shrink:0;margin-left:16px">Delete</button>
      </div>
      <div class="ann-body-text">${ann.body}</div>
      <div class="ann-footer">
        <span>${ann.from}</span>
        <span>${ann.time}</span>
      </div>`;
    list.appendChild(card);
  });
}

function postAnnouncement() {
  const title    = document.getElementById('ann-title').value.trim();
  const body     = document.getElementById('ann-body').value.trim();
  const tag      = document.getElementById('ann-category').value;
  const audience = document.getElementById('ann-audience').value;
  if (!title || !body) { showToast('Please enter a title and message.'); return; }
  adminAnnouncements.unshift({ id: Date.now(), tag, title, body, from: 'Administrator', time: 'Just now' });
  renderAdminAnnouncements();
  clearAnnForm();
  showToast(`Announcement published to "${audience}".`);
}

function deleteAnnouncement(id) {
  if (!confirm('Delete this announcement?')) return;
  const el = document.getElementById(`ann-${id}`);
  if (el) { el.style.opacity = '0'; el.style.transform = 'scale(0.97)'; }
  setTimeout(() => { adminAnnouncements = adminAnnouncements.filter(a => a.id !== id); renderAdminAnnouncements(); showToast('Announcement deleted.'); }, 320);
}

function clearAnnForm() {
  document.getElementById('ann-title').value = '';
  document.getElementById('ann-body').value  = '';
}

function getTagLabel(tag) {
  return { urgent:'Urgent', academic:'Academic', admin:'Administrative', general:'General' }[tag] || tag;
}

// ─── Settings ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.settings-card .btn-save-profile').forEach(btn => {
    btn.addEventListener('click', () => showToast('Settings saved.'));
  });
});

// ─── Auth ──────────────────────────────────────────────────────────────────
function logout() {
  if (confirm('Sign out of the Admin Panel?')) { sessionStorage.removeItem('edulink_user'); window.location.href = 'index.html'; }
}

// ─── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg, duration = 3500) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._timer); t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

// ─── Keyboard ──────────────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('add-student-modal').style.display = 'none';
});