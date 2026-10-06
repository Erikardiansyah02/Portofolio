document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Controls
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // Modal photo close event on backdrop click
    const photoModal = document.getElementById('modalPhoto');
    if (photoModal) {
        photoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closePhotoModal();
            }
        });
    }

    // Close cert modal on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeCertModal();
        }
    });
});

// Filter Skills
function filterSkills(category) {
    const cards = document.querySelectorAll('.skill-card');
    const buttons = document.querySelectorAll('.skill-tab-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.className = "skill-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-cyan-500 text-slate-950 active-tab";
        } else {
            btn.className = "skill-tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all bg-slate-800 text-slate-300 hover:bg-slate-700";
        }
    });

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter Projects
function filterProjects(category) {
    const cards = document.querySelectorAll('.proj-card');
    const buttons = document.querySelectorAll('.proj-filter-btn');

    buttons.forEach(btn => {
        if (btn.getAttribute('data-proj') === category) {
            btn.classList.add('bg-cyan-500', 'text-slate-950');
            btn.classList.remove('bg-slate-800', 'text-slate-300');
        } else {
            btn.classList.remove('bg-cyan-500', 'text-slate-950');
            btn.classList.add('bg-slate-800', 'text-slate-300');
        }
    });

    cards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        if (category === 'all' || cardType === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Modal Controls (General)
function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Certificate Modal Controls
function openCertModal(title, imageSrc, description = '') {
    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDescription');

    modalTitle.textContent = title;
    modalImage.src = imageSrc;
    modalDesc.textContent = description;

    // Tampilkan deskripsi jika ada, sembunyikan jika kosong
    if (description) {
        modalDesc.classList.remove('hidden');
    } else {
        modalDesc.classList.add('hidden');
    }

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        document.getElementById('certModalContent').classList.remove('scale-95');
    }, 10);
}
function closeCertModal() {
    const modal = document.getElementById('certModal');
    const modalContent = document.getElementById('certModalContent');

    if (!modal) return;

    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 300);
}

// Photo Documentation Modal Controls
function openPhotoModal(imageSrc, title, description = '') {
    document.getElementById('photoModalTitle').innerText = title;
    document.getElementById('photoModalImg').src = imageSrc;
    
    const descElement = document.getElementById('photoModalDesc');
    if (descElement) {
        descElement.innerText = description;
        if (description) {
            descElement.classList.remove('hidden');
        } else {
            descElement.classList.add('hidden');
        }
    }

    document.getElementById('modalPhoto').classList.remove('hidden');
}

function closePhotoModal() {
    const modal = document.getElementById('modalPhoto');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function openMultiCertModal(title, imageArray, description = '') {
    // 1. Set Judul Modal
    document.getElementById('multiModalTitle').innerText = title;
    
    // 2. Set Deskripsi Global (jika elemen deskripsi ada di HTML)
    const modalDesc = document.getElementById('multiModalDescription');
    if (modalDesc) {
        modalDesc.innerText = description;
        if (description) {
            modalDesc.classList.remove('hidden');
        } else {
            modalDesc.classList.add('hidden');
        }
    }
    
    // 3. Render Gambar ke Container
    const container = document.getElementById('multiImageContainer');
    container.innerHTML = ''; // Bersihkan isi sebelumnya
    
    imageArray.forEach(item => {
        // Cek apakah item berupa String (URL saja) atau Object ({ url, caption })
        const src = typeof item === 'string' ? item : item.url;
        const caption = typeof item === 'object' && item.caption ? item.caption : '';

        // Wrapper Card per Foto
        const wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col items-center w-full bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/80';

        // Elemen Gambar
        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.className = 'w-full max-h-[60vh] object-contain rounded-lg border border-slate-800 shadow-md hover:scale-[1.02] transition-transform duration-200';
        wrapper.appendChild(imgElement);

        // Keterangan Teks Per Foto (jika ada caption)
        if (caption) {
            const captionElement = document.createElement('p');
            captionElement.className = 'mt-2 text-xs text-slate-300 text-center font-medium leading-normal';
            captionElement.innerText = caption;
            wrapper.appendChild(captionElement);
        }

        container.appendChild(wrapper);
    });
    
    // 4. Tampilkan Modal
    document.getElementById('multiCertModal').classList.remove('hidden');
}

function closeMultiCertModal() {
    document.getElementById('multiCertModal').classList.add('hidden');
}