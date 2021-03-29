"use strict";
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchResults = searchByTraits(people);
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }


 let displayOption = prompt("Found " + person.firstName + " " + person.lastName +" . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
    findSpouseById(person,people);
    break;
    case "descendants":
    // TODO: get person's descendants
    displayDescendants(person,people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  }) 
  // TODO: find the person using the name they entered 
  return foundPerson[0];
}

function searchByTraits(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let age = promptFor("what is the person's age?", chars);
  let gender = promptFor("what is the person's gender?", chars);
  let occupation = promptFor("what is the person's occupation?", chars);

  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor && person.age === age && person.occupation === occupation && person.gender === gender){
    return true;
    }
    else{
      return false;
    }
})
return foundPerson[0];
}


//alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo+="height:" + person.height + "\n";
  personInfo+="weight: " + person.weight + "\n";
  personInfo+="age: " + person.age + "\n";
  personInfo+="eyeColor: " + person.eyeColor + "\n";
  personInfo+="occupation: " + person.occupation + "\n";
  personInfo+="date of birth: " + person.dob + "\n";
 
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayDescendants(person,people){

  let personDescendants = person.parents;
  if(!parents){
    return alert("No parents");
  }
  else{
    let foundDescendants = people.filter(function(person){
      if(person.id === personDescendants){
        return true;
      }
      else{
        return false;
      }
    })
  }
  displayDescendants(personDescendants);
}

function findSpouseById(person,people){   //family

    let currentSpouse = person.currentSpouse;  
    if(!currentSpouse){
      return alert("No spouse");
     
    }
    else{
      let foundSpouse = people.filter(function(person){
        if(person.id === currentSpouse){
          return true;
        }   
        else{
          return false;
        }
      })
      let personInfo = "Spouse's first name:" + foundSpouse[0].firstName + "\n";
      personInfo+= "Spouse's last name: " + foundSpouse[0].lastName + "\n";
      return alert(personInfo); 
    }    
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

