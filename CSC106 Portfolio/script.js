
// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Create an array to store tasks
let tasks = [];

// Function to display tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {

        const li = document.createElement("li");

        li.textContent = task;

        // Complete task button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Complete";

        completeButton.addEventListener("click", function() {
            li.style.textDecoration = "line-through";
        });

        // Delete task button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            displayTasks();
        });

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
            tasks.push(task);
            taskInput.value = "";
            displayTasks();
        } else {
            alert("Please enter a task!");
        }

    });

}


// CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        console.log("Phone entered:", phone);
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
        console.log("Phone validation:", phonePattern.test(phone));

        formMessage.textContent = "Your form has been validated successfully!";
        contactForm.reset();

    });

}