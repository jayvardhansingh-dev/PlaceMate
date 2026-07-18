// ========================================
// PlaceMate Storage Manager
// ========================================

const Storage = {

    // ==========================
    // Save Data
    // ==========================

    save(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    },

    // ==========================
    // Get Data
    // ==========================

    get(key) {

        const data = localStorage.getItem(key);

        return data ? JSON.parse(data) : null;

    },

    // ==========================
    // Remove Data
    // ==========================

    remove(key) {

        localStorage.removeItem(key);

    },

    // ==========================
    // Check Exists
    // ==========================

    exists(key) {

        return localStorage.getItem(key) !== null;

    },

    // ==========================
    // Clear All
    // ==========================

    clear() {

        localStorage.clear();

    }

};

// ========================================
// User Session
// ========================================

function setCurrentUser(memberId) {

    Storage.save("currentUser", memberId);

}

function getCurrentUser() {

    return Storage.get("currentUser");

}

function logoutUser() {

    Storage.remove("currentUser");

}

// ========================================
// Theme
// ========================================

function saveTheme(theme) {

    Storage.save("theme", theme);

}

function getTheme() {

    return Storage.get("theme") || "light";

}

// ========================================
// Notifications
// ========================================

function saveNotification(message) {

    let notifications = Storage.get("notifications") || [];

    notifications.unshift({

        message: message,

        date: new Date().toLocaleString()

    });

    Storage.save(

        "notifications",

        notifications

    );

}

function getNotifications() {

    return Storage.get("notifications") || [];

}

// ========================================
// Applications
// ========================================

function saveApplications(data) {

    Storage.save(

        "applications",

        data

    );

}

function getApplications() {

    return Storage.get(

        "applications"

    ) || [];

}

// ========================================
// Todo
// ========================================

function saveTodo(data) {

    Storage.save(

        "todo",

        data

    );

}

function getTodo() {

    return Storage.get(

        "todo"

    ) || [];

}

// ========================================
// Profile
// ========================================

function saveProfile(profile) {

    Storage.save(

        "profile",

        profile

    );

}

function getProfile() {

    return Storage.get(

        "profile"

    );

}

// ========================================
// Resume
// ========================================

function saveResume(file) {

    Storage.save(

        "resume",

        file

    );

}

function getResume() {

    return Storage.get(

        "resume"

    );

}

// ======================================
// Admin Session
// ======================================

function getAdmin(){

    return Storage.get("admin");

}

function adminLogout(){

    Storage.remove("admin");

    window.location.href="admin-login.html";

}

function isAdminLoggedIn(){

    return Storage.exists("admin");

}