import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/CreateClient";
import SubmitFeedback from "./SubmitFeedback";
import { useMutation } from "@tanstack/react-query";

function Feedback() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  // 1️⃣ حط كل الـ Hooks هنا في الأول بالترتيب
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true); // حالة عشان تمنع الـ Access Denied الوهمي في البداية
  const [hover, setHover] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    userType: "individual",
    rating: 0,
    comment: ""
  });

  const { mutate, isPending } = useMutation({
    mutationFn: ({ data, token }) => SubmitFeedback(data, token),
  });

  // 2️⃣ الـ useEffect للتحقق
  useEffect(() => {
    const checkToken = async () => {
      try {
        const { data } = await supabase
          .from("feedback_links")
          .select("*")
          .eq("token", token)
          .eq("used", false)
          .single();

        if (data) setValid(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) checkToken();
    else setLoading(false);
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ data: formData, token: token });
  };

  // 3️⃣ الـ Conditional Rendering (الـ Returns الفرعية) لازم تكون بـعـد الـ Hooks
  if (loading) return <h1 className="text-center mt-20 text-white">جاري التحقق...</h1>;
  if (!valid) return <h1 className="text-center mt-20 text-white">Access Denied</h1>;

  // 4️⃣ الـ UI الأساسي
  return (
    <div className="min-h-screen flex items-center justify-center px-4 mt-20">
      <div className="w-full max-w-lg backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-8 transition-all duration-500">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            شاركنا رأيك
          </h2>
          <p className="text-gray-500 mt-2 text-sm">رأيك بيفرق معانا جداً وبيساعدنا نتحسن</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* الإسم */}
          <div className="relative">
            <input
              type="text"
              required
              placeholder=" "
              className="text-right mt-2 peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <label className="absolute right-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              الإسم
            </label>
          </div>

          {/* نوع المستخدم */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 text-right">أنا أريد التقييم كـ</label>
            <select
              dir="rtl"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
            >
              <option value="individual">شخص عادي (عميل)</option>
              <option value="business">صاحب بزنس / شركة</option>
            </select>
          </div>

          {/* التقييم */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3 text-right">تقييمك للخدمة</label>
            <div className="flex flex-row-reverse justify-center gap-2">
              {[...Array(5)].map((_, index) => {
                const ratingValue = 5 - index;
                return (
                  <button
                    key={ratingValue}
                    type="button"
                    className={`text-4xl transition-all duration-200 transform hover:scale-125 ${
                      ratingValue <= (hover || formData.rating) ? "text-yellow-400 drop-shadow-md" : "text-gray-300"
                    }`}
                    onClick={() => setFormData({ ...formData, rating: ratingValue })}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  >★</button>
                );
              })}
            </div>
          </div>

          {/* التعليق */}
          <div className="relative">
            <textarea
              required
              rows="4"
              placeholder=" "
              className="mt-2 text-right peer w-full px-4 pt-5 pb-2 rounded-xl border border-gray-300 bg-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            ></textarea>
            <label className="absolute right-4 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
              تعليق
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all duration-200 shadow-lg active:scale-95"
          >
            {isPending ? "جاري الإرسال..." : "إرسال التقييم"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;