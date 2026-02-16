import { IsEnum, IsNumber, IsString, IsUrl } from "class-validator";


export enum SavedItemType {
    PHOTO = "photo",
    VIDEO = "video",
    GIF = "gif"
}

export class CreateSavedItemDto {
    @IsString()
    title: string

    @IsString()
    externalId: string


    
    @IsUrl()
    url: string

    @IsUrl()
    thumbnail:string

    @IsUrl()
    src: string


    @IsEnum(SavedItemType)
    type: SavedItemType

    @IsNumber()
    collectionId: number



}
