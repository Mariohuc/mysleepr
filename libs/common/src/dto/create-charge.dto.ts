import { CardDto } from "./card.dto";
import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  /**
   * @Type is neccessary to convert the incoming plain JS object into a instance of CardDto
   */
  @Type(() => CardDto)
  card: CardDto

  @IsNumber()
  amount: number;
}
