import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";

import { profileTabs } from "@/constants";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";

async function Page() {
  // TO CHECK IF USER EXISTS
  const user = await currentUser();
  if (!user) return null;

  // TO CHECK IF USER HAS BEEN PROPERLY ONBOARDED OR REDIRECT TO ONBOARDING PAGE

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  //TO FETCH ALL THE USERS

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  return (
    <section>
      <h1 className="head-text mb-10">Users</h1>

      {/* SEARCH BAR */}

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p>NO USERS</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
