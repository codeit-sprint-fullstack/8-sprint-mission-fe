"use client";

import { createContext, useContext, useState } from "react";

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [comments, setComments] = useState([]);

  const deleteBoard = async (boardId) => {
    try {
      await fetch(`http://localhost:3000/freeboard/${boardId}`, {
        method: "DELETE",
      });
      setBoards((prev) => prev.filter((b) => b.id !== boardId));
    } catch (error) {
      console.error("Board 삭제 ERROR:", error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await fetch(`http://localhost:3000/freeboard/comments/${commentId}`, {
        method: "DELETE",
      });
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Comment 삭제 ERROR:", error);
    }
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        setBoards,
        comments,
        setComments,
        deleteBoard,
        deleteComment,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
