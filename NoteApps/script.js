document.addEventListener('DOMContentLoaded', () => {
    const notesGrid = document.getElementById('notes-grid');
    const addNoteBtn = document.getElementById('add-note-btn');
    const noteModal = document.getElementById('note-modal');
    const closeModalBtn = document.getElementById('close-note-modal');
    const noteForm = document.getElementById('note-form');
    const modalTitle = document.getElementById('modal-title');
    const noteTitleInput = document.getElementById('note-title');
    const noteTagInput = document.getElementById('note-tag-input');
    const customTagDropdown = document.getElementById('custom-tag-dropdown');
    const tagSuggestions = document.getElementById('tag-suggestions');
    const noteContentInput = document.getElementById('note-content');
    const noteDueDateInput = document.getElementById('note-due-date');
    const tagListElement = document.getElementById('tag-list');
    const addTagBtn = document.getElementById('add-tag-btn');
    const searchInput = document.getElementById('search-input');
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const sortSelect = document.getElementById('sort-select');

    // Modal elements
    const tagModal = document.getElementById('tag-modal');
    const tagForm = document.getElementById('tag-form');
    const tagNameInput = document.getElementById('tag-name');
    const closeTagModalBtn = document.getElementById('close-tag-modal');

    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const closeDeleteModalBtn = document.getElementById('close-delete-modal');

    const viewModal = document.getElementById('view-modal');
    const closeViewModalBtn = document.getElementById('close-view-modal');
    const alertModal = document.getElementById('alert-modal');
    const closeAlertModalBtn = document.getElementById('close-alert-modal');
    const alertMessage = document.getElementById('alert-message');
    const viewTitle = document.getElementById('view-title');
    const viewTag = document.getElementById('view-tag');
    const viewContent = document.getElementById('view-content');
    const viewTime = document.getElementById('view-time');
    const viewDate = document.getElementById('view-date');
    const viewDueDate = document.getElementById('view-due-date');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let tags = JSON.parse(localStorage.getItem('tags')) || [];
    let editingNoteId = null;
    let noteToDeleteId = null;
    let currentSortOption = 'latest';

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function saveTags() {
        localStorage.setItem('tags', JSON.stringify(tags));
    }

    function getFormattedDateTime(timestamp) {
        const date = new Date(timestamp);
        const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return { time, date: `${day}/${month}/${year}` };
    }

    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function renderNotes(filterTag = null, searchTerm = null) {
        notesGrid.innerHTML = '';
        let filteredNotes = notes;

        if (filterTag) {
            filteredNotes = filteredNotes.filter(note => note.tag === filterTag);
        }

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredNotes = filteredNotes.filter(note =>
                note.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                note.content.toLowerCase().includes(lowerCaseSearchTerm) ||
                note.tag.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        switch (currentSortOption) {
            case 'title-asc':
                filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                filteredNotes.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'due-soonest':
                filteredNotes.sort((a, b) => {
                    const dateA = new Date(a.dueDate || Infinity);
                    const dateB = new Date(b.dueDate || Infinity);
                    return dateA - dateB;
                });
                break;
            case 'due-latest':
                filteredNotes.sort((a, b) => {
                    const dateA = new Date(a.dueDate || 0);
                    const dateB = new Date(b.dueDate || 0);
                    return dateB - dateA;
                });
                break;
            default:
                filteredNotes.sort((a, b) => b.timestamp - a.timestamp);
        }

        if (filteredNotes.length === 0) {
            notesGrid.innerHTML = '<p class="no-notes-message">No notes found. Create one!</p>';
            return;
        }

        filteredNotes.forEach(note => {
            const { time, date } = getFormattedDateTime(note.timestamp);
            const noteCard = document.createElement('div');
            noteCard.classList.add('note-card');
            noteCard.setAttribute('data-id', note.id);

            noteCard.innerHTML = `
                <div class="note-options">
                    <button class="icon-button note-menu-toggle"><i class="fas fa-ellipsis-v"></i></button>
                    <div class="dropdown-menu">
                        <button class="edit-note-btn">Edit</button>
                        <button class="delete-note-btn">Delete</button>
                    </div>
                </div>
                <div class="note-header">
                    <h3 class="note-title">${note.title}</h3>
                    <span class="note-tag">${note.tag}</span>
                </div>
                <p class="note-content">${note.content}</p>
                ${note.dueDate ? `<div class="note-due-date"><strong>Due:</strong> ${note.dueDate.split("-").reverse().join("/")}</div>` : ""}
                <div class="note-footer">
                    <span class="note-time">${time}</span>
                    <span class="note-date">${date}</span>
                </div>
            `;
            notesGrid.appendChild(noteCard);

            // Tambahkan fitur view note
            noteCard.addEventListener('click', (e) => {
                if (!e.target.closest('.note-options') && !e.target.closest('.dropdown-menu')) {
                    openViewModal(note);
                }
            });
        });

        attachNoteEventListeners();
    }

    sortSelect.addEventListener('change', (e) => {
        currentSortOption = e.target.value;
        renderNotes();
    });

    function openNoteModal(note = null) {
        noteModal.style.display = 'block';
        if (note) {
            modalTitle.textContent = 'Edit Note';
            noteTitleInput.value = note.title;
            noteTagInput.value = note.tag;
            noteContentInput.value = note.content;
            noteDueDateInput.value = note.dueDate || "";
            editingNoteId = note.id;
        } else {
            modalTitle.textContent = 'Add New Note';
            noteForm.reset();
            editingNoteId = null;
        }
        updateTagDropdown();
    }

    function closeNoteModal() {
        noteModal.style.display = 'none';
        noteForm.reset();
        editingNoteId = null;
    }

    function handleNoteSubmit(event) {
        event.preventDefault();
        const title = noteTitleInput.value.trim();
        const tag = noteTagInput.value.trim();
        const content = noteContentInput.value.trim();
        const dueDate = noteDueDateInput.value;
        const timestamp = Date.now();

        if (!title || !tag || !content) {
            alert('Please fill in all fields.');
            return;
        }

        if (editingNoteId) {
            const noteIndex = notes.findIndex(note => note.id === editingNoteId);
            if (noteIndex > -1) {
                notes[noteIndex] = { ...notes[noteIndex], title, tag, content, dueDate, timestamp };
            }
        } else {
            const newNote = {
                id: generateUniqueId(),
                title,
                tag,
                content,
                timestamp
            };
            notes.push({ id: generateUniqueId(), title, tag, content, dueDate, timestamp });
        }

        if (tag && !tags.includes(tag)) {
            tags.push(tag);
            tags.sort();
        }

        saveNotes();
        saveTags();
        renderNotes();
        renderTags();
        closeNoteModal();
    }

    function deleteNote(id) {
        noteToDeleteId = id;
        deleteModal.style.display = 'block';
    }

    function closeDeleteModal() {
        deleteModal.style.display = 'none';
        noteToDeleteId = null;
    }

    function attachNoteEventListeners() {
        document.querySelectorAll('.note-menu-toggle').forEach(button => {
            button.onclick = (event) => {
                event.stopPropagation();
                const dropdown = button.nextElementSibling;
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    if (menu !== dropdown) {
                        menu.classList.remove('show');
                    }
                });
                dropdown.classList.toggle('show');
            };
        });

        document.querySelectorAll('.edit-note-btn').forEach(button => {
            button.onclick = (event) => {
                event.stopPropagation();
                const noteCard = event.target.closest('.note-card');
                const noteId = noteCard.getAttribute('data-id');
                const noteToEdit = notes.find(note => note.id === noteId);
                if (noteToEdit) {
                    openNoteModal(noteToEdit);
                }
                event.target.closest('.dropdown-menu').classList.remove('show');
            };
        });

        document.querySelectorAll('.delete-note-btn').forEach(button => {
            button.onclick = (event) => {
                event.stopPropagation();
                const noteCard = event.target.closest('.note-card');
                const noteId = noteCard.getAttribute('data-id');
                deleteNote(noteId);
                event.target.closest('.dropdown-menu').classList.remove('show');
            };
        });

        document.onclick = (event) => {
            if (!event.target.closest('.note-menu-toggle')) {
                document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        };
    }

    function renderTags() {
        tagListElement.innerHTML = '';
        const tagCounts = {};
        notes.forEach(note => {
            tagCounts[note.tag] = (tagCounts[note.tag] || 0) + 1;
        });

        const allUniqueTags = [...new Set([...tags, ...Object.keys(tagCounts)])].sort();

        allUniqueTags.forEach(tag => {
            const li = document.createElement('li');
            li.setAttribute('data-tag', tag);
            li.innerHTML = `
                <span>${tag}</span>
                <span class="tag-count">${tagCounts[tag] || 0}</span>
            `;
            li.onclick = () => filterNotesByTag(tag, li);
            tagListElement.appendChild(li);
        });
        updateTagDropdown();
    }

    function renderCustomTagDropdown() {
        customTagDropdown.innerHTML = '';
        tags.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            li.addEventListener('click', () => {
                noteTagInput.value = tag;
                customTagDropdown.style.display = 'none';
            });
            customTagDropdown.appendChild(li);
        });
    }

    noteTagInput.addEventListener('click', () => {
        if (customTagDropdown.style.display === 'block') {
            customTagDropdown.style.display = 'none';
        } else {
            renderCustomTagDropdown();
            customTagDropdown.style.display = 'block';
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#tag-dropdown-wrapper')) {
            customTagDropdown.style.display = 'none';
        }
    });

    function addTagPrompt() {
        tagModal.style.display = 'block';
        tagForm.reset();
    }

    function closeTagModal() {
        tagModal.style.display = 'none';
    }

    function updateTagDropdown() {
    noteTagInput.innerHTML = '<option value="" disabled selected>Select a tag</option>';
    tags.forEach(tag => {
            const option = document.createElement('option');
            option.value = tag;
            option.textContent = tag;
            noteTagInput.appendChild(option);
        });
    }

    function filterNotesByTag(selectedTag, clickedElement) {
        document.querySelectorAll('.tag-list li').forEach(li => li.classList.remove('active'));
        if (clickedElement) {
            clickedElement.classList.add('active');
        }
        renderNotes(selectedTag, searchInput.value);
    }

    function handleSearch() {
        const searchTerm = searchInput.value;
        document.querySelectorAll('.tag-list li').forEach(li => li.classList.remove('active'));
        renderNotes(null, searchTerm);
    }

    function openViewModal(note) {
        const { time, date } = getFormattedDateTime(note.timestamp);
        viewTitle.textContent = note.title;
        viewTag.textContent = note.tag;
        viewContent.textContent = note.content;
        viewDueDate.textContent = note.dueDate ? note.dueDate.split("-").reverse().join("/") : '—';
        viewTime.textContent = time;
        viewDate.textContent = date;
        viewModal.style.display = 'block';
    }

    function closeViewModal() {
        viewModal.style.display = 'none';
    }

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        darkModeSwitch.checked = true;
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        darkModeSwitch.checked = false;
    }

    function toggleDarkMode() {
        if (darkModeSwitch.checked) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    }

    function showAlert(message) {
        alertMessage.textContent = message;
        alertModal.style.display = 'block';
    }

    function closeAlertModal() {
        alertModal.style.display = 'none';
    }

    // Event Listeners
    addNoteBtn.addEventListener('click', () => openNoteModal());
    closeModalBtn.addEventListener('click', closeNoteModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === noteModal) closeNoteModal();
        if (event.target === tagModal) closeTagModal();
        if (event.target === deleteModal) closeDeleteModal();
        if (event.target === viewModal) closeViewModal();
        if (event.target === alertModal) closeAlertModal();
    });

    noteForm.addEventListener('submit', handleNoteSubmit);
    addTagBtn.addEventListener('click', addTagPrompt);
    tagForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTag = tagNameInput.value.trim();
        if (newTag && !tags.includes(newTag)) {
            tags.push(newTag);
            tags.sort();
            saveTags();
            renderTags();
            updateTagDropdown();
            closeTagModal();
        } else if (newTag) {
            showAlert('Tag already exists! Make a new one');
        }
    });

    closeTagModalBtn.addEventListener('click', closeTagModal);
    closeAlertModalBtn.addEventListener('click', closeAlertModal);

    confirmDeleteBtn.addEventListener('click', () => {
        if (noteToDeleteId) {
            notes = notes.filter(note => note.id !== noteToDeleteId);
            saveNotes();
            renderNotes();
            renderTags();
            closeDeleteModal();
        }
    });

    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
    closeDeleteModalBtn.addEventListener('click', closeDeleteModal);
    closeViewModalBtn.addEventListener('click', closeViewModal);
    searchInput.addEventListener('input', handleSearch);
    darkModeSwitch.addEventListener('change', toggleDarkMode);

    // Initialize
    function initializeApp() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            enableDarkMode();
        } else {
            disableDarkMode();
        }

        renderTags();
        renderNotes();
    }

    noteTagInput.addEventListener('input', () => {
    const value = noteTagInput.value.toLowerCase();
    tagSuggestions.innerHTML = '';

    if (!value) {
        tagSuggestions.style.display = 'none';
        return;
    }

    const filtered = tags.filter(tag => tag.toLowerCase().includes(value));
    if (filtered.length === 0) {
        tagSuggestions.style.display = 'none';
        return;
    }

    filtered.forEach(tag => {
        const li = document.createElement('li');
        li.textContent = tag;
        li.addEventListener('click', () => {
            noteTagInput.value = tag;
            tagSuggestions.style.display = 'none';
        });
        tagSuggestions.appendChild(li);
    });

    tagSuggestions.style.display = 'block';
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('#tag-suggestions') && e.target !== noteTagInput) {
        tagSuggestions.style.display = 'none';
    }
});

    initializeApp();
});
