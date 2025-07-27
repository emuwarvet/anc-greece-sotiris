// Enhanced Image Gallery Expansion Script
// Handles clicking on gallery images to expand them in a modal overlay with improved UI

document.addEventListener('DOMContentLoaded', function() {
    // Get all gallery images that should be expandable
    const galleryImages = document.querySelectorAll('.grid img');
    
    // Store all images for navigation
    window.galleryImagesList = Array.from(galleryImages);
    window.currentImageIndex = 0;
    
    // Create modal elements once when the page loads
    createModalElements();
    
    // Add click event listeners to all gallery images
    galleryImages.forEach(function(image, index) {
        // Add cursor pointer to indicate images are clickable
        image.style.cursor = 'pointer';
        
        // Add hover effect for better UX
        image.style.transition = 'transform 0.3s ease, filter 0.3s ease';
        
        // Add click event listener to each image
        image.addEventListener('click', function() {
            window.currentImageIndex = index;
            openImageModal(this);
        });
        
        // Add hover effects
        image.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
});

/**
 * Creates the modal HTML elements and adds them to the page
 * This includes the overlay background, modal container, and navigation controls
 */
function createModalElements() {
    // Create modal overlay (dark background)
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'image-modal-overlay';
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 hidden flex items-center justify-center p-4';
    
    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'relative max-w-6xl max-h-full flex items-center justify-center modal-content';
    
    // Create loading spinner
    const loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'modal-loading';
    loadingSpinner.className = 'absolute inset-0 flex items-center justify-center';
    loadingSpinner.innerHTML = `
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    `;
    
    // Create the expanded image element
    const modalImage = document.createElement('img');
    modalImage.id = 'modal-image';
    modalImage.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl opacity-0 transition-opacity duration-300';
    
    // Create close button (X in top-right corner)
    const closeButton = document.createElement('button');
    closeButton.id = 'modal-close-btn';
    closeButton.className = 'absolute top-4 right-4 text-white hover:text-gray-300 transition-all duration-200 hover:scale-110 bg-black bg-opacity-50 rounded-full p-2';
    closeButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
        </svg>
    `;
    
    // Create previous button
    const prevButton = document.createElement('button');
    prevButton.id = 'modal-prev-btn';
    prevButton.className = 'absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 hover:scale-110 bg-black bg-opacity-50 rounded-full p-3';
    prevButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15,18 9,12 15,6"/>
        </svg>
    `;
    
    // Create next button
    const nextButton = document.createElement('button');
    nextButton.id = 'modal-next-btn';
    nextButton.className = 'absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-200 hover:scale-110 bg-black bg-opacity-50 rounded-full p-3';
    nextButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9,18 15,12 9,6"/>
        </svg>
    `;
    
    // Create image info container (for alt text/caption)
    const imageInfo = document.createElement('div');
    imageInfo.id = 'modal-image-info';
    imageInfo.className = 'absolute bottom-4 left-4 right-4 md:bottom-4 md:left-4 md:right-4 text-white text-center bg-black bg-opacity-70 rounded-lg p-4 backdrop-blur-sm';
    
    // Create image counter
    const imageCounter = document.createElement('div');
    imageCounter.id = 'modal-image-counter';
    imageCounter.className = 'absolute top-4 left-4 text-white bg-black bg-opacity-50 rounded-lg px-3 py-2 text-sm font-medium';
    
    // Assemble the modal structure
    modalContent.appendChild(loadingSpinner);
    modalContent.appendChild(modalImage);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(prevButton);
    modalContent.appendChild(nextButton);
    modalContent.appendChild(imageInfo);
    modalContent.appendChild(imageCounter);
    modalOverlay.appendChild(modalContent);
    
    // Add modal to the page body
    document.body.appendChild(modalOverlay);
    
    // Add event listeners for closing the modal
    addModalEventListeners(modalOverlay, closeButton, prevButton, nextButton);
}

/**
 * Adjusts modal layout for mobile devices
 */
function adjustModalForMobile() {
    const modal = document.getElementById('image-modal-overlay');
    const modalContent = modal.querySelector('.modal-content');
    const imageInfo = document.getElementById('modal-image-info');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        modalContent.classList.add('modal-content-mobile');
        modalContent.style.flexDirection = 'column';
        modalContent.style.height = '100vh';
        modalContent.style.padding = '1rem';
        modalContent.style.justifyContent = 'flex-start';
        modalContent.style.paddingTop = '4rem';
        
        // Move image info below image
        if (imageInfo) {
            imageInfo.style.position = 'relative';
            imageInfo.style.bottom = 'auto';
            imageInfo.style.left = 'auto';
            imageInfo.style.right = 'auto';
            imageInfo.style.margin = '1rem 0 0 0';
            imageInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        }
    } else {
        modalContent.classList.remove('modal-content-mobile');
        modalContent.style.flexDirection = '';
        modalContent.style.height = '';
        modalContent.style.padding = '';
        modalContent.style.justifyContent = '';
        modalContent.style.paddingTop = '';
        
        // Reset image info to overlay position
        if (imageInfo) {
            imageInfo.style.position = 'absolute';
            imageInfo.style.bottom = '1rem';
            imageInfo.style.left = '1rem';
            imageInfo.style.right = '1rem';
            imageInfo.style.margin = '';
            imageInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        }
    }
}

/**
 * Opens the image modal with the specified image
 * @param {HTMLImageElement} clickedImage - The image that was clicked
 */
function openImageModal(clickedImage) {
    const modal = document.getElementById('image-modal-overlay');
    const modalImage = document.getElementById('modal-image');
    const imageInfo = document.getElementById('modal-image-info');
    const imageCounter = document.getElementById('modal-image-counter');
    const loadingSpinner = document.getElementById('modal-loading');
    
    // Show loading spinner
    loadingSpinner.style.display = 'flex';
    modalImage.style.opacity = '0';
    
    // Update counter
    imageCounter.textContent = `${window.currentImageIndex + 1} / ${window.galleryImagesList.length}`;
    
    // Adjust layout for mobile
    adjustModalForMobile();
    
    // Show the modal with a fade-in effect
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';
    
    // Add fade-in animation for modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Load the image with loading state
    const tempImage = new Image();
    tempImage.onload = function() {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
        
        // Set the modal image source and alt text
        modalImage.src = clickedImage.src;
        modalImage.alt = clickedImage.alt;
        
        // Show image with fade-in
        modalImage.style.opacity = '1';
        
        // Set the image caption/info
        imageInfo.innerHTML = `
            <h3 class="font-semibold mb-1">${clickedImage.alt || 'Ancient Greek Art & Architecture'}</h3>
            <p class="text-sm text-gray-300">Use arrow keys or buttons to navigate • ESC to close</p>
        `;
        
        // Update navigation buttons after image loads
        setTimeout(() => {
            updateNavigationButtonsVisibility();
        }, 100);
    };
    
    tempImage.onerror = function() {
        loadingSpinner.style.display = 'none';
        imageInfo.innerHTML = `<p class="text-red-300">Error loading image</p>`;
    };
    
    tempImage.src = clickedImage.src;
}

/**
 * Updates navigation button visibility
 */
function updateNavigationButtonsVisibility() {
    const prevBtn = document.getElementById('modal-prev-btn');
    const nextBtn = document.getElementById('modal-next-btn');
    
    console.log('Updating navigation buttons, current index:', window.currentImageIndex, 'total images:', window.galleryImagesList.length);
    
    if (prevBtn) {
        const showPrev = window.currentImageIndex > 0;
        prevBtn.style.display = showPrev ? 'flex' : 'none';
        console.log('Previous button display:', showPrev ? 'visible' : 'hidden');
    }
    
    if (nextBtn) {
        const showNext = window.currentImageIndex < window.galleryImagesList.length - 1;
        nextBtn.style.display = showNext ? 'flex' : 'none';
        console.log('Next button display:', showNext ? 'visible' : 'hidden');
    }
}

/**
 * Closes the image modal
 */
function closeImageModal() {
    const modal = document.getElementById('image-modal-overlay');
    
    // Add fade-out effect
    modal.style.opacity = '0';
    
    // Hide modal after animation completes
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }, 200);
}

/**
 * Navigate to previous image in gallery
 */
function showPreviousImage() {
    console.log('showPreviousImage called, current index:', window.currentImageIndex);
    if (window.currentImageIndex > 0) {
        window.currentImageIndex--;
        const prevImage = window.galleryImagesList[window.currentImageIndex];
        console.log('Going to previous image, new index:', window.currentImageIndex);
        openImageModal(prevImage);
    } else {
        console.log('Already at first image');
    }
}

/**
 * Navigate to next image in gallery  
 */
function showNextImage() {
    console.log('showNextImage called, current index:', window.currentImageIndex, 'total images:', window.galleryImagesList.length);
    if (window.currentImageIndex < window.galleryImagesList.length - 1) {
        window.currentImageIndex++;
        const nextImage = window.galleryImagesList[window.currentImageIndex];
        console.log('Going to next image, new index:', window.currentImageIndex);
        openImageModal(nextImage);
    } else {
        console.log('Already at last image');
    }
}

/**
 * Adds event listeners for modal interactions (close button, overlay click, keyboard, navigation)
 * @param {HTMLElement} modalOverlay - The modal overlay element
 * @param {HTMLElement} closeButton - The close button element
 * @param {HTMLElement} prevButton - The previous button element
 * @param {HTMLElement} nextButton - The next button element
 */
function addModalEventListeners(modalOverlay, closeButton, prevButton, nextButton) {
    // Close button click event
    closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        closeImageModal();
    });
    
    // Previous button click event
    prevButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Previous button clicked, current index:', window.currentImageIndex);
        showPreviousImage();
    });
    
    // Next button click event
    nextButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Next button clicked, current index:', window.currentImageIndex);
        showNextImage();
    });
    
    // Click outside image to close (overlay click)
    modalOverlay.addEventListener('click', function(e) {
        // Only close if clicking on the overlay itself, not the image or buttons
        if (e.target === modalOverlay) {
            closeImageModal();
        }
    });
    
    // Keyboard event listeners
    document.addEventListener('keydown', function(e) {
        if (!modalOverlay.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    showPreviousImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    showNextImage();
                    break;
            }
        }
    });
    
    // Prevent modal content clicks from closing the modal
    const modalContent = modalOverlay.querySelector('div');
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Handle window resize to adjust mobile layout
    window.addEventListener('resize', function() {
        if (!modalOverlay.classList.contains('hidden')) {
            adjustModalForMobile();
        }
    });
}

// Additional CSS styles for smooth transitions and enhanced UI
const style = document.createElement('style');
style.textContent = `
    #image-modal-overlay {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        backdrop-filter: blur(8px);
    }
    
    #modal-image {
        transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    }
    
    #modal-close-btn:hover,
    #modal-prev-btn:hover,
    #modal-next-btn:hover {
        transform: scale(1.1);
        background-color: rgba(0, 0, 0, 0.8);
    }
    
    .grid img:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    #modal-image-info,
    #modal-image-counter {
        animation: fadeInUp 0.5s ease-out 0.3s both;
    }
    
              /* Mobile optimizations */
     @media (max-width: 768px) {
         #image-modal-overlay {
             padding: 0;
         }
         
         .modal-content-mobile {
             flex-direction: column !important;
             justify-content: flex-start !important;
             align-items: center !important;
             height: 100vh !important;
             padding: 4rem 1rem 1rem 1rem !important;
             max-width: 100% !important;
         }
         
         .modal-content-mobile #modal-image {
             max-height: 60vh !important;
             max-width: 100% !important;
             margin-bottom: 1rem !important;
             object-fit: contain;
         }
         
         .modal-content-mobile #modal-image-info {
             position: relative !important;
             bottom: auto !important;
             left: auto !important;
             right: auto !important;
             margin: 1rem 0 0 0 !important;
             background-color: rgba(0, 0, 0, 0.8) !important;
             width: 100% !important;
             font-size: 0.875rem;
         }
         
         #modal-prev-btn,
         #modal-next-btn {
             width: 50px;
             height: 50px;
             display: flex;
             align-items: center;
             justify-content: center;
             position: fixed;
             top: 50%;
             transform: translateY(-50%);
             z-index: 60;
         }
         
         #modal-prev-btn {
             left: 1rem;
         }
         
         #modal-next-btn {
             right: 1rem;
         }
         
         #modal-close-btn {
             width: 50px;
             height: 50px;
             display: flex;
             align-items: center;
             justify-content: center;
             position: fixed;
             top: 1rem;
             right: 1rem;
             z-index: 60;
         }
         
         #modal-image-counter {
             position: fixed !important;
             top: 1rem;
             left: 1rem;
             z-index: 60;
         }
     }
`;

// Add the styles to the page
document.head.appendChild(style); 