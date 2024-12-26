// Handle interactions for locked cards
const cards = document.querySelectorAll('.card.locked');

cards.forEach(card => {
  card.addEventListener('click', () => {
    alert("This section is locked. Complete the earlier sections first!");
  });
});

// Add dynamic navigation for completed cards
const completedCards = document.querySelectorAll('.card.completed, .card.progress');

completedCards.forEach(card => {
  card.addEventListener('click', () => {
    alert("Navigating to the next step...");
    // Add logic for navigation here
  });
});
