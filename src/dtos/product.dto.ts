import {IsNumber, IsString, IsInt, IsArray} from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsString()
  public description: string;

  @IsNumber()
  public price: number

  @IsInt()
  public quantity: number

  @IsArray()
  public categories: Array<string>
}
