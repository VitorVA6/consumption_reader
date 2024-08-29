import {
  Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@Entity()
export default class Measure {
  @PrimaryGeneratedColumn('uuid')
    measure_uuid!: string;

  @Column('int')
    measure_value!: number;

  @Column('varchar')
    measure_type!: 'GAS' | 'WATER';

  @Column('datetime')
    measure_datetime!: Date;

  @Column('boolean')
    has_confirmed!: boolean;

  @Column('varchar')
    image_url!: string;

  @Column('varchar')
    customer_code!: string;
}
