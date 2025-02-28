type SideBarProps = {
  totalNumberOfDice: number
  addDice: () => void
  subtractDice: () => void
  totalDiceValues: number
  rollAllDice: () => void
  clearAllDice: () => void
  resetAllDiceValues: () => void
  updateAllColor: () => void
}

export default function SideBar({
  totalNumberOfDice,
  addDice,
  subtractDice,
  totalDiceValues,
  rollAllDice,
  clearAllDice,
  resetAllDiceValues,
  updateAllColor,
}: SideBarProps) {
  return (
    <article className="sticky top-15 flex h-full w-1/5 max-w-60 min-w-50 flex-col rounded-xl border-2 bg-zinc-300 px-5 py-3 select-none dark:bg-zinc-800">
      {/* dice count */}
      <div className="mt-3 mb-2 flex justify-between text-xl">
        <div className="w-1/2">
          {totalNumberOfDice} {totalNumberOfDice > 1 ? 'dice' : 'die'}
        </div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
          stroke="currentColor"
          className="size-7 cursor-pointer rounded-2xl hover:bg-zinc-400 dark:hover:bg-zinc-900"
          onClick={subtractDice}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.25}
          stroke="currentColor"
          className="size-7 cursor-pointer rounded-2xl hover:bg-zinc-400 dark:hover:bg-zinc-900"
          onClick={addDice}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      {/* stats */}
      <div className="flex w-14/15 justify-between self-center">
        <div>total</div>
        <div>{totalDiceValues}</div>
      </div>
      <div className="flex w-14/15 justify-between self-center">
        <div>average</div>
        <div>{Math.floor(totalDiceValues / totalNumberOfDice)}</div>
      </div>
      {/* methods */}
      <div
        onClick={rollAllDice}
        className="mt-6 flex cursor-pointer justify-center rounded-xl border pt-0.5 pb-1 text-xl hover:bg-zinc-400 dark:hover:bg-zinc-900"
      >
        roll
      </div>
      <div
        onClick={resetAllDiceValues}
        className="mt-1 flex cursor-pointer justify-center rounded-xl border pt-0.5 pb-1 text-xl hover:bg-zinc-400 dark:hover:bg-zinc-900"
      >
        reset
      </div>
      <div
        onClick={clearAllDice}
        className="mt-1 mb-3 flex cursor-pointer justify-center rounded-xl border pt-0.5 pb-1 text-xl hover:bg-zinc-400 dark:hover:bg-zinc-900"
      >
        clear
      </div>
      {/* color picker */}
      <div className="mb-3 flex w-full justify-around">
        <svg
          onClick={() => updateAllColor('540')}
          fill="red"
          viewBox="0 0 24 24"
          className="size-7 cursor-pointer rounded-2xl"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
        <svg
          onClick={() => updateAllColor('410')}
          fill="blue"
          viewBox="0 0 24 24"
          className="size-7 cursor-pointer rounded-2xl"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
        <svg
          onClick={() => updateAllColor('280')}
          fill="green"
          viewBox="0 0 24 24"
          className="size-7 cursor-pointer rounded-2xl"
        >
          <circle cx="12" cy="12" r="9" />
        </svg>
        <svg onClick={() => updateAllColor()} viewBox="0 0 24 24" className="size-7 cursor-pointer rounded-2xl">
          <defs>
            <clipPath id="circleClip">
              <circle cx="12" cy="12" r="9" />
            </clipPath>
          </defs>
          <g clip-path="url(#circleClip)">
            <path d="M12 12 L24 0 L0 0 Z" fill="#E8909C" />
            <path d="M12 12 L24 0 L24 24 L12 24 Z" fill="#7ECBA1" />
            <path d="M12 12 L12 24 L0 24 L0 0 Z" fill="#7FB3D5" />
          </g>
        </svg>
      </div>
    </article>
  )
}
