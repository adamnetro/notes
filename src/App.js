import React, { useState, useEffect } from "react";
import LefttList from "./components/LeftList";
import { ParentNote, EnterNewNote, NoteContact } from "./components/ParentNote";
function App() {
  const [notes, setNotes] = useState([]);
  const [createNote, setCreateNote] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [noteClick, setNoteClick] = useState(null);
  const [idV, setIdV] = useState("");
  const [titleV, setTitleV] = useState("");
  const [textV, setTextV] = useState("");
  useEffect(() => {
    if (localStorage.getItem("notes")) {
      setNotes(JSON.parse(localStorage.getItem("notes")));
    } else {
      localStorage.setItem("notes", "[]");
    }
  }, []);

  // جميع تعريفات useState في object لنقلها عبر مكونات بإستخدام props
  const AllStateProps = {
    notes,
    setNotes,
    createNote,
    setCreateNote,
    editNote,
    setEditNote,
    noteClick,
    setNoteClick,
    idV,
    setIdV,
    titleV,
    setTitleV,
    textV,
    setTextV,
  };

  return (
    <div className="ParentPage">
      <LefttList {...AllStateProps}></LefttList>
      <ParentNote {...AllStateProps}>
        {(createNote || editNote) && <EnterNewNote {...AllStateProps} />}
        {noteClick !== null && !createNote && !editNote && (
          <NoteContact {...AllStateProps} />
        )}
      </ParentNote>
    </div>
  );
}

export default App;
