import { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { AddProfile } from "./AddProfile";
import { updateProfile } from "./updateProfile";
import { GetProfile } from "./GetProfile";

function MyPortfolio() {
    const queryClient = useQueryClient();

    const { data: existingProfile, isLoading: isFetching } = useQuery({
        queryKey: ["profile"],
        queryFn: GetProfile,
    });

    const [cvText, setCvText] = useState("");
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        if (existingProfile) {
            setCvText(existingProfile.cv || "");
        }
    }, [existingProfile]);

    const { mutate, isLoading: isSaving } = useMutation({
        mutationFn: async () => {
            if (existingProfile?.id) {
                return updateProfile(existingProfile.id, { cv: cvText }, imageFile);
            } else {
                return AddProfile({ cv: cvText }, imageFile);
            }
        },
        onSuccess: () => {
            alert("تم التحديث بنجاح! ✨");
            queryClient.invalidateQueries(["profile"]);
            setImageFile(null);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    };

    if (isFetching) return <div className="text-center p-20 text-gray-400">جاري التحميل...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-black font-sans min-h-screen">
            <header className="mb-10 border-b border-gray-100 pb-4 text-right">
                <h2 className="text-2xl font-light tracking-tight text-gray-900">الملف الشخصي</h2>
                <p className="text-sm text-gray-500">تحكم في بياناتك وصورتك الشخصية</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12" style={{ direction: 'rtl' }}>
                
                <section className="text-right order-2 md:order-1">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">السيرة الذاتية (نص)</label>
                            <textarea 
                                value={cvText} 
                                onChange={(e) => setCvText(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-md focus:ring-1 focus:ring-black focus:border-black outline-none transition-all min-h-[150px] text-sm bg-gray-50 text-right"
                                placeholder="اكتب نبذة عنك هنا..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">صورة البروفايل</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setImageFile(e.target.files[0])} 
                                className="block w-full text-xs text-gray-500 file:ml-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className="w-full py-3 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
                        >
                            {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
                        </button>
                    </form>
                </section>

                <section className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center order-1 md:order-2">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 border-b border-gray-200 w-full pb-2 text-center">المعاينة الحالية</h3>
                    
                    <div className="mb-6">
                        {existingProfile?.img ? (
                            <img 
                                src={existingProfile.img} 
                                alt="Profile" 
                                className="w-44 h-44 object-cover rounded-full border-4 border-white shadow-xl bg-white" 
                            />
                        ) : (
                            <div className="w-44 h-44 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs text-center p-4 border-2 border-dashed border-gray-300">
                                لم ترفع صورة بعد
                            </div>
                        )}
                    </div>

                    <div className="w-full text-right">
                        <label className="text-xs font-bold text-gray-400 block mb-2 underline">السيرة الذاتية الحالية:</label>
                        <div className="bg-white p-4 rounded border border-gray-100 min-h-[120px] shadow-inner">
                            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                                {existingProfile?.cv || "لا يوجد نص متاح حالياً."}
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default MyPortfolio;