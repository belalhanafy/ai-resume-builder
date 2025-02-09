import React from "react";
import errorImg from "@/assets/images/get-notes.png";

const Error = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center">
      {/* <h1 className="text-3xl font-bold text-red-600 mb-4">حدث خطأ!</h1>
      <p className="text-gray-600">الصفحة التي تحاول الوصول إليها غير موجودة.</p> */}
      <img src={errorImg} alt="خطأ" className="w-[60%]" />
    </div>
  );
};

export default Error;
