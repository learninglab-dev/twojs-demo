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

export default function TwoDemo() {
  const animation = useRef(null)

  const firstTwoEx = useCallback(el => {
    const params = { width: 285, height: 200 }
    const two = new Two(params).appendTo(el)
    const circle = two.makeCircle(72, 100, 50)
    const rect = two.makeRectangle(213, 100, 100, 100)
    circle.fill = '#FF8000'
    circle.stroke = 'orangered'
    circle.linewidth = 5
    rect.fill = 'rgb(0, 200, 255)'
    rect.opacity = 0.75
    rect.stroke = '#1C75BC'
    rect.linewidth = 5
    two.update()
  },[])
  const animatedTwo = useCallback(el => {
    const params = { width: 285, height: 200 }
    const two = new Two(params).appendTo(el)
    const circle = two.makeCircle(-70, 0, 50)
    const rect = two.makeRectangle(70, 0, 100, 100)
    circle.fill = '#FF8000'
    rect.fill = 'rgb(0, 200, 255)'
    rect.opacity = 0.75
    const group = two.makeGroup(circle, rect)
    group.translation.set(two.width / 2, two.height / 2)
    group.scale = 0
    group.noStroke()
    two.bind('update', function(frameCount) {
      if (group.scale > 0.9999) {
        group.scale = group.rotation = 0
    }
    let t = (1 - group.scale) * 0.125
    group.scale += t
    group.rotation += t * 4 * Math.PI
    })
    animation.current = two
  }, [])

  const play = () => {
    animation.current.play()
  }
  const stop = () => {
    animation.current.pause()
  }

  return (
    <Flex
      flexDirection='column'
      justifyContent='space-evenly'
      alignItems='center'
      height='800px'
      fontFamily='sans-serif'
      >
      <Heading
        fontFamily='sans-serif'
        >Two.js Demo
      </Heading>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        >
        <Text>
          First Shapes Demo
        </Text>
        <Box
          width='300px'
          height='200px'
          sx={{border: '2px solid black'}}
          ref={el => firstTwoEx(el)}
          ></Box>
      </Flex>
      <Flex
        flexDirection='column'
        justifyContent='flex-start'
        alignItems='flex-start'
        >
        <Text>
          Add Animation
        </Text>
        <Box
          width='300px'
          height='200px'
          sx={{border: '2px solid black'}}
          ref={el => animatedTwo(el)}
          >
        </Box>
        <Flex
          justifyContent='center'
          width='300px'
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
