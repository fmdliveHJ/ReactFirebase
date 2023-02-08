import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function DiaryForm({ uid }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { addDocument, response } = useFirestore("diary");

  const handleData = (e) => {
    if (e.target.id === "tit") {
      setTitle(e.target.value);
    } else if (e.target.id === "txt") {
      setText(e.target.value);
    }
  };

  useEffect(() => {
    if (response.success) {
      setText("");
      setTitle("");
    }
  }, [response.success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, text);
    addDocument({ uid, title, text });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>일기 쓰기</legend>
          <label htmlFor="tit">일기 제목 : </label>
          <input
            id="tit"
            type="text"
            required
            onChange={handleData}
            value={title}
          />

          <label htmlFor="txt">일기 내용 : </label>
          <textarea
            id="txt"
            type="text"
            required
            onChange={handleData}
            value={text}
          ></textarea>

          <button type="submit">저장하기</button>
        </fieldset>
      </form>
    </>
  );
}
