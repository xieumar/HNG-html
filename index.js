function updateClock() {
    const now = Date.now();
    document.getElementById("clock").textContent = now;
}

updateClock();
setInterval(updateClock, 1);