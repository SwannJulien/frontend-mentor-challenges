window.addEventListener("load", getCurrentUser);
window.addEventListener("load", getComments);

// Get current user information
function getCurrentUser() {
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/currentUser";
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = stateChange;

  function stateChange() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Get the JSON file and convert it into an object
      var data = window.JSON.parse(xhr.responseText);
      // Store every information about the current user into a local storage
      localStorage.setItem("username", data.username);
      localStorage.setItem("imagePNG", data.image.png);
      localStorage.setItem("imageWEBP", data.image.webp);
    }
  }
}

// Set variables to keep current user information outside the xhr function
var username = localStorage.getItem("username");
var imagePNG = localStorage.getItem("imagePNG");
var imageWEBP = localStorage.getItem("imageWEBP");

const container = document.getElementById("container");
const currentUserImg = document.getElementById("currentUserImg");

currentUserImg.setAttribute("src", imagePNG);

// GET ALL COMMENT ANS REPLIES
function getComments() {
  // Get comments
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/comments";
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = stateChange;

  function stateChange() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var comments = window.JSON.parse(xhr.responseText);

      // Order comments descendingly
      const sortByScore = (arr) => {
        const sorter = (a, b) => {
          return b.score - a.score;
        };
        comments.sort(sorter);
        return arr;
      };
      sortByScore(comments);

      // Get replies
      var xhr2 = new XMLHttpRequest();
      var url = "http://localhost:3000/replies";
      xhr2.open("GET", url, true);
      xhr2.send();
      xhr2.onreadystatechange = stateChange2;

      function stateChange2() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
          var replies = window.JSON.parse(xhr2.responseText);

          // Order replies descendingly
          const sortByScore = (arr) => {
            const sorter = (a, b) => {
              return b.score - a.score;
            };
            replies.sort(sorter);
            return arr;
          };
          sortByScore(replies);

          localStorage.setItem("id", comments.length);

          comments.forEach((comments) => {
            // Dynamically create the HTML structure for every comment
            let card = document.createElement("div");
            card.className = "card";
            container.appendChild(card);

            let cardLeft = document.createElement("div");
            cardLeft.className = "card__left";
            card.appendChild(cardLeft);

            let cardBtn = document.createElement("div");
            cardBtn.className = "score-btn";
            cardLeft.appendChild(cardBtn);

            let btnPlus = document.createElement("img");
            btnPlus.className = "score-btn--plus";
            btnPlus.setAttribute("src", "./images/icon-plus.svg");
            btnPlus.setAttribute("alt", "button +");
            cardBtn.appendChild(btnPlus);

            let commentScore = document.createElement("p");
            commentScore.id = "score";
            commentScore.innerText = `${comments.score}`;
            cardBtn.appendChild(commentScore);

            let btnMinus = document.createElement("img");
            btnMinus.className = "score-btn--minus";
            btnMinus.setAttribute("src", "./images/icon-minus.svg");
            btnMinus.setAttribute("alt", "button -");
            cardBtn.appendChild(btnMinus);

            let cardRight = document.createElement("div");
            cardRight.className = "card__right";
            card.appendChild(cardRight);

            let cardHeader = document.createElement("div");
            cardHeader.className = "card__header";
            cardRight.appendChild(cardHeader);

            let userImg = document.createElement("img");
            userImg.className = "user__img";
            userImg.setAttribute("src", `${comments.user.image.png}`);
            userImg.setAttribute("alt", "User picture");
            cardHeader.appendChild(userImg);

            let userName = document.createElement("h5");
            userName.innerText = `${comments.user.username}`;
            cardHeader.appendChild(userName);

            if (comments.user.username == username) {
              let you = document.createElement("p");
              you.innerText = "you";
              you.className = "user__tag";
              cardHeader.appendChild(you);
            }

            let createdFrom = document.createElement("p");
            createdFrom.innerText = `${timeAgo(new Date(comments.created))}`;
            cardHeader.appendChild(createdFrom);

            let userId = document.createElement("p");
            userId.innerText = `${comments.id}`;
            userId.className = "hide";
            cardHeader.appendChild(userId);

            if (comments.user.username == username) {
              let groupButton = document.createElement("div");
              groupButton.className = "group-btn";
              cardHeader.appendChild(groupButton);

              let buttonDelete = document.createElement("button");
              buttonDelete.className = "button button--delete";
              groupButton.appendChild(buttonDelete);

              let deleteImg = document.createElement("img");
              deleteImg.setAttribute("src", "./images/icon-delete.svg");
              deleteImg.setAttribute("alt", "Icon delete");
              buttonDelete.appendChild(deleteImg);

              let deleteParagraph = document.createElement("p");
              deleteParagraph.innerText = "Delete";
              buttonDelete.appendChild(deleteParagraph);

              let buttonEdit = document.createElement("button");
              buttonEdit.className = "button button--edit";
              groupButton.appendChild(buttonEdit);

              let editImg = document.createElement("img");
              editImg.setAttribute("src", "./images/icon-edit.svg");
              editImg.setAttribute("alt", "Icon edit");
              buttonEdit.appendChild(editImg);

              let editParagraph = document.createElement("p");
              editParagraph.innerText = "Edit";
              buttonEdit.appendChild(editParagraph);
            } else {
              let buttonReply = document.createElement("button");
              buttonReply.className = "button button--reply";
              cardHeader.appendChild(buttonReply);

              let replyImg = document.createElement("img");
              replyImg.setAttribute("src", "./images/icon-reply.svg");
              replyImg.setAttribute("alt", "Icon reply");
              buttonReply.appendChild(replyImg);

              let replyParagraph = document.createElement("p");
              replyParagraph.innerText = "Reply";
              buttonReply.appendChild(replyParagraph);
            }

            let cardContent = document.createElement("div");
            cardContent.className = "card__content";
            cardRight.appendChild(cardContent);

            let contentParagraph = document.createElement("p");
            contentParagraph.innerText = `${comments.content}`;
            cardContent.appendChild(contentParagraph);

            // Create a hidden reply card for every comment. This card will be displayed when the button reply is pressed (see line 320)

            let hiddenCard = document.createElement("div");
            hiddenCard.className = "card hide";
            container.appendChild(hiddenCard);

            let form = document.createElement("form");
            form.className = "form";
            form.setAttribute("method", "post");
            hiddenCard.appendChild(form);

            let currentUserImg = document.createElement("img");
            currentUserImg.className = "form__img";
            currentUserImg.setAttribute("src", `${imagePNG}`);
            currentUserImg.setAttribute("alt", "Current user image");
            form.appendChild(currentUserImg);

            if (comments.user.username == username) {
              let textarea = document.createElement("textarea");
              textarea.className = "form__txt-area";
              textarea.setAttribute("cols", "30");
              textarea.setAttribute("rows", "10");
              textarea.setAttribute("placeholder", "Edit your comment...");
              form.appendChild(textarea);

              let submitBtn = document.createElement("input");
              submitBtn.className = "form__input comment-update";
              submitBtn.setAttribute("type", "submit");
              submitBtn.setAttribute("value", "UPDATE");
              form.appendChild(submitBtn);
            } else {
              let textarea = document.createElement("textarea");
              textarea.className = "form__txt-area";
              textarea.setAttribute("cols", "30");
              textarea.setAttribute("rows", "10");
              textarea.setAttribute("placeholder", "Add a comment...");
              form.appendChild(textarea);

              let submitBtn = document.createElement("input");
              submitBtn.className = "form__input form__input-reply";
              submitBtn.setAttribute("type", "submit");
              submitBtn.setAttribute("value", "REPLY");
              form.appendChild(submitBtn);
            }

            // Dynamically create the HTML structure for every reply
            replies.forEach((replies) => {
              localStorage.setItem("idReply", replies.length);

              // Match the correct reply to the correct comment
              if (replies.replyingToId == comments.id) {
                let card = document.createElement("div");
                card.className = "card replies";
                container.appendChild(card);

                let cardLeft = document.createElement("div");
                cardLeft.className = "card__left";
                card.appendChild(cardLeft);

                let cardBtn = document.createElement("div");
                cardBtn.className = "score-btn";
                cardLeft.appendChild(cardBtn);

                let btnPlus = document.createElement("img");
                btnPlus.className = "score-btn--plus";
                btnPlus.setAttribute("src", "./images/icon-plus.svg");
                btnPlus.setAttribute("alt", "button +");
                cardBtn.appendChild(btnPlus);

                let commentScore = document.createElement("p");
                commentScore.id = "score-reply";
                commentScore.innerText = `${replies.score}`;
                cardBtn.appendChild(commentScore);

                let btnMinus = document.createElement("img");
                btnMinus.className = "score-btn--minus";
                btnMinus.setAttribute("src", "./images/icon-minus.svg");
                btnMinus.setAttribute("alt", "button -");
                cardBtn.appendChild(btnMinus);

                let cardRight = document.createElement("div");
                cardRight.className = "card__right";
                card.appendChild(cardRight);

                let cardHeader = document.createElement("div");
                cardHeader.className = "card__header";
                cardRight.appendChild(cardHeader);

                let userImg = document.createElement("img");
                userImg.className = "user__img";
                userImg.setAttribute("src", `${replies.user.image.png}`);
                userImg.setAttribute("alt", "User picture");
                cardHeader.appendChild(userImg);

                let userName = document.createElement("h5");
                userName.innerText = `${replies.user.username}`;
                cardHeader.appendChild(userName);

                if (replies.user.username == username) {
                  let you = document.createElement("p");
                  you.innerText = "you";
                  you.className = "user__tag";
                  cardHeader.appendChild(you);
                }

                let createdFrom = document.createElement("p");
                createdFrom.innerText = `${timeAgo(new Date(replies.created))}`;
                cardHeader.appendChild(createdFrom);

                let userId = document.createElement("p");
                userId.innerText = `${replies.id}`;
                userId.className = "hide";
                cardHeader.appendChild(userId);

                if (replies.user.username == username) {
                  let groupButton = document.createElement("div");
                  groupButton.className = "group-btn";
                  cardHeader.appendChild(groupButton);

                  let buttonDelete = document.createElement("button");
                  buttonDelete.className = "button button--delete";
                  groupButton.appendChild(buttonDelete);

                  let deleteImg = document.createElement("img");
                  deleteImg.setAttribute("src", "./images/icon-delete.svg");
                  deleteImg.setAttribute("alt", "Icon delete");
                  buttonDelete.appendChild(deleteImg);

                  let deleteParagraph = document.createElement("p");
                  deleteParagraph.innerText = "Delete";
                  buttonDelete.appendChild(deleteParagraph);

                  let buttonEdit = document.createElement("button");
                  buttonEdit.className = "button button--edit";
                  groupButton.appendChild(buttonEdit);

                  let editImg = document.createElement("img");
                  editImg.setAttribute("src", "./images/icon-edit.svg");
                  editImg.setAttribute("alt", "Icon edit");
                  buttonEdit.appendChild(editImg);

                  let editParagraph = document.createElement("p");
                  editParagraph.innerText = "Edit";
                  buttonEdit.appendChild(editParagraph);
                } else {
                  let buttonReply = document.createElement("button");
                  buttonReply.className = "button button--reply";
                  cardHeader.appendChild(buttonReply);

                  let replyImg = document.createElement("img");
                  replyImg.setAttribute("src", "./images/icon-reply.svg");
                  replyImg.setAttribute("alt", "Icon reply");
                  buttonReply.appendChild(replyImg);

                  let replyParagraph = document.createElement("p");
                  replyParagraph.innerText = "Reply";
                  buttonReply.appendChild(replyParagraph);
                }

                let cardContent = document.createElement("div");
                cardContent.className = "card__content";
                cardRight.appendChild(cardContent);

                let contentParagraph = document.createElement("p");
                contentParagraph.innerText = `${replies.content}`;
                cardContent.appendChild(contentParagraph);

                // Create a hidden reply card for every reply. This card will be displayed when the button reply is pressed (see line 320)
                let hiddenCard = document.createElement("div");
                hiddenCard.className = "card hide";
                container.appendChild(hiddenCard);

                let form = document.createElement("form");
                form.className = "form";
                form.setAttribute("method", "post");
                hiddenCard.appendChild(form);

                let currentUserImg = document.createElement("img");
                currentUserImg.className = "form__img";
                currentUserImg.setAttribute("src", `${imagePNG}`);
                currentUserImg.setAttribute("alt", "Current user image");
                form.appendChild(currentUserImg);

                if (replies.user.username == username) {
                  let textarea = document.createElement("textarea");
                  textarea.className = "form__txt-area";
                  textarea.setAttribute("cols", "30");
                  textarea.setAttribute("rows", "10");
                  textarea.setAttribute("placeholder", "Edit your comment...");
                  form.appendChild(textarea);

                  let submitBtn = document.createElement("input");
                  submitBtn.className = "form__input update-reply";
                  submitBtn.setAttribute("type", "submit");
                  submitBtn.setAttribute("value", "UPDATE");
                  form.appendChild(submitBtn);
                } else {
                  let textarea = document.createElement("textarea");
                  textarea.className = "form__txt-area";
                  textarea.setAttribute("cols", "30");
                  textarea.setAttribute("rows", "10");
                  textarea.setAttribute("placeholder", "Add a comment...");
                  form.appendChild(textarea);

                  let submitBtn = document.createElement("input");
                  submitBtn.className = "form__input form__input-reply";
                  submitBtn.setAttribute("type", "submit");
                  submitBtn.setAttribute("value", "REPLY");
                  form.appendChild(submitBtn);
                }
              }
            });
          });
          for (let i = 0; i < replies.length; i++) {
            // For each reply, if reply ID == replyingToId
          }
        }
      }
    }
  }
}

