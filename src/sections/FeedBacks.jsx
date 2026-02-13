import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from '@/CreateClient';
import FeedbackLoader from '@/loaders/FeedbackLoader';

const FeedBacks = () => {

const [currentIndex, setCurrentIndex] = useState(0);

const { data: feedbacks = [] , isLoading} = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

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

  return (
    <div className="flex flex-col items-center justify-center mt-20 text-white">
      <div className="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full" />
          <span className="absolute bottom-0 left-0 h-full -ml-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-auto h-full opacity-100 object-stretch" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z" /></svg></span>
          <span className="absolute top-0 right-0 w-12 h-full -mr-3"><svg xmlns="http://www.w3.org/2000/svg" className="object-cover w-full h-full" viewBox="0 0 487 487"><path fillOpacity=".1" fillRule="nonzero" fill="#FFF" d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z" /></svg></span>
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200" />
          <span className="relative text-[25px] font-semibold">FEEDBACKS</span>
      </div>

      <div className="relative w-full max-w-5xl overflow-hidden px-4">
            <div className="flex justify-between items-center mb-6">
              <button onClick={prev} disabled={currentIndex === 0} className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 disabled:opacity-30"> ← </button>
              <button onClick={next} disabled={currentIndex === chunks.length - 1} className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-700 disabled:opacity-30"> → </button>
            </div>
        {isLoading ? (
          <div className="flex flex-col gap-4 w-full">
            <FeedbackLoader />
            <FeedbackLoader />
            <FeedbackLoader />
            <FeedbackLoader />
          </div>
        ) : (
          <>

            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {chunks.map((group, i) => (
                <div key={i} className="min-w-full flex flex-col gap-4">
                  {group.map((feedback) => (
                    <div key={feedback.id} className="bg-neutral-900 p-5 rounded-md shadow-md flex flex-col sm:flex-row justify-between gap-4 w-full">
                      <div className="flex flex-col gap-2 text-xs text-gray-400">
                        <span>{new Date(feedback.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
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
                        <p className="mt-2 text-sm text-gray-700">Robino | روبينو</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedBacks;
