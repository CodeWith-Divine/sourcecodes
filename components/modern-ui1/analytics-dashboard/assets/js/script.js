/*!
 * © 2025 CodeWithDivine
 * MIT License (see LICENSE)
 */

        // DOM Ready
        document.addEventListener('DOMContentLoaded', function() {
            // Toggle sidebar on mobile
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    navItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Card hover effect
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('click', function() {
                    this.style.transform = 'translateY(-5px)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 300);
                });
            });
            
            // Update the current time in the header
            function updateTime() {
                const now = new Date();
                const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const dateString = now.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                });
                
                const timeElement = document.querySelector('.current-time');
                if(timeElement) {
                    timeElement.textContent = `${dateString} | ${timeString}`;
                }
            }
            
            // Create and add time element to header
            const timeElement = document.createElement('div');
            timeElement.classList.add('current-time');
            timeElement.style.color = 'var(--text-secondary)';
            timeElement.style.fontSize = '0.9rem';
            document.querySelector('.header').appendChild(timeElement);
            
            updateTime();
            setInterval(updateTime, 60000);
            
            // Theme toggle
            const themeToggle = document.getElementById('theme-toggle');
            const themeIcon = themeToggle.querySelector('i');
            
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                
                if(document.body.classList.contains('dark-mode')) {
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
            
            // Notification dropdown
            const notificationIcon = document.getElementById('notification-icon');
            const notificationDropdown = document.getElementById('notification-dropdown');
            
            notificationIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.style.display = 
                    notificationDropdown.style.display === 'block' ? 'none' : 'block';
            });
            
            document.addEventListener('click', (e) => {
                if (!notificationIcon.contains(e.target)) {
                    notificationDropdown.style.display = 'none';
                }
            });
            
            // Create Revenue Chart
            const revenueCtx = document.getElementById('revenueChart').getContext('2d');
            const revenueChart = new Chart(revenueCtx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: [18500, 19200, 21000, 19800, 22500, 24000, 23600, 24500, 25200, 26200, 27000, 28500],
                        borderColor: '#4361ee',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#4361ee',
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: {
                                size: 14
                            },
                            bodyFont: {
                                size: 14
                            },
                            callbacks: {
                                label: function(context) {
                                    return `$${context.parsed.y.toLocaleString()}`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
            
            // Create Traffic Chart
            const trafficCtx = document.getElementById('trafficChart').getContext('2d');
            const trafficChart = new Chart(trafficCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Direct', 'Social Media', 'Email', 'Referral', 'Organic Search'],
                    datasets: [{
                        data: [35, 20, 15, 10, 20],
                        backgroundColor: [
                            '#4361ee',
                            '#4cc9f0',
                            '#2ecc71',
                            '#f1c40f',
                            '#f72585'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '65%',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                pointStyle: 'circle',
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            bodyFont: {
                                size: 14
                            },
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    }
                }
            });
            
            // Simulate data updates
            setInterval(() => {
                // Update revenue data
                const revenueData = revenueChart.data.datasets[0].data;
                const lastValue = revenueData[revenueData.length - 1];
                const newValue = lastValue + (Math.random() * 1000 - 500);
                revenueData.push(newValue > 15000 ? newValue : 15000);
                revenueData.shift();
                
                revenueChart.update();
                
                // Update traffic data
                const trafficData = trafficChart.data.datasets[0].data;
                for(let i = 0; i < trafficData.length; i++) {
                    trafficData[i] = Math.max(5, trafficData[i] + (Math.random() * 5 - 2.5));
                }
                
                // Normalize to 100%
                const sum = trafficData.reduce((a, b) => a + b, 0);
                for(let i = 0; i < trafficData.length; i++) {
                    trafficData[i] = Math.round((trafficData[i] / sum) * 100);
                }
                
                trafficChart.update();
            }, 5000);
        });
    