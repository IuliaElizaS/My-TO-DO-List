let parentLi; // the li tag, parent node for the edited task
const noteList = document.querySelector('ul');
//OBS. querySelector and querySelectorAll return elements that are non-live while other selectors (getElementById, getElementsByClassName...) return live elements.

//sets action to be triggered if any button in the note list pannel is clicked
noteList.addEventListener('click', function(e){
    e.target.classList.contains('edit') ? editNote(e.target) :
    e.target.classList.contains('delete') ? deleteNote(e.target) :
    e.target.classList.contains('update') ? updateNote(parentLi) :
    console.log ('no button clicked');
});

// sets action for the edit buttons
editNote = (editBtn) => {
    console.log('edit btn clicked');// just for debuging
    parentLi = editBtn.parentNode;
    //retrieves old data
    const oldNote = parentLi.getElementsByTagName('p');
    let oldTask = oldNote[0].textContent;
    let oldDeadline = oldNote[1].textContent;
    // changes parentNode's innerHTML
    let editedNote = `<input id="editedText" type="text" name= "Note" value = "${oldTask}" size="50"></input>
                      <input id="editedDeadline" type="date" name="Deadline" value = "${oldDeadline}"></input>
                      <button class="update" type="button">OK</button>`;
    parentLi.innerHTML = editedNote;
};


//updates the edited note's text
updateNote = (par) => {
    const updatedTask = document.getElementById('editedText');
    const updatedDeadline = document.getElementById('editedDeadline');
    if (updatedTask.value !== '' & updatedDeadline.value !== '') {
        let updatedNoteHtml = `<p class="task">${updatedTask.value}</p>
                               <p class="taskDeadline">${updatedDeadline.value}</p>
                               <button class="edit" type="button"></button>
                               <button class="delete" type="button"></button>`
        // updates li element's inner html
        par.innerHTML = updatedNoteHtml;
    } else {
        alert('Please fill in both task and deadline boxes');
    };
};

// sets action for the delete buttons
deleteNote = (targetBtn) => {
    console.log('delete btn clicked'); //just for debuging
    const parent = targetBtn.parentNode;
    noteList.removeChild(parent);
};

// creates a new entry when save button is clicked
const saveBtn = document.getElementById('save');
const newTask = document.getElementById('textBox');
const newDeadline = document.getElementById('deadLine');
addNote = () => {
    if (newTask.value !== '' & newDeadline.value !== '') {
        let newNoteHtml = `<p class="task">${newTask.value}</p>
                           <p class="taskDeadline">${newDeadline.value}</p>
                           <button class="edit" type="button"></button>
                           <button class="delete" type="button"></button>`
        // creates the li element and sets it's inner html
        let newNote = document.createElement('li');
        newNote.className = 'note';
        newNote.innerHTML = newNoteHtml;
        noteList.appendChild(newNote);
        clearContent();
    } else {
        alert('Please insert a task and a deadline');
    };
};
saveBtn.addEventListener('click', addNote);

// clears the text and date boxes when the clear button is clicked
const clearBtn = document.getElementById('clear');
clearContent = () => {
    newTask.value = '';
    newDeadline.value = '';
};
clearBtn.addEventListener('click', clearContent);
