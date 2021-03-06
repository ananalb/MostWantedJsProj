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
  let displayOption = prompt("Do you want to search by 'eye color', 'gender' or 'occupation'? You can also 'quit' or 'restart'").toLowerCase().trim();
  switch(displayOption){
    case "eye color":
    searchResults = searchbyEyeColor(people);    
    break;
    case "gender":
    searchResults = searchbyGender(people);   
    break;
    case "occupation":
      searchResults = searchbyOccupation(people);   
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  if(!searchResults){
    return app(people);
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
    displayParents(person,people);
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

function searchbyEyeColor(people){
  let eyeColor = promptFor("What is the person's eye color?", chars);
  let foundPerson = people.filter(function(person){
    if(person.eyeColor === eyeColor){
    return true;
    }
    else{
      return false;
    }
})
return foundPerson[0];
}

function searchbyGender(people){
  let gender = promptFor("what is the person's gender?", chars);
  let foundPerson = people.filter(function(person){
    if(person.gender === gender){
    return true;
    }
    else{
      return false;
    }
})
return foundPerson[0];
}

function searchbyOccupation(people){
  let occupation = promptFor("What is the person's occupation?", chars);
  let foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
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
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo+="height:" + person.height + "\n";
  personInfo+="weight: " + person.weight + "\n";
  personInfo+="eyeColor: " + person.eyeColor + "\n";
  personInfo+="occupation: " + person.occupation + "\n";
  personInfo+="date of birth: " + person.dob + "\n";
  alert(personInfo);
}

function displayParents(person,people){

  let personParents = person.parents;
  if(!personParents){
    return alert("No parent information available");
  }
  else{
    let foundParents = people.filter(function(element){
      if(personParents.includes(element.id)){
        return true;
      }
      else{
        return false; 
      }
    })
    let personInfo = person.firstName + "'s" + " " + "Parent's first name: " + foundParents[0].firstName + "\n";
    personInfo+= person.firstName + "'s" + " " + "Parent's last name: " + foundParents[0].lastName + "\n";
    return alert(personInfo);     
    }  
}

function findSpouseById(person,people){ 

    let currentSpouse = person.currentSpouse;  
    if(!currentSpouse){
      return alert("No spouse information available");
     
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
      let personInfo = person.firstName + "'s" + " " + "spouse's first name: " + foundSpouse[0].firstName + "\n";
      personInfo+= person.firstName + "'s" + " " + "spouse's last name: " + foundSpouse[0].lastName + "\n";
      return alert(personInfo); 
    }    
}

// function FindSiblings(person,people){

// let sibling = person.


// }


function displayDescendants(person,people){

  
    let foundDescendants = people.filter(function(person){
      if(person.parents.includes(person.id)){
        return true;
      }
      else{
        return false; 
      }
    })

    foundDescendants();
    let personInfo = person.firstName + "'s" + " " + " first name: " + foundDescendants[0].firstName + "\n";
    personInfo+= person.firstName + "'s" + " " + " last name: " + foundDescendants[0].lastName + "\n";
    return alert(personInfo);     
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

