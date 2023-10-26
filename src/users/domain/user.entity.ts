import { MoneyStorage } from 'src/money-storages/domain/money-storage.entity'
import { Outstanding } from 'src/outstanding/domain/outstanding.entity'
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { nanoid } from 'nanoid'

@Entity()
export class User {
  @PrimaryColumn('varchar', { unique: true, length: 21 })
    id: string

  @Column('varchar', { length: 150 })
    name: string

  @Column('varchar', { unique: true, length: 100 })
    email: string

  @Column()
    password: string

  @Column('varchar', { nullable: true, length: 50 })
    phone?: string

  @Column('varchar', { nullable: true, length: 100 })
    authStrategy?: string

  @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date

  @OneToMany(() => MoneyStorage, moneyStorage => moneyStorage.user)
    moneyStorages: MoneyStorage[]

  @OneToMany(() => Outstanding, outstanding => outstanding.user)
    outstandings: Outstanding[]

  @BeforeInsert()
  generateId () {
    this.id = nanoid()
  }
}
