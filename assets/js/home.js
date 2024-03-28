//for projects on frontEnd
const projectListContainer=document.getElementById("project-list");
let projects=JSON.parse(projectListContainer.dataset.projects);


//for creating a project using asynchronous xhr request
const projectForm=$('#project-form');
let firstTime=true;
projectForm.submit(createProject);
function createProject(e){  
    //preventing the default action
    e.preventDefault();
    //clearing the message for the firstTime
    if(firstTime){
        $('.message').eq(0).html("");
        firstTime=false;
    }
    //sending xhr request form data to the action
    $.ajax({
        url:'/create-project',
        type:'POST',
        data:projectForm.serialize(),
        success:function(data){
           // console.log(data.data);
           let newProject=createProjectInDom(data.data.project);
           //prepending the project item into our DOM project list
           $('#project-list').prepend(newProject);
           //reset the form
           projectForm[0].reset();
           //push the project into projects on the front end
           projects.push(data.data.project);
          // console.log(projects);
           //display a flash message that a project is created
           new Noty({
                type: 'success',
                layout: 'topRight',
                theme:'relax',
                text: 'Project created successfully!',
                timeout: 1000,
            }).show();
        },
        error:function(error){
            console.log("Error fetching form data",err);
        }
    });
}


function createProjectInDom(project){
    return $(`
            <div class="card">
                    <h4 class="card-header">${project.title}</h4>
                    <div class="card-body">
                        <h5 class="card-title text-success"><span>Author: </span>${project.author}</h5>
                        <p class="card-text">
                            ${project.description}
                        </p>
                        <a class="btn btn-primary" href="/project/?projectId=${project._id}">More Details</a>
                    </div>
           </div>
    `);
}






//implementing sorting feature

const sortTitleButton=document.getElementById('project-sort-title');
const sortAuthorButton=document.getElementById('project-sort-author');
const sortAsButton=document.getElementById('project-sort-date-as');
const sortDsButton=document.getElementById('project-sort-date-ds');


function renderAfterSorting(projects){
    projectListContainer.innerHTML="";
    projects.map((project)=>{
        const div=document.createElement('div');
        div.className="card";
        div.innerHTML=`
            <h4 class="card-header">${project.title}</h4>
            <div class="card-body">
                <h5 class="card-title text-success"><span>Author: </span>${project.author}</h5>
                <p class="card-text">
                    ${project.description}
                </p>
                <a href="/project/?projectId=${project._id}" class="btn btn-primary">More Details</a>
            </div>
        `;
        projectListContainer.append(div);
    })
}




sortTitleButton.addEventListener('click',()=>sortByWord('title'));
sortAuthorButton.addEventListener('click',()=>sortByWord('author'));
sortAsButton.addEventListener('click',()=>sortByTime(true));
sortDsButton.addEventListener('click',()=>sortByTime(false));

//function for sorting based on title or author name
function sortByWord(key){
    if(projects.length==0)return;
    //console.log(projects);
    //console.log(key);
    projects.sort((a,b)=>a[key].trim()>b[key].trim()? 1:-1);
    renderAfterSorting(projects);
}


function sortByTime(isAscending){
    if(projects.length==0)return;
    if(isAscending){
        projects.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    }else{
        projects.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
    }
    renderAfterSorting(projects);
}