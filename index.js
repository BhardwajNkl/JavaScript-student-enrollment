// Creting a class for student record
class Student {
    constructor(name, email, website, image, gender, skills) {
        this.name = name;
        this.email = email;
        this.website = website;
        this.image = image;
        this.gender = gender;
        this.skills = skills;
    }
}

/*
Adding an event listener to the form for submit event.
*/
var form = document.getElementById("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getStudentDetails();//function to read input entred by the user.
    e.stopPropagation(); //TASK FOR SELF: READ ABOUT THIS FUNCTION.
})

function getStudentDetails() {
    //getting form input details values
    let data = document.getElementsByClassName("form-control");
    let name = data[0].value;
    let email = data[1].value;
    let website = data[2].value;
    let image = data[3].value;
    //getting gender value
    let gender;
    if (document.getElementById("radioMale").checked) {
        gender = 'Male'
    }
    else {
        gender = 'Female';
    }
    //getting skill details
    let skills = [];
    if (document.getElementById('checkboxJava').checked) {
        skills.push('Java');
    }
    if (document.getElementById('checkboxHtml').checked) {
        skills.push('HTML');
    }
    if (document.getElementById('checkboxCss').checked) {
        skills.push('CSS');
    }


    //FORM VALIDATION CHECK
    if (isValidName(name) && isValidEmail(email) && isValidWebsite(website) && isValidImage(image)) {
        //creating a student object with name and gender
        const s = new Student(name, email, website, image, gender, skills);
        addStudent(s);//this function takes a student object and creates the entry on page.
        //clearForm();//this function resets the form
    }
    else {
        //no need to write any code here
        //in case of invalid inputs, we just raise appropriate error messages from inside the validation function itself.
    }

}

/*isValidName(): It is the function for name validation.
        NAME VALIDATION CONSIDERATIONS
        ---------------
        1. Name field must be filled
        2. Name must have at least three characters
        3. Name can only contain alphabets and spcae
        4. Name can have maximum three parts(first name, middle name and last name). The second and third parts are optional.
*/
function isValidName(name) {
    name = name.trim();
    const pattern = /^([A-Za-z]{3})([a-zA-Z]+)?( [A-Za-z]+)?( [A-Za-z]+)?$/

    if (name.match(pattern)) {
        //ivalidation is successful, so we color the border of the input field green.
        document.getElementById("inputName").style.borderColor = 'green';
        //removing the validation error message, if any.
        document.getElementById("nameValidationMessage").innerHTML = "";
        return true;
    }
    else {
        //indicating error in name by making the border red
        document.getElementById("inputName").style.borderColor = 'red';
        let message = "";//holds error message text that we will display to the user.
        if (name === "") {
            message = "*required";
        }
         //checking if invalid characters have been used
         else if(!name.match(/^([a-zA-Z ]+)$/)){
            message= "name can have alphabets and spaces only";
        }

        else if(name.length<3){
            message = "name must have at least three characters";
        }
        //checking if the first name part has less than three characters
        else if(!(name.substring(0,3).match(/^([a-zA-Z]{3})$/))){
            message = "first name must have at least three characters";
        }
       
        else {
            message = "name can only have three parts"
        }
        //display error
        document.getElementById("nameValidationMessage").innerHTML = message;
        return false;
    }
}


/*isValidEmail(): It is the function for email validation.
        EMAIL VALIDATION CONSIDERATIONS
        ---------------
        1. Email field must be filled
        2. Must have at least three parts: (user-name)@(domain-name).(top-level-domain)
        3. Can have one additional part : (user-name)@(domain-name).(top-level-domain)[.(ccTLD)]
        4. Username can contain alphabets, a dot(.) and hyphen symbols only.
        5. Username must be followed by @ symbol.
        6. Domain name can contain alphabets, digits and hyphen(-).
        7. The domain name must be followed by a dot(.)
        8. Then, it must be followed by a TLD which should only contain alphabets(small) and length should be 2 to 63 characters.
        9. And, lastly the optional field- the country code TLD must be 2 characters long and it must conatin small alphabets only.
*/

