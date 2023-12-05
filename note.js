document.addEventListener("DOMContentLoaded", function(event) {

    let storedNotes = JSON.parse(localStorage.getItem("notes")),
    notesArray = storedNotes ? storedNotes : [],
    lastCount = localStorage.getItem("counter"),
    count = lastCount ? lastCount : 0,
    list = document.getElementById("list"),
    divEdit = document.getElementById("div-edit");

    listRefresh();

    document.getElementById("add")
    .addEventListener("click", function() {
        let name = document.getElementById('name').value,
        content = document.getElementById('content').value,
        date = new Date();

        if(name === "")
        {
            alert("قم بإدخال اسم المذكرة من فضلك");
        }
        else
        {
            notesArray.push({
                id: count,
                name,
                content,
                date
            })

            count++;
            console.log("تمت الإضافة");
        }

        document.getElementById('name').value = '';
        document.getElementById('content').value = '';

        listRefresh();
    })

    function listRefresh()
    {
        list.innerHTML = '';

        for(let i = 0; i < notesArray.length; i++)
        {
            let name = notesArray[i].name,
            date = new Date(notesArray[i].date),
            dateString,
            element,
            divName,
            divDate;

            dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

            element = document.createElement("LI");
            element.setAttribute("data-id", notesArray[i].id);

            divName = document.createElement("DIV");
            divName.setAttribute("class", "div-name");
            divName.textContent = name;

            divDate = document.createElement("DIV");
            divDate.setAttribute("class", "div-date");
            divDate.textContent = dateString;

            element.appendChild(divName);
            element.appendChild(divDate);

            element.addEventListener("click", showItemEvent);

            list.appendChild(element);

            localStorage.setItem("notes", JSON.stringify(notesArray));
            localStorage.setItem("counter", count);
        }
    }

    function showItemEvent()
    {
        divEdit.classList.remove("hide");
        let id = this.getAttribute('data-id'),
            name = '',
            content = '';

        if(document.querySelector("#list li.selected") != null)
        {
            document.querySelector("#list li.selected").classList.remove("selected");
        }

        this.classList.add('selected');

        for(let i = 0; i < notesArray.length; i++)
        {
            if(id == notesArray[i].id)
            {
                name = notesArray[i].name;
                content = notesArray[i].content;
            }
        }

        document.getElementById("edit-name").value = name;
        document.getElementById("edit-content").value = content;
    }

    document.getElementById("save").addEventListener("click", function() {
        let name = document.getElementById("edit-name").value,
            content = document.getElementById("edit-content").value,
            id = document.querySelector("#list li.selected").getAttribute("data-id");

        for (let i = 0; i < notesArray.length; i++)
        {
            if(notesArray[i].id == id)
            {
                notesArray[i].name = name;
                notesArray[i].content = content;
                break;
            }
        }

        listRefresh();
        document.querySelector(`#list li[data-id="${id}"]`).classList.add("selected");

    });

    document.getElementById("cancel")
    .addEventListener("click", function() {

        divEdit.classList.add('hide');
        document.querySelector("#list li.selected").classList.remove('selected');
    });

    document.getElementById('remove')
    .addEventListener('click', function() {

        let id = document.querySelector("#list li.selected").getAttribute("data-id");

        let confirmResult = confirm('هل حقاً تريد حذف هذه المذكرة');

        if(confirmResult)
        {
            for (let i = 0; i < notesArray.length; i++)
            {
                if(notesArray[i].id == id)
                {
                    notesArray.splice(i, 1);
                    break;
                }
            }

            listRefresh();

            divEdit.classList.add('hide');
        }
    });

});
