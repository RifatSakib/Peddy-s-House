// console.log("hell0 from all.js");

const loadCategoryName = () => {

    // fetch data

    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayCategory(data.categories))
        .catch(error => console.error(error))

};


const loadAllPets = () => {

    // fetch all pets data

    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then(res => res.json())
        .then(data => displayAllPets(data.pets))
        .catch(error => console.error(error))
}


const loadCategoryVideos = (id) => {
    const result = String(id);

    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then(res => res.json())
        .then(data => displayAllPets(data.data))
        .catch(error => console.error(error))


}



//Create DisplayCategories with buttons
//1
const displayCategory = (categories) => {

    // console.log(categories);

    const categoryBtn = document.getElementById("categoriesBtn")

    categories.forEach((item) => {

        // console.log("category/"+item.category);
        const idPet = item.category;
        console.log(typeof (idPet));

        // create a button

        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
        <button id="btn-${idPet}" onclick="loadCategoryVideos('${idPet}')"  class = "w-11/12 btn bg-white border border-gray-400 text-xl font-bold  py-14 flex-nowrap category-btn focus:bg-red-500 focus:rounded-full ">  <img class="max-w-[30px] object-fill " src="${item.category_icon}" alt=""> ${item.category} </button>`

        categoryBtn.append(buttonContainer);

    })
}

//4 

const loadClickImage = (image) => {


    // console.log(image);
    const idClass = document.getElementById("loadImageByClickContainer");
    idClass.classList = "w-3/4 md:w-1/4 grid grid-cols-2 gap-2 border border-gray-400 h-full p-4";


    const id = document.getElementById("loadImageByClickContainer");
    const name = document.createElement("div");

    name.innerHTML = `

    <img class="rounded-xl" src="${image}" alt="">

    
    `
    id.append(name);




}

//5 

const loadDetails = (detailsId) => {

    console.log(detailsId);

    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailsId}`)
        .then(res => res.json())
        .then(data => displayDetailsModal(data))
        .catch(error => console.error(error))

}

const displayDetailsModal = (data) => {

    // console.log(data.petData.image);

    const detailContent = document.getElementById("modalDetail-content");

    detailContent.innerHTML = `


   <img class="w-full rounded-xl" src=${data.petData.image} />
              
   <h1 class="text-2xl font-bold py-2 px-3 "> ${data.petData.pet_name}  </h1>
     
   <div class=" grid grid-cols-2">
<p class="py-0 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img class="mx-1" width="16" height="16"
                src="https://img.icons8.com/small/16/health-data.png" alt="health-data" />

                <span class="mx-2">Breed:${data.petData.breed}</span>
            </p>


            <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png"
                    alt="calendar--v1" />

                <span class="mx-2">Birth: ${data.petData.date_of_birth}</span>
            </p>



            <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img width="24" height="24" src="https://img.icons8.com/plumpy/24/gender.png" alt="gender"/>

                <span class="mx-2">Gender:${data.petData.gender}</span>
            </p>


            
            <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img width="24" height="24" src="https://img.icons8.com/plumpy/24/gender.png" alt="gender"/>

                <span class="mx-2">Vaccinated:${data.petData.vaccinated_status}</span>
            </p>

           

            <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1"/>

                <span class="mx-2">Price:${data.petData.price}</span>

            </p>


        </div>

        
             <h1 class="text-lg font-bold py-2 px-3 "> Details:  </h1>
                <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">

                <span class="mx-2">${data.petData.pet_details}</span>

            </p>
            
            
            <hr class=" w-11/12 mx-auto border-t-1 border-t-[rgba(19,19,19,0.7)]">


  `;

    document.getElementById("modalBtnDetails").click();
}


const loadAdopt = (detailsId) => {

    // console.log(detailsId);

    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${detailsId}`)
        .then(res => res.json())
        .then(data => displayAdoptModal())
        .catch(error => console.error(error))

}



const displayAdoptModal = () => {

    // console.log(data.petData.image);

    let countdown = 3;

    const intervalId = setInterval(() => {
        document.getElementById("countdown").innerText = countdown;
        countdown--;

        if (countdown === -1) {
            clearInterval(intervalId);
            closeAdopt();
        }

    }, 1000)

    document.getElementById("modalBtnAdopt").click();


}




const closeAdopt = () => {
    document.getElementById("modalBtnAdoptClose").click();

}


//2 

const displayAllPets = (allPets) => {

    // console.log(allPets[0].image);

    const allPetsBlock = document.getElementById('allPets');

    allPetsBlock.innerHTML = "";

    if (allPets.length == []) {
        allPetsBlock.classList.remove("grid");
        const emtySection = document.createElement("div");
        emtySection.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        
          <img src="../images/error.webp" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
        </div>`;
        allPetsBlock.append(emtySection);
    } else {
        allPetsBlock.classList.add("grid");
    }


    allPets.forEach(item => {

        // console.log("this is item: ", item.image);


        const allPetsContainer = document.createElement('div');


        allPetsContainer.classList = " card border  border-gray-400";
        allPetsContainer.innerHTML = `
     <figure class="px-3 pt-3">
    <img
      src="${item.image}"
      alt="Cute Pets"
      class="rounded-xl" />
     </figure>
     
    <div>
            <h1 class="text-2xl font-bold py-2 px-3 "> ${item.pet_name}  </h1>
     
            
            <p class="py-0 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img class="mx-1" width="16" height="16"
                src="https://img.icons8.com/small/16/health-data.png" alt="health-data" />

                <span class="mx-2">Breed:${item.breed}</span>
            </p>


            <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/calendar--v1.png"
                    alt="calendar--v1" />

                <span class="mx-2">Birth: ${item.date_of_birth}</span>
            </p>



            <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img width="24" height="24" src="https://img.icons8.com/plumpy/24/gender.png" alt="gender"/>

                <span class="mx-2">Gender:${item.gender}</span>
            </p>

           

            <p class="py-1 px-2 flex text-[rgba(19,19,19,0.7)]">
                <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/us-dollar--v1.png" alt="us-dollar--v1"/>

                <span class="mx-2">Price:${item.price}</span>

            </p>

             <hr class=" w-11/12 mx-auto border-t-1 border-t-[rgba(19,19,19,0.7)]">
            
        <div class="w-full p-6 py-3 flex gap-3">

          
            <button onClick = "loadClickImage('${item.image}')" class="btn btn-outline font-bold border border-gray-500 block  ">
              
                <img  
                  width="24"
                  height="24"
                  
                  src="https://img.icons8.com/material-outlined/24/facebook-like--v1.png"
                  alt="facebook-like--v1"
                />
            
            </button>


            <button onclick="loadAdopt('${item.petId}')" class=" font-extrabold btn btn-outline border border-gray-500 text-[rgb(14,122,129)] block">Adopt</button>

            <button onclick="loadDetails('${item.petId}')" class="font-extrabold btn btn-outline  border border-gray-500 text-[rgb(14,122,129)] block">Details</button>

            
           
        </div>


            
    </div>

    `



        //3 for splitting the date value (2023-2-16) => 2023

        const spliter = (data) => {
            let date = `${data}`;
            let name = date.split("-");
            return name[0];
        }



        allPetsBlock.append(allPetsContainer)








    })


}





loadCategoryName();

loadAllPets();

