import { createContext, useState, useEffect } from 'react'

const NoteListContext = createContext({
  current: 1,
  noteList: [],
  updateList: () => {},
  updateCurrent: () => {},
})

export const NoteListContextProvider = (props) => {
  const [noteList, setNoteList] = useState(() => {
    const items = JSON.parse(localStorage.getItem('ListOfNotes'))
    if (items) {
      return items
    }
    return []
  })
  const [current, setCurrent] = useState(() => {
    const arrIds = noteList.map((item) => {
      return item.id
    })
    const maxId = Math.max(...arrIds)
    return maxId
  })

  useEffect(() => {
    localStorage.setItem('ListOfNotes', JSON.stringify(noteList))
  }, [noteList])

  const contextValue = {
    current,
    noteList,
    updateList: setNoteList,
    updateCurrent: setCurrent,
  }
  return (
    <NoteListContext.Provider value={contextValue}>
      {props.children}
    </NoteListContext.Provider>
  )
}

export default NoteListContext
