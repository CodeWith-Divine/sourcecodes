        // --- Dark Mode Toggle ---
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Check local storage
        if(localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });

        // --- Follow Button Interaction ---
        function toggleFollow(btn) {
            if (btn.innerText === "Follow") {
                btn.innerText = "Following";
                btn.style.background = "var(--primary)";
                btn.style.color = "white";
            } else {
                btn.innerText = "Follow";
                btn.style.background = "var(--primary-light)";
                btn.style.color = "var(--primary)";
            }
        }

        // --- Range Slider Interaction ---
        function updatePrice(val) {
            document.getElementById('priceVal').innerText = `£0 - ${val}`;
        }

        // --- Filter Tags Interaction ---
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('click', () => {
                tags.forEach(t => t.classList.remove('active')); // Single select logic
                tag.classList.add('active');
            });
        });

        // --- Drag and Drop Simulation ---
        const dropZone = document.getElementById('dropZone');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        dropZone.addEventListener('dragenter', () => dropZone.classList.add('dragover'));
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', (e) => {
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if(files.length > 0) {
                dropZone.innerHTML = `<p style="color:var(--success)"><i class="fas fa-check-circle"></i> ${files[0].name} uploaded!</p>`;
            }
        });

    