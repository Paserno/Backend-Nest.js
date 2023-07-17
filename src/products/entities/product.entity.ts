import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductImage } from './product-images.entity';
import { User } from '../../auth/entities/user.entity';


@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '61bd3b26fbeb3d9f0aa2f5454',
        description: 'Product ID',
        uniqueItems: true,
    }) 
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true,
    }) 
    @Column('text', {
        unique: true,
    })
    title: string;


    @ApiProperty({
        example: 0,
        description: 'Product price',
    }) 
    @Column('float', {
        default: 0,
    })
    price: number;


    @ApiProperty({
        example: 'As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.',
        description: 'Product description',
        default: null
    }) 
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;



    @ApiProperty({
        example: 't_shirt_teslo',
        description: 'Product SLUG - for SEO',
        uniqueItems: true,
    }) 
    @Column('text', {
        unique: true,
    })
    slug: string;


    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    }) 
    @Column('int', {
        default: 0
    })
    stock: number;


    @ApiProperty({
        example: ['M','XL','XXL'],
        description: 'Product sizes',
    }) 
    @Column('text', {
        array: true,
    })
    sizes: string[];


    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    }) 
    @Column('text')
    gender: string;


    @ApiProperty({
        example: ['shit'],
        description: 'Product tags',
    }) 
    @Column('text', {
        array: true,
        default: [],
    })
    tags: string[];

    //iamges
    @ApiProperty() 
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User;


    @BeforeInsert()
    checkSlugInsert() {

        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

}

