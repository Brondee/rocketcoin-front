var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

var jsTriggers = document.querySelectorAll(".js-tab-trigger"),
  jsContents = document.querySelectorAll(".js-tab-content");

jsTriggers.forEach(function (trigger) {
  trigger.addEventListener("click", function () {
    var id = this.getAttribute("data-tab"),
      content = document.querySelector(
        '.js-tab-content[data-tab="' + id + '"]'
      ),
      activeTrigger = document.querySelector(".js-tab-trigger.active-tab"),
      activeContent = document.querySelector(".js-tab-content.active-tab");

    activeTrigger.classList.remove("active-tab");
    trigger.classList.add("active-tab");

    activeContent.classList.remove("active-tab");
    content.classList.add("active-tab");
  });
});

// var modal = document.getElementById("modal__project");
// // Get the button that opens the modal
// var btn = document.getElementsByClassName("basketBtn");
// console.log();
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close1")[0];
// // When the user clicks the button, open the modal
// for (var i = 0; i < btn.length; i++) {
//   var v = btn[i];
//   v.onclick = function () {
//     modal.style.display = "block";
//   };
// }
// // When the user clicks on <span> (x), close the modal
// if (span) {
//   span.onclick = function () {
//     modal.style.display = "none";
//   };
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// };
// var modal2 = document.getElementById("modal__project2");
// // Get the button that opens the modal
// var btn2 = document.getElementsByClassName("basketBtn");
// console.log();
// // Get the <span> element that closes the modal
// var span2 = document.getElementsByClassName("close2")[0];
// // When the user clicks the button, open the modal
// for (var i = 0; i < btn2.length; i++) {
//   var v = btn2[i];
//   v.onclick = function () {
//     modal2.style.display = "block";
//   };
// }
// // When the user clicks on <span> (x), close the modal
// if (span2) {
//   span2.onclick = function () {
//     modal2.style.display = "none";
//   };
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal2) {
//     modal2.style.display = "none";
//   }
// };
// var modal3 = document.getElementById("modal__project3");
// // Get the button that opens the modal
// var btn3 = document.getElementsByClassName("basketBtn");
// console.log();
// // Get the <span> element that closes the modal
// var span3 = document.getElementsByClassName("close3")[0];
// // When the user clicks the button, open the modal
// for (var i = 0; i < btn3.length; i++) {
//   var v = btn3[i];
//   v.onclick = function () {
//     modal3.style.display = "block";
//   };
// }
// if (span3) {
//   // When the user clicks on <span> (x), close the modal
//   span3.onclick = function () {
//     modal3.style.display = "none";
//   };
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal3) {
//     modal3.style.display = "none";
//   }
// };
// var modal4 = document.getElementById("modal__project4");
// // Get the button that opens the modal
// var btn4 = document.getElementsByClassName("basketBtn");
// console.log();
// // Get the <span> element that closes the modal
// var span4 = document.getElementsByClassName("close4")[0];
// // When the user clicks the button, open the modal
// for (var i = 0; i < btn4.length; i++) {
//   var v = btn4[i];
//   v.onclick = function () {
//     modal4.style.display = "block";
//   };
// }
// if (span3) {
//   // When the user clicks on <span> (x), close the modal
//   span4.onclick = function () {
//     modal4.style.display = "none";
//   };
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal4) {
//     modal4.style.display = "none";
//   }
// };
// var modal5 = document.getElementById("modal__project5");
// // Get the button that opens the modal
// var btn5 = document.getElementsByClassName("btn-open-modal-panel-lk");
// console.log();
// // Get the <span> element that closes the modal
// var span5 = document.getElementsByClassName("close5")[0];
// // When the user clicks the button, open the modal
// for (var i = 0; i < btn5.length; i++) {
//   var v = btn5[i];
//   v.onclick = function () {
//     modal5.style.display = "block";
//   };
// }
// if (span3) {
//   // When the user clicks on <span> (x), close the modal
//   span5.onclick = function () {
//     modal5.style.display = "none";
//   };
// }
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == modal5) {
//     modal5.style.display = "none";
//   }
// };
