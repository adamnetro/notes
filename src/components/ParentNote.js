import React from "react";
import styled from "styled-components";
import ErrMessage from "./ErrMessage";

const NoteReview = styled.div`
  position: relative;
  background: var(--clr-2);
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  gap: 1em;
  overflow: hidden;
`;

const InputTitle = styled.input`
  width: 20em;
  background: var(--clr-3);
  color: var(--clr-txt);
  font-size: 1.7em;
  padding: 10px;
  border-radius: 13px;
  border: none;
  outline: none;
`;

const InputText = styled(InputTitle).attrs({ as: "textarea" })`
  height: 100%;
  width: 100%;
  font-size: 1.3em;
  resize: none;
`;

const BtnDone = styled.button`
  background: var(--clr-df);
  color: var(--clr-txt);
  width: max-content;
  font-size: 1.3em;
  padding: 7px 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  user-select: none;
  transition: 0.1s ease;

  &:hover {
    opacity: 0.7;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const BtnCancel = styled(BtnDone)`
  background: var(--clr-4);
`;

const ParentBtn = {
  display: "flex",
  justifyContent: "end",
  gap: "1em",
};

const Title = styled.h1`
  font-size: 2.3em;
  color: var(--clr-txt);
`;

const Text = styled(Title).attrs({ as: "textarea" })`
  background: none;
  font-size: 1.5em;
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  resize: none;
`;

function ParentNote({ children, notes, createNote, editNote, noteClick }) {

  // تحديد شروط حتى يظهر محتوى معين للصفحة 
  function StateMss() {
    const stateMss = notes.findIndex(note => note.id)
    if (stateMss === -1 && !editNote && !createNote) {
      return <ErrMessage contact="You have no notes :(" />;
    } else if (noteClick === null) {
      return <ErrMessage contact="Choose a note" />;
    }else if (editNote || createNote || noteClick >= 0) {
      return children;
    }
  }
  return <NoteReview>{StateMss()}</NoteReview>;
}

function EnterNewNote({
  notes,
  setNotes,
  setNoteClick,
  noteClick,
  setCreateNote,
  editNote,
  setEditNote,
  idV,
  titleV,
  setTitleV,
  textV,
  setTextV,
}) {

  // عمل حفظ للملاحظة المشأة و تحديد حفظ هل هو حفظ كا ملااحظة جديدة او كتعديل
  function Done() {
    // شرط يجب ان يكون عنوان الملاحظة له قيمة مع trim() في حالة اذا كان عنوان له قيمة مسافة space
    if (titleV.trim()) {
      // اخد قيم ملاحظة منشأة او المعدلة و ادخالها في كائن object
      const newNote = {
        id: new Date(),
        title: titleV.trim(),
        text: textV,
      };

      // تحقق مما اذا كان العنوان مستخدم بالفعل

      let TitleHere = false;
      const findSamsTitle = notes.findIndex(
        (note) => note.title === newNote.title
      );
      findSamsTitle >= 0 ? (TitleHere = true) : (TitleHere = false);

      // شرط اذا كان مطلوب ملاحظة جديدة او تعديل
      if (!editNote) {
        if (TitleHere) { // شرط اذا كان العنوان فارغ
          alert("This title already used");
        } else {
          localStorage.setItem("notes", JSON.stringify([...notes, newNote]));
          setCreateNote(false);
        }
      } else {

        // سماح لتعديل ملاحظة حتى و ان كان عنوانها مكرر

        if (TitleHere && notes[noteClick].id !== idV) {
          alert("This title already used");
        } else {
          let newSaveNote = notes;
          newSaveNote.splice(noteClick, 1, newNote);
          localStorage.setItem("notes", JSON.stringify(newSaveNote));
          setEditNote(false);
        }
      }
      setNotes(JSON.parse(localStorage.getItem("notes")));
      setNoteClick(null);
      setTitleV();
      setTextV();
    } else {
      alert("Type a title");
    }
  }

  // عمل إلغاء للملاحظة قيد إنشاء او تعديل
  function stagesCancel() {
    setNoteClick(null);
    setCreateNote(false);
    setEditNote(false);
    setTitleV();
    setTextV();
  }
  function Cancel() {
    if(titleV || textV){
    let confirmCancel = window.confirm('Do you sure you want to Cancel this')
    confirmCancel && stagesCancel()
    }else{
      stagesCancel()
    }
  }

  return (
    <NoteReview>
      <InputTitle
        value={titleV}
        onChange={(e) => setTitleV(e.target.value)}
        placeholder="Type a title"
        maxLength={20}
      />
      <InputText
        value={textV}
        onChange={(e) => setTextV(e.target.value)}
        placeholder="Type a Note"
        maxLength={5000}
      />
      <div style={ParentBtn}>
        <BtnCancel onClick={() => Cancel()}>Cancel</BtnCancel>
        <BtnDone onClick={() => Done()}>Done</BtnDone>
      </div>
    </NoteReview>
  );
}

function NoteContact({ titleV, textV }) {
  return (
    <NoteReview>
      <Title>{titleV}</Title>
      <hr></hr>
      <Text readOnly value={textV}></Text>
    </NoteReview>
  );
}

export { ParentNote, EnterNewNote, NoteContact };
