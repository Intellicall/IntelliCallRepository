import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('dashboard_data')
export class DashboardData {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uniqueidentifier' })
  customerId!: string;

  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  textContent?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

