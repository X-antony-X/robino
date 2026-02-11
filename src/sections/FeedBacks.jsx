import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/CreateClient';

const FeedBacks = () => {

const [currentIndex, setCurrentIndex] = useState(0);

const { data: feedbacks = [], isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false }); // ترتيب الأحدث أولاً
      if (error) throw error;
      return data;
    },
  });

  // حالة التحميل
  if (isLoading) return <div className="text-center mt-20 text-white">جاري تحميل التقييمات...</div>;
  if (feedbacks.length === 0) return <div className="text-center mt-20 text-white">لا توجد تقييمات حالياً.</div>;

  // ========= logic =========
  const chunkSize = 4;
  const chunks = [];
  for (let i = 0; i < feedbacks.length; i += chunkSize) {
    chunks.push(feedbacks.slice(i, i + chunkSize));
  }

  const next = () => {
    if (currentIndex < chunks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // ========= UI =========
  return (
    <div className="flex flex-col items-center justify-center mt-20 text-white">



        <div className="relative w-full max-w-5xl overflow-hidden">


        {/* arrows */}
        <div className="flex justify-between items-center mb-6 px-6">
            <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="flex items-center justify-center w-12 h-12 rounded-full 
                        bg-neutral-900 border border-neutral-700 
                        text-white hover:bg-neutral-800 
                        transition disabled:opacity-30"
            >
                ←
            </button>

            <button
                onClick={next}
                disabled={currentIndex === chunks.length - 1}
                className="flex items-center justify-center w-12 h-12 rounded-full 
                        bg-neutral-900 border border-neutral-700 
                        text-white hover:bg-neutral-800 
                        transition disabled:opacity-30"
            >
                →
            </button>
        </div>


        {/* slider */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {chunks.map((group, i) => (
            <div
              key={i}
              className="min-w-full grid grid-rows-2 md:grid-rows-4 gap-4 px-4"
            >
              {group.map((feedback) => (
<div
  key={feedback.id}
  className="bg-neutral-900 p-5 rounded-md shadow-md flex justify-between gap-4"
>
  <div className="flex flex-col gap-2 text-xs text-gray-400">
    <span>{new Date(feedback.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'})}</span>

    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z" />
        </svg>
      ))}
    </div>
  </div>

  <div className="text-right flex-1">
    <span className="block font-medium">{feedback.name}</span>

    <p className="mt-3 font-semibold">{feedback.message}</p>

    <p className="mt-2 text-sm text-gray-500">
      {feedback.user_type === 'business' ? 'Business Partner' : 'Individual Client'}
    </p>
    <p className="mt-2 text-sm text-gray-700">
      Robino | روبينو
    </p>
  </div>
</div>







              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedBacks;
