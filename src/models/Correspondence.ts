import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('correspondences')
class Correspondence {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  recipient_name: string;

  @Column()
  recipient_id: number;

  @Column()
  object_number: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Correspondence;
