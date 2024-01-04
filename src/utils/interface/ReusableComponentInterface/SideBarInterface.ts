export interface ISideBarInterface {
  handleViewHistory?: (event: React.MouseEvent<HTMLElement>) => void
  enable: boolean 
  handleImage?: (file: File) => void
  isFormValid: boolean
  envisionUploadHandle?: (event: React.MouseEvent<HTMLElement>) => void
}
