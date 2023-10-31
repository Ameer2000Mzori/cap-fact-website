// import "./style.css";
// import "./navbar.css";
// import "./header.css";

/* <strong class="this-is-cap">#</strong> */

// import { commentsApi } from "./api";
const ulList = document.getElementById("ul-list");

comment();
async function comment() {
  const res = await fetch(
    "https://gmkcuohafgzuzcutplsz.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdta2N1b2hhZmd6dXpjdXRwbHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0NTg3NTIsImV4cCI6MjAxNDAzNDc1Mn0.f3s8JlReGb7ISXBFhOHcVULNRlOGWzJx34z8YKQlO9U",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdta2N1b2hhZmd6dXpjdXRwbHN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg0NTg3NTIsImV4cCI6MjAxNDAzNDc1Mn0.f3s8JlReGb7ISXBFhOHcVULNRlOGWzJx34z8YKQlO9U",
      },
    }
  );
  const data = await res.json();
  console.log(data);
  dataArryfunc(data);
}

ulList.innerHTML = "";
function dataArryfunc(dataArry) {
  const showdata = dataArry.map(
    (fact) => `
    
    <li>
    <p>
      ${fact.text}
      <br />
      <a
        href=    ${fact.link}
        target="_blank"
        >(VIDEO LINK)</a
      >
    </p>
    <div class="intract-btn-wrap">
      <strong class="catagory-list">#${fact.category}</strong>
      <div class="button-wrap">
        <button class="likebtn">👍${fact.like}</button>
        <button class="superlikebtn">🔥${fact.super_like}</button>
        <button class="dislikebtn">👎${fact.dislike}</button>
      </div>
    </div>
  </li>
    `
  );
  ulList.innerHTML = showdata.join("");
}
