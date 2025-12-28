       
        const notesData = [
            {
                id: 1,
                title: "Introduction to Python Programming",
                category: "programming",
                description: "Basics of Python syntax, variables, data types, and control structures.",
                date: "2023-10-15",
                downloads: 142,
                fileSize: "2.4 MB"
            },
            {
                id: 2,
                title: "Computer Networking Fundamentals",
                category: "networking",
                description: "OSI model, TCP/IP, network topologies, and basic networking concepts.",
                date: "2023-10-10",
                downloads: 98,
                fileSize: "3.1 MB"
            },
            {
                id: 3,
                title: "Database Design with MySQL",
                category: "database",
                description: "ER diagrams, normalization, SQL queries, and database management.",
                date: "2023-10-05",
                downloads: 76,
                fileSize: "1.8 MB"
            },
            {
                id: 4,
                title: "HTML5 & CSS3 Basics",
                category: "web",
                description: "Modern web development with HTML5 semantics and CSS3 styling.",
                date: "2023-09-28",
                downloads: 210,
                fileSize: "4.2 MB"
            },
            {
                id: 5,
                title: "Object-Oriented Programming in Java",
                category: "programming",
                description: "Classes, objects, inheritance, polymorphism, and encapsulation.",
                date: "2023-09-20",
                downloads: 118,
                fileSize: "2.9 MB"
            },
            {
                id: 6,
                title: "Network Security Principles",
                category: "networking",
                description: "Encryption, firewalls, VPNs, and security best practices.",
                date: "2023-09-15",
                downloads: 65,
                fileSize: "3.7 MB"
            }
        ];

        // DOM Elements
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        const closeSuccessModal = document.getElementById('closeSuccessModal');
        const successModal = document.getElementById('successModal');
        const fileUploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('fileInput');
        const fileName = document.getElementById('fileName');
        const uploadForm = document.getElementById('uploadForm');
        const notesGrid = document.getElementById('notesGrid');
        const searchInput = document.getElementById('searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Mobile menu toggle
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

        // Login modal
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.style.display = 'flex';
        });

        closeLoginModal.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });

        closeSuccessModal.addEventListener('click', () => {
            successModal.style.display = 'none';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
            }
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });

        // File upload area interaction
        fileUploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                fileName.textContent = `Selected file: ${fileInput.files[0].name}`;
                fileUploadArea.style.borderColor = 'var(--success-color)';
                fileUploadArea.style.backgroundColor = 'rgba(76, 175, 80, 0.05)';
            }
        });

        // Drag and drop for file upload
        fileUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = 'var(--primary-color)';
            fileUploadArea.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
        });

        fileUploadArea.addEventListener('dragleave', () => {
            fileUploadArea.style.borderColor = '#ddd';
            fileUploadArea.style.backgroundColor = 'transparent';
        });

        fileUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            fileUploadArea.style.borderColor = '#ddd';
            fileUploadArea.style.backgroundColor = 'transparent';
            
            if (e.dataTransfer.files.length) {
                fileInput.files = e.dataTransfer.files;
                fileName.textContent = `Selected file: ${e.dataTransfer.files[0].name}`;
                fileUploadArea.style.borderColor = 'var(--success-color)';
                fileUploadArea.style.backgroundColor = 'rgba(76, 175, 80, 0.05)';
            }
        });

        // Upload form submission
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('noteTitle').value;
            const subject = document.getElementById('noteSubject').value;
            const description = document.getElementById('noteDescription').value;
            
            if (!title || !subject) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real application, here you would upload the file to a server
            // For this demo, we'll just show a success message
            successModal.style.display = 'flex';
            
            // Reset the form
            uploadForm.reset();
            fileName.textContent = '';
            fileUploadArea.style.borderColor = '#ddd';
            fileUploadArea.style.backgroundColor = 'transparent';
            
            // Add the new note to the notes grid
            const newNote = {
                id: notesData.length + 1,
                title: title,
                category: subject,
                description: description || "No description provided.",
                date: new Date().toISOString().split('T')[0],
                downloads: 0,
                fileSize: fileInput.files.length ? `${(fileInput.files[0].size / 1024 / 1024).toFixed(1)} MB` : "N/A"
            };
            
            notesData.unshift(newNote);
            renderNotes(notesData);
        });

        // Login form submission
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality would connect to a backend in a real application.');
            loginModal.style.display = 'none';
        });

        // Render notes function
        function renderNotes(notes) {
            notesGrid.innerHTML = '';
            
            notes.forEach(note => {
                const noteCard = document.createElement('div');
                noteCard.className = 'note-card';
                noteCard.setAttribute('data-category', note.category);
                
                // Category display name
                const categoryNames = {
                    programming: "Programming",
                    networking: "Networking",
                    database: "Database",
                    web: "Web Development",
                    hardware: "Hardware",
                    software: "Software"
                };
                
                noteCard.innerHTML = `
                    <div class="note-header">
                        <h4>${categoryNames[note.category] || note.category}</h4>
                        <span class="note-category">${note.fileSize}</span>
                    </div>
                    <div class="note-body">
                        <h3 class="note-title">${note.title}</h3>
                        <p>${note.description}</p>
                        <div class="note-meta">
                            <span><i class="far fa-calendar-alt"></i> ${note.date}</span>
                            <span><i class="fas fa-download"></i> ${note.downloads} downloads</span>
                        </div>
                        <div class="note-actions">
                            <button class="action-btn download-btn" data-id="${note.id}">
                                <i class="fas fa-download"></i> Download
                            </button>
                            <button class="action-btn view-btn" data-id="${note.id}">
                                <i class="far fa-eye"></i> Preview
                            </button>
                        </div>
                    </div>
                `;
                
                notesGrid.appendChild(noteCard);
                
                // Add event listeners to the buttons
                noteCard.querySelector('.download-btn').addEventListener('click', () => {
                    alert(`Downloading: ${note.title}\n\nIn a real application, this would download the file.`);
                    // Increment download count in the data
                    note.downloads++;
                    renderNotes(notesData.filter(n => n.category === activeFilter || activeFilter === 'all'));
                });
                
                noteCard.querySelector('.view-btn').addEventListener('click', () => {
                    alert(`Previewing: ${note.title}\n\nIn a real application, this would show a preview of the file.`);
                });
            });
        }

        // Filter notes by category
        let activeFilter = 'all';
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter notes
                activeFilter = button.getAttribute('data-filter');
                const filteredNotes = activeFilter === 'all' 
                    ? notesData 
                    : notesData.filter(note => note.category === activeFilter);
                
                renderNotes(filteredNotes);
            });
        });

        // Search functionality
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            const filteredNotes = notesData.filter(note => 
                note.title.toLowerCase().includes(searchTerm) ||
                note.description.toLowerCase().includes(searchTerm) ||
                note.category.toLowerCase().includes(searchTerm)
            );
            
            renderNotes(filteredNotes);
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                if(this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Initialize the page with all notes
        renderNotes(notesData);

   
