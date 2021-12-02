import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/sean-vdw')
  .then(resp => {
    console.log(resp.data.html_url);
  })
  .catch(err => {
    console.error(err);
  })

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/

const cards = document.querySelector('.cards');

function makeCard({ userImg, realName, gitName, loc, profileUrl, userFollowers, userFollowing, userBio }) {

  const card = document.createElement('div');
  const image = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const userName = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const profileAddress = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');

  card.classList.add('card');
  image.src = userImg;
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  name.textContent = `${realName}`;
  userName.classList.add('username');
  userName.textContent = `${gitName}`;
  location.textContent = `${loc}`;
  profile.textContent = profileAddress;
  profileAddress.setAttribute('href', `${profileUrl}`);
  followers.textContent = `${userFollowers}`;
  following.textContent = `${userFollowing}`;
  bio.textContent = `${userBio}`;

  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(profileAddress);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
}

function getGhUser(url) {
  axios.get(url)
  .then(resp => {
    const avatar = resp.data.avatar_url;
    console.log(avatar);
    const _name = resp.data.name;
    const _userName = resp.data.login;
    const _location = resp.data.location;
    const _gitUrl = resp.data.html_url;
    const _followers = resp.data.followers;
    const _following = resp.data.following;
    const _bio = resp.data.bio;
    cards.appendChild(makeCard({
      userImg: avatar, 
      realName: _name, 
      gitName: _userName, 
      loc: _location, 
      profileUrl: _gitUrl, 
      userFollowers: _followers, 
      userFollowing: _following, 
      userBio: _bio
    }));
  })
  .catch(err => {
    console.error(err);
  })
}
getGhUser(`https://api.github.com/users/sean-vdw`);