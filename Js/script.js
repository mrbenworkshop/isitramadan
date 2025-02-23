
const popup = document.getElementById("popup");
const errorPopup = document.getElementById("error-popup");
const userForm = document.getElementById("user-form");
const mrbenForm = document.getElementById("mrben-form");
const phoneForm = document.getElementById("phone-form");
const knowMrBen = document.getElementById("know-mrben");
const continueButton = document.getElementById("continue-button");
const correctMrBenNames = ["YUSIF IBRAHIM", "YUSUF IBRAHIM", "YUSUF", "YUSIF"];
const allowedNumbers = ["1234567890", "0987654321"];

knowMrBen.addEventListener("change", function() {
    continueButton.textContent = knowMrBen.checked ? "Continue" : "Finish";
});

function getUserName() {
    let userName = localStorage.getItem("username");
    if (!userName) {
        popup.style.display = "block";
    } else {
        document.getElementById("user-greeting").innerText = `Welcome, ${userName.toUpperCase()}!`;
    }
}

userForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let userName = document.getElementById("username").value;
    localStorage.setItem("username", userName.toUpperCase());
    if (knowMrBen.checked) {
        userForm.style.display = "none";
        mrbenForm.style.display = "block";
    } else {
        popup.style.display = "none";
        document.getElementById("user-greeting").innerText = `Welcome, ${userName.toUpperCase()}!`;
    }
});

mrbenForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let mrbenAnswer = document.getElementById("mrben-name").value.toUpperCase();
    if (correctMrBenNames.includes(mrbenAnswer)) {
        mrbenForm.style.display = "none";
        phoneForm.style.display = "block";
    } else {
        errorPopup.style.display = "block";
        popup.style.display = "none";
    }
});

function closeErrorPopup() {
    errorPopup.style.display = "none";
}

phoneForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let phoneNumber = document.getElementById("phone-number").value;
    popup.style.display = "none";
    if (allowedNumbers.includes(phoneNumber)) {
        console.log("Special action triggered!");
    }
});

async function fetchIslamicDate() {
    try {
        let response = await fetch("https://api.aladhan.com/v1/gToH");
        let data = await response.json();
        let hijriDate = data.data.hijri;
        document.getElementById("islamic-year").innerText = hijriDate.year;
        checkRamadan(hijriDate.month.en);
    } catch (error) {
        console.error("Error fetching Islamic date:", error);
        document.getElementById("ramadan-check").innerText = "Could not fetch Islamic date.";
    }
}

function checkRamadan(month) {
    let isRamadan = month === "Ramadan";
    let displayText = isRamadan ? "YES" : "NO";
    document.getElementById("ramadan-check").innerHTML += `<div id='yes-text'>${displayText}</div>`;
}

function showReminders() {
    let reminders = [
        "Remember to pray on time!",
        "Read at least one page of the Quran today.",
        "Give charity, even if it's small.",
        "Be kind to others and spread peace.",
        "Make lots of dua for yourself and others.",
        "Fast with sincerity and patience."
    ];
    let shuffled = reminders.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 2 + Math.floor(Math.random() * 2));
    document.getElementById("reminders").innerHTML = selected.map(reminder => `<div class='reminder'>${reminder}</div>`).join('');
}

getUserName();
fetchIslamicDate();
showReminders();