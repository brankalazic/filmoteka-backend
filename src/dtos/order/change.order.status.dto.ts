import * as Validator  from "class-validator";

export class ChangeOrderStatusDto {
    @Validator.IsNotEmpty()
    @Validator.IsString()
    @Validator.IsIn(["paid", "not paid", "waiting"])
    newStatus: "paid" | "not paid" | "waiting";
}