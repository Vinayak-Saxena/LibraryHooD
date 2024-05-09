import { DBooksContext } from "../context/BookContext"
import { useContext } from "react"

export const useDBooksContext = () => {
  const context = useContext(DBooksContext)

  if(!context) {
    throw Error('useDonationBooksContext must be used inside a DonationBooksContextProvider')
  }

  return context
}