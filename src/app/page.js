"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { contactsData } from "@/lib/data";
import { getContacts, saveContacts } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((c) => (
            <TableRow
              key={c.id}
              onClick={() => router.push(`/contacts/${c.id}`)}
              className="cursor-pointer hover:bg-muted"
            >
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
