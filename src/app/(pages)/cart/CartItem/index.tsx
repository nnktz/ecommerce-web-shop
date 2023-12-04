'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media, Product } from '../../../../payload/payload-types'
import { Media as MediaComponent } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

type CartItemProps = {
  product: Product
  title: string
  metaImage: string | Media
  quantity: number
  addItemToCart: (item: { product?: string | Product; quantity?: number; id?: string }) => void
}

export const CartItem = ({ product, title, metaImage, quantity, addItemToCart }: CartItemProps) => {
  const [qty, setQty] = useState(quantity)

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1
    setQty(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }
  const incrementQty = () => {
    const updatedQty = quantity + 1
    setQty(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }
  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)
    setQty(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  return (
    <li className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <MediaComponent
            className={classes.media}
            imgClassName={classes.image}
            resource={metaImage}
            fill
          />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src={'/assets/icons/minus.svg'}
              alt="minus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>

          <input type="text" className={classes.quantityInput} value={qty} onChange={enterQty} />

          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src={'/assets/icons/plus.svg'}
              alt="plus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        <Price product={product} button={false} quantity={qty} />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}