// POST USER COMMENT
const form = document.getElementById("form");
const getUserComment = document.getElementById("userComment");

form.addEventListener("submit", () => {
  // Keep value of the comment in a variable
  let userComment = getUserComment.value;

  // Get the number of comments already stored in BDD to increment the ID number
  let commentsLength = parseInt(localStorage.getItem("id"));

  // Get the posted comment date
  let commentDate = new Date();

  // Create the object that will be sent with the user information, comment and date of posting
  var userJSON = {
    id: commentsLength + 1,
    content: userComment,
    created: commentDate,
    score: 0,
    user: {
      image: {
        png: imagePNG,
        webp: imageWEBP,
      },
      username: username,
    },
  };

  // XHR object and sendig the comment object to the server
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/comments";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(userJSON));
});

// EVENT DELEGATION: listen which class the user clicked and take action accordingly
container.addEventListener("click", (event) => {
  // DISPLAY REPLY SECTION
  if (event.target.parentNode.classList.contains("button--reply")) {
    let divReply = event.target.parentNode;
    let divHeader = divReply.parentNode;
    let divRight = divHeader.parentNode;
    let divCard = divRight.parentNode;
    let divHide = divCard.nextSibling;

    // On and Off the reply form when clicking the button reply
    divHide.classList.toggle("hide");
  }

  // POST USER REPLY
  if (event.target.classList.contains("form__input-reply")) {
    console.log("inside form__input-reply");
    // Keep the textarea reply in a variable: userReply
    let form = event.target.parentNode;
    let replyChilds = form.childNodes;
    let textarea = replyChilds[1];
    let userReply = textarea.value;

    // Keep name of the replied user
    let divHide = form.parentNode;
    let card = divHide.previousSibling;
    let cardRight = card.childNodes[1];
    let cardHeader = cardRight.childNodes[0];
    let cardH5 = cardHeader.childNodes[1];
    let repliedUsername = cardH5.innerText;

    // Keep user ID
    let paragraph = cardHeader.childNodes[3];
    let userId = paragraph.innerText;

    // Get the number of replies already stored in BDD to increment the ID number
    let replyLength = parseInt(localStorage.getItem("idReply"));

    // Get current date
    let commentDate = new Date();

    // Create the object that will be sent with the user information, comment and date of posting
    var replyJSON = {
      id: replyLength + 1,
      content: userReply,
      created: commentDate,
      replyingTo: repliedUsername,
      replyingToId: parseInt(userId),
      score: 0,
      user: {
        image: {
          png: imagePNG,
          webp: imageWEBP,
        },
        username: username,
      },
    };

    // XHR object and sendig the comment object to the server
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/replies";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(replyJSON));
  } // End post user reply

  // DISPLAY EDIT CARD
  if (event.target.parentNode.classList.contains("button--edit")) {
    let divBtn = event.target.parentNode;
    let divGroup = divBtn.parentNode;
    let divHeader = divGroup.parentNode;
    let divRight = divHeader.parentNode;
    let divCard = divRight.parentNode;
    console.log(divCard);
    let divHide = divCard.nextSibling;

    // On and Off the reply form when clicking the button reply
    divHide.classList.toggle("hide");

    // Keep user ID
    let paragraph = divHeader.childNodes[4];
    let userId = paragraph.innerText;

    // If this card contains card "replies" then get replies. Else get comments
    if (divCard.classList.contains("replies")) {
      // Get replies
      var xhr2 = new XMLHttpRequest();
      var url = "http://localhost:3000/replies";
      xhr2.open("GET", url, true);
      xhr2.send();
      xhr2.onreadystatechange = stateChange2;

      function stateChange2() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
          var replies = window.JSON.parse(xhr2.responseText);

          // Fill textarea with the corresponding reply
          replies.forEach((replies) => {
            if (replies.id == userId) {
              let reply = replies.content;
              let form = divHide.childNodes[0];
              let textarea = form.childNodes[1];
              textarea.innerText = reply;
            }
          });
        }
      }
    } else {
      // Get comments
      var xhr3 = new XMLHttpRequest();
      var url = "http://localhost:3000/comments";
      xhr3.open("GET", url, true);
      xhr3.send();
      xhr3.onreadystatechange = stateChange3;

      function stateChange3() {
        if (xhr3.readyState == 4 && xhr3.status == 200) {
          var comments = window.JSON.parse(xhr3.responseText);

          // Fill textarea with the corresponding reply
          comments.forEach((comments) => {
            if (comments.id == userId) {
              let reply = comments.content;
              let form = divHide.childNodes[0];
              let textarea = form.childNodes[1];
              textarea.innerText = reply;
            }
          });
        }
      }
    }
  } // End display edit card

  // EDIT REPLIES
  if (event.target.classList.contains("update-reply")) {
    // Keep updated reply
    let form = event.target.parentNode;
    let textarea = form.childNodes[1];
    let text = textarea.value;

    // Keep replyed ID
    let card = form.parentNode;
    let replyCard = card.previousSibling;
    let right = replyCard.childNodes[1];
    let cardHeader = right.childNodes[0];
    let paragraph = cardHeader.childNodes[4];
    let replyId = paragraph.innerText;

    let replyJSON = {
      content: text,
    };

    // XHR object and sendig the comment object to the server
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:3000/replies/${replyId}`;
    xhr.open("PATCH", url, true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(replyJSON));
  } // End edit replies

  // EDIT COMMENTS
  if (event.target.classList.contains("comment-update")) {
    // Keep updated reply
    let form = event.target.parentNode;
    let textarea = form.childNodes[1];
    let text = textarea.value;

    // Keeo replyed ID
    let card = form.parentNode;
    let replyCard = card.previousSibling;
    let right = replyCard.childNodes[1];
    let cardHeader = right.childNodes[0];
    let paragraph = cardHeader.childNodes[4];
    let replyId = paragraph.innerText;

    let replyJSON = {
      content: text,
    };

    // XHR object and sendig the comment object to the server
    var xhr = new XMLHttpRequest();
    var url = `http://localhost:3000/comments/${replyId}`;
    xhr.open("PATCH", url, true);
    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(replyJSON));
  } // End edit comments

  // DELETE
  if (event.target.parentNode.classList.contains("button--delete")) {
    // Keep replyed ID
    let button = event.target.parentNode;
    let groupBtn = button.parentNode;
    let header = groupBtn.parentNode;
    let paragraph = header.childNodes[4];
    let id = paragraph.innerText;

    // Get up to card level to check if it's a reply or a comment card
    let right = header.parentNode;
    let card = right.parentNode;

    if (card.classList.contains("replies")) {
      var xhr = new XMLHttpRequest();
      var url = `http://localhost:3000/replies/${id}`;
      xhr.open("DELETE", url, true);
      xhr.send(null);
      location.reload();
    } else {
      // XHR object and sendig the comment object to the server
      var xhr = new XMLHttpRequest();
      var url = `http://localhost:3000/comments/${id}`;
      xhr.open("DELETE", url, true);
      xhr.send(null);
      location.reload();
    }
  } // End delete section

  // Add +1 to score when + button is clicked
  if (event.target.classList.contains("score-btn--plus")) {
    let scoreBtn = event.target.parentNode;
    let cardLeft = scoreBtn.parentNode;
    let card = cardLeft.parentNode;
    let cardRight = cardLeft.nextSibling;
    let cardHeader = cardRight.childNodes[0];
    let id;

    let score = scoreBtn.childNodes[1];

    // Make the difference between replies card of the current user and the others
    if (cardHeader.childNodes[2].classList.contains("user__tag")) {
      let paragraph = cardHeader.childNodes[4];
      id = parseInt(paragraph.innerText);
    } else {
      let paragraph = cardHeader.childNodes[3];
      id = parseInt(paragraph.innerText);
    }

    // Determines if the button is inside a comment or a reply
    if (card.classList.contains("replies")) {
      // Inside replies
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:3000/replies";
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = stateChange;

      function stateChange() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var replies = window.JSON.parse(xhr.responseText);

          // Loop through each reply and look for the reply that match the id that has been clicked
          replies.forEach((reply) => {
            if (reply.id == id) {
              let scoreReply = reply.score;
              let newScore = scoreReply + 1;
              let json = {
                score: newScore,
              };

              // Patch the new score into the DB
              var xhr2 = new XMLHttpRequest();
              var url = `http://localhost:3000/replies/${id}`;
              xhr2.open("PATCH", url, true);
              xhr2.setRequestHeader("Content-type", "application/json;charset=UTF-8");
              xhr2.send(JSON.stringify(json));

              score.innerText = newScore;
            }
          });
        }
      } // End patch reply

      // Inside a comment
    } else {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:3000/comments";
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = stateChange;

      function stateChange() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var comments = window.JSON.parse(xhr.responseText);

          // Loop through each comment and look for the comment that match the id that has been clicked
          comments.forEach((comment) => {
            if (comment.id == id) {
              let scoreComment = comment.score;
              let newScore = scoreComment + 1;
              let json = {
                score: newScore,
              };

              // Patch the new score into the DB
              var xhr2 = new XMLHttpRequest();
              var url = `http://localhost:3000/comments/${id}`;
              xhr2.open("PATCH", url, true);
              xhr2.setRequestHeader("Content-type", "application/json;charset=UTF-8");
              xhr2.send(JSON.stringify(json));

              score.innerText = newScore;
            }
          });
        }
      }
    } // End patch comment
  } // End adding +1 to score when pressing + button

  // Substract -1 to score when - button is clicked
  if (event.target.classList.contains("score-btn--minus")) {
    let scoreBtn = event.target.parentNode;
    let cardLeft = scoreBtn.parentNode;
    let card = cardLeft.parentNode;
    let cardRight = cardLeft.nextSibling;
    let cardHeader = cardRight.childNodes[0];
    let id;

    let score = scoreBtn.childNodes[1];

    // Make the difference between replies card of the current user and the others
    if (cardHeader.childNodes[2].classList.contains("user__tag")) {
      let paragraph = cardHeader.childNodes[4];
      id = parseInt(paragraph.innerText);
    } else {
      let paragraph = cardHeader.childNodes[3];
      id = parseInt(paragraph.innerText);
    }

    // Determines if the button is inside a comment or a reply
    if (card.classList.contains("replies")) {
      // Inside a reply
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:3000/replies";
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = stateChange;

      function stateChange() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var replies = window.JSON.parse(xhr.responseText);

          // Loop through each reply and look for the reply that match the id that has been clicked
          replies.forEach((reply) => {
            if (reply.id == id) {
              let scoreReply = reply.score;
              let newScore = scoreReply - 1;
              let json = {
                score: newScore,
              };

              // Patch the new score into the DB
              var xhr2 = new XMLHttpRequest();
              var url = `http://localhost:3000/replies/${id}`;
              xhr2.open("PATCH", url, true);
              xhr2.setRequestHeader("Content-type", "application/json;charset=UTF-8");
              xhr2.send(JSON.stringify(json));

              score.innerText = newScore;
            }
          });
        }
      } // End patch reply

      // Inside a comment
    } else {
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:3000/comments";
      xhr.open("GET", url, true);
      xhr.send();
      xhr.onreadystatechange = stateChange;

      function stateChange() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          var comments = window.JSON.parse(xhr.responseText);

          // Loop through each comments and look for the comment that match the id that has been clicked
          comments.forEach((comment) => {
            if (comment.id == id) {
              let scoreComment = comment.score;
              let newScore = scoreComment - 1;
              let json = {
                score: newScore,
              };

              // Patch the new score into the DB
              var xhr2 = new XMLHttpRequest();
              var url = `http://localhost:3000/comments/${id}`;
              xhr2.open("PATCH", url, true);
              xhr2.setRequestHeader("Content-type", "application/json;charset=UTF-8");
              xhr2.send(JSON.stringify(json));

              score.innerText = newScore;
            }
          });
        }
      }
    } // End patch comment
  } // End substracting -1 when pressing - button
}); // End event delegation

/*
Define a function that takes a date as an argument
and returns a string that represents how long ago the date was.
Thanks to: https://www.slingacademy.com/article/javascript-how-to-convert-date-time-to-time-ago/
*/
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + " years ago";
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + " months ago";
  }

  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return interval + " weeks ago";
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + " days ago";
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + " hours ago";
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + " minutes ago";
  }

  if (seconds < 10) return "just now";

  return Math.floor(seconds) + " seconds ago";
}
