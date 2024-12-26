// Function to toggle visibility of content
function toggleContent(contentId) {
    var content = document.getElementById(contentId);
    content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
}
