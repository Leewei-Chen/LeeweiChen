document.addEventListener('DOMContentLoaded', function() {
    const filterLinks = document.querySelectorAll('.filter-link');
    const projects = document.querySelectorAll('.project-item');
    const mainContent = document.querySelector('.main-content');
    
    // 1. Identify the main "Works" button specifically
    const worksButton = document.querySelector('.nav-link.active'); 

    // Reusable Scroll Function
    const scrollToTop = () => {
        // Scroll the window
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Scroll the main content div (crucial for your CSS layout)
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // 2. Add listener to the main Works button
    if (worksButton) {
        worksButton.addEventListener('click', function(e) {
            // Only scroll if it's an internal link (has # or is current page)
            if (this.getAttribute('href').startsWith('#') || this.getAttribute('href') === 'index.html') {
                e.preventDefault();
                scrollToTop();
                
                // Optional: Reset filters to 'all' when clicking main Works
                filterLinks.forEach(l => l.classList.remove('active'));
                const allFilter = document.querySelector('[data-filter="all"]');
                if (allFilter) allFilter.classList.add('active');
                
                projects.forEach(p => p.classList.remove('hide'));
            }
        });
    }

    // 3. Existing Filter Links Logic
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToTop();

            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const selectedFilter = this.getAttribute('data-filter');
            projects.forEach(project => {
                if (selectedFilter === 'all' || project.classList.contains(selectedFilter)) {
                    project.classList.remove('hide');
                } else {
                    project.classList.add('hide');
                }
            });
        });
    });
});