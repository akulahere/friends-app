let users;

const getUsers = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=100&inc=name,dob,location,email,gender,picture');
    if (response.ok) {
      const responseJson = await response.json();
      users = responseJson.results;
      console.log(users);
    } else {
      throw new Error(response.status);
    }
  }
  catch (error) {
    const errorNotification = document.createElement('p');
    errorNotification.innerHTML = `Network error! Status code: ${error}`;
    document.querySelector('main').prepend(errorNotification)
  }
  return users;
}

const renderUsers = () => {
  const usersList = document.querySelector('.users');
  const fragment = document.createDocumentFragment();
  if (usersList.innerHTML) usersList.innerHTML = '';
  users.forEach(({ name, picture, dob, location, email }) => {
    console.log(name)
    const card = document.createElement('li');
    card.classList.add('user-card')
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



const initialize = async () => {
  await getUsers();
  renderUsers();
}

initialize()

