// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">Hello world!</h1>
//       <Button>Click me</Button>
//     </div>
//   );
// }

// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
//       <h1 className="text-4xl font-bold mb-4">Welcome to Contact Book</h1>
//       <p className="text-gray-600 mb-6">Manage your contacts easily.</p>
//       <Link href="/contacts">
//         <Button size="lg">Go to Contacts</Button>
//       </Link>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { contactsData } from "@/lib/data";
import { getContacts, saveContacts } from "@/lib/utils";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const saved = getContacts();
    if (saved.length) {
      setContacts(saved);
    } else {
      saveContacts(contactsData);
      setContacts(contactsData);
    }
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr
              key={c.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => router.push(`/contacts/${c.id}`)}
            >
              <td className="p-2 border">{c.name}</td>
              <td className="p-2 border">{c.email}</td>
              <td className="p-2 border">{c.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
