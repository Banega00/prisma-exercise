import { Injectable, PipeTransform, BadRequestException, ArgumentMetadata } from "@nestjs/common";

@Injectable()
export class OptionalQueryParam implements PipeTransform<string, string> {
    private readonly pipes: PipeTransform[]
    constructor(...pipes: PipeTransform[]){
        this.pipes = pipes;
    }
  
    transform(value: string, metadata: ArgumentMetadata): any {
    
    if(value == undefined) return value;

    for (const pipe of this.pipes) {
        value = pipe.transform(value, metadata);
      }
  
      return value
  }
}