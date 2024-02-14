import { CreateChargeDto } from "@app/common";
import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator";


export class CreateReservationDto {
  /**
   * @Type is used to convert a string representation of a date to a Date instance
   */
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  /**
   * @Type is neccessary to convert the incoming plain JS object into a instance of CreateChargeDto
   */
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto
}
