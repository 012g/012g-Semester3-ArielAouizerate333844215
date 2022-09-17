
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
 function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'x-xxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  
  // ====================== demo ======================
  function modify() {
    document.getElementById('uuid').innerText = generateUUID();
  }


  function verify_form ()
{
  verifyPassword()
  verify_password_are_the_same()
}


function verifyPassword() {  
    var pw = document.getElementById("Password").value;  
   
    if(pw.length < 8) {  
        alert("Password is too short, 8 chars are needed!"); 
        return false;  

    }  

  }  
  
function verify_password_are_the_same ()
{
    var pw = document.getElementById("Password").value;
    var pw2 = document.getElementById("ConfirmPassword").value;
    if(pw!=pw2)
    {
        alert("Passwords do not match"); 
        return false;  
    }

}  




