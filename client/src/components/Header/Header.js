import "./header.css";
import Typewriter from "typewriter-effect";

const title = "Vitajte v Generátore UI Schém";

function Header() {
  return (
    <header className="header">
      <h3 className="header-nadpis">
        <Typewriter
          options={{
            strings: [title],
            autoStart: true,
            loop: false,
            cursor: "!",
            pauseFor: Number.MAX_SAFE_INTEGER,
            delay: 40,
          }}
        />
      </h3>
    </header>
  );
}

export default Header;