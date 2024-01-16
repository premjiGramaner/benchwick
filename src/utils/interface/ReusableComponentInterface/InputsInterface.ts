import { ReactElement } from "react"

export interface ITextBoxProps {
  type: string
  value?: string | number | null
  labelname?: string
  placeholder?: string
  handlechange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleIconClick?: (e: React.MouseEvent<HTMLElement>) => void
  errorMessageComponent?: ReactElement
  icon?: string
  name: string
  autoComplete?: string;
}

export interface ISearchBoxProps {
  placeholder?: string
  handlechange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon?: string
  buttonText?: string
  className?: string
}
