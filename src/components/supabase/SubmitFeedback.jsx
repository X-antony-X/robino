import { supabase } from "@/createClient";

const SubmitFeedback = async (feedbackData, token) => {
  const { data } = await supabase
    .from("feedback_links")
    .select("*")
    .eq("token", token)
    .eq("used", false)
    .single();

  if (!data) {
    alert("الرابط غير صالح");
    return;
  }

  await supabase.from("feedback").insert([
    {
      email: data.email,
      name: feedbackData.name,
      business_name:
        feedbackData.userType === "business"
          ? feedbackData.name
          : null,
      user_type: feedbackData.userType,
      rating: feedbackData.rating,
      message: feedbackData.comment,
    },
  ]);

  await supabase
    .from("feedback_links")
    .update({ used: true })
    .eq("token", token);

  alert("تم إرسال الفيدباك ✅");
};

export default SubmitFeedback;
