/* ============================================
   INTERSECTION OBSERVER ANIMATIONS
   ============================================ */

// Initialize Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class to trigger animation
      entry.target.classList.add('visible');
      
      // Optional: unobserve after animation
      // observer.unobserve(entry.target);
    } else {
      // Remove class when element leaves viewport (for re-animations)
      entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
  // Initial fade-in for hero and search sections
  const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
  fadeElements.forEach(el => {
    observer.observe(el);
  });

  // Observe product cards for animation
  const productContainer = document.getElementById('product-container');
  if (productContainer) {
    const observeProductCards = () => {
      const cards = productContainer.querySelectorAll('.product-card');
      cards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
      });
    };
    
    // Observe products on initial load and after filtering
    observeProductCards();
    
    // Re-observe when products are updated (after search/filter)
    const originalObserve = observer.observe.bind(observer);
    window.reobserveProducts = () => {
      setTimeout(observeProductCards, 100);
    };
  }

  // Observe cart container
  const cartContainer = document.getElementById('cart-container');
  if (cartContainer) {
    const observeCartItems = () => {
      const items = cartContainer.querySelectorAll('[class*="border"]');
      items.forEach((item, index) => {
        if (!item.classList.contains('animate-on-scroll')) {
          item.classList.add('animate-on-scroll');
          item.style.animationDelay = `${index * 0.05}s`;
          observer.observe(item);
        }
      });
    };
    
    window.reobserveCart = observeCartItems;
  }

  // Navbar animation
  const navbar = document.querySelector('nav');
  if (navbar) {
    navbar.classList.add('slide-in-down');
  }

  // Hero section animations
  const heroH1 = document.querySelector('section h1');
  const heroP = document.querySelector('section p');
  if (heroH1) {
    heroH1.classList.add('fade-in-up');
    heroH1.style.animationDelay = '0.2s';
  }
  if (heroP) {
    heroP.classList.add('fade-in-up');
    heroP.style.animationDelay = '0.4s';
  }

  // Section titles
  const sectionTitles = document.querySelectorAll('h2');
  sectionTitles.forEach((title, index) => {
    title.classList.add('fade-in-up');
    title.style.animationDelay = `${0.1 * (index + 1)}s`;
    observer.observe(title);
  });

  // Filter buttons
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((btn, index) => {
    btn.classList.add('fade-in-up');
    btn.style.animationDelay = `${0.05 * index}s`;
  });

  // Search input and sort select
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  if (searchInput) {
    searchInput.classList.add('fade-in-up');
    searchInput.style.animationDelay = '0.1s';
  }
  if (sortSelect) {
    sortSelect.classList.add('fade-in-up');
    sortSelect.style.animationDelay = '0.15s';
  }

  // Cart panel
  const cartPanel = document.querySelector('[class*="sticky"]');
  if (cartPanel) {
    cartPanel.classList.add('fade-in-up');
    cartPanel.style.animationDelay = '0.3s';
  }
});

// Add smooth scroll to elements with links
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

// Trigger re-observation when products are dynamically updated
export function triggerProductAnimations() {
  if (window.reobserveProducts) {
    window.reobserveProducts();
  }
}

// Trigger re-observation when cart is updated
export function triggerCartAnimations() {
  if (window.reobserveCart) {
    window.reobserveCart();
  }
}

// Add animation to buttons on click (ripple effect already handled by CSS)
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    // Add a subtle scale animation on click
    const button = e.target;
    button.style.transform = 'scale(0.98)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 100);
  }
});

// Parallax effect on mouse move (optional enhancement)
document.addEventListener('mousemove', (e) => {
  const navbar = document.querySelector('nav');
  if (navbar) {
    const x = (window.innerWidth - e.clientX * 2) / 100;
    const y = (window.innerHeight - e.clientY * 2) / 100;
    navbar.style.setProperty('--mouse-x', x);
    navbar.style.setProperty('--mouse-y', y);
  }
});
