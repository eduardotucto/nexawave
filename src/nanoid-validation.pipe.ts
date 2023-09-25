import { type ArgumentMetadata, Injectable, type PipeTransform, BadRequestException } from '@nestjs/common'

@Injectable()
export class NanoIdValidationPipe implements PipeTransform {
  async transform (value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.metatype !== String) {
      return value
    }

    const nanoidRegex = /^[0-9A-Za-z_-]{21}$/

    if (!nanoidRegex.test(value)) {
      throw new BadRequestException('Invalid Nanoid format')
    }

    return value
  }
}
