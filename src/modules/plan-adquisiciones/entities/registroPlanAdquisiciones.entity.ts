import { Logger } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Registro_plan_adquisiciones')
export class RegistroPlanAdquisicionesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    area_funcional: number;

    @Column()
    centro_gestor: number;

    @Column()
    fecha_creacion: Date;

    @Column()
    fecha_modificacion: Date;

    @Column()
    responsable_id: number;

    @Column()
    activo: boolean;

    @Column()
    meta_id: string;

    @Column()
    producto_id: string;

    @Column()
    plan_adquisiciones_id: number;

    @Column()
    rubro_id: string;

    @Column()
    fecha_estimada_inicio: Date;

    @Column()
    fecha_estimada_fin: Date;

    @Column()
    fuente_financiamiento: string;

    @Column()
    actividad_id: number;

    @Column()
    valor_actividad: number;

    constructor(
      id: number,
      area_funcional: number,
      centro_gestor: number,
      fecha_creacion: Date,
      fecha_modificacion: Date,
      responsable_id: number,
      activo: boolean,
      meta_id: string,
      producto_id: string,
      plan_adquisiciones_id: number,
      rubro_id: string,
      fecha_estimada_inicio: Date,
      fecha_estimada_fin: Date,
      fuente_financiamiento: string,
      actividad_id: number,
      valor_actividad: number,
    ) {
      this.id = id;
      this.area_funcional = area_funcional;
      this.centro_gestor = centro_gestor;
      this.fecha_creacion = fecha_creacion;
      this.fecha_modificacion = fecha_modificacion;
      this.responsable_id = responsable_id;
      this.activo = activo;
      this.meta_id = meta_id;
      this.producto_id = producto_id;
      this.plan_adquisiciones_id = plan_adquisiciones_id;
      this.rubro_id = rubro_id;
      this.fecha_estimada_inicio = fecha_estimada_inicio;
      this.fecha_estimada_fin = fecha_estimada_fin;
      this.fuente_financiamiento = fuente_financiamiento;
      this.actividad_id = actividad_id;
      this.valor_actividad = valor_actividad;

      Logger.log(`Se creó la entidad Registro Plan Adquisiciones para el Plan de Adquisiciones: ${this.plan_adquisiciones_id}`);
    }
  }
  