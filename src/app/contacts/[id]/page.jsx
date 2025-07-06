"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getContacts, saveContacts } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [contact, setContact] = useState(null);
  const [allContacts, setAllContacts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const saved = getContacts();
    const current = saved.find((c) => c.id === id);
    setContact(current);
    setAllContacts(saved);
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!contact.name.trim()) newErrors.name = "Name is required.";
    if (!contact.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(contact.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!contact.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (isNaN(contact.phone) || contact.phone.length < 10) {
      newErrors.phone = "Phone must be a number with at least 10 digits.";
    }

    if (!contact.address.trim()) newErrors.address = "Address is required.";
    if (!contact.dob.trim()) newErrors.dob = "Date of birth is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!validate()) return;
    const updated = allContacts.map((c) =>
      c.id === contact.id ? contact : c
    );
    saveContacts(updated);
    toast.success("Contact saved!");
    router.push("/");
  };

  if (!contact) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <form className="space-y-4">
        {["name", "email", "phone", "address", "dob"].map((field) => (
          <div key={field} className="space-y-1">
            <Label htmlFor={field} className="capitalize">
              {field}
            </Label>
            <Input
              id={field}
              name={field}
              value={contact[field]}
              onChange={handleChange}
              className={errors[field] ? "border-red-500" : ""}
            />
            {errors[field] && (
              <p className="text-sm text-red-500">{errors[field]}</p>
            )}
          </div>
        ))}

        <Button type="button" onClick={handleSave}>
          Save
        </Button>
      </form>
    </div>
  );
}
