// DOM Elements for Email and Date of Birth (DOB) Validation
const emailInput = document.getElementById('email');
const dobInput = document.getElementById('dob');
const dobErrorMessage = document.getElementById('dob-error');
const userForm = document.getElementById('form');

// Email Validation on Input Event
emailInput.addEventListener('input', () => validateEmail(emailInput));

// Email Validation Function
function validateEmail(input) {
    if (input.validity.typeMismatch) {
        input.setCustomValidity("The email format is incorrect.");
    } else {
        input.setCustomValidity("");
    }
    input.reportValidity();
}

// Set Min and Max Date for DOB (18 to 55 years range)
const today = new Date();
const minDOB = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
const maxDOB = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

// Date of Birth Validation on Change Event
dobInput.addEventListener('change', () => validateDOB(dobInput));

// DOB Validation Function
function validateDOB(input) {
    const selectedDate = new Date(input.value);
    if (selectedDate < minDOB || selectedDate > maxDOB) {
        dobErrorMessage.textContent = "Age must be between 18 and 55 years.";
        input.style.borderColor = "red";
        input.value = ""; // Clear invalid date input
    } else {
        dobErrorMessage.textContent = "";
        input.style.borderColor = "";
    }
}

// Local Storage Functions
const getUserEntries = () => JSON.parse(localStorage.getItem("user-entries")) || [];
let userEntries = getUserEntries();

// Display User Entries in Table
const displayUserEntries = () => {
    const tableRows = userEntries.map(entry => `
        <tr>
            <td class="border px-4 py-2">${entry.name}</td>
            <td class="border px-4 py-2">${entry.email}</td>
            <td class="border px-4 py-2">${entry.password}</td>
            <td class="border px-4 py-2">${entry.dob}</td>
            <td class="border px-4 py-2">${entry.acceptedTerms ? "Yes" : "No"}</td>
        </tr>
    `).join("");

    const table = `
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <th class="px-4 py-2">Name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>`;
    
    document.getElementById("user-entries").innerHTML = table;
};

// Save User Form Data to Local Storage
const saveUserForm = (event) => {
    event.preventDefault();

    // Form Data
    const name = document.getElementById('name').value;
    const email = emailInput.value;
    const password = document.getElementById('password').value;
    const dob = dobInput.value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Form Validation
    if (!name || !email || !password || !dob || !acceptedTerms) {
        alert("Please complete all required fields and accept terms.");
        return;
    }

    const entry = { name, email, password, dob, acceptedTerms };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayUserEntries();
};

// Initialize Form Event Listener and Display Entries on Page Load
userForm.addEventListener('submit', saveUserForm);
displayUserEntries();
