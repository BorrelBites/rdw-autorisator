/**
 * Toggles a class on an element
 * @param element
 * @param style
 */
function toggleClass(element, style) {
    var x = document.querySelector(element);
    x.classList.toggle(style);
}

/**
 * The event-handler for the menu toggle
 */
document.getElementById('menu-toggle').addEventListener('click', function() {
    toggleClass('#main-header', 'menu-open');

});