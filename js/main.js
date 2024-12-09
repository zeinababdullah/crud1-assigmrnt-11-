
var siteName = document.getElementById("sitesName");
var siteURL = document.getElementById("siteURL");
var submitBtn = document.querySelector("#submitBtn");
var errorName = document.getElementById("errorName");
var errorURL = document.getElementById("errorURL");
var tableElement = [];



if (localStorage.getItem("tableElement") != null) {
    tableElement = JSON.parse(localStorage.getItem("tableElement"));
    display();
}

function adding() {

    var siteCategory = {
        siteName: siteName.value,
        siteURL: siteURL.value
    };
    tableElement.push(siteCategory);
    localStorage.setItem("tableElement", JSON.stringify(tableElement));
    display();
    clear();
}

function display() {
    var cartona = "";
    for (var i = 0; i < tableElement.length; i++) {
        cartona += `<tr>         
                    <td class="ps-4 pt-2 pb-2">${i + 1}</td>
                    <td class="ps-4 pt-2 pb-2">${tableElement[i].siteName}</td>
                    <td class="ps-0 pt-2 pb-2"><button type="button" onclick="openURL(${tableElement[i].siteURL})" class="btn btn-success"><a href="#" class="text-white text-decoration-none"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button></td>
                    <td class="ps-0 pt-2 pb-2"><button type="button" onclick="deleteRow(${i})" class="btn btn-danger"><a href="#" class="text-white text-decoration-none"><i class="fa-solid fa-trash pe-2"></i>Delete</a></button></td>
                </tr>`;
                // console.log(tableElement[i].siteURL)
    }
    document.getElementById("tableRow").innerHTML = cartona;
}
function clear() {
    siteName.value = "";
    siteURL.value = "";
    siteName.classList.add("is-invalid");
    siteURL.classList.add("is-invalid");
    submitBtn.classList.add("disabled");
}
function deleteRow(index) {
    console.log(index)
    tableElement.splice(index, 1);
    console.log(tableElement);
    localStorage.setItem("tableElement", JSON.stringify(tableElement));
    display();

}

var isNameValid = false;
var isURLValid = false;

siteName.addEventListener("input", function(){
    validationName();
    validateBtn();
});
function validationName() {
    var regexName = /^[a-zA-Z0-9]{3,8}$/;
    var isValid = regexName.test(siteName.value);
    siteName.classList.toggle("is-valid" , isValid);
    siteName.classList.toggle("is-invalid" , !isValid);
    errorName.classList.toggle("d-none" , isValid);
    errorName.classList.toggle("d-block" , !isValid);

    // if (regexName.test(siteName.value) == true) {
    //     siteName.classList.add("is-valid");
    //     siteName.classList.remove("is-invalid");
    //     errorName.classList.add("d-none");
    // } else {
    //     siteName.classList.remove("is-valid");
    //     siteName.classList.add("is-invalid");
    //     errorName.classList.remove("d-none");
    // }

    if(isValid){
        isNameValid = true;
    }else{
        isNameValid = false;
    }
}

siteURL.addEventListener("input", function(){
    validationURL();
    validateBtn();
});
function validationURL() {
    var regexURL = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;
    var isValid = regexURL.test(siteURL.value);
    siteURL.classList.toggle("is-valid" , isValid);
    siteURL.classList.toggle("is-invalid" , !isValid);
    errorURL.classList.toggle("d-none" , isValid);
    errorURL.classList.toggle("d-block" , !isValid);

    if(isValid){
        isURLValid = true;
    }else{
        isURLValid = false;
    }
    
}

function validateBtn(){
    if(isNameValid && isURLValid){
        submitBtn.classList.remove("disabled");
    }else{
        submitBtn.classList.add("disabled");
    }
}

function openURL(url) {
    // console.log(url)
    window.open(url , "_blank");
}


