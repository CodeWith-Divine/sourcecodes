
        document.addEventListener('DOMContentLoaded', function() {
            // Set passwords
            const USER_PASSWORD = "UserUses2025";
            const ADMIN_PASSWORD = "DivineAdmin2025";
            
            const authSection = document.getElementById('authSection');
            const mainContent = document.getElementById('mainContent');
            const loginForm = document.getElementById('loginForm');
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('togglePassword');
            const errorMessage = document.getElementById('errorMessage');
            
            // Admin elements
            const adminBadge = document.getElementById('adminBadge');
            
            // Filter elements
            const categoryFilter = document.getElementById('category');
            const techFilter = document.getElementById('tech');
            const dateFilter = document.getElementById('date');
            const searchInput = document.getElementById('search');
            const sortSelect = document.getElementById('sort');
            const globalSearch = document.getElementById('globalSearch');
            
            // Grid elements
            const newGrid = document.getElementById('newComponentsGrid');
            const popularGrid = document.getElementById('popularComponentsGrid');
            
            // All components
            let allComponents = [];
            
            // Admin state
            let isAdmin = false;
            
            // Check if user is already authenticated
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            const savedIsAdmin = localStorage.getItem('isAdmin');
            
            if (isAuthenticated === 'true') {
                authSection.style.display = 'none';
                mainContent.style.display = 'block';
                
                // Check if admin
                if (savedIsAdmin === 'true') {
                    isAdmin = true;
                    adminBadge.style.display = 'block';
                } else {
                    adminBadge.style.display = 'none';
                }
            }
            
            // Toggle password visibility
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
            });
            
            // Handle form submission
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const enteredPassword = passwordInput.value.trim();
                
                if (enteredPassword === USER_PASSWORD || enteredPassword === ADMIN_PASSWORD) {
                    // Correct password - show main content
                    localStorage.setItem('isAuthenticated', 'true');
                    
                    // Set admin flag if admin password used
                    if (enteredPassword === ADMIN_PASSWORD) {
                        localStorage.setItem('isAdmin', 'true');
                        isAdmin = true;
                    }
                    
                    // Hide auth section with animation
                    authSection.querySelector('.auth-card').style.transform = 'translateY(-20px)';
                    authSection.querySelector('.auth-card').style.opacity = '0';
                    
                    setTimeout(() => {
                        authSection.style.display = 'none';
                        mainContent.style.display = 'block';
                        mainContent.style.animation = 'fadeIn 0.5s ease';
                        
                        // Show admin controls if admin
                        if (isAdmin) {
                            adminBadge.style.display = 'block';
                        }
                    }, 400);
                } else {
                    // Incorrect password - show error
                    errorMessage.style.display = 'block';
                    passwordInput.focus();
                    
                    // Shake animation for error
                    loginForm.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        loginForm.style.animation = '';
                    }, 500);
                }
            });
            
            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            if(themeToggle) {
                themeToggle.addEventListener('click', () => {
                    document.body.classList.toggle('dark-theme');
                    const icon = themeToggle.querySelector('i');
                    
                    if (document.body.classList.contains('dark-theme')) {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                        document.documentElement.style.setProperty('--primary', '#4cc9f0');
                        document.documentElement.style.setProperty('--secondary', '#4895ef');
                        document.documentElement.style.setProperty('--dark', '#f8f9fa');
                        document.documentElement.style.setProperty('--light', '#212529');
                        document.body.style.backgroundColor = '#121212';
                        document.body.style.color = '#e0e0e0';
                    } else {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                        document.documentElement.style.setProperty('--primary', '#6b46c1');
                        document.documentElement.style.setProperty('--secondary', '#9f7aea');
                        document.documentElement.style.setProperty('--dark', '#121212');
                        document.documentElement.style.setProperty('--light', '#f8f8f8');
                        document.body.style.backgroundColor = '#000';
                        document.body.style.color = '#fff';
                    }
                });
            }
            
            // Back to top functionality
            const backToTop = document.getElementById('backToTop');
            
            if (backToTop) {
                backToTop.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
                
                // Show/hide button based on scroll position
                window.addEventListener('scroll', () => {
                    if (window.pageYOffset > 300) {
                        backToTop.style.opacity = '1';
                        backToTop.style.visibility = 'visible';
                    } else {
                        backToTop.style.opacity = '0';
                        backToTop.style.visibility = 'hidden';
                    }
                });
                
                // Initialize state
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
            
            // ======================================
            // Fixed Filtering and Sorting Functionality
            // ======================================
            
            // Initialize components
            function initComponents() {
                allComponents = [
                    ...newGrid.querySelectorAll('.component-card'),
                    ...popularGrid.querySelectorAll('.component-card')
                ];
                
                // Store original section information
                allComponents.forEach(comp => {
                    comp.dataset.originalSection = comp.parentElement.id;
                });
            }
            
            // Filter and sort components
            function filterAndSortComponents() {
                const category = categoryFilter.value;
                const tech = techFilter.value;
                const date = dateFilter.value;
                const searchTerm = searchInput.value.toLowerCase();
                const globalSearchTerm = globalSearch.value.toLowerCase();
                const sortOption = sortSelect.value;
                
                // Combine search terms
                const combinedSearch = globalSearchTerm || searchTerm;
                
                // Filter components
                const filteredComponents = allComponents.filter(component => {
                    const compCategory = component.dataset.category;
                    const compTech = component.dataset.tech;
                    const compDate = component.dataset.date;
                    const compName = component.querySelector('.component-header h3').textContent.toLowerCase();
                    
                    // Check category filter
                    if (category !== 'all' && compCategory !== category) {
                        return false;
                    }
                    
                    // Check tech filter
                    if (tech !== 'all' && compTech !== tech) {
                        return false;
                    }
                    
                    // Check date filter
                    if (date !== 'all' && compDate !== date) {
                        return false;
                    }
                    
                    // Check search term
                    if (combinedSearch && !compName.includes(combinedSearch)) {
                        return false;
                    }
                    
                    return true;
                });
                
                // Sort components
                switch(sortOption) {
                    case 'newest':
                        // Newest based on date added and version
                        filteredComponents.sort((a, b) => {
                            const dateCompare = b.dataset.date.localeCompare(a.dataset.date);
                            if (dateCompare !== 0) return dateCompare;
                            
                            const versionA = a.querySelector('.version-tag').textContent;
                            const versionB = b.querySelector('.version-tag').textContent;
                            return versionB.localeCompare(versionA);
                        });
                        break;
                    case 'oldest':
                        // Oldest based on date added and version
                        filteredComponents.sort((a, b) => {
                            const dateCompare = a.dataset.date.localeCompare(b.dataset.date);
                            if (dateCompare !== 0) return dateCompare;
                            
                            const versionA = a.querySelector('.version-tag').textContent;
                            const versionB = b.querySelector('.version-tag').textContent;
                            return versionA.localeCompare(versionB);
                        });
                        break;
                    case 'popular':
                        // Sort by section (popular first)
                        filteredComponents.sort((a, b) => {
                            const aIsPopular = a.dataset.originalSection === 'popularComponentsGrid' ? 1 : 0;
                            const bIsPopular = b.dataset.originalSection === 'popularComponentsGrid' ? 1 : 0;
                            return bIsPopular - aIsPopular;
                        });
                        break;
                    case 'name':
                        filteredComponents.sort((a, b) => {
                            const nameA = a.querySelector('.component-header h3').textContent.toLowerCase();
                            const nameB = b.querySelector('.component-header h3').textContent.toLowerCase();
                            return nameA.localeCompare(nameB);
                        });
                        break;
                }
                
                // Clear grids
                newGrid.innerHTML = '';
                popularGrid.innerHTML = '';
                
                // Show both sections initially
                document.querySelector('.new-components').style.display = 'block';
                document.querySelector('.popular-components').style.display = 'block';
                
                // Handle empty state
                if (filteredComponents.length === 0) {
                    const emptyState = document.createElement('div');
                    emptyState.className = 'empty-state';
                    emptyState.innerHTML = `
                        <i class="fas fa-search"></i>
                        <h3>No components found</h3>
                        <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                        <button class="reset-filters" id="resetFilters">Reset All Filters</button>
                    `;
                    newGrid.appendChild(emptyState);
                    document.querySelector('.popular-components').style.display = 'none';
                    
                    // Add reset functionality
                    document.getElementById('resetFilters').addEventListener('click', resetFilters);
                    return;
                }
                
                // Group components into their original sections
                const newComponents = [];
                const popularComponents = [];
                
                filteredComponents.forEach(component => {
                    if (component.dataset.originalSection === 'newComponentsGrid') {
                        newComponents.push(component);
                    } else {
                        popularComponents.push(component);
                    }
                });
                
                // Add components to grids
                if (newComponents.length > 0) {
                    newComponents.forEach(component => {
                        newGrid.appendChild(component);
                    });
                } else {
                    document.querySelector('.new-components').style.display = 'none';
                }
                
                if (popularComponents.length > 0) {
                    popularComponents.forEach(component => {
                        popularGrid.appendChild(component);
                    });
                } else {
                    document.querySelector('.popular-components').style.display = 'none';
                }
            }
            
            // Reset all filters
            function resetFilters() {
                categoryFilter.value = 'all';
                techFilter.value = 'all';
                dateFilter.value = 'all';
                searchInput.value = '';
                globalSearch.value = '';
                sortSelect.value = 'newest';
                filterAndSortComponents();
            }
            
            // Set up event listeners for filters
            categoryFilter.addEventListener('change', filterAndSortComponents);
            techFilter.addEventListener('change', filterAndSortComponents);
            dateFilter.addEventListener('change', filterAndSortComponents);
            searchInput.addEventListener('input', filterAndSortComponents);
            globalSearch.addEventListener('input', filterAndSortComponents);
            sortSelect.addEventListener('change', filterAndSortComponents);
            
            // Initialize components and filters
            initComponents();
            filterAndSortComponents(); // Apply initial filtering
            
            // Add animations to the page
            const style = document.createElement('style');
            style.innerHTML = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    20%, 60% { transform: translateX(-10px); }
                    40%, 80% { transform: translateX(10px); }
                }
                
                .auth-card {
                    animation: fadeIn 0.6s ease;
                }
                
                .component-card {
                    animation: fadeIn 0.4s ease;
                }
            `;
            document.head.appendChild(style);
        });
    