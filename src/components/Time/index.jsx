import { useState, useEffect } from "react"
import ScrambleText from "../ScrambleText"

export default function Time() {
  // use Intl.DateTimeFormat().resolvedOptions(); to get your own timeZone too
  const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const userTimeZoneText = usersTimeZone.split("/")[1]
  const [userFormattedTime, setUserFormattedTime] = useState("")

  const getFormattedTime = (timeZone) => {
    const options = {
      timeZone: timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
    return new Intl.DateTimeFormat("en-US", options).format(new Date())
  }

  const updateClocks = () => {
    setUserFormattedTime(getFormattedTime(usersTimeZone.timeZone))
  }

  useEffect(() => {
    updateClocks()
  }, [])

  useEffect(() => {
    // Update every second
    const intervalId = setInterval(updateClocks, 1000)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId)

    // Initial clock update
  }, [])

  return (
    <>
      <ScrambleText shuffle delay={4.2}>
      </ScrambleText>{" "}
      { userTimeZoneText && (
        <>
          <span className="header--hash">{"//"}</span>{" "}
          <ScrambleText shuffle delay={4.2}>
            {userTimeZoneText}
          </ScrambleText>{" "}
          {userFormattedTime}
        </>
      )}
    </>
  )
}
