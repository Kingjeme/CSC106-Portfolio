
// ACADEMIC PLANNER

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load saved tasks from browser storage
let tasks = JSON.parse(localStorage.getItem("academicTasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    if (!taskList) return;

    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        // Complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeButton.addEventListener("click", function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(taskText);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// Add a new task
if (addTaskButton && taskInput && taskList) {

    addTaskButton.addEventListener("click", function() {

        const task = taskInput.value.trim();

        if (task !== "") {

            tasks.push({
                text: task,
                completed: false
            });

            saveTasks();

            taskInput.value = "";

            displayTasks();

        } else {
            alert("Please enter an academic task!");
        }
    });

    // Allow Enter key to add tasks
    taskInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    // Display saved tasks when page opens
    displayTasks();
}


// CONTACT FORM VALIDATION AND EMAILJS

const contactForm = document.getElementById("contactForm");

// Initialize EmailJS
emailjs.init({
    publicKey: "DKdJOYOEKRixEHSZa"
});

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        const formMessage = document.getElementById("formMessage");

        // Check empty fields
        if (name === "" || email === "" ||
            phone === "" || message === "") {

            formMessage.textContent = "Please fill in all fields.";
            return;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            formMessage.textContent = "Please enter a valid email address.";
            return;
        }

        // Validate phone number
        const phonePattern = /^[0-9]+$/;

        if (!phonePattern.test(phone)) {
            formMessage.textContent = "Phone number must contain digits only.";
            return;
        }

        // Prepare email template parameters
        const templateParams = {
            name: name,
            email: email,
            phone: phone,
            message: message
        };

        // Display sending status
        formMessage.textContent = "Sending your message...";

        // Send email through EmailJS
        emailjs.send(
            "service_lory1y3",
            "template_ku20hom",
            templateParams
        )

        .then(function(response) {

            console.log("Email sent successfully:", response);

            formMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            contactForm.reset();

        })

        .catch(function(error) {

            console.error("Email sending failed:", error);

            formMessage.textContent =
                "Sorry, your message could not be sent. Please try again.";

        });

    });

}