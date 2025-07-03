# capstone-project-Hacktiv8

# NoteApps - Organize All Your Plans

## 📋 Description
**NoteApps** adalah aplikasi pencatat digital yang memungkinkan pengguna untuk membuat, mengatur, dan menyortir catatan secara efisien berdasarkan tag, tanggal, dan judul. Aplikasi ini juga mendukung fitur _dark mode_ serta _modal_ interaktif untuk pengalaman pengguna yang modern dan nyaman. Tujuan dari aplikasi ini adalah menyediakan sistem pencatatan yang terstruktur, mudah digunakan, dan mendukung pengelolaan produktivitas harian.

---

## 🧰 Technologies Used
### 🔧 Bahasa Pemrograman dan Tools:
- **HTML5**: Untuk struktur dasar tampilan halaman aplikasi.
- **CSS3**: Digunakan untuk desain responsif, _dark mode_, sistem grid, scrollbar styling, dan animasi.
- **JavaScript (Vanilla JS)**: Untuk mengatur interaktivitas aplikasi seperti pembuatan catatan, pengelolaan tag, filter, pencarian, dan sorting.
- **LocalStorage**: Menyimpan data catatan dan tag secara lokal di browser pengguna.
- **Font Awesome**: Menambahkan ikon visual seperti "plus", "moon/sun", dan "ellipsis" untuk tampilan UI yang menarik.
- **Google Fonts (Segoe UI & Tahoma)**: Untuk tipografi yang lebih profesional dan modern.

### 🎯 Alasan Pemilihan Teknologi:
- **Vanilla JS** dipilih agar proyek tetap ringan dan bebas dari ketergantungan library eksternal, cocok untuk kebutuhan aplikasi pencatat personal.
- **CSS Flex & Grid** digunakan untuk memberikan pengalaman pengguna yang _responsive_ dan _mobile-friendly_.
- **LocalStorage** memungkinkan penyimpanan data offline tanpa memerlukan backend.
- **Font Awesome** dan _custom toggle switch_ memberikan UX modern tanpa tambahan library UI seperti Bootstrap atau Tailwind.

---

## 🚀 Features
### 📝 Note Management
- Tambah, lihat, edit, dan hapus catatan.
- Setiap catatan bisa diberi judul, isi, tag, dan tanggal jatuh tempo (_due date_).
- Modal interaktif digunakan untuk input catatan dan konfirmasi penghapusan.
### 🏷️ Tag Filtering System
- Tambahkan tag baru secara dinamis.
- Klik pada tag di sidebar untuk memfilter catatan berdasarkan tag tersebut.
- Sistem validasi untuk mencegah duplikasi tag.
### 🔎 Smart Search & Sorting
- Fitur pencarian real-time berdasarkan judul, isi, atau tag catatan.
- Sortir catatan berdasarkan waktu terbaru, urutan judul A-Z/Z-A, atau tanggal jatuh tempo terdekat/terjauh.
### 🌙 Dark Mode
- Toggle _dark mode_ yang menyimpan preferensi pengguna ke LocalStorage.
- Ikon toggle disesuaikan menggunakan FontAwesome (☀️ / 🌙).
### 🎨 Responsive Design
- Layout yang fleksibel, optimal untuk berbagai ukuran layar, termasuk smartphone.
- Scroll terkontrol untuk daftar tag dan area catatan agar sidebar tetap fix.

---

## 🛠️ Setup Instructions
1. **Clone repository ini**
2. **Buka file `index.html`** di browser modern (Chrome, Firefox, Edge).
   Aplikasi dapat berjalan langsung secara lokal tanpa perlu setup server.
3. **Pastikan folder berikut tersedia:**
   - `/Logo/Logo_Lightmode.png`
   - `/Logo/Logo_Darkmode.png`
4. Tidak ada dependensi eksternal tambahan atau server backend yang diperlukan.

---

## 🤖 AI Support Explanation

Dalam proses pengembangan proyek ini, AI digunakan secara efektif untuk:
- **Merancang struktur modular HTML, CSS, dan JavaScript**.
- **Membantu debug dan mengoptimalkan fungsionalitas JavaScript**, seperti dropdown interaktif, localStorage handling, dan modal interaksi.
- **Menghasilkan solusi desain UX/UI**, seperti _dark mode switch_ dengan ikon dinamis dan sidebar yang tidak dapat di-scroll kecuali daftar tag.

### AI yang digunakan:
- **ChatGPT by OpenAI** digunakan sebagai asisten pengembangan secara menyeluruh.
  - Membantu mengidentifikasi logika interaksi dan pengelolaan data.
  - Memberikan _code snippet_ dan rekomendasi styling yang sesuai dengan best practice.

> *Catatan: Dalam skenario ideal, AI IBM Granite dapat digunakan untuk integrasi lebih lanjut seperti pengenalan suara, pengenalan tulisan tangan untuk pencatatan, atau natural language search. Namun, dalam proyek ini, ChatGPT telah memberikan dukungan optimal dalam semua aspek pengembangan frontend.*

---

## 🛠️ CRUD Application Compliance
NoteApps telah memenuhi semua kriteria sebagai aplikasi CRUD (Create, Read, Update, Delete) interaktif:
1. **Create, Read, Update, Delete operations:**
NoteApps memungkinkan pengguna untuk membuat (Create) catatan baru, membaca (Read) detail catatan melalui modal tampilan, memperbarui (Update) catatan melalui tombol edit, dan menghapus (Delete) catatan menggunakan tombol delete. Semua operasi ini tersedia dalam UI yang intuitif dan berjalan secara dinamis.
2. **Data saved via localStorage or API:**
Aplikasi menyimpan semua data catatan dan tag menggunakan localStorage. Ini memastikan bahwa data tetap tersedia bahkan saat browser ditutup, tanpa memerlukan backend API.
3. **Input forms:**
Pengguna mengisi form saat menambahkan catatan, termasuk input untuk judul, isi, tag, dan tanggal jatuh tempo. Modal form juga digunakan untuk menambahkan tag baru.
4. **At least 2 views/pages (e.g., list & input form):**
Aplikasi memiliki minimal dua tampilan penting:
    - List View: Menampilkan daftar semua catatan dalam format grid.
    - Input Form View: Tersedia dalam bentuk modal untuk menambah/edit catatan dan tag.
5. **Dynamic UI updates:**
Setelah pengguna menambahkan, mengedit, atau menghapus catatan/tag, tampilan UI akan langsung diperbarui secara dinamis tanpa perlu refresh halaman. Fungsi renderNotes() dan renderTags() memastikan data yang ditampilkan selalu terkini.

---

## 🙌 Acknowledgements
- Font Awesome
- OpenAI ChatGPT
- W3Schools, MDN Docs

---

## 📌 Status
✅ MVP Selesai – Semua fitur inti berjalan dengan baik secara lokal.
