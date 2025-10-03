'use client'
import { useState } from 'react'
import React from 'react'
import Image from 'next/image'
import { Product } from '@/lib/models/ProductModel'
const ImageDetails = ({ product }: { product: Product }) => {
  const [mainImage, setMainImage] = useState(product.image)

  const secondaryImages = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean)

  return (
    <div>
      <div>
        <Image src={mainImage} alt={product.name} width={500} height={500} />
      </div>
      <div className="flex gap-2 items-center justify-center mt-4">
        {secondaryImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img)}
            style={{ background: 'none', border: 'none', padding: 0 }}
            tabIndex={0}
            aria-label={`Selecionar imagem ${index + 1}`}
          >
            <Image
              src={img}
              alt={product.name}
              width={100}
              height={100}
              style={{
                border:
                  mainImage === img ? '3px solid #ff554d' : '2px solid #626262',
                borderRadius: '13px',
                cursor: 'pointer',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default ImageDetails
