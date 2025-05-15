// src/components/Header.js
import React from "react";

const Header = () => {
  const today = new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
  return (
    <div className="text-center mb-6">
      <div className="text-sm text-gray-500">{today}</div>
      <h1 className="text-3xl font-bold">로컬드림 뉴스</h1>
    </div>
  );
};

export default Header;
