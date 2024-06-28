"use strict";
const logoutButton = document.querySelector("#logoutButton");




function loadProfile() {
    fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginData.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        for (const post of posts) {
          const postDiv = document.createElement("div");
          const postHeader = document.createElement("h6");
    
          const postCreated = document.createElement("footer");
          postDiv.classList.add("card");
          postDiv.classList.add("p-4");
    
          postHeader.innerText = post.username;
          postDiv.innerText = post.text;
          postCreated.innerText = new Date(post.createdAt).toLocaleString();
    
          postsContainer.appendChild(postHeader);
          postsContainer.appendChild(postDiv);
          postsContainer.appendChild(postCreated);
        }
      });
    
  }







logoutButton.onclick = logout;