function isValidEmail(email) {
    email = email.trim();
    const pattern = /^([A-Za-z0-9\.-]+)@([A-Za-z0-9-]+).([a-z]{2,63})(.[a-z]{2})?$/;
    if (email.match(pattern)) {
        //Indicating successful validation by coloring the border as green.
        document.getElementById("inputEmail").style.borderColor = 'green';
        //removing the validation error message, if any
        document.getElementById("emailValidationMessage").innerHTML = "";
        return true;
    }
    else {
        //indicating error in email by making the border red
        document.getElementById("inputEmail").style.borderColor = 'red';
        
        let message = "";//holds the error message to be displayed to the user
        if (email === "") {
            message = "*required"
        }
        else {
            message = "please enter a valid email";
        }
        //display error
        document.getElementById("emailValidationMessage").innerHTML = message;
        return false;
    }
}


/*isValidWebsite(): It is the function for website url validation.
        WEBSITE URL VALIDATION CONSIDERATIONS
        ---------------
        1. Website field must be filled
        2. The URL must be fully qualified, i.e, in the format (http(s)://)[www.](domain-name).(TLD)[.ccTLD][/][path]
        3. In, the above given format, parts in round brackets() are mandatory while parts in square brackets[] are optional.
*/

function isValidWebsite(website) {
    website = website.trim();
    const pattern = /^(http)(s)?(:\/\/)(www\.)?([a-zA-Z0-9]+).([a-z]{2,63})(.[a-z]{2})?([/])?([\W\S_]+)?$/
    if (website.match(pattern)) {
        //to indicate successful validation, we color the border as green.
        document.getElementById("inputWebsiteUrl").style.borderColor = 'green';
        //removing the validation error message, if any
        document.getElementById("websiteUrlValidationMessage").innerHTML = "";
        return true;
    }
    else {
        //indicating error in website url by making the border red
        document.getElementById("inputWebsiteUrl").style.borderColor = 'red';
        let message = "";//holds the error message to be displayed to the user
        if (website === "") {
            message = "*required";
        }
        else {
            message = "please enter fully qualified URL";
        }
        //display error
        document.getElementById("websiteUrlValidationMessage").innerHTML = message;
        return false;
    }

}

/*isValidImage(): It is the function for image link validation.
        Image link VALIDATION CONSIDERATIONS
        ---------------
        1. Image field must be filled
        2. The link must be fully qualified, i.e, in the format (http(s)://)[www.](domain-name).(TLD)[.ccTLD](/)(path)
        3. In, the above given format, parts in round brackets() are mandatory while parts in square brackets[] are optional.
        4. This validation is quite similar to website url validation but here the path is a mandatory part.
*/

function isValidImage(image) {
    image = image.trim();
    const pattern = /^(http)(s)?(:\/\/)(www\.)?([a-zA-Z0-9]+).([a-z]{2,63})(.[a-z]{2})?([/])([\W\S_]+)$/
    if (image.match(pattern)) {
        //to indcate successful validation, we color the border as green.
        document.getElementById("inputImageUrl").style.borderColor = 'green';
        //removing the validation message, if any.
        document.getElementById("imageUrlValidationMessage").innerHTML = "";
        return true;
    }
    else {
        //indicating error in image link by making the border red
        document.getElementById("inputImageUrl").style.borderColor = 'red';
        let message = "";//holds the error message that we will display to the user.
        if (image === "") {
            message = "*required"
        }
        else {
            message = "please enter fully qualified url"
        }
        //display error
        document.getElementById("imageUrlValidationMessage").innerHTML = message;
        return false;
    }
}

