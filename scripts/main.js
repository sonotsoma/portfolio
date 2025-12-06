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
    
    const timeDisplayMobile = document.getElementById('time-display-mobile');
    if (timeDisplayMobile) {
        timeDisplayMobile.textContent = timeString;
    }
}

// Update time immediately on page load
updateTime();

// Update time every second
setInterval(updateTime, 1000);

// Fix hover width glitch by locking nav link widths (works across all breakpoints)
function fixNavLinkWidths() {
    // Fix desktop nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        // Only fix if link is visible (not hidden in mobile)
        if (window.getComputedStyle(link).display !== 'none') {
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
        }
    });
    
    // Fix mobile menu links
    const mobileNavLinks = document.querySelectorAll('.mobile-menu-link');
    mobileNavLinks.forEach(link => {
        // Only fix if link is visible
        if (window.getComputedStyle(link).display !== 'none') {
            const originalWidth = link.style.width;
            link.style.width = 'auto';
            link.offsetWidth;
            const width = link.offsetWidth;
            link.style.width = width + 'px';
            link.style.minWidth = width + 'px';
        }
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
    adjustKwameAIImageSize();
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
    adjustKwameAIImageSize();
    initMobileMenu();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    const mobileClose = document.getElementById('mobile-menu-close');
    const contentContainer = document.querySelector('.content-container');
    
    if (!menuButton || !mobileDrawer || !mobileClose) return;
    
    // Toggle drawer function
    function openDrawer() {
        mobileDrawer.classList.add('drawer-open');
        menuButton.textContent = 'CLOSE';
        if (contentContainer) {
            contentContainer.style.display = 'none';
        }
        document.body.style.overflow = 'hidden';
    }
    
    function closeDrawer() {
        mobileDrawer.classList.remove('drawer-open');
        menuButton.textContent = 'MENU';
        if (contentContainer) {
            contentContainer.style.display = '';
        }
        document.body.style.overflow = '';
    }
    
    // Menu button click - toggle based on current state
    menuButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (mobileDrawer.classList.contains('drawer-open')) {
            closeDrawer();
        } else {
            openDrawer();
        }
    });
    
    // Close button click
    mobileClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDrawer();
    });
}

// Adjust Kwame AI image size to be 10% larger than base .project-image-content
function adjustKwameAIImageSize() {
    const baseImage = document.querySelector('.project-image-content');
    const kwameImage = document.querySelector('#project-container-kwame-ai .project-image-content');
    
    if (!baseImage || !kwameImage) return;
    
    // Get computed style of base image
    const computedStyle = window.getComputedStyle(baseImage);
    const baseMaxHeight = computedStyle.maxHeight;
    
    // If max-height is a percentage, calculate 10% more
    if (baseMaxHeight && baseMaxHeight.includes('%')) {
        const basePercentage = parseFloat(baseMaxHeight);
        const newPercentage = basePercentage * 1.2; // Add 12%
        kwameImage.style.maxHeight = `${newPercentage}%`;
    } else if (baseMaxHeight && baseMaxHeight !== 'none') {
        // If it's a pixel value, calculate 10% more
        const baseValue = parseFloat(baseMaxHeight);
        const newValue = baseValue * 1.1;
        const unit = baseMaxHeight.replace(/[0-9.]/g, '');
        kwameImage.style.maxHeight = `${newValue}${unit}`;
    }
}

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
