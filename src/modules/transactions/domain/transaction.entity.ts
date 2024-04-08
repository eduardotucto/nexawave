import { nanoid } from 'nanoid'
import { FinancialResource } from '@/modules/financial-resources/domain/financial-resources.entity'
import { NumberTransformer } from '@/utils/transformer'
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class Transaction {
  @PrimaryColumn('varchar', { unique: true, length: 21 })
    id: string

  @Column({ type: 'timestamp with time zone' })
    transactionDate: Date

  @Column('varchar', { nullable: true, length: 150 })
    description: string

  @Column('decimal', { precision: 8, scale: 2, transformer: new NumberTransformer() })
    amount: number

  @ManyToOne(() => FinancialResource, financialResource => financialResource.transactions)
    financialResource: FinancialResource

  @Column('varchar', { length: 21 })
    financialResourceId: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
