import { Logger } from "@nestjs/common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Meta')
export class MetaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    numero: number;

    @Column()
    nombre: string;

    @Column()
    fecha_creacion: Date;

    @Column()
    fecha_modificacion: Date;

    @Column()
    activo: boolean;

    @Column()
    rubro: string;

    @Column({ nullable: true })
    lineamiento_id: number;

    constructor(
        id: number,
        numero: number,
        nombre: string,
        fecha_creacion: Date,
        fecha_modificacion: Date,
        activo: boolean,
        rubro: string,
        lineamiento_id: number,
    ) {
        this.id = id;
        this.numero = numero;
        this.nombre = nombre;
        this.fecha_creacion = fecha_creacion;
        this.fecha_modificacion = fecha_modificacion;
        this.activo = activo;
        this.rubro = rubro;
        this.lineamiento_id = lineamiento_id;

        Logger.log(`Se creó la entidad Meta: ${this.nombre}`);
    }
}
