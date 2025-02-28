import './Dice.css'

type DiceProps = {
  id: number
  die: any
  rollDice: (id: number) => void
}

export default function Dice({ id, die, rollDice }: DiceProps) {
  // const [isLoading, setIsLoading] = useState(false)
  // const toggleIsLoading = () => setIsLoading(!isLoading)
  // const intervalRef = useRef<number | undefined>(undefined)

  // const stopDiceRoll = () => setTimeout(toggleIsLoading, 3000)

  // useEffect(() => {
  //   if (isLoading) {
  //     intervalRef.current = setInterval(rollDice, 250)
  //   } else {
  //     clearInterval(intervalRef.current)
  //     intervalRef.current = undefined
  //   }

  //   return () => {
  //     if (intervalRef.current) clearInterval(intervalRef.current)
  //   }
  // }, [isLoading])

  return (
    <div onClick={() => rollDice(id)} className="container cursor-pointer">
      <div className={`cube show${die.value}`}>
        <div style={die.color} className="top"></div>
        <div style={die.color} className="front"></div>
        <div style={die.color} className="left"></div>
        <div style={die.color} className="back"></div>
        <div style={die.color} className="right"></div>
        <div style={die.color} className="bottom"></div>
      </div>
    </div>
  )
}
