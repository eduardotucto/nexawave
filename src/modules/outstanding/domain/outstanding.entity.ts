import { Entity, PrimaryColumn, Column, BeforeInsert, ManyToOne, CreateDateColumn } from 'typeorm'
import { nanoid } from 'nanoid'
import { User } from '@/modules/users/domain/user.entity'
import { NumberTransformer } from 'src/utils/transformer'

export enum EntryType {
  DEBT = 'Debt',
  PAYMENT = 'Payment',
}

@Entity()
export class Outstanding {
  @PrimaryColumn('varchar', { unique: true, length: 21 })
    id: string

  @Column('varchar', { length: 150 })
    description: string

  @Column('decimal', { precision: 10, scale: 2, transformer: new NumberTransformer() })
    amount: number

  @Column({ type: 'boolean', default: false })
    isCompleted: boolean

  @Column({ type: 'enum', enum: EntryType })
    type: EntryType

  @Column({ type: 'boolean', nullable: true })
    isRecurring: boolean

  @Column({ type: 'integer', nullable: true, transformer: new NumberTransformer() })
    paymentDay: number

  @Column('varchar', { length: 21 })
    userId: string

  @ManyToOne(() => User, (user) => user.outstandings)
    user: User

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
