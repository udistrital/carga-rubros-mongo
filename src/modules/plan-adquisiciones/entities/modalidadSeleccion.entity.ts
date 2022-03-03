import { Logger } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Registro_funcionamiento-Modalidad_seleccion')
export class ModalidadSeleccionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    id_modalidad_seleccion: string;

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
        id_modalidad_seleccion: string,
        fecha_modificacion: Date,
        activo: boolean,
        fecha_creacion: Date,
        registro_plan_adquisiciones_id: number,
    ) {
        this.id = id;
        this.id_modalidad_seleccion = id_modalidad_seleccion;
        this.fecha_modificacion = fecha_modificacion;
        this.activo = activo;
        this.fecha_creacion = fecha_creacion;
        this.registro_plan_adquisiciones_id = registro_plan_adquisiciones_id;

        Logger.log(`Se creó la entidad Registro Funcionamiento Modalidad de Selección para el Registro Plan de Adquisiciones: ${this.registro_plan_adquisiciones_id}`);
    }
}
