/*
//add comment js funciton
const addCommentForm = document.getElementById("add-comment")
if(addCommentForm){
    addCommentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "addComment", true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var result = JSON.parse(xhttp.response).results;
                if (this.status == 200) {
                    var container = document.getElementById('comment-list')
                    container.innerHTML = container.innerHTML
                    +`
                    <li class="comment-listLi">
                        <p>By: <a href="/user/${result.authorId}">${result.name}</a></p>
                        <p>${result.comment}</p>
                        <p>On: ${result.commentDate}</p>
                        <br>
                    </li>`
                    location.reload();
                }else {
                    alert("Failed to add comment")
                }
            }
        }
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.send(`jobId=${this.jobId.value}&comment=${this.comment.value}`);
    });
}
*/

// //share job

const shareBtn = document.getElementById("shareJob")
if(shareBtn){
    shareBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(window.location.hostname+shareBtn.value);

  navigator.clipboard.writeText("http://localhost:3000/job/"+shareBtn.value);
  alert("Copied URL to clipboard");
    });
}


//save/unsave job js function saved=ture for unsave, 
function saveJob(obj, id, saved) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "saveJob", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var newButton = document.createElement("button")
                if (saved === true) {
                    newButton.class = "button-save-job"
                    newButton.innerText = "Save this Job!"
                    newButton.onclick = new Function('saveJob(this,"{{jobDetail._id}}", false)')
                } else {
                    newButton.class = "button-unsave-job"
                    newButton.innerText = "Saved!"
                    newButton.onclick = new Function('saveJob(this,"{{jobDetail._id}}", true)')
                }
                obj.parentNode.replaceChild(newButton, obj)
                location.reload();
            }
            else{
                alert("Unsave job Failed!")
            }
        }
    }
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(`jobId=${id}&saved=${saved}`);
}


//apply for job funciton

const applyJobForm = document.getElementById("resumeUpload");
if(applyJobForm)
{
    applyJobForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = document.getElementById("resumeUpload")
        const formData = new FormData(form);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", `/file/upload/${document.getElementById("value-userId").innerText}/${document.getElementById("value-jobId").innerText}`, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    form.parentNode.parentNode.removeChild(form.parentNode);
                    location.reload();
                } 
                else{
                    alert("Apply for job Failed!")
                }
            }
        }
        xhttp.send(formData);
    });
}



