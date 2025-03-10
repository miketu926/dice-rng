import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import './App.css'
import Dice from './components/Dice'
import SideBar from './components/SideBar'
import { Die } from './types'

function App() {
  // THEME
  const [isDarkMode, setIsDarkMode] = useState(localStorage.theme === 'dark' ? true : false)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  useLayoutEffect(() => {
    if (isDarkMode) {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
    } else {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  /*
   * DICE STACK AND MANAGEMENT
   * There will be an array pertaining to each Die [Die1, Die2, Die2] to be rendered
   * Die will hold
   *  {id: key<number>, value: valueOfDice<number>, color: hex<string>}
   *
   * There will be functions to update Dice Stack
   * addDice *
   * subtractDice *
   * updateDice
   * rollDice *
   * rollAllDice *
   * clearAllDice *
   * makeAllDiceOne *
   * totalDiceValues *
   * totalNumberOfDice *
   */

  const initialDie: Die = {
    id: 0,
    value: 1,
    color: { filter: `hue-rotate(${0}deg) saturate(3)` },
  }

  const [diceStack, setDiceStack] = useState<Die[]>([initialDie])
  const addDice = () => setDiceStack([...diceStack, { ...initialDie }])
  const subtractDice = () => setDiceStack(diceStack.length > 1 ? [...diceStack.slice(0, -1)] : diceStack)

  const rollDice = useCallback(
    (id: number) => {
      const value = Math.floor(Math.random() * 6) + 1
      const newStack = [...diceStack]
      newStack[id].value = value
      setDiceStack(newStack)
    },
    [diceStack]
  )

  const rollAllDice = useCallback(() => {
    const newStack = [...diceStack]
    for (let i = 0; i < newStack.length; i++) {
      const value = Math.floor(Math.random() * 6) + 1
      newStack[i].value = value
    }
    setDiceStack(newStack)
  }, [diceStack])

  const clearAllDice = useCallback(() => setDiceStack([{ ...initialDie }]), [initialDie])

  const resetAllDiceValues = useCallback(() => {
    const newStack = [...diceStack]
    for (let i = 0; i < newStack.length; i++) {
      newStack[i].value = 1
    }
    setDiceStack(newStack)
  }, [diceStack])

  const totalDiceValues = useMemo(() => {
    let total = 0
    for (let i = 0; i < diceStack.length; i++) {
      total += diceStack[i].value
    }
    return total
  }, [diceStack])

  const totalNumberOfDice = useMemo(() => diceStack.length, [diceStack])

  const updateAllColor = useCallback(
    (degree = '') => {
      const newStack = [...diceStack]
      for (let i = 0; i < newStack.length; i++) {
        if (degree) {
          newStack[i].color = { filter: `hue-rotate(${degree}deg) saturate(3)` }
        } else {
          newStack[i].color = { filter: `hue-rotate(${Math.floor(Math.random() * 360) + 1}deg) saturate(3)` }
        }
      }
      setDiceStack(newStack)
    },
    [diceStack]
  )

  // scroll screen when new dices are populated
  useLayoutEffect(
    () =>
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      }),
    [diceStack.length]
  )

  // register space bar to roll
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => event.key === ' ' && rollAllDice()
    window.addEventListener('keyup', handleKeyPress)
    return () => {
      window.removeEventListener('keyup', handleKeyPress)
    }
  }, [rollAllDice])

  return (
    <>
      <header className="flex flex-row-reverse p-10 select-none">
        {isDarkMode ? (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer text-zinc-600 dark:text-zinc-400"
            onClick={toggleDarkMode}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
        ) : (
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer text-zinc-600 dark:text-zinc-400"
            onClick={toggleDarkMode}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        )}
      </header>
      <main className="min-h-screen-safe flex flex-col-reverse justify-evenly gap-5 px-5 text-zinc-600 select-none sm:h-full sm:columns-5 sm:flex-row sm:justify-normal sm:gap-20 sm:px-29 dark:text-zinc-400">
        <article className="mx-12 mb-5 flex flex-col rounded-xl border-none bg-zinc-300 p-5 select-none sm:sticky sm:top-15 sm:bottom-auto sm:mx-0 sm:h-full sm:w-1/5 sm:max-w-60 sm:min-w-50 sm:border-2 sm:px-5 sm:py-3 dark:bg-zinc-800">
          <SideBar
            totalNumberOfDice={totalNumberOfDice}
            addDice={addDice}
            subtractDice={subtractDice}
            totalDiceValues={totalDiceValues}
            rollAllDice={rollAllDice}
            clearAllDice={clearAllDice}
            resetAllDiceValues={resetAllDiceValues}
            updateAllColor={updateAllColor}
          />
        </article>
        <article
          className="flex flex-wrap justify-center gap-5 select-none sm:w-4/5 sm:scale-100 sm:gap-10"
          style={{
            zoom: window.navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
              ? '50%'
              : 'normal',
          }}
        >
          {diceStack.map((die, index) => {
            return <Dice key={index} id={index} die={die} rollDice={rollDice} />
          })}
        </article>
      </main>
    </>
  )
}

export default App
