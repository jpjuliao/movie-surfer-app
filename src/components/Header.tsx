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
        w-full
        px-4
        py-3
        flex
        bg-white
        dark:bg-gray-900
        shadow
      "
    >
      {isHome ? (
        <h1
          className="
            text-3xl
            font-bold
            text-gray-900
            dark:text-white
          "
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
          <button
            className="
              items-center
              text-gray-700
              dark:text-gray-200
              hover:text-blue-500
              mb-2
              flex
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
                mr-2
              "
            />
          </button>
          <h2
            className="
              text-xl
              font-semibold
              text-gray-800
              dark:text-gray-100
            "
          >
            Movie Details
          </h2>
          {movieTitle && (
            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
                dark:text-white
                mt-1
              "
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