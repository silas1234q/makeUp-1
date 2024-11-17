window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
  
    // Hide the loader and show the content after 2 seconds
    setTimeout(() => {
      loader.style.display = "none";
      content.style.display = "block";
    }, 4000);
  });


let menuIcon = document.querySelector('.menu-icon');
let navBar = document.querySelector('.nav-bar');

menuIcon.addEventListener('click',()=>{
 
    if(navBar.style.maxHeight == '0px'){
        navBar.style.maxHeight = '600px';
        menuIcon.classList.add('open-menu');
    }else{
        navBar.style.maxHeight = '0px';
        menuIcon.classList.remove('open-menu');


    }
});

 AOS.init();

const Slides = document.querySelectorAll('.slide');
const slideLinks = document.querySelectorAll('.slide-link');

function showSlide(index) {
    // Loop through slides and links, toggling the active state
    Slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index); // Show only the selected slide
        slideLinks[i].classList.toggle('span-active', i === index); // Highlight the corresponding bullet
    });
};

const slider = document.querySelector('.image-slider');
const slides = document.querySelectorAll('.slider-slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
let startX = 0;
let isDragging = false;

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentIndex = index;
        updateSliderPosition();
    }
}

// Event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        goToSlide(index);
    });
});

// Swipe functionality for touch devices
slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

slider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Detect swipe direction
    if (diff > 50) { // Swipe left
        goToSlide(currentIndex + 1);
        isDragging = false;
    } else if (diff < -50) { // Swipe right
        goToSlide(currentIndex - 1);
        isDragging = false;
    }
});

slider.addEventListener('touchend', () => {
    isDragging = false;
});




window.addEventListener('scroll', function () {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    parallaxLayers.forEach(layer => {
        const depth = layer.getAttribute('data-depth');
        const movement = scrollTop * depth;
        layer.style.transform = `translateY(${movement}px)`;
    });
});




document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const main = document.querySelector(".main-section"); // Adjust the selector as needed
  const headerHeight = header.offsetHeight;

  // Apply the height dynamically
  main.style.marginTop = `${headerHeight}px`;
});

document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date');

    // Check if browser supports date input
    if (dateInput.type !== 'date') {
        dateInput.placeholder = 'MM/DD/YYYY'; // Set placeholder for unsupported browsers
    }
});
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const form = document.querySelector('#appointment-form');
// let nameInput = document.querySelector('#name');
// let emailInput = document.querySelector('#email');
// let dateInput = document.querySelector('#date');
// let timeInput = document.querySelector('#time');
// let serviceInput = document.querySelector('#service');
// console.log(form);

// form.addEventListener('submit', async(e)=>{
//     e.preventDefault();

//     let name = nameInput.value.trim();
//     let email = emailInput.value.trim();
//     let date = dateInput.value.trim();
//     let time = timeInput.value.trim();
//     let service = serviceInput.value.trim();

//     try {
//         const response = await fetch('https://your-server-endpoint.com/send-email', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, email, date,time,service }),
//         });

//         if (response.ok) {
//             alert('Email sent successfully!');
//         } else {
//             alert('Failed to send email. Please try again later.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again later.');
//     }
// });




// const app = express();
// app.use("/api",
//   createProxyMiddleware({
//     target: "https://your-server-endpoint.com",
//     changeOrigin: true,
//     pathRewrite: { "^/api": "" },
//   }));
// app.use(bodyParser.json());

// // Set up Nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Replace with your email provider (e.g., Gmail, Yahoo, etc.)
//     auth: {
//         user: 'your-email@gmail.com', // Replace with your email
//         pass: 'your-email-password', // Replace with your email password or app password
//     },
// });

// // Endpoint to handle email sending
// app.post('/send-email', async (req, res) => {
//     res.send("CORS enabled!");
//     const { name, email, date } = req.body;

//     const mailOptions = {
//         from: email,
//         to: 'your-email@gmail.com', // Replace with the email address where you want to receive messages
//         subject: `Message from ${name}`,
//         text: `You have a new message from ${name} (${email}):\n\n${date}`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).send('Email sent successfully');
//     } catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).send('Failed to send email');
//     }
// });

// // Start the server
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

   

document.getElementById('appointment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from redirecting

    // document.getElementById('name').innerHTML = ' ';
    // document.getElementById('date').innerHTML = ' ';
    // document.getElementById('time').innerHTML = ' ';
    // document.getElementById('service').innerHTML = ' ';

    const form = event.target;
    const formData = new FormData(form);

    // Use Fetch API to submit the form data without a page reload
    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      // Show success message
    //   document.getElementById('success-message').style.display = 'block';
       alert('done') // Optionally reset the form
    })
    .catch(error => {
      console.error('Error:', error);
    });
    form.reset();
  });