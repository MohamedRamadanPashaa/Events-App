import Link from "next/link";

import classes from "./button.module.css";

const Button = ({ link, onClick, children }) => {
  return link ? (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  ) : (
    <button className={classes.btn} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
