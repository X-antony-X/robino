import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { GetUser } from "./GetUser";
import { AddUser } from "./AddUser";
import { updateUser } from "./updateUser";
import { deleteUser } from "./deleteUser";

function FormUsers() {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editId, setEditId] = useState(null);
  const [customMessage, setCustomMessage] = useState("");

  const sendWhatsAppMessage = (phone, name) => {
    let formattedPhone = phone.replace(/\D/g, "");

    if (formattedPhone.startsWith("0")) {
      formattedPhone = "20" + formattedPhone.slice(1);
    }

    const message =
      customMessage || `Hello ${name}, I am contacting you from our website robino`;

    const url = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: GetUser,
  });

  const addMutation = useMutation({
    mutationFn: AddUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editId) {
      updateMutation.mutate({ id: editId, name, phone });
      setEditId(null);
    } else {
      addMutation.mutate({ name, phone });
    }

    setName("");
    setPhone("");
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setPhone(user.phone);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setName("");
    setPhone("");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-4xl space-y-6">

        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-xl font-bold mb-4">
            {editId ? "Update User" : "Add User"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-md p-2 w-full"
            />

            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-md p-2 w-full"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={addMutation.isLoading || updateMutation.isLoading}
                className={`w-full py-2 rounded-md text-white ${
                  editId ? "bg-yellow-500" : "bg-blue-600"
                }`}
              >
                {editId ? "UPDATE" : "ADD"}
              </button>

              {editId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full py-2 rounded-md bg-gray-400 text-white"
                >
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold mb-3">WhatsApp Message</h3>

          <textarea
            placeholder="اكتب هنا الرسالة اللي هتتبعت على واتساب"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={3}
            className="w-full border rounded-md p-3 resize-none placeholder:text-right text-right"
          />
        </div>


        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="3" className="p-4 text-center">
                    Loading...
                  </td>
                </tr>
              )}

              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-4 text-center text-gray-500">
                    No users yet
                  </td>
                </tr>
              )}

              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-md"
                      >
                        Delete
                      </button>
                    <button
                      onClick={() => sendWhatsAppMessage(user.phone, user.name)}
                      className="bg-blue-950 text-blue-400 border border-blue-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 active:brightness-150 hover:border-t-4 active:border-t-4 hover:border-b active:border-b active:opacity-75 outline-none duration-300 group"
                    >
                      <span className="bg-blue-400 shadow-blue-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-active:top-[150%] group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]" />
                      MESSAGE
                    </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FormUsers;
