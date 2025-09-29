import React from "react";
import BoardBest from "./_components/BoardBest";
import BoardList from "./_components/BoardList";

const BoardPage = async () => {
  return (
    <div>
      {/* 서버로 */}
      <BoardBest />
      {/* 클라이언트로 */}
      <BoardList />
    </div>
  );
};

export default BoardPage;
