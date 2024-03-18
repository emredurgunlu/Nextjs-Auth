import Link from "next/link";
import LogoutForm from "./LogoutForm";

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Homepage</Link>
      <Link href="/premium">Premium</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/login">Login</Link>
      <LogoutForm/>
    </nav>
  );
};

export default Navbar;
