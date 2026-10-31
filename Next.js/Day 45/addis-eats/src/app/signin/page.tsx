import { redirect } from "next/navigation";
import { setSession, clearSession, getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

interface PageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function SignInPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const nextUrl = params.next || "/";
  const user = await getSession();

  async function handleSignIn(formData: FormData) {
    "use server";
    const name = formData.get("name") as string || "Guest Customer";
    const role = formData.get("role") as string || "customer";
    const id = role === "staff" ? "usr_staff_01" : "usr_customer_42";

    // Set secure cookie session
    await setSession({ id, name, role });

    // Open-redirect protection: verify 'next' starts with '/'
    let destination = nextUrl;
    if (!destination.startsWith("/")) {
      destination = "/";
    }

    revalidatePath("/");
    redirect(destination);
  }

  async function handleSignOut() {
    "use server";
    await clearSession();
    revalidatePath("/");
    redirect("/");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h1>{user ? `Signed in as ${user.name} (${user.role})` : "Sign In to Addis Eats"}</h1>
      
      {user ? (
        <form action={handleSignOut}>
          <button type="submit" style={{ padding: "0.6rem 1.2rem", background: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Sign Out
          </button>
        </form>
      ) : (
        <form action={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Your Name:</label>
            <input name="name" defaultValue="Almaz" required style={{ width: "100%", padding: "0.5rem" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem" }}>Role:</label>
            <select name="role" style={{ width: "100%", padding: "0.5rem" }}>
              <option value="customer">Customer</option>
              <option value="staff">Staff / Kitchen</option>
            </select>
          </div>

          <button type="submit" style={{ padding: "0.7rem", background: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Sign In Securely
          </button>
        </form>
      )}
    </main>
  );
}
