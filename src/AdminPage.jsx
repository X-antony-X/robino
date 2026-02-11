import { useState } from "react";
import CreateFeedbackLink from "./components/supabase/CreateFeedbackLink";

function AdminPage() {
  const [email, setEmail] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleGenerateLink = async () => {
    const link = await CreateFeedbackLink(email);

    if (link) {
      setGeneratedLink(link);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-right">إنشاء رابط فيدباك</h2>

      <input
        type="email"
        placeholder="اكتب إسم الشخص"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-center w-full border p-2 rounded mb-4"
      />

      <button
        onClick={handleGenerateLink}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        إنشاء الرابط
      </button>

      {generatedLink && (
        <div className="mt-4 p-3 bg-gray-100 rounded break-all">
          {generatedLink}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
