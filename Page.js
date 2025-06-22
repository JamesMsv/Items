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
            } else {
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
                listItem.innerHTML = `<div class="item-${index%2==0?'even':'odd'}"><div class="item-name d-flex justify-content-center">${item.name}</div>
                                      <div class="d-flex justify-content-center""><div class="item-image" style="background-image: url('${item.url}');"></div>
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