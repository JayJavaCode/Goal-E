// Simulated data
let users = [];

function login() {
    const userNameInput = document.getElementById('userNameInput');
    const userName = userNameInput.value.trim();

    if (userName !== '') {
        // Check if the user is already in the list
        const userExists = users.find(user => user.name === userName);

        if (!userExists) {
            // Add the user to the list
            users.push({ name: userName, goalsCompleted: false });
        }

        // Hide login page, show prompt page
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('promptPage').classList.remove('hidden');
        document.getElementById('userName').textContent = userName;
    }
}

function logGoal(goalsCompleted) {
    // Update goalsCompleted status for the user
    const userName = document.getElementById('userName').textContent;
    const user = users.find(user => user.name === userName);

    if (user) {
        user.goalsCompleted = goalsCompleted;
    }

    // Hide prompt page, show leaderboard page
    document.getElementById('promptPage').classList.add('hidden');
    document.getElementById('leaderboardPage').classList.remove('hidden');

    // Update the leaderboard
    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = ''; // Clear existing list

    // Sort users based on goalsCompleted status
    const sortedUsers = users.sort((a, b) => {
        if (a.goalsCompleted && !b.goalsCompleted) return -1;
        if (!a.goalsCompleted && b.goalsCompleted) return 1;
        return 0;
    });

    // Populate the leaderboard
    sortedUsers.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name} - ${user.goalsCompleted ? 'Completed' : 'Not Completed'}`;
        leaderboard.appendChild(listItem);
    });
}

function returnToGoalSetPage() {
    // Hide leaderboard page, show login page
    document.getElementById('leaderboardPage').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
}