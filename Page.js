function checkOnline(){
    setInterval(() => {
        online();
    }, 10);
}

function online(){
    let ele=document.getElementById("checkOnline");
    if (navigator.onLine) {
        ele.style="display: none;";    
        ele.innerHTML = "";

    } 
    else {
        ele.style="display: block;";
        ele.innerHTML = "You are offline. Please check your internet connection.";
    }
}

var preview_flag = false;
        
        function save(){
            let name=document.getElementById("textInput").value;
            let url=document.getElementById("imageInput").value;
            if(name!= "" && preview_flag){  
                let values = JSON.parse(localStorage.getItem('values')) || [];
                const newItem = {name: name,url: url};
                values.push(newItem);
                localStorage.setItem('values', JSON.stringify(values));
                console.log("Data saved in localStorage:", values);
                clearInputs();
            } 
            else if(!preview_flag){
                alert("Please enter a valid URL.");
                return;                
            }
            else {
                alert("Please enter a valid name.");
                return;
            }
        }

        async function setImagePreview(url) {
        let status= false;
        try {
            const response = await fetch(url, { method: "HEAD" }); // Use HEAD to get headers only
            if(response.ok){
                status=true;
            }    // true if status is 200–299
        } 
        catch (error) {
            console.error("Fetch error:", error);
        }
        console.log(url);
        let imagePreview = document.getElementById('imagePreview');
        if(status){
            console.log("Image URL:", url);
            imagePreview.style.backgroundImage = `url("${url}")`;
            preview_flag = true;
        } 
        else {
            imagePreview.style.backgroundImage = `url("https://demofree.sirv.com/nope-not-here.jpg")`;
            preview_flag = false;
        }
}

        function clearLocalStorage() {
            localStorage.removeItem('values');
            console.log("Local storage cleared.");
            loadItems(); // Refresh the list after clearing
        }

        function deleteItem(index) {
            let values = JSON.parse(localStorage.getItem('values')) || [];
            if (index >= 0 && index < values.length) {
                values.splice(index, 1); // Remove the item at the specified index
                localStorage.setItem('values', JSON.stringify(values));
                console.log("Item deleted:", values);
                loadItems(); // Refresh the list after deletion
            } else {
                console.error("Invalid index for deletion:", index);
            }
        }

        function editItem(index) {
            let values = JSON.parse(localStorage.getItem('values')) || [];
            if (index >= 0 && index < values.length) {
                document.getElementById("textInput").value = values[index].name;
                document.getElementById("imageInput").value = values[index].url;
                setImagePreview(values[index].url);
                // Remove the item from localStorage after editing
                deleteItem(index);
            } else {
                console.error("Invalid index for editing:", index);
            }
        }

        function loadItems() {
            let imagePreview = document.getElementById('imagePreview');
            imagePreview.style.backgroundImage = `url("https://demofree.sirv.com/nope-not-here.jpg")`;
            // Load existing values from localStorage
            let values = JSON.parse(localStorage.getItem('values')) || [];
            let listAllItems= document.getElementById("listAllItems");
            listAllItems.innerHTML = ''; // Clear existing items
            //polulate name with images in local storage
            if (values.length === 0) {
                listAllItems.innerHTML = '<li>No items found.</li>';
                return;
            }
            // Populate the list with items name and image divs from localStorage
            values.forEach((item,index) => {
                let listItem = document.createElement('div');
                listItem.innerHTML = `<div class="py-3 item-${index%2==0?'even':'odd'}"><div class="item-name d-flex justify-content-center">${item.name}</div>
                                      <div class="d-flex justify-content-center""><div class="item-image" style="background-image: url('${item.url}');"></div>
                                      </div>
                                    <div class="my-3 d-flex align-items-center justify-content-center">
                                    <button onclick='editItem(${index})' class='btn btn-warning'><i class="fa fa-edit"></i></button>
                                    &nbsp;
                                    <button onclick='deleteItem(${index})' class='btn btn-danger'><i class="fa fa-trash"></i></button>
        </div>
                                      </div>`;
                listAllItems.appendChild(listItem);
            });
        }

        function clearInputs(){
            document.getElementById("textInput").value = '';
            document.getElementById("imageInput").value = '';
            document.getElementById('imagePreview').style.backgroundImage = 'none';
            preview_flag = false;
        }