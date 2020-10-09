import React, {
  useRef,
  useCallback
} from 'react'
import {
  Flex,
  Box,
  Heading,
  Text,
  Button
} from 'rebass'
import Two from 'two.js'

export default function YoYo() {
  const linearAnim = useRef(null)
  const bezierAnim = useRef(null)

  const linear = useCallback(el => {
    const params = { width: 600, height: 400 }
    const two = new Two(params).appendTo(el)
    const circle = two.makeCircle(100, 200, 50)
    circle.fill = 'orange'
    circle.noStroke()
    circle.opacity = 0.8
    let x = 100
    let dir = 0
    two.bind('update', frameCount => {
      if (frameCount !== 0) {
        circle.translation.set(x, 200)
        if (x <= 100 && dir === 1) {
          x += 4
          dir = 0
        } else if (x >= 500 || dir === 1) {
          x -= 4
          dir = 1
        } else {
          x += 4
        }
      }
      console.log(frameCount)
      console.log(`linear x: ${x}`)
    })
    linearAnim.current = two
  }, [])

  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
  }
  const bezier = useCallback(el => {
    const params = { width: 600, height: 400 }
    const two = new Two(params).appendTo(el)
    const circle = two.makeCircle(100, 200, 50)
    circle.fill = 'blue'
    circle.noStroke()
    circle.opacity = 0.8
    let t = 0
    let x = 100
    two.bind('update', frameCount => {
      t = (frameCount/100) % 1
      const dir = frameCount <= 100 ? 0 : Number(frameCount.toString()[frameCount.toString().length-3]) % 2
      const delta = (easeInOutCubic(t)*2)*4
      circle.translation.set(x, 200)
      if (dir === 0) {
        x += delta
      } else {
        x -= delta
      }
      console.log(`bezier x: ${x}`)
    })
    bezierAnim.current = two
  }, [])

  const play = () => {
    linearAnim.current.play()
    bezierAnim.current.play()
  }
  const stop = () => {
    linearAnim.current.pause()
    bezierAnim.current.pause()
  }

  return (
    <Flex
      flexDirection='column'
      justifyContent='space-evenly'
      alignItems='center'
      height='1200px'
      fontFamily='sans-serif'
      >
      <Heading
        fontFamily='sans-serif'
        >YoYo Animations
      </Heading>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        >
        <Text>
          Linear Interpolation
        </Text>
        <Box
          width='600px'
          height='400px'
          sx={{border: '2px solid black'}}
          bg='blue'
          ref={el => linear(el)}
          ></Box>
      </Flex>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        >
        <Text>
          Bezier Interpolation
        </Text>
        <Box
          width='600px'
          height='400px'
          sx={{border: '2px solid black'}}
          bg='orange'
          ref={el => bezier(el)}
          >
        </Box>
        <Flex
          justifyContent='center'
          width='600px'
          mt='50px'
          >
          <Button
            onClick={play}
            m='3px'
            bg='black'
            sx={{cursor: 'pointer'}}
            >
            Play
          </Button>
          <Button
            onClick={stop}
            m='3px'
            bg='black'
            sx={{cursor: 'pointer'}}
            >
            Stop
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
