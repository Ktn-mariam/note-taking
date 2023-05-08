import React, { useContext } from 'react'
import { Box, Input, Textarea, Flex, HStack } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import NoteListContext from './helpers/context'
import getTime from './helpers/getTime'
import TagItem from './Tag'

const Main = () => {
  const noteCtx = useContext(NoteListContext)
  return (
    <Box bgColor="#22223B" p="15px">
      <Flex
        justifyContent="space-between"
        p="10px"
        pt="0px"
        color="whiteAlpha.800"
      >
        <Flex>
          <Box fontWeight="light">Last Modified:</Box>
          <Box ml="5px">
            {noteCtx.noteList
              .filter((item) => {
                return item.id === noteCtx.current
              })
              .map((item) => `${item.time}`)}
          </Box>
        </Flex>
        <DeleteIcon
          _hover={{
            cursor: 'pointer',
            boxShadow: 'rgba(255, 255, 255) 0px 7px 29px 0px;',
            bgColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
          }}
          color="white"
          onClick={() => {
            noteCtx.updateList(() => {
              return noteCtx.noteList.filter((item) => {
                return item.id !== noteCtx.current
              })
            })
            noteCtx.updateCurrent((current) => {
              const arrIds = noteCtx.noteList.map((item) => {
                return item.id
              })
              const index = arrIds.indexOf(current)
              arrIds.splice(index, 1)
              console.log(arrIds)
              const newCurrent = Math.max(...arrIds)
              console.log(newCurrent)
              return newCurrent
            })
          }}
        />
      </Flex>
      <Input
        focusBorderColor="whiteAlpha.800"
        color="whiteAlpha.900"
        placeholder="Add Title"
        size="lg"
        value={noteCtx.noteList
          .filter((item) => {
            return item.id === noteCtx.current
          })
          .map((item) => `${item.title}`)}
        onChange={(event) => {
          noteCtx.updateList([
            ...noteCtx.noteList
              .filter((item) => {
                return item.id === noteCtx.current
              })
              .map((item) => {
                return { ...item, title: event.target.value, time: getTime() }
              }),
            ...noteCtx.noteList.filter((item) => {
              return item.id !== noteCtx.current
            }),
          ])
        }}
      />
      <Textarea
        focusBorderColor="whiteAlpha.800"
        color="whiteAlpha.900"
        placeholder="Note..."
        h="588px"
        size="lg"
        mt="10px"
        value={noteCtx.noteList
          .filter((item) => {
            return item.id === noteCtx.current
          })
          .map((item) => `${item.content}`)}
        onChange={(event) => {
          noteCtx.updateList([
            ...noteCtx.noteList
              .filter((item) => {
                return item.id === noteCtx.current
              })
              .map((item) => {
                return {
                  ...item,
                  content: event.target.value,
                  time: getTime(),
                }
              }),
            ...noteCtx.noteList.filter((item) => {
              return item.id !== noteCtx.current
            }),
          ])
        }}
      />
      <Flex>
        {noteCtx.noteList.length !== 0 && (
          <HStack
            mt="10px"
            mr={
              noteCtx.noteList.filter((item) => {
                return item.id === noteCtx.current
              })[0].tags.length !== 0
                ? '10px'
                : '0px'
            }
          >
            {noteCtx.noteList
              .filter((item) => {
                return item.id === noteCtx.current
              })[0]
              .tags.map((tag) => {
                return <TagItem key={tag} tag={tag} />
              })}
          </HStack>
        )}
        <Input
          focusBorderColor="whiteAlpha.800"
          color="whiteAlpha.900"
          placeholder="Add Tag..."
          size="md"
          mt="10px"
          onKeyDown={(event) => {
            if (event.keyCode === 13 || event.keyCode === 32) {
              noteCtx.updateList([
                ...noteCtx.noteList
                  .filter((item) => {
                    return item.id === noteCtx.current
                  })
                  .map((item) => {
                    if (
                      !item.tags
                        .map((tag) => {
                          return tag.toLowerCase()
                        })
                        .includes(event.target.value.toLowerCase())
                    ) {
                      return {
                        ...item,
                        time: getTime(),
                        tags: [
                          ...item.tags,
                          ...(event.target.value.length !== 0
                            ? [event.target.value]
                            : []),
                        ],
                      }
                    }
                    return item
                  }),
                ...noteCtx.noteList.filter((item) => {
                  return item.id !== noteCtx.current
                }),
              ])
              event.target.value = ''
            }
          }}
        />
      </Flex>
    </Box>
  )
}

export default Main
