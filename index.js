const state = {
  puppies: [],
  puppyDetails: {}
};

const main = document.querySelector(`main`);

//grab the puppy api
const getPuppies = async () => {
  const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players`);
  const jsonObject = await response.json();  //get data
  state.puppies = jsonObject.data.players;  //store the data
  // console.log(state.puppies);
  renderAllPuppies();  //invoke function
};

const renderAllPuppies = () => {
  const ol = document.createElement(`ol`);// create ol 
  state.puppies.forEach((singlePuppy) => {   // go through each puppy
    const li = document.createElement(`li`);//create li
    li.innerHTML = singlePuppy.name;
    li.addEventListener(`click`, () => {    //add event listener
      state.puppyDetails = singlePuppy;
      renderPuppyDetails();
    });
    ol.append(li);    //append li to ol
  });
  main.innerHTML = ``;
  main.append(ol);    //append ol to main
};

const renderPuppyDetails = () => {
  const detailsHTML = `
  <h2> ${state.puppyDetails.name} </h2>
  <p> Breed: ${state.puppyDetails.breed} .\n Cohort ID: ${state.puppyDetails.cohortId} 
  .\n Team ID: ${state.puppyDetails.teamId} .\n Status: ${state.puppyDetails.status}<p>`; //display puppy as h2 and details as p tag
  const button = document.createElement(`button`);
  button.innerText = `Back`;
  button.addEventListener(`click`, () => {
    renderAllPuppies();
  });
  main.innerHTML = detailsHTML;
  main.append(button);   //make button appear on the main
}

getPuppies(); //invoke function
