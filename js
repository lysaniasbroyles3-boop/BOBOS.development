// ==========================================
// BOBOS DASHBOARD
// ==========================================


// Get the saved username
const user =
    localStorage.getItem("bobosUsername") || "Builder";


// Put the username on the dashboard
const userName =
    document.getElementById("userName");

if (userName) {
    userName.textContent = user;
}


// ==========================================
// RECENT WORK
// ==========================================

const recentWork =
    document.getElementById("recentWork");


// Get saved notes
let notes = [];

try {
    notes = JSON.parse(
        localStorage.getItem("bobosNotes") || "[]"
    );
} catch (error) {
    notes = [];
}


// Display recent work
if (recentWork) {

    if (notes.length === 0) {

        recentWork.innerHTML = `
            <div class="recent-item">
                <b>No saved work yet.</b>
                <br>
                <small>
                    Start by creating a note or building a website.
                </small>
            </div>
        `;

    } else {

        recentWork.innerHTML =
            notes
                .slice(-5)
                .reverse()
                .map(note => {

                    const title =
                        escapeHtml(
                            note.title || "Untitled"
                        );

                    const body =
                        escapeHtml(
                            (note.body || "")
                                .slice(0, 100)
                        );

                    return `
                        <div class="recent-item">

                            <b>${title}</b>

                            <br>

                            <small>
                                ${body || "Empty note"}
                            </small>

                        </div>
                    `;

                })
                .join("");
    }
}


// ==========================================
// SIGN OUT
// ==========================================

function logout() {

    const confirmed =
        confirm("Sign out of BOBOS?");

    if (!confirmed) {
        return;
    }

    localStorage.removeItem(
        "bobosUsername"
    );

    window.location.href =
        "index.html";
}


// ==========================================
// SECURITY HELPER
// ==========================================

function escapeHtml(value) {

    return String(value).replace(
        /[&<>"']/g,

        function (character) {

            const characters = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            };

            return characters[character];
        }
    );
}
