
const counters = document.querySelectorAll('.counter');
const counterSection = document.getElementById('counters');
let hasRun = false;

// Function to increment counters
const incrementCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => incrementCounter(counter), 30); 
    } else {
        counter.innerText = target;
    }
};

// Scroll event listener
window.addEventListener('scroll', () => {
    const sectionPosition = counterSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition && !hasRun) {
        counters.forEach(counter => incrementCounter(counter));
        hasRun = true; 
    }
});
