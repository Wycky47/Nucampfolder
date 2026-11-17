document.addEventListener('DOMContentLoaded', function() {
    // Initialize date picker
    const datePicker = flatpickr("#date", {
        minDate: "today",
        maxDate: new Date().fp_incr(60), // Allow booking up to 60 days in advance
        disable: [
            function(date) {
                // Disable weekends
                return date.getDay() === 0 || date.getDay() === 6;
            }
        ],
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr, instance) {
            updateAvailableTimes(dateStr);
        }
    });

    // Time slots configuration
    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
        "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
        "04:00 PM", "04:30 PM"
    ];

    // Function to update available time slots
    function updateAvailableTimes(selectedDate) {
        const timeSelect = document.getElementById('time');
        timeSelect.innerHTML = '<option value="">Choose a time</option>';
        
        // Add time slots
        timeSlots.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    }

    // Handle form submission for appointment booking
    const appointmentForm = document.getElementById('appointmentForm');
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const service = document.getElementById('service').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Get deposit and payment method values
        const deposit = document.getElementById('deposit').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        // Validate form
        if (!service || !name || !email || !phone || !date || !time || !deposit || !paymentMethod) {
            alert('Please fill in all fields');
            return;
        }

        // Create appointment summary
        const appointmentSummary = `
            Appointment Details:
            Service: ${service}
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Date: ${date}
            Time: ${time}
            Deposit: $${deposit}
            Payment Method: ${paymentMethod}
        `;

        // Show success message
        alert('Appointment booked successfully!\n\n' + appointmentSummary);

        // Reset form
        appointmentForm.reset();
    });

    // Handle admin login form submission
    const adminForm = document.getElementById('adminForm');
    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get admin credentials
        const adminEmail = document.getElementById('adminEmail').value;
        const adminPassword = document.getElementById('adminPassword').value;

        // Validate admin credentials (this is a placeholder for actual authentication)
        if (adminEmail === "admin@example.com" && adminPassword === "password") {
            alert('Admin logged in successfully!');
            // Load booked appointments (placeholder)
            loadAppointments();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Function to load booked appointments (placeholder)
    function loadAppointments() {
        const appointmentList = document.getElementById('appointmentList');
        appointmentList.innerHTML = ''; // Clear existing appointments

        // Placeholder data
        const appointments = [
            { service: 'Green Card Renewal', name: 'John Smith', date: '2025-02-21', time: '10:00 AM' },
            { service: 'Naturalization', name: 'Jane Doe', date: '2025-02-22', time: '11:00 AM' }
        ];

        appointments.forEach(appointment => {
            const li = document.createElement('li');
            li.textContent = `${appointment.service} - ${appointment.name} on ${appointment.date} at ${appointment.time}`;
            appointmentList.appendChild(li);
        });
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#1a237e';
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
});
