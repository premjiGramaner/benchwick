/**
 *  --------------------- Text Box Interface ---------------------
 * All king of Inputs Interface must be authorized from here
 * Including Check boxes, Select box, custom multiple select
 */

export interface ITextBoxProps {
  type: string
  value?: string | number | null
  labelname?: string
  placeholder?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleIconClick?: (e: React.MouseEvent<HTMLElement>) => void
  icon?: string
  name: string
}
export interface ISearchBoxProps {
  placeholder?: string
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon?: string
  buttonText?: string
  className?: string
}
