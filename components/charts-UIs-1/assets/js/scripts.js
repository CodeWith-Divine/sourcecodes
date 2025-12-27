
        // ===== DATA =====
        const projects = [
            { name: "Laravel", type: "Ecommerce", color: "#ef4444", progress: 85, icon: "fab fa-laravel" },
            { name: "Figma", type: "App UI Kit", color: "#6366f1", progress: 86, icon: "fab fa-figma" },
            { name: "VueJS", type: "Calendar App", color: "#10b981", progress: 90, icon: "fab fa-vuejs" },
            { name: "React", type: "Dashboard", color: "#3b82f6", progress: 37, icon: "fab fa-react" },
            { name: "Bootstrap", type: "Website", color: "#8b5cf6", progress: 22, icon: "fab fa-bootstrap" }
        ];

        // ===== CHART FUNCTIONS =====
        function renderProjects() {
            const container = document.getElementById('projectList');
            container.innerHTML = projects.map(p => `
                <div class="project-item">
                    <div class="project-icon">
                        <i class="${p.icon}"></i>
                    </div>
                    <div class="project-details">
                        <div class="project-name">
                            <span>${p.name}</span>
                            <span class="text-sm font-semibold text-muted">${p.progress}%</span>
                        </div>
                        <div class="project-type">${p.type}</div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width: ${p.progress}%; background: ${p.color};"></div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function createSVGChart(id, color, filled = false) {
            const container = document.getElementById(id);
            if (!container) return;
            
            const w = container.offsetWidth;
            const h = container.offsetHeight;
            const points = 7;
            const dataPoints = [];
            
            for(let i = 0; i <= points; i++) {
                const x = (w / points) * i;
                const y = Math.random() * (h * 0.8) + (h * 0.1);
                dataPoints.push({x, y});
            }
            
            let pathD = `M 0 ${dataPoints[0].y}`;
            for (let i = 0; i < dataPoints.length - 1; i++) {
                const p0 = dataPoints[i];
                const p1 = dataPoints[i + 1];
                const cp1x = p0.x + (p1.x - p0.x) / 2;
                const cp1y = p0.y;
                const cp2x = p0.x + (p1.x - p0.x) / 2;
                const cp2y = p1.y;
                pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
            }
            
            const gradId = `grad-${id}`;
            const svgContent = `
                <svg class="chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
                    ${filled ? `
                    <defs>
                        <linearGradient id="${gradId}" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${color};stop-opacity:0.4" />
                            <stop offset="100%" style="stop-color:${color};stop-opacity:0" />
                        </linearGradient>
                        <path d="${pathD} L ${w} ${h} L 0 ${h} Z" fill="url(#${gradId})" />
                    </defs>
                    ` : ''}
                    <path d="${pathD}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            
            container.innerHTML = svgContent;
        }

        function renderSimpleBars(id, color, count = 5) {
            const container = document.getElementById(id);
            if (!container) return;
            
            container.innerHTML = '';
            for(let i = 0; i < count; i++) {
                const h = Math.floor(Math.random() * 60) + 20;
                const bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.height = `${h}%`;
                bar.style.background = color;
                container.appendChild(bar);
            }
        }

        function renderEarningBars(id) {
            const container = document.getElementById(id);
            if (!container) return;
            
            const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
            container.innerHTML = days.map((day, index) => {
                const h = Math.floor(Math.random() * 70) + 10;
                const isHigh = index === 4;
                return `
                    <div class="flex flex-col items-center flex-1">
                        <div style="width: 14px; border-radius: 4px; height: ${isHigh ? 100 : h}px; 
                              background: ${isHigh ? 'var(--primary)' : 'var(--primary-soft)'}; transition: height 0.5s;"></div>
                        <span class="text-xs text-muted mt-2">${day}</span>
                    </div>
                `;
            }).join('');
        }

        // ===== INITIALIZATION =====
        function initCharts() {
            // Order Bar Chart
            const orderContainer = document.getElementById('orderChart');
            if (orderContainer) {
                const heights = [40, 60, 30, 80, 50, 90];
                orderContainer.innerHTML = heights.map(h => `
                    <div class="bar" style="height: ${h}%;"></div>
                `).join('');
            }
            
            // SVG Charts
            setTimeout(() => {
                createSVGChart('salesChart', '#10b981', true);
                createSVGChart('profitChart', '#3b82f6');
                createSVGChart('impressionChart', '#ef4444');
                createSVGChart('subsChart', '#6366f1', true);
            }, 100);
            
            renderSimpleBars('sessionsChart', '#8b5cf6', 7);
            renderEarningBars('earningBarChart');
        }

        // ===== EVENT HANDLERS =====
        function initThemeToggle() {
            const toggleBtn = document.getElementById('themeToggle');
            const icon = toggleBtn.querySelector('i');
            
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => {
                    document.body.classList.toggle('dark-mode');
                    
                    // Toggle between sun and moon icons
                    if (document.body.classList.contains('dark-mode')) {
                        icon.classList.remove('fa-sun');
                        icon.classList.add('fa-moon');
                    } else {
                        icon.classList.remove('fa-moon');
                        icon.classList.add('fa-sun');
                    }
                });
            }
        }

        // ===== DOM READY =====
        document.addEventListener('DOMContentLoaded', () => {
            renderProjects();
            initCharts();
            initThemeToggle();
            
            // Set static progress bars for statistics
            document.querySelectorAll('.stat-progress-1')[0]?.style.setProperty('width', '85%');
            document.querySelectorAll('.stat-progress-1')[0]?.style.setProperty('background', 'var(--primary)');
            document.querySelectorAll('.stat-progress-2')[0]?.style.setProperty('width', '65%');
            document.querySelectorAll('.stat-progress-2')[0]?.style.setProperty('background', 'var(--info)');
        });

        // ===== WINDOW RESIZE HANDLER =====
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createSVGChart('salesChart', '#10b981', true);
                createSVGChart('profitChart', '#3b82f6');
                createSVGChart('impressionChart', '#ef4444');
                createSVGChart('subsChart', '#6366f1', true);
            }, 250);
        });
    