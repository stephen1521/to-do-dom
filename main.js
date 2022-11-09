//global querry selectors
let inputForm = document.querySelector('#inputForm');
let inputToAdd = document.querySelector('#inputToAdd');
let toDoList = document.querySelector('#toDoList');
let removeAll = document.querySelector('#removeAll');
let removeCompleted = document.querySelector('#removeCompleted');
let editBool = true;
let arr = [];

//submit event for adding todo item
inputForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(inputToAdd.value !== ''){
        //creates the elements needed for item
        let div = document.createElement('div');
        let toDoLabel = document.createElement('label');
        let edit = document.createElement('button');
        let remove = document.createElement('button');
        let complete = document.createElement('button');
        let buttonDiv = document.createElement('div');
        toDoLabel.innerText = inputToAdd.value;
        // appends everything into divs
        toDoList.appendChild(div);
        div.appendChild(toDoLabel);
        div.appendChild(buttonDiv);
        buttonDiv.appendChild(edit);
        buttonDiv.appendChild(remove);
        buttonDiv.appendChild(complete);
        //edit text of buttons
        edit.innerText = 'Edit';
        remove.innerText = 'Remove';
        complete.innerText = 'Complete/Uncomplete';
        //adds class
        buttonDiv.classList.add('toDoListButtons');
        div.classList.add('toDoListDivs');
        edit.classList.add('hidden', 'editClass');
        remove.classList.add('hidden', 'removeClass');
        complete.classList.add('hidden', 'completeClass');
        // call functions to add events to the buttons and text
        addClickToItem(div);
        completToDoItem(div);
        removeToDoItem(div);
        editToDoItem(div);
        inputToAdd.value = '';
    }else {
        alert('You must enter a todo item before adding.')
    }
});

// adds a click event to text to pull up all the buttons
function addClickToItem(element){
    let label = element.querySelector('label');
    label.addEventListener('click',function(){
        let buttonList = element.querySelectorAll('button');
        let input = element.querySelector('input');
        for(let i of buttonList){
            i.classList.toggle('hidden');
        }
        try {
            input.classList.toggle('hidden');
        }catch(err){
            arr.push(err);
        }
    });
}

// allows the user to toggles line through class on todo item
function completToDoItem(element){
    let completeButton = element.querySelector('.completeClass');
    completeButton.addEventListener('click', function(){
        let label = element.querySelector('label');
        label.classList.toggle('label');
    })
}

// allows user to remove an item
function removeToDoItem(element){
    let removeButton = element.querySelector('.removeClass');
    removeButton.addEventListener('click', function(){
        element.style.display = 'none';
    });
}

// allows user to edit the text of a todo item
function editToDoItem(element){
    let editButton = element.querySelector('.editClass');
    editButton.addEventListener('click', function(){
        if(editBool){
            editBool = false;
            let form = document.createElement('form');
            element.appendChild(form);
            let inputText = document.createElement('input');
            let inputButton = document.createElement('button');
            inputText.placeholder = 'Enter New Text'
            inputButton.innerText = 'Submit Changes';
            inputButton.classList.add('editInputButton');
            form.appendChild(inputText);
            form.appendChild(inputButton);
            form.addEventListener('submit', function(e){
                e.preventDefault();
                if(inputText.value !== ''){
                    let toBeEdit = element.querySelector('label');
                    toBeEdit.innerText = inputText.value;
                    element.removeChild(form);
                    editBool = true;
                }else{
                    alert('You must enter a todo item before submiting');
                }
            });
        }
    });
}

// removes all to do items from the list
removeAll.addEventListener('click', function(){
    let divsList = toDoList.querySelectorAll('.toDoListDivs');
    for(let i of divsList){
        toDoList.removeChild(i);
    }
});

// removes all completed to do items from the list
removeCompleted.addEventListener('click', function(){
    let divsList = toDoList.querySelectorAll('.toDoListDivs');
    for(let i of divsList){
        let text = i.querySelector('label');
        if(text.className === 'label'){
            toDoList.removeChild(i);
        }
    }
});
