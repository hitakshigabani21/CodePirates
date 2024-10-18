
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get input values
        const email = form.querySelector('input[type="email"]').value;
        const name = form.querySelector('input[type="text"]').value;
        const password = form.querySelector('input[type="password"]').value;

        // Basic validation
        if (email && name && password) {
            alert(`Welcome, ${name}! Your email is ${email}.`);
            form.reset(); // Reset the form fields
        } else {
            alert('Please fill in all fields.');
        }
    });
});

