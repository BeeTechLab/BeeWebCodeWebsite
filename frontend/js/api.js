// TOGGLE MENU
function toggleMenu() {
    const nav = document.getElementById("nav-links");
    nav.classList.toggle("active");
}

// FIX NAVBAR ON RESIZE
window.addEventListener("resize", () => {
    const nav = document.getElementById("nav-links");

    if (window.innerWidth > 768) {
        nav.classList.remove("active");
    }
});

// CLOSE MENU WHEN CLICKING A LINK
document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        setTimeout(() => {
            document.getElementById("nav-links").classList.remove("active");
        }, 300); // smooth close after scroll starts
    });
});

// 🔥 CLOSE MENU WHEN CLICKING OUTSIDE
document.addEventListener("click", (e) => {
    const nav = document.getElementById("nav-links");
    const hamburger = document.querySelector(".hamburger");

    // If menu is open AND click is outside nav + hamburger
    if (
        nav.classList.contains("active") &&
        !nav.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        nav.classList.remove("active");
    }
});

//REGISTER FORM

// function submitForm(e) {
//     e.preventDefault();

//     // Show popup
//     document.getElementById("popup").classList.add("active");

//     // Reset form
//     e.target.reset();
// }

// CLOSE POPUP
function closePopup() {
    document.getElementById("popup").classList.remove("active");
}

//COROSOL

let index = 0;

function showSlide(i) {
    const slides = document.getElementById("slides");
    const total = slides.children.length;

    if (i >= total) index = 0;
    else if (i < 0) index = total - 1;
    else index = i;

    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}

// AUTO SLIDE (OPTIONAL)
setInterval(() => {
    nextSlide();
}, 4000);

//GALLERY LINK

function openGallery() {
    window.location.href = "./gallery.html";
}

//Zoom Out image


function openLightbox(element) {
    let img = element.tagName === "IMG" 
        ? element.src 
        : element.querySelector("img").src;

    document.getElementById("lightbox-img").src = img;
    document.getElementById("lightbox").classList.add("active");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.remove("active");
}

// CLOSE ON OUTSIDE CLICK
document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") {
        closeLightbox();
    }
});

// SCROLL UP 

const scrollBtn = document.getElementById("scrollTopBtn");

// Show button when scrolling down
window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Scroll to top when clicked
scrollBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

// FRONT-END DB

// const form = document.getElementById("demoForm");
// const BASE_URl = "http://localhost:3000/api";



// function saveUser() {
//   console.log("It's Working");

//   const student_name = document.getElementById("student_name").value;
//   const fathers_name = document.getElementById("fathers_name").value;
//   const phone_number = document.getElementById("phone_number").value;
//   const qualification = document.getElementById("qualification").value;

//   try {
//     const data = {
//       student_name: document.getElementById("student_name").value,
//       fathers_name: document.getElementById("fathers_name").value,
//       phone_number: document.getElementById("phone_number").value,
//       qualification: document.getElementById("qualification").value,
//       isVerified: false,
//     };

//     // <-------SAVING THE INFO ( SENDING THE DETAILS TO THE BACKEND) ------->

//     let url = `${BASE_URl}/user`;
//     let method = "POST";

//     fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     })
//   } catch (e) {
//     console.log(e)
//   }

// }


// const BASE_URL = "http://localhost:3000/api";

// async function saveUser(e) {
//     e.preventDefault();

//     const data = {
//         student_name: document.getElementById("student_name").value,
//         fathers_name: document.getElementById("fathers_name").value,
//         phone_number: document.getElementById("phone_number").value,
//         qualification: document.getElementById("qualification").value,
//         isVerified: false,
//     };

//     try {
//         const res = await fetch(`${BASE_URL}/user`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data)
//         });

//         const result = await res.json();
//         console.log(result);

//         // Show popup AFTER success
//         document.getElementById("popup").classList.add("active");

//         // Reset form
//         document.getElementById("demoForm").reset();

//     } catch (err) {
//         console.error("Error:", err);
//     }
// }

// async function submitForm(event) {
//     event.preventDefault();

//     const data = {
//         student_name: document.getElementById("student_name").value,
//         fathers_name: document.getElementById("fathers_name").value,
//         phone_number: document.getElementById("phone_number").value,
//         qualification: document.getElementById("qualification").value
//     };

//     try {
//         const res = await fetch("/api/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         });

//         const result = await res.json();

//         // ✅ SHOW YOUR CUSTOM POPUP (instead of alert)
//         document.getElementById("popup").classList.add("active");

//         // Optional: show message inside popup
//         document.getElementById("popup-message").innerText = result.message;

//         // Reset form
//         document.getElementById("demoForm").reset();

//     } catch (error) {
//         console.error(error);

//         // Optional: error popup
//         document.getElementById("popup").classList.add("active");
//         document.getElementById("popup-message").innerText = "Something went wrong!";
//     }
// }


async function submitForm(event) {
    event.preventDefault();

    const loader = document.getElementById("loader");
    const popup = document.getElementById("popup");
    const message = document.getElementById("popup-message");

    const data = {
        student_name: document.getElementById("student_name").value,
        fathers_name: document.getElementById("fathers_name").value,
        phone_number: document.getElementById("phone_number").value,
        qualification: document.getElementById("qualification").value,
        email: document.getElementById("email").value
    };

    try {
        // ✅ SHOW LOADER
        loader.classList.add("active");

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        // ✅ HIDE LOADER
        loader.classList.remove("active");

        // ✅ SHOW POPUP
        message.innerText = result.message;
        popup.classList.add("active");

        document.getElementById("demoForm").reset();

    } catch (error) {
        loader.classList.remove("active");
        console.error(error);
    }
}
// Close popup
function closePopup() {
    document.getElementById("popup").classList.remove("active");
}

