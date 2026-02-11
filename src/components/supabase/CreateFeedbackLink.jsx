import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/CreateClient";

const CreateFeedbackLink = async (email) => {
  const token = uuidv4();

  const { error } = await supabase.from("feedback_links").insert([
    {
      token: token,
      email: email,
    },
  ]);

  if (error) {
    console.log(error);
    return null;
  }

  const link = `${window.location.origin}/feedback?token=${token}`;

  return link;
};

export default CreateFeedbackLink;
