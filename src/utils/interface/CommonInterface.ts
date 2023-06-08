// ---- Reusable Component Interfaces --//

export interface IButtonProps {
  color: string
  backgroundColor: string
  padding: string
  fontSize: string
  handleClick: (event: MouseEvent) => void
  children: string
}
export interface ITextBoxProps {
  type: string
  labelName: string
  placeHolder: string
  handelChange: (event: any) => void
}

export interface ISearchBox {
  width: string
  placeHolder: string
  handleChange: () => void
  handleClick: (event: MouseEvent) => void
}
// ---- Main Component Interfaces --//
export interface IDefaultProps {
  addText: () => void
  textCount: number
  users: []
  getAllUser: () => void
}
