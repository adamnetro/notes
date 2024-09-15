import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

const DivParentList = styled.div`
  width: 30em;
  display: flex;
  gap: 1em;
  flex-direction: column;
`;

const ParentList = styled.div`
  background: var(--clr-2);
  display: flex;
  flex-direction: column;
  height: max-content;
  max-height: 90vh;
  border-radius: 25px;
  overflow-y: scroll;
`;

const NameNotes = styled.a`
  color: var(--clr-txt);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.3em;
  cursor: pointer;
  user-select: none;
  text-overflow: ellipsis;
  transition: 0.1s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const AddNote = styled(NameNotes)`
  background: var(--clr-3);
  border-radius: 25px;

  &:hover {
    opacity: 1;
    background: var(--clr-df);
  }

  &:active {
    transform: scale(0.97);
  }
`;

const Logo = styled.a`
  color: var(--clr-df);
  font-size: 2em;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
`;

export default function LefttList({
  notes,
  setCreateNote,
  setEditNote,
  noteClick,
  setNoteClick,
  setIdV,
  setTitleV,
  setTextV,
}) {
  const [ntHover, setNntHover] = useState();

  // عمل ملاحظة جديدة
  function BtnAddNote() {
    if (notes.length <= 9) {
      setNoteClick("");
      setTitleV("");
      setTextV("");
      setEditNote(false);
      setCreateNote(true);
    } else {
      alert("Your limit is 10 Notes");
    }
  }

  // إعطاء لون مختلف للملاحظة المظغوط عليها و عرض محتواها في مكون اخر
  function NameClick(id) {
    setNoteClick(id);
    setNntHover();

    if (notes[id]) {
      setIdV(notes[id].id);
      setTitleV(notes[id].title);
      setTextV(notes[id].text);

    // إفراغ محتوى نصي للملاحظة عند تحديدها اذا كان المستخدم لم يدخل اي قيمة لها
      if (!notes[id].text) {
        setTextV("");
      }
    }
  }

  // عمل تعديل للملاحظة و تحديد بان المطلوب هو تعديل بدل إنشاء 
  function EditOne(id) {
    setEditNote(true);
    setCreateNote(false);
    setTitleV(notes[id].title);
    setTextV(notes[id].text);
  }

  // عمل حذف للملاحظة المحددة و لكن قبل ذالك اعطاء خيار تأكيد او الغاء في حالة ظغط حذف بالغلط
  function DeleteOne(id) {
    let confirmDlt = window.confirm("Do you sure you want to delete this");
    if (confirmDlt) {
      const newSaveNote = notes;
      newSaveNote.splice(id, 1);
      localStorage.setItem("notes", JSON.stringify(newSaveNote));
      setTimeout(() => {
        setNoteClick(null);
      }, 0);
    }
  }

  return (
    <DivParentList>
      <Logo href="/">ORANIOM NOTES</Logo>
      <ParentList>
        {notes.map((titleNote, id) => (
          <NameNotes
            className={noteClick === id && "ClickNt"}
            key={id}
            onClick={() => NameClick(id)}
            onMouseOver={() => setNntHover(id)}
            onMouseOut={() => setNntHover()}
          >
            {titleNote.title}

            {(ntHover === id || noteClick === id) && (
              <main className="settingNt">
                <FontAwesomeIcon
                  onClick={() => DeleteOne(id)}
                  icon={faTrashCan}
                />
                <FontAwesomeIcon onClick={() => EditOne(id)} icon={faPencil} />
              </main>
            )}
          </NameNotes>
        ))}
      </ParentList>
      <AddNote onClick={() => BtnAddNote()}>
        <FontAwesomeIcon icon={faPlus} />
        Add Note
      </AddNote>
    </DivParentList>
  );
}
