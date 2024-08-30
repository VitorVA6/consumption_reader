import { Raw, Repository } from 'typeorm';
import TypeormMeasure from '../entities/measure';
import AppDataSource from '../data-source';
import Measure from '../../../domain/entities/measure';
import IMeasureRepository from '../../../application/repositories/measure';

export default class PostgreMeasureRepository implements IMeasureRepository {
  private measure_table: Repository<TypeormMeasure> = AppDataSource
    .getRepository(TypeormMeasure);

  async create(measure_data: Omit<Measure, 'measure_uuid'>): Promise<Measure> {
    const newMeasure = this.measure_table.create(measure_data);
    const savedMeasure = await this.measure_table.save(newMeasure);
    return savedMeasure;
  }

  async update(measure_data: Measure): Promise<void> {
    await this.measure_table.update(measure_data.measure_uuid, measure_data);
  }

  async find_by_id(measure_uuid: string): Promise<Measure | null> {
    const found_measure = await this.measure_table.findOne({
      where: {
        measure_uuid,
      },
    });
    return found_measure;
  }

  async find_by_customer(
    customer_code: string,
    measure_type?: 'GAS' | 'WATER',
  ): Promise<Omit<Measure, 'customer_code' | 'measure_value'>[]> {
    const found_measures = await this.measure_table.find({
      where: measure_type ? {
        customer_code,
        measure_type,
      } : {
        customer_code,
      },
    });

    return found_measures;
  }

  async find_by_date_and_type_and_customer(date: Date, measure_type: 'GAS' | 'WATER', customer_code: string): Promise<Measure | null> {
    const isoDate = date.toISOString(); // Converta a data para string ISO
    const record = await this.measure_table.findOne({
      where: {
        measure_type,
        measure_datetime: Raw((alias) => `DATE_TRUNC('month', ${alias}) = DATE_TRUNC('month', ${this.getRawDateString(isoDate)})`),
        customer_code,
      },
    });

    return record;
  }

  private getRawDateString(date: string): string {
    return `'${date}'::timestamp`;
  }
}
