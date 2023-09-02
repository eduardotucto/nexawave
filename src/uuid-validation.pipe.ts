import { type ArgumentMetadata, Injectable, type PipeTransform, BadRequestException } from '@nestjs/common'

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  async transform (value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.metatype !== String) {
      return value
    }

    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

    if (!uuidRegex.test(value)) {
      throw new BadRequestException('Invalid UUID format')
    }

    return value
  }
}
