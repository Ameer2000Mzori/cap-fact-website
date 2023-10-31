import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./Header.css";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fact, setFact] = useState([]);

  useEffect(function () {
    async function getFacts() {
      let { data: facts, error } = await supabase.from("facts").select("*");
      setFact(facts);
    }
    getFacts();
  }, []);

  return (
    <>
      <section className="header">
        <section className="header-wrap">
          <div className="btnwrap">
            <h1 className="title">TODAY I LEARNED</h1>
            <button
              className="showbtn "
              onClick={() => setMenuOpen((on) => !on)}
            >
              {!menuOpen ? "SHOW" : "HIDE"}
            </button>
          </div>
          {menuOpen ? (
            <FormInfo setFact={setFact} setMenuOpen={setMenuOpen} />
          ) : null}

          <div className="list-aside-wrap">
            <aside className="asidebtn">
              <AsideButtons></AsideButtons>
            </aside>

            <div className="lists">
              <ul id="ul-list">
                {fact.map((fact) => (
                  <List key={fact.id} fact={fact}></List>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

const AsideButtons = () => {
  return (
    <>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          id="catagorybtn"
          style={{ backgroundColor: cat.color }}
          className="all"
        >
          {cat.name}
        </button>
      ))}
    </>
  );
};

const FormInfo = ({ setFact, setMenuOpen }) => {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [catgo, setCatgo] = useState("technology");
  const date = new Date();
  const thisyear = date.getFullYear();
  function submitHandler(e) {
    e.preventDefault();

    if (!text || !link || catgo || text.length <= 200) {
      const factObj = {
        id: Math.round(Math.random() * 100000000),
        text,
        source: link,
        category: catgo,
        like: 0,
        super_like: 0,
        dislike: 0,
        createdIn: thisyear,
      };
      setFact((facts) => [factObj, ...facts]);
      setText("");
      setLink("");
      setCatgo("technology");
      setMenuOpen(false);
    }
  }

  return (
    <>
      <form className={`formwrap `} onSubmit={submitHandler} action="">
        <input
          id="first-input"
          className="input-el"
          type="text"
          placeholder="share your facts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="quantity-of-letters-left">{text.length}/200</div>
        <input
          id="second-input"
          className="input-el"
          type="text"
          placeholder="share your link..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <select
          className="selection-menu"
          value={catgo}
          onChange={(e) => setCatgo(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <button className="postbtn">POST</button>
      </form>
    </>
  );
};

const List = ({ fact }) => {
  return (
    <>
      <li id={fact.id}>
        <p>
          {fact.text}
          <br />
          <a href={fact.link} target="_blank">
            (VIDEO LINK)
          </a>
        </p>
        <div className="intract-btn-wrap">
          <strong className="catagory-list">{fact.category}</strong>

          <div className="button-wrap">
            <button className="likebtn">👍{fact.like}</button>
            <button className="superlikebtn">🔥{fact.super_like}</button>
            <button className="dislikebtn">👎{fact.dislike}</button>
          </div>
        </div>
      </li>
    </>
  );
};

export default Header;

//example obj :

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     like: 24,
//     super_like: 9,
//     dislike: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     like: 11,
//     super_like: 2,
//     dislike: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     like: 8,
//     super_like: 3,
//     dislike: 1,
//     createdIn: 2015,
//   },
// ];
