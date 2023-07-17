import { ApiProperty } from '@nestjs/swagger';

import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities';

@Entity('user')
export class User {

    @ApiProperty({
        example: '61bd3b26fbeb3d9f0aa2f5454',
        description: 'User ID',
        uniqueItems: true,
    }) 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'test3@gmail.com',
        description: 'User Email',
        uniqueItems: true,
    }) 
    @Column('text', {
        unique: true,
    })
    email: string;

    @ApiProperty({
        example: 'Abc123',
        description: 'User Password',
    }) 
    @Column('text', {
        select: false
    })
    password: string;

    @ApiProperty({
        example: 'Test Three',
        description: 'User FullName',
    }) 
    @Column('text')
    fullName: string;

    @ApiProperty({
        example: true,
        description: 'User isActive',
    })
    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @ApiProperty({
        example: ['user','super'],
        description: 'User Roles',
    }) 
    @Column('text', {
        array: true,
        default: ['user'],
    })
    roles: string[];

    @OneToMany(
        () => Product,
        ( product ) => product.user
    )
    product: Product;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}

