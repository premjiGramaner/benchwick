/**
 *  --------------------- Text Box Interface ---------------------
 * All king of Inputs Interface must be authorized from here
 * Including Check boxes, Select box, custom multiple select 
 */

export interface ITextBoxProps {
    type: string
    labelName: string
    placeHolder: string
    handelChange: (event: any) => void
}

export interface ISearchBoxProps {
    width: string
    placeHolder: string
    handleChange: () => void
    handleClick: (event: MouseEvent) => void
}