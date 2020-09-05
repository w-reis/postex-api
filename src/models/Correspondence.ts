import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Recipient from './Recipient';

@Entity('correspondences')
class Correspondence {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  recipient_name: string;

  @Column()
  recipient_id: number;

  @ManyToOne(() => Recipient)
  @JoinColumn({ name: 'recipient_id ' })
  recipient: Recipient;

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
