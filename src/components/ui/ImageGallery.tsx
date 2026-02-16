'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

export interface ImageGalleryProps {
    images: string[]
    className?: string
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, className }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const next = () => setActiveIndex((prev) => (prev + 1) % images.length)
    const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)

    return (
        <div className={cn('space-y-4', className)}>
            {/* Main Image */}
            <div className="relative aspect-[16/9] rounded-[48px] overflow-hidden bg-surface group">
                <img
                    src={images[activeIndex]}
                    alt={`Property image ${activeIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Overlay Controls */}
                <div className="absolute inset-x-8 bottom-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex gap-2">
                        <button
                            onClick={prev}
                            aria-label="Previous image"
                            className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-dwelzer-navy hover:bg-white/60 transition-all"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={next}
                            aria-label="Next image"
                            className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-dwelzer-navy hover:bg-white/60 transition-all"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    <button
                        aria-label="Full screen view"
                        className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-dwelzer-navy hover:bg-white/60 transition-all"
                    >
                        <Maximize2 size={24} />
                    </button>
                </div>

                {/* Counter */}
                <div className="absolute top-8 right-8 glass px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-dwelzer-navy">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar px-1">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`View image ${index + 1}`}
                        className={cn(
                            'shrink-0 w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500',
                            activeIndex === index ? 'border-dwelzer-gold scale-105 shadow-lg shadow-dwelzer-gold/20' : 'border-transparent hover:border-border-hover'
                        )}
                    >
                        <img src={image} className="w-full h-full object-cover" alt="" />
                    </button>
                ))}
            </div>
        </div>
    )
}

export { ImageGallery }
