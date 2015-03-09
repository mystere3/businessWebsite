// CONTACT PAGE

function messageSubmit(){
    var name = document.getElementById('nameField').value;
    var subject = document.getElementById('subjectField').value;
    var content = document.getElementById('contentField').value;

    console.log("Name: " + name);
    console.log("Subject: " + subject);
    console.log("Content: " + content);
    $("#messageButton").html("Message submitted");
}