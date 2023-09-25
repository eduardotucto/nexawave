import { User } from 'src/users/domain/user.entity'
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { nanoid } from 'nanoid'

@Entity()
export class MoneyStorage {
  @PrimaryColumn('varchar', { length: 21 })
    id: string

  @Column('varchar', { unique: true, length: 50 })
    label: string

  @Column({
    type: 'enum',
    enum: ['Debit', 'Credit', 'Cash', 'Investment', 'Other']
  })
    type: string

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
    balance: number

  @Column({ type: 'boolean', default: true })
    contribution: boolean

  @Column('varchar', { length: 21 })
    userId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date

  @ManyToOne(() => User, user => user.moneyStorages)
    user: User

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
