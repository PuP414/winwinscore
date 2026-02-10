let homeScore = 0;
let awayScore = 0;
let timerSeconds = 0;
let timerInterval = null;
let currentMode = 'football'; // football หรือ basketball

function setMode(mode) {
    currentMode = mode;
    resetGame();
    
    const title = document.getElementById('game-title');
    const basketButtons = document.querySelectorAll('.basketball-only');
    
    if (mode === 'football') {
        title.innerText = "Football Scoreboard";
        timerSeconds = 0;
        basketButtons.forEach(btn => btn.style.display = 'none');
    } else {
        title.innerText = "Basketball Scoreboard";
        timerSeconds = 12 * 60; // เริ่มที่ 12 นาที
        basketButtons.forEach(btn => btn.style.display = 'inline-block');
    }
    updateTimerDisplay();
}

function changeScore(team, points) {
    if (team === 'home') {
        homeScore = Math.max(0, homeScore + points);
        document.getElementById('home-score').innerText = homeScore;
    } else {
        awayScore = Math.max(0, awayScore + points);
        document.getElementById('away-score').innerText = awayScore;
    }
}

function updateTimerDisplay() {
    const mins = Math.floor(Math.abs(timerSeconds) / 60);
    const secs = Math.abs(timerSeconds) % 60;
    document.getElementById('timer').innerText = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function toggleTimer() {
    const btn = document.getElementById('start-btn');
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        btn.innerText = "Start";
        btn.style.backgroundColor = "#2980b9";
    } else {
        btn.innerText = "Pause";
        btn.style.backgroundColor = "#e67e22";
        timerInterval = setInterval(() => {
            if (currentMode === 'football') {
                timerSeconds++;
            } else {
                if (timerSeconds > 0) timerSeconds--;
                else clearInterval(timerInterval);
            }
            updateTimerDisplay();
        }, 1000);
    }
}

function resetGame() {
    homeScore = 0;
    awayScore = 0;
    document.getElementById('home-score').innerText = 0;
    document.getElementById('away-score').innerText = 0;
    
    if (timerInterval) toggleTimer();
    
    if (currentMode === 'football') timerSeconds = 0;
    else timerSeconds = 12 * 60;
    
    updateTimerDisplay();
}

// เริ่มต้นหน้าเว็บ
updateTimerDisplay();