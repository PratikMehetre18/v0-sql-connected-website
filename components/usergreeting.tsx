import { cookies } from "next/headers";

export default function UserGreeting() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");

  if (!authCookie) return null;

  let username: string | undefined;

  try {
    const user = JSON.parse(authCookie.value);
    // adjust these fields if your user object is different
    username = user.username || user.full_name;
  } catch {
    return null;
  }

  if (!username) return null;

  return (
    <span className="text-sm font-medium">
      Hi {username}
    </span>
  );
}
