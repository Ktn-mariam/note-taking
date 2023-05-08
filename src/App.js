import { ChakraProvider, Grid } from '@chakra-ui/react'
import SideBar from './components/Sidebar/SideBar'
import Main from './components/Main'
import { NoteListContextProvider } from './components/helpers/context'

function App() {
  return (
    <ChakraProvider>
      <NoteListContextProvider>
        <Grid templateColumns="300px auto" h="100vh">
          <SideBar />
          <Main />
        </Grid>
      </NoteListContextProvider>
    </ChakraProvider>
  )
}

export default App
