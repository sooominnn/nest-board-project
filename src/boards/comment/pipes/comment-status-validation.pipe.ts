import { BadRequestException, PipeTransform } from '@nestjs/common';
import { CommentStatus } from '../comment-status.enum';

export class CommentStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [CommentStatus.PRIVATE, CommentStatus.PUBLIC];

  transform(value: any) {
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
