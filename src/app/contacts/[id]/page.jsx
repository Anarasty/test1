"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getContacts, saveContacts } from "@/lib/utils";
import { toast } from "sonner";

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

    if (!contact.name.trim()) {
      newErrors.name = "Name is required.";
    }

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

    if (!contact.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!contact.dob.trim()) {
      newErrors.dob = "Date of birth is required.";
    }

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
          <div key={field}>
            <label className="block capitalize mb-1">{field}</label>
            <input
              className={`border w-full p-2 rounded ${
                errors[field] ? "border-red-500" : "border-gray-300"
              }`}
              name={field}
              value={contact[field]}
              onChange={handleChange}
            />
            {errors[field] && (
              <p className="text-sm text-red-500 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </form>
    </div>
  );
}
