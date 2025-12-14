const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const gallery = document.getElementById('image-gallery');

// Xử lý chọn file từ input
fileInput.addEventListener('change', handleFiles);

// Xử lý kéo thả
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = '#e0e0e0';
});

dropZone.addEventListener('dragleave', () => {
    dropZone.style.backgroundColor = '#fafafa';
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = '#fafafa';
    const files = e.dataTransfer.files;
    handleFiles({ target: { files } });
});

function handleFiles(event) {
    const files = event.target.files;
    for (let file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addImageToGallery(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
}

function addImageToGallery(src) {
    const div = document.createElement('div');
    div.className = 'image-item';
    
    const img = document.createElement('img');
    img.src = src;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'X';
    removeBtn.onclick = () => div.remove();
    
    div.appendChild(img);
    div.appendChild(removeBtn);
    gallery.appendChild(div);
}
