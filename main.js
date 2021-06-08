function service()
{
    //variables
    var form = document.getElementById("form");
    var input = document.getElementById("input");
    var btnAdd = document.getElementById("btnAdd");
    var list = document.getElementById("list");
    var btnClr = document.getElementById("btnClr");
    var id = 1;

    //list item
    var liItem = "";
    var todoList = [];

    //event listener
    btnAdd.addEventListener("click", addTodoItem);
    list.addEventListener("click", boxChecked);
    btnClr.addEventListener("click", clearList);

    //if data is not available
    if(localStorage.length <= 0)
    {
        btnClr.style.display = "none";
        console.log("button");
    }

    //if data is available
    if(localStorage.length > 0)
    {
        displayList();
    }

    //add item to todo list
    function addTodoItem()
    {
        if(input.value === "")
        {
            alert("You must enter something!");
        }
        else
        {
            if(list.style.borderTop === "")
            {
                console.log("here!");
                list.style.borderTop = "2px solid gray";
                btnClr.style.display = "inline";
            }
            var text = input.value;
            var item = `<li style="color:black" id="li-${id}">${text}<input id="box=${id}" class="checkboxes" type="checkbox"></li>`;
            list.insertAdjacentHTML('beforeend',item);
            liItem = {item:text, checked:false};
            todoList.push(liItem);
            id++;
            addToLocalStorage();
            form.reset();
        }
    }

    //add string through style to list item
    function boxChecked(event)
    {
        const element = event.target;
        if(element.type === "checkbox")
        {
            element.parentNode.style.textDecoration = "line-through";
            todoList = JSON.parse(localStorage.getItem("todoList"));
            todoList[element.id.split('-')[1]-1].checked = element.checked.toString();
            localStorage.setItem("todoList",JSON.stringify(todoList));
        }
    }

    //add data to local storage
    function addToLocalStorage()
    {
        if(typeof(Storage)!=="undefined")
        {
            localStorage.setItem("todoList", JSON.stringify(todoList));
        }
        else
        {
            alert("browser doesn't support local storage");
        }
    }

    //display all todo list
    function displayList()
    {
        list.style.borderTop = "2px solid black";
        todoList = JSON.parse(localStorage.getItem("todoList"));
        todoList.forEach(function(element)
        {
            console.log(element.item)
            var text = element.item;
            var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
            list.insertAdjacentElement("beforeend",item);

            //if box is checked, then style
            if(element.checked)
            {
                var li = document.getElementById("li-"+id);
                li.style.textDecoration = "line-through";
                li.childNodes[1].checked = element.checked;
            }
            id++;
        });
    }

    //clear list
    function clearList()
    {
        todoList = [];
        localStorage.clear();
        list.innerHTML = "";
        btnClr.style.display = "none";
        list.style.borderTop = "";
    }
}

function aboutus()
    {
        document.getElementById("abt").innerHTML = 
        "Azura Sakan Taufik<br>Cyntia Fanny<br>Ferdion<br>Laurentius Daniel<br>Josh Inkiriwang";
    }



