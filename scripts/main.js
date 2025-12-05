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

// Fix hover width glitch by locking nav link widths
function fixNavLinkWidths() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        // Measure width in non-hover state (Inter font)
        const width = link.offsetWidth;
        // Set fixed width to prevent layout shift on hover
        link.style.width = width + 'px';
        link.style.minWidth = width + 'px';
    });
}

// Fix "Built with Cursor" link width
function fixGithubLinkWidth() {
    const githubLink = document.getElementById('github-link');
    if (githubLink) {
        const width = githubLink.offsetWidth;
        githubLink.style.width = width + 'px';
        githubLink.style.minWidth = width + 'px';
    }
}

// Fix widths on page load and resize
window.addEventListener('load', () => {
    fixNavLinkWidths();
    fixGithubLinkWidth();
});

window.addEventListener('resize', () => {
    fixNavLinkWidths();
    fixGithubLinkWidth();
});

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

// Get the scrollable projects section
const scrollableSection = document.querySelector('.right-content-scroll');

// Redirect all scroll events to the projects section
// let isScrolling = false;
// let scrollTimeout;
// const header = document.querySelector('.header');
// let lastScrollTop = 0;

// function handleScroll() {
//     if (!scrollableSection) return;
//     
//     const currentScrollTop = scrollableSection.scrollTop;
//     
//     // Clear existing timeout
//     clearTimeout(scrollTimeout);
//     
//     // Mark that scrolling is happening
//     isScrolling = true;
//     
//     // Hide header when scrolling down
//     if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
//         header.classList.add('header-hidden');
//     }
//     
//     lastScrollTop = currentScrollTop;
//     
//     // Show header when scrolling stops (with 100ms delay)
//     scrollTimeout = setTimeout(() => {
//         isScrolling = false;
//         header.classList.remove('header-hidden');
//     }, 100);
// }

// // Listen for scroll events on the projects section
// if (scrollableSection) {
//     scrollableSection.addEventListener('scroll', () => {
//         if (!isScrolling) {
//             window.requestAnimationFrame(() => {
//                 handleScroll();
//             });
//         }
//     });
// }

// Capture wheel events anywhere on the page and apply to projects section
// Only apply this behavior in desktop view (above 1340px), not in responsive range (992-1340px)
// let wheelTimeout;
document.addEventListener('wheel', (e) => {
    if (!scrollableSection) return;
    
    // Check if we're in desktop view (above 1340px) where scroll should be redirected
    // In responsive range (992-1340px), allow normal page scrolling
    const windowWidth = window.innerWidth;
    if (windowWidth >= 992 && windowWidth <= 1340) {
        // In responsive range, allow normal scrolling
        return;
    }
    
    // Only redirect scroll in desktop view
    // Prevent default page scrolling
    e.preventDefault();
    
    // Apply scroll to projects section
    scrollableSection.scrollTop += e.deltaY;
    
    // Trigger header hide/show logic
    // handleScroll();
    
    // Clear and reset timeout for header reappearance
    // clearTimeout(wheelTimeout);
    // wheelTimeout = setTimeout(() => {
    //     if (scrollableSection.scrollTop <= 0) {
    //         header.classList.remove('header-hidden');
    //     }
    // }, 100);
}, { passive: false });
