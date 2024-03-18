import { getSession } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const PremiumPage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  if (!session.isPro) {
    return (
      <div className="notPremium">
        <h1>Only premium users can see the content!</h1>
        <Link href="/profile">
          Go to the profile page to upgrade to premium
        </Link>
      </div>
    );
  }
  return (
    <div className="home">
      <h1>Welcome to the Premium Page</h1>
      <p>You can see this page because you are a premium user</p>
    </div>
  );
};

export default PremiumPage;
