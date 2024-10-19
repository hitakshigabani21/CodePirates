const dateButtons = document.querySelectorAll('.date');
    const slotsContainer = document.querySelector('.slots');
    const slotButtons = document.querySelectorAll('.slot');
    const bookedSlotsDiv = document.getElementById('booked-slots');
    const bookedSlotsList = document.getElementById('booked-slots-list');

    let selectedDate = null;
    let bookedSlots = {};  // Store bookings for each date
    let userBookedSlots = [];  // Store the user's booked slots

    // Initialize date buttons
    dateButtons.forEach(dateButton => {
        dateButton.addEventListener('click', function() {
            if (selectedDate !== null) {
                selectedDate.classList.remove('selected');
            }

            selectedDate = this;
            this.classList.add('selected');

            slotsContainer.style.display = 'flex';
            resetSlots();

            const date = this.getAttribute('data-date');
            if (bookedSlots[date]) {
                bookedSlots[date].forEach(time => {
                    disableSlot(time);
                });
            }
        });
    });

    // Initialize slot buttons
    slotButtons.forEach(slotButton => {
        slotButton.addEventListener('click', function() {
            if (!this.classList.contains('booked') && selectedDate) {
                const time = this.getAttribute('data-time');
                const mentor = document.querySelector('.mentor-card h2').textContent;
                const date = selectedDate.getAttribute('data-date');

                const confirmBooking = confirm(`Do you want to book a session with ${mentor} on ${date} at ${time}?`);
                if (confirmBooking) {
                    alert(`Session booked with ${mentor} on ${date} at ${time}`);
                    this.classList.add('booked');
                    this.textContent = `${time} - Booked`;

                    if (!bookedSlots[date]) {
                        bookedSlots[date] = [];
                    }
                    bookedSlots[date].push(time);

                    // Save the user's booked slots
                    userBookedSlots.push({ date, time });

                    // Update booked slots UI
                    displayBookedSlots();
                }
            }
        });
    });

    function resetSlots() {
        slotButtons.forEach(slotButton => {
            slotButton.classList.remove('booked');
            const time = slotButton.getAttribute('data-time');
            slotButton.textContent = time;
        });
    }

    function disableSlot(time) {
        slotButtons.forEach(slotButton => {
            if (slotButton.getAttribute('data-time') === time) {
                slotButton.classList.add('booked');
                slotButton.textContent = `${time} - Booked`;
            }
        });
    }

    // Function to display booked slots
    function displayBookedSlots() {
        bookedSlotsList.innerHTML = '';  // Clear previous slots

        userBookedSlots.forEach(slot => {
            const li = document.createElement('li');
            li.textContent = `Date: ${slot.date}, Time: ${slot.time}`;
            bookedSlotsList.appendChild(li);
        });

        bookedSlotsDiv.style.display = 'block';  // Show booked slots section
    }