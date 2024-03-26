import { RoughNotation } from "react-rough-notation";
import { useNavigate } from "react-router-dom";
import { LogoProps } from "./types";

export const Logo = ({ textSize, animationDelay }: LogoProps): JSX.Element => {
  const navigate = useNavigate();

  const navigateToHomeOnClick = () => {
    navigate("/");
  };

  return (
    <div
      className={`font-logo font-bold text-darkpurple ${textSize} p-1 transition-all hover:cursor-pointer`}
      onClick={navigateToHomeOnClick}
    >
      <RoughNotation
        type="highlight"
        show={true}
        color="#ffff"
        strokeWidth={2}
        padding={10}
        animationDelay={animationDelay}
      >
        Book The Meeting Room
      </RoughNotation>
    </div>
  );
};
