export interface IRoot {
    id: string
    url: string
    filename: string
    description: string
    uploadedBy: string
    createdAt: string
    updatedAt: string
    dimensions: IDimensions
    resolution: IResolution
    sizeInBytes: number
    favorited: boolean
  }
  
  export interface IDimensions {
    height: number
    width: number
  }
  
  export interface IResolution {
    height: number
    width: number
  }