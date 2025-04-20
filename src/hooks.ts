import { createContext, useContext } from "react"
export type GlobalContext = {
  value: string
  setValue:(text: string) => void
}
export const SearchContext = createContext<GlobalContext>({
value: '',  
setValue: (text) => { value: text },
})
export const useSearchContext = () => useContext(SearchContext)