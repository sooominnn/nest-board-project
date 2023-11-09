import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../entity/board.entity';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  // transform() 메소드
  // 두개의 파라미터를 가짐. 첫번째 - 처리가 된 인자의 값(value), 두번째 - 인자에 대한 메타 데이터를 포함한 객체.
  // transform() 메소드에서 return된 값은 route 핸들러로 전해짐. 만약 예외가 발생하면 클라이언트에 바로 전해짐.
  transform(value: any) {
    // console.log('value', value);
    // console.log('metadata', metadata);

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
