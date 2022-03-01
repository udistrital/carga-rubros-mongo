import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Registro_plan_adquisiciones-Codigo_arka')
export class CodigoArkaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo_arka: string;

  @Column()
  fecha_modificacion: Date;

  @Column()
  activo: boolean;

  @Column()
  fecha_creacion: Date;

  @Column()
  registro_plan_adquisiciones_id: number;

  constructor(
    id: number,
    codigo_arka: string,
    fecha_modificacion: Date,
    activo: boolean,
    fecha_creacion: Date,
    registro_plan_adquisiciones_id: number,
  ) {
    this.id = id;
    this.codigo_arka = codigo_arka;
    this.fecha_modificacion = fecha_modificacion;
    this.activo = activo;
    this.fecha_creacion = fecha_creacion;
    this.registro_plan_adquisiciones_id = registro_plan_adquisiciones_id;

    console.log(`Se creó la entidad Registro Plan Adquisiciones Arka para el Registro Plan Adquisiciones: ${this.registro_plan_adquisiciones_id}`);
  }
}
