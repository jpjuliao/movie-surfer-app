import { useLocation, useNavigate } from "react-router-dom";
import ArrowLeft from "../assets/arrow-left.svg";

type HeaderProps = {
  movieTitle?: string;
};

const Header = ({ movieTitle }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/";

  return (
    <header
      className="
        flex
        w-full
      "
    >
      {isHome ? (
        <h1
          className="
            font-bold
            text-gray-900
            dark:text-white
            px-5
            py-5
          "
          style={{
            fontSize: "1.25rem",      // 20px
            lineHeight: "1.5rem",     // 24px
          }}
        >
          Pop Movies
        </h1>
      ) : (
        <div
          className="
            flex
            flex-col
            w-full
          "
        >
          <div
            className="
              flex
              items-center
            "
          >
            <button
              className="
                flex
                items-center
                hover:text-blue-500
                px-5
                py-5
              "
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <img
                src={ArrowLeft}
                alt="Back"
                className="
                  w-5
                  h-5
                "
              />
              <span className="sr-only">Back</span>
            </button>
            <h2
              className="
                text-xl
                font-semibold
                text-gray-800
                dark:text-gray-100
                m-0
                pr-5
                py-5
              "
              style={{
                fontSize: "1.25rem",      // 20px
                lineHeight: "1.5rem",     // 24px
                fontWeight: 700,
                fontFamily: "'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif"
              }}
            >
              Movie Details
            </h2>
          </div>
          {movieTitle && (
            <h1
              className="
                text-2xl
                font-bold
                p-5
              "
              style={{
                backgroundColor: "#746A64",
                fontSize: "1.25rem",      // 20px
                lineHeight: "1.5rem",     // 24px
                fontWeight: 500,
              }}
            >
              {movieTitle}
            </h1>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;