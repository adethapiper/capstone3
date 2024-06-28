/* Posts Page JavaScript */

"use strict";

const apiBaseURLLink = "http://microbloglite.us-east-2.elasticbeanstalk.com";

function getLoginData2() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

async function loadPosts() {
  // POST /api/users

  const loginData = getLoginData2();

  const options = {
    method: "GET",
    headers: {
      limit: 100,
      offset: 0,
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  //alert('Loading ...');

  const response = await fetch(apiBaseURLLink + "/api/users", options);
  const users = await response.json();

  if (users.message) {
    alert("Error getting users : " + users.message);
    return null;
  }
  //alert('Loading ...');

  // Do something with the users array...
  console.log(users);

  const postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  const postElement = document.createElement("div");
  postElement.className = "post";
  postElement.innerHTML = "<small>Loading ... </small><br>";
  postsContainer.appendChild(postElement);

  //alert('Loading ...');

  users.forEach((user) => {
    const postRequestData = {
      username: user.username,
    };

    const queryParams = new URLSearchParams(postRequestData).toString();

    fetch(`${apiBaseURLLink}/api/posts?${queryParams}`, options)
      .then((response2) => response2.json())
      .then((postData) => {
        if (postData.message) {
          alert("Error getting posts: " + postData.message);
          console.error(postData);
          // Here is where you might want to add an error notification
          // or other visible indicator to the page so that the user is
          // informed that they have entered the wrong login info.
          return null;
        }

        postData.forEach((post) => {
          //alert('Test ' + post.text);

          const postElement = document.createElement("div");
          postElement.className = "post";
          postElement.innerHTML = `<h2>${post.text}</h2><small>Author: ${
            post.username
          }</small><br><small>Timestamp: ${new Date(
            post.createdAt
          ).toLocaleString()}</small>`;
          postsContainer.appendChild(postElement);
        });
      });
  });
}

function logout2() {
  const loginData = getLoginData2();

  // GET /auth/logout
  const options = {
    method: "GET",
    headers: {
      // This header is how we authenticate our user with the
      // server for any API requests which require the user
      // to be logged-in in order to have access.
      // In the API docs, these endpoints display a lock icon.
      Authorization: `Bearer ${loginData.token}`,
    },
  };

  fetch(apiBaseURLLink + "/auth/logout", options)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .finally(() => {
      // We're using `finally()` so that we will continue with the
      // browser side of logging out (below) even if there is an
      // error with the fetch request above.

      window.localStorage.removeItem("login-data"); // remove login data from LocalStorage
      window.location.assign("/"); // redirect back to landing page
    });
}

// Load posts on page load
window.onload = loadPosts;
