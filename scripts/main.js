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
        // Temporarily remove width constraint to measure natural width
        const originalWidth = link.style.width;
        link.style.width = 'auto';
        // Force a reflow to get accurate measurement
        link.offsetWidth;
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
        // Temporarily remove width constraint to measure natural width
        const originalWidth = githubLink.style.width;
        githubLink.style.width = 'auto';
        // Force a reflow to get accurate measurement
        githubLink.offsetWidth;
        const width = githubLink.offsetWidth;
        // Set fixed width to prevent layout shift on hover
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
    positionExperienceDescription();
});

// Position experience description 32px from the end of "DESIGNER" text
function positionExperienceDescription() {
    const windowWidth = window.innerWidth;
    const experienceDesc = document.querySelector('.experience-description');
    
    if (!experienceDesc) return;
    
    // Only apply dynamic positioning in 769-1024px breakpoint
    if (windowWidth >= 769 && windowWidth <= 1024) {
        // Find the "DESIGNER" text element (last title-line)
        const titleLines = document.querySelectorAll('.title-line');
        const designerLine = titleLines[titleLines.length - 1]; // Last line is "DESIGNER"
        
        if (designerLine) {
            // Get the container (hero-copy or left-content-fixed)
            const heroCopy = document.querySelector('.hero-copy');
            const container = heroCopy || experienceDesc.parentElement;
            
            if (container) {
                // Get the bounding rectangles
                const containerRect = container.getBoundingClientRect();
                const designerRect = designerLine.getBoundingClientRect();
                
                // Calculate where "DESIGNER" ends (right edge of the text)
                const designerEnd = designerRect.right - containerRect.left;
                
                // Position 32px from the end of "DESIGNER"
                // Since we're using right positioning, calculate from container width
                const containerWidth = containerRect.width;
                const rightPosition = containerWidth - designerEnd - 32;
                
                experienceDesc.style.right = `${Math.max(0, rightPosition)}px`;
                experienceDesc.style.left = 'auto';
                experienceDesc.style.marginRight = '0';
            }
        }
    } else {
        // Reset for other breakpoints
        experienceDesc.style.left = '';
        experienceDesc.style.right = '';
        experienceDesc.style.marginRight = '';
    }
}

// Position on load
window.addEventListener('load', () => {
    positionExperienceDescription();
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

// Capture wheel events anywhere on the page and apply to projects section
// Only apply this behavior in desktop view (above 800px), allow normal scrolling below 800px
// let wheelTimeout;
document.addEventListener('wheel', (e) => {
    if (!scrollableSection) return;
    
    // Allow normal page scrolling for viewport widths less than 800px
    const windowWidth = window.innerWidth;
    if (windowWidth < 1025) {
        // In mobile/tablet ranges, allow normal scrolling
        return;
    }
    
    // Only redirect scroll in desktop view (800px and above)
    // Prevent default page scrolling
    e.preventDefault();
    
    // Apply scroll to projects section
    scrollableSection.scrollTop += e.deltaY;
    
}, { passive: false });
