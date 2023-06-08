/**
 *  --------------------- Button Interface ---------------------
 * All king of Button Interfaces must be authorized from here
 * Including radio button, menu button etc...
 */

export interface IButtonProps {
    color: string
    backgroundColor: string
    padding: string
    fontSize: string
    handleClick: (event: MouseEvent) => void
    children: string
}