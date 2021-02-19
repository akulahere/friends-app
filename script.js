let users;
const nameSortButton = document.getElementById('name-sort');
const ageSortButton = document.getElementById('age-sort');


const getUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=100&inc=name,dob,location,email,gender,picture');
    if (response.ok) {
      const responseJson = await response.json();
      users = responseJson.results;
    } else {
      throw new Error(response.status);
    }
  }
  catch (error) {
    const errorNotification = document.createElement('p');
    errorNotification.innerHTML = `Network error! Status code: ${error}`;
    document.querySelector('main').prepend(errorNotification);
  }
  return users;
}

const renderUsers = () => {
  const usersList = document.querySelector('.users');
  const fragment = document.createDocumentFragment();
  if (usersList.innerHTML) usersList.innerHTML = '';
  users.forEach(({ name, picture, dob, location, email }) => {
    const card = document.createElement('li');
    card.classList.add('person-card')
    card.innerHTML = `
      <div class="photo-container">
        <img class="photo" src="${picture.large}" alt="User photo">
      </div>
      <div class="user-info">
        <p class="name">${name.first} ${name.last}</p>
         <p class="age">${dob.age} years old</p>
         <p class="location" title="${location.city}">${location.city}</p>
        <a class="email" href="mailto:${email}">${email}</a>
      </div>
    `;
    fragment.append(card)
  });
  usersList.append(fragment)
};


const compareByName = (a, b) => a.name.first.toLowerCase() <= b.name.first.toLowerCase() ? -1 : 1;
const compareByAge = (a, b) => a.dob.age - b.dob.age;


const sortByName = () => {
  if (nameSortButton.dataset.sortType !== 'A-Z') {
    nameSortButton.dataset.sortType = 'A-Z';
    users.sort((a, b) => compareByName(a, b));
  } else {
    nameSortButton.dataset.sortType = 'Z-A';
    users.sort((a, b) => compareByName(b, a));
  }
};

const sortByAge = () => {
  if (ageSortButton.dataset.sortType !== '1-99') {
    ageSortButton.dataset.sortType = '1-99';
    users.sort((a, b) => compareByAge(a, b));
  } else {
    ageSortButton.dataset.sortType = '99-1';
    users.sort((a, b) => compareByAge(b, a));
  }
};



const initialize = async () => {
  await getUsers();
  renderUsers();
};

initialize();

nameSortButton.addEventListener('click', () => {
  sortByName();
  renderUsers();
});

ageSortButton.addEventListener('click', () => {
  sortByAge();
  renderUsers();
});
