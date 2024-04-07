import { type ValueTransformer } from 'typeorm'

export class NumberTransformer implements ValueTransformer {
  to (value: number): number {
    if (value === null || value === undefined) return null
    return value
  }

  from (value: string | null): number {
    if (value === null) return null
    return parseFloat(value)
  }
}
