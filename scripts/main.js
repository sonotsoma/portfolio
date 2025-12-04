// Update time display in HH:MM:SS AM/PM format
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    
    // Format with leading zeros
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    
    // Display time in HH:MM:SS AM format
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
    
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.textContent = timeString;
    }
    
    const timeDisplayFooter = document.getElementById('time-display-footer');
    if (timeDisplayFooter) {
        timeDisplayFooter.textContent = timeString;
    }
}

// Update time immediately on page load
updateTime();

// Update time every second
setInterval(updateTime, 1000);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header hide/show on scroll
let lastScrollTop = 0;
let isScrolling = false;
let scrollTimeout;
const header = document.querySelector('.header');

function handleScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Mark that scrolling is happening
    isScrolling = true;
    
    // Hide header when scrolling down
    if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        header.classList.add('header-hidden');
    }
    
    lastScrollTop = currentScrollTop;
    
    // Show header when scrolling stops or scrolling up (with 100ms delay)
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
        header.classList.remove('header-hidden');
    }, 500);
}

// Throttle scroll events for better performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});
