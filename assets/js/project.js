//for every page, we will load the project first
//locally we are maintaining a project and issues on frontend for faster User experience
let issues=[];
let issuesContainer=document.getElementById('issues-list');
try{
    issues=JSON.parse(issuesContainer.dataset.issues);
}catch(err){
    console.log("error getting issues ",err);
}



function renderIssuesList(issues){
    if(issues.length>0){
        issuesContainer.innerHTML="";
    }
    issues.map((issue)=>{
        //creating the labels div first
        const labelsDiv=document.createElement('div');
        labelsDiv.className="labels-list";

        issue.labels.map((label)=>{
            const span=document.createElement('span');
            span.className="badge bg-danger";
            span.innerText=`${label}`;
            labelsDiv.append(span);
        })

        const div=document.createElement('div');
        div.className="card";
        div.innerHTML=`
        <div class="card-header d-flex justify-content-between align-items-center">
            <h3>${issue.title}</h3>
            <h5 class="card-title text-light">Author: ${issue.author}</h5>
        </div>
        <div class="card-body">
            <div class="labels-container d-flex justify-content-between align-items-center">
            <h5>Labels</h5>
            </div>
            <hr class="border border-danger border-0.4 opacity-50">
            <p class="card-text"><u><b>Description:</b></u>${issue.description}</p>
      </div>
        `
        //append the labels to div
        div.querySelector('.labels-container').append(labelsDiv);
        issuesContainer.append(div);
    })
}

function onStartUp(){
    renderIssuesList(issues);
}

onStartUp();



//for ajax request and updating the dom at front end
const issueForm=$('#issue-form');
let firstTime=true;
issueForm.submit(createIssue);

function createIssue(e){  
    //preventing the default action
    e.preventDefault();
    //clearing the message for the firstTime
    if(firstTime){
        $('.message').eq(0).html("");
        firstTime=false;
    }
    //sending xhr request form data to the action
    $.ajax({
        url:'/project/create-issue',
        type:'POST',
        data:issueForm.serialize(),
        success:function(data){ 
           //reset the form
           issueForm[0].reset();
           //push the issue into issues on the front end
           issues.unshift(data.data.issue);
           //console.log(issues);
            //prepending the issue item into our DOM issues list
            renderIssuesList(issues);
           //display a flash message that a project is created
           new Noty({
                type: 'info',
                layout: 'topRight',
                theme:'mint',
                text: 'Issue Added successfully!',
                timeout: 1000,
            }).show();
        },
        error:function(error){
            console.log("Error fetching form data",err);
        }
    });
}



//implementing the extra features

//to show all the issues
document.getElementById('show-all-issues').addEventListener('click',showAllIssues);

function showAllIssues() {
    if(issues.length==0){
        return;
    }
    renderIssuesList(issues);
}


//function to show no issues if there are none
function showNoIssues(){
    issuesContainer.innerHTML=`
    <h1 class="message">No Issues on this filter!</h1>
    `
}





//for filtering based on the label
const checkBoxes=document.querySelectorAll(".filter-cb");

//for all these checkBoxes, add Event listenrs
checkBoxes.forEach((checkBox)=>{
    checkBox.addEventListener('change',handleLabelFilter);
});

function handleLabelFilter(){
    if(issues.length==0){
        return;
    }
    //extract all the checkboxes as an array
    const allCheckBoxArray = Array.from(checkBoxes);
    //selected checkboxes
    const selectedCheckBoxes =  allCheckBoxArray.filter((checkbox) => checkbox.checked);
    //extracting values
    const selectedLabels=selectedCheckBoxes.map((checkbox)=>checkbox.value);
    //console.log(selectedLabels);
    //now that we have our selectedLables, filter the issues that contain these labels
    //we have to show those issues whose labels array match with out selectedlabels
    const filteredIssues= issues.filter((issue)=>{
        //return those issues which has at least one of the selected labels
        return issue.labels.some((label)=>selectedLabels.includes(label));
    });

    if(filteredIssues.length==0){
        showNoIssues();
        return;
    }

    renderIssuesList(filteredIssues);
}




//for filtering based on the title/author/description
const searchWordFilter=document.getElementById('search-by-word');
searchWordFilter.addEventListener('input',filterByWord);

function filterByWord(e){
    if(issues.length==0){
        return;
    }
    const word=e.target.value;
    if(word.length==0 || word.trim().length==0){
        showNoIssues();
        return;
    }
    const filteredIssues=issues.filter((issue)=>{
        return issue.title.includes(word) ||issue.author.includes(word) ||issue.description.includes(word);
    });
    if(filteredIssues.length==0){
        showNoIssues();
        return;
    }
    renderIssuesList(filteredIssues);
}