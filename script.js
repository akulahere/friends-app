let users;

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
    document.querySelector('main').prepend(errorNotification)
  }
  return users;
}

console.log(getUsers());
