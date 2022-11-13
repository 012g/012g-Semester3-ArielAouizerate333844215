/* GRID to Row event on click (adds and remove css class) */
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sList").onclick = () => {
    document.getElementById("lgDemo").classList.remove("grid");
  };
  document.getElementById("sGrid").onclick = () => {
    document.getElementById("lgDemo").classList.add("grid");
  };
});

/**
 * This function returns a UUID
 * Taken from from https://stackoverflow.com/a/8809472/6622966
 *
 * @return {string} A UUID in string
 *
 * @example
 */
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "x-xxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// ====================== demo ======================
function modify() {
  document.getElementById("uuid").innerText = generateUUID();
}

function verify_form() {
  return verifyPassword() && verify_password_are_the_same();
}

function verifyPassword() {
  var pw = document.getElementById("Password").value;

  if (pw.length < 8) {
    alert("Password is too short, 8 chars are needed!");
    return false;
  }

  return true;
}

function verify_password_are_the_same() {
  var pw = document.getElementById("Password").value;
  var pw2 = document.getElementById("ConfirmPassword").value;
  if (pw != pw2) {
    alert("Passwords do not match");
    return false;
  }

  return true;
}

window.onload = () => {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    console.log('setting map')
    const map = item.querySelector(".map");
    const input = item.querySelector("input[name=eventId]");
    map.id = input.value;
    const long = +item.querySelector(".long").value;
    const lat = +item.querySelector(".lat").value;
    var geojsonFeature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [long, lat],
      },
    };
    // Init map
    var leafMap = L.map(map.id).setView([lat, long], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(leafMap);
    L.geoJSON(geojsonFeature).addTo(leafMap);
    // Add toggle click handler
    item.children[0].addEventListener("click", function (e) {
      const dropDown = e.currentTarget.parentNode.children[1];
      dropDown.classList.toggle("visible");
      setTimeout(function(){
        leafMap.invalidateSize()
      }, 333);
    });
  });
};

function toggleDropDown(e) {
  const dropDown = e.currentTarget.parentNode.children[1];
  dropDown.classList.toggle("visible");
}
