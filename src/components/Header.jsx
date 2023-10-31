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
  const [currentCatgo, setCurrentCatgo] = useState("all");

  useEffect(
    function () {
      let qury = supabase.from("facts").select("*");
      if (currentCatgo !== "all") {
        qury.eq("category", currentCatgo);
      }
      async function getFacts() {
        let { data: facts, error } = await qury

          .order("like", { ascending: false })
          .limit(1000);
        setFact(facts);
      }
      getFacts();
    },
    [currentCatgo]
  );

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
              <AsideButtons setCurrentCatgo={setCurrentCatgo}></AsideButtons>
            </aside>

            <div className="lists">
              <ul id="ul-list">
                {fact.map((fact) => (
                  <List setFact={setFact} key={fact.id} fact={fact} />
                ))}
              </ul>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

const AsideButtons = ({ setCurrentCatgo }) => {
  return (
    <>
      <button
        id="catagorybtn"
        className="all"
        onClick={() => {
          setCurrentCatgo("all");
        }}
      >
        {" "}
        all
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          id="catagorybtn"
          style={{ backgroundColor: cat.color }}
          className="all"
          onClick={() => {
            setCurrentCatgo(cat.name);
          }}
        >
          {cat.name}
        </button>
      ))}
    </>
  );
};

const FormInfo = ({ setFact, setMenuOpen }) => {
  const [text, setText] = useState("");
  const [source, setLink] = useState("");
  const [category, setCatgo] = useState("technology");
  const date = new Date();
  const thisyear = date.getFullYear();

  async function submitHandler(e) {
    e.preventDefault();

    if (text && source && category) {
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      if (error) {
        console.error("Error inserting the fact:", error);
      } else {
        console.log("New fact inserted:", newFact);

        setFact((facts) => [newFact[0], ...facts]);

        setText("");
        setLink("");
        setCatgo("technology");
        setMenuOpen(false);
      }
    } else {
      console.log("Please fill in all fields");
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
          value={source}
          onChange={(e) => setLink(e.target.value)}
        />
        <select
          className="selection-menu"
          value={category}
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

const List = ({ fact, setFact }) => {
  async function handleVote(columnName) {
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();

    if (!error)
      setFact((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    if (error) {
      console.log(error);
    }
  }

  return (
    <>
      <li className="lilist" id={fact.id}>
        <p className="li-p">
          {fact.text}
          <br />
          <a href={fact.source} target="_blank">
            (VIDEO LINK)
          </a>
        </p>
        <div className="intract-btn-wrap">
          <strong className="catagory-list">{fact.category}</strong>

          <div className="button-wrap">
            <button onClick={() => handleVote("like")} className="likebtn">
              👍{fact.like}
            </button>
            <button
              onClick={() => handleVote("super_like")}
              className="superlikebtn"
            >
              🔥{fact.super_like}
            </button>
            <button
              onClick={() => handleVote("dislike")}
              className="dislikebtn"
            >
              👎{fact.dislike}
            </button>
          </div>
        </div>
      </li>
    </>
  );
};

export default Header;
