import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('customerdata')
export class CustomerData {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ type: 'text', nullable: true })
  textContent?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  companyname?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  knowledgeBaseId?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
