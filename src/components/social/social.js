// When I click on 'Portfolio':
// - Hide 'about'
// - Show 'portfolio'

(function () {

  var contactButton = document.getElementById('contact-btn');
  var closeButton = document.getElementById('close-btn');
  var contactInfo = document.getElementById("contact-items");
  var contactClass = contactInfo.className;

  function toggleModal(button, modal, hideClass, showClass) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      if (modal.className === hideClass) {
        modal.className = showClass;
      } else if (modal.className === showClass) {
        modal.className = hideClass;
      }
    });
  }

  function closeModal(button, showClass, hideClass) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      var parent = button.parentNode;
      var gparent = parent.parentNode;
      if (gparent.className === showClass) {
        gparent.className = hideClass;
      }
    })
  }

  toggleModal(contactButton, contactInfo, "hidden", "contact-items");
  closeModal(closeButton, "contact-items", "hidden");

})();
