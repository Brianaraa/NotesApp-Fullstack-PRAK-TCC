const API_URL = 'http://localhost:3000/notes';

// DOM Elements
const notesList = document.getElementById('notes-list');
const noteForm = document.getElementById('note-form');
const noteModal = document.getElementById('note-modal');
const btnOpenModal = document.getElementById('open-modal-btn'); 
const btnCloseModal = document.getElementById('close-modal-btn');
const modalTitle = document.getElementById('modal-title');
const searchInput = document.getElementById('search-input'); // Element Search

// State Management
let allNotes = []; // Simpan data di sini agar pencarian cepat
let isEditMode = false;

// 1. Ambil Data & Render
const fetchNotes = async () => {
    try {
        const response = await fetch(API_URL);
        allNotes = await response.json();
        renderNotes(allNotes);
    } catch (error) {
        console.error('Gagal mengambil data:', error);
    }
};

const renderNotes = (notes) => {
    notesList.innerHTML = '';
    notes.forEach(note => {
        const date = new Date(note.tanggal_dibuat).toLocaleDateString('id-ID');
        const card = document.createElement('div');
        card.className = 'note-card';
        card.innerHTML = `
            <h3>${note.judul}</h3>
            <p>${note.isi}</p>
            <div class="card-actions">
                <span style="font-size: 0.7rem; color: #b2bec3;">${date}</span>
                <div>
                    <button class="btn-edit" id="edit-${note.id}">Edit</button>
                    <button class="btn-delete" onclick="deleteNote(${note.id})">Hapus</button>
                </div>
            </div>
        `;
        notesList.appendChild(card);

        // Listener Edit agar aman dari karakter spesial
        document.getElementById(`edit-${note.id}`).onclick = () => openEdit(note);
    });
};

// --- FITUR SEARCH (LOGIKA BARU) ---
searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filteredNotes = allNotes.filter(note => 
        note.judul.toLowerCase().includes(term) || 
        note.isi.toLowerCase().includes(term)
    );
    renderNotes(filteredNotes);
});

// 2. Modal Logic
const closeModal = () => { noteModal.style.display = 'none'; };

btnOpenModal.addEventListener('click', () => {
    isEditMode = false;
    modalTitle.innerText = 'Buat Catatan Baru';
    noteForm.reset();
    document.getElementById('note-id').value = '';
    noteModal.style.display = 'flex';
});

btnCloseModal.addEventListener('click', closeModal);
document.getElementById('cancel-btn').addEventListener('click', closeModal);

// 3. Create or Update
noteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('note-id').value;
    const noteData = {
        judul: document.getElementById('input-judul').value,
        isi: document.getElementById('input-isi').value
    };

    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `${API_URL}/${id}` : API_URL;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(noteData)
        });

        if (response.ok) {
            closeModal();
            fetchNotes();
        }
    } catch (error) { alert('Gagal menyimpan catatan'); }
});

// 4. Edit Note
const openEdit = (note) => {
    isEditMode = true;
    modalTitle.innerText = 'Edit Catatan';
    document.getElementById('note-id').value = note.id;
    document.getElementById('input-judul').value = note.judul;
    document.getElementById('input-isi').value = note.isi;
    noteModal.style.display = 'flex';
};

// 5. Delete Note
window.deleteNote = async (id) => {
    if (confirm('Yakin ingin menghapus catatan ini?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            fetchNotes();
        } catch (error) { alert('Gagal menghapus catatan'); }
    }
};

// Jalankan Pertama Kali
fetchNotes();