/*
addStudent(): This function takes a student object and adds it's details to the table on our webpage.
The new student's data is inserted on top.
*/
function addStudent(s) {
    //getting the table in which we will insert the record
    const t = document.getElementById("student-table");
    //creating the row to be inserted
    const row = document.createElement("tr");
    row.setAttribute("class", "record");
    const col1 = document.createElement("td");
    col1.classList.add("student-info");
    const col2 = document.createElement("td");
    col2.classList.add("student-image");

    const websiteLink = "<a href='" + s.website + "' target='_blank'>"+s.website+"</a>";
    const skillsText = s.skills.join(', ');

    col1.innerHTML = s.name + "<br>" + s.gender + "<br>" + s.email + "<br>" + websiteLink + "<br>" + skillsText;
    col2.innerHTML = "<img alt='no image exists on the provided link' src='" + s.image + "' style='display: block; height: 120px; width: 100%;'>";

    row.appendChild(col1);
    row.appendChild(col2);
    //remove the message saying no record found
    document.getElementById("record-availability-message").style.display = 'none';
    //adding this row on the top
    t.prepend(row);
    //show 'enrollment success' message to the user
    showEnrollmentSuccessMessage();


}



/*clearFormConfirm(): This function prompts the user for confirmation on whether he/she wants to clear the form or not. */
function clearFormConfirm(){
    //pop up the alert for confirmation
    const alertBox = document.querySelector(".clear-prompt");
    alertBox.classList.add("active");

    //getting the buttons on the displayed alert box.
    const btn1 = document.querySelector("#yes-clear");
    const btn2 = document.querySelector("#no-clear");
    
    btn1.addEventListener("click",()=>{
       //clear the form
       clearForm();
       //remove the alert box from the screen
        alertBox.classList.remove("active");
    });
    btn2.addEventListener("click",()=>{
        //don't clear

        //just remove the box from screen
        alertBox.classList.remove("active");
    });

}

/*
clearForm(): This function resets the form.
The default selections for gender and skill are restored.
*/
function clearForm() {
    const inputName = document.getElementById("inputName");
    const inputEmail = document.getElementById("inputEmail");
    const inputWebsiteUrl = document.getElementById("inputWebsiteUrl");
    const inputImageUrl = document.getElementById("inputImageUrl");
    const radioMale = document.getElementById("radioMale");
    const checkboxJava = document.getElementById("checkboxJava");
    const checkboxHtml = document.getElementById("checkboxHtml");
    const checkboxCss = document.getElementById("checkboxCss");

    //clear name input field
    inputEmail.value = null;
    inputEmail.style.borderColor = 'gray';

    //clear email input field
    inputWebsiteUrl.value = null;
    inputWebsiteUrl.style.borderColor = 'gray';

    //clear website url input field
    inputName.value = null;
    inputName.style.borderColor = 'gray';

    //clear image url input field
    inputImageUrl.value = null;
    inputImageUrl.style.borderColor = 'gray';

    //reset radio input
    //NOTE: we are using 'male' as default gender. So, we only need to reset the selection when previous selection was not 'male'
    if (!radioMale.checked) {
        radioMale.checked = true;
    }

    //clear check boxes
    checkboxJava.checked = true;//as it is the default setup
    checkboxHtml.checked = false;
    checkboxCss.checked = false;

    //clearing validation error messages.
    document.getElementById("nameValidationMessage").innerHTML = "";
    document.getElementById("emailValidationMessage").innerHTML = "";
    document.getElementById("websiteUrlValidationMessage").innerHTML = "";
    document.getElementById("imageUrlValidationMessage").innerHTML = "";
    
}

/*
showEnrollmentMessage(): This function displays a message to the user after the student is successfully enrolled.
*/
function showEnrollmentSuccessMessage(){
    const messageDiv = document.querySelector(".enrollment-confirmation");
    messageDiv.classList.add("active");
    setTimeout(()=>{
        //remove the class 'active' from the enrollment success message div
        messageDiv.classList.remove("active");
    },3000)

}

