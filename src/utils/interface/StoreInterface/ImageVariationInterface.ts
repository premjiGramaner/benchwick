export interface IImageInfo {
  key: string;
  image_url: string;
}

export interface IImageVarientInfo {
  info: IImageInfo[],
  variants: string,
  error: string
}

export interface IImageVariationReducerState {
  imageInfo: IImageVarientInfo;
  socketData: {
    uploadedFile: ISocketType2;
    response: ISocketType3;
  };
  isLoading: boolean;
  isError: boolean;
  statusCode: number;
}

export interface ISocketType2 {
  type: number
  data: IType2Data
}

export interface IType2Data {
  variants: string
  fileInfo: ITypeFileInfo
  image: string
}

export interface ITypeFileInfo {
  name: string
  size: number
  contentType: string
}

export interface ISocketType3 {
  type: number
  data: Type3Data
}

export interface Type3Data {
  status: string
  message: string
  data: IImageVarientInfo
}