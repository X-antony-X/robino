function Message() {
    return (

<div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
  <h3 className="text-gray-900 pb-2 text-xl font-bold sm:text-2xl">تم استلام طلبك بنجاح</h3>
  <span className="bg-blue-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded" />
  
  <div className="text-right mb-10 space-y-4 rtl">
    <p className="text-gray-600 text-base leading-relaxed font-bold">إيه الخطوة الجاية؟</p>
    
    <ul className="text-gray-500 text-sm space-y-3">
      <li>✅ <span className="font-bold text-gray-700">مراجعة الطلب:</span> فريق "روبينو" هيراجع بياناتك وصورك الآن.</li>
      <li>📞 <span className="font-bold text-gray-700">التواصل:</span> هنبعتلك رسالة على الواتساب لتأكيد السعر النهائي وشكل الموك أب.</li>
      <li>💳 <span className="font-bold text-gray-700">الدفع:</span> متاح الدفع عبر (إنستا باي، فودافون كاش، أو فيزا) بعد الاتفاق.</li>
      <li>🚚 <span className="font-bold text-gray-700">التنفيذ:</span> بنبدأ طباعة فور تأكيدك للطلب، والشحن بياخد من 3 لـ 5 أيام.</li>
    </ul>
  </div>

  <div className="flex flex-wrap gap-4">
    <div className="flex-1">
      <button className="text-gray-900 block w-full rounded-lg border border-gray-200 p-3 text-center text-base font-medium transition hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600">
        العودة للرئيسية
      </button>
    </div>
    <div className="flex-1">
      <button className="bg-green-600 whitespace-nowrap border-green-600 block w-full rounded-lg border p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90 flex items-center justify-center gap-2">
        <span>تواصل معنا واتساب</span>
      </button>
    </div>
  </div>
</div>

    )
}

export default Message