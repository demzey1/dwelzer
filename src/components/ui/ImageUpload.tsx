'use client'

import React, { useState } from 'react'
import { Upload, X, Image as ImageIcon, Check, ShieldCheck } from 'lucide-react'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

export interface ImageUploadProps {
    onUpload?: (urls: string[]) => void
    maxImages?: number
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, maxImages = 5 }) => {
    const [images, setImages] = useState<string[]>([])
    const [isUploading, setIsUploading] = useState(false)

    const simulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        setIsUploading(true)
        // Simulate network delay for institutional grade upload
        setTimeout(() => {
            const newImages = Array.from(files).map(f => URL.createObjectURL(f))
            const updated = [...images, ...newImages].slice(0, maxImages)
            setImages(updated)
            onUpload?.(updated)
            setIsUploading(false)
        }, 1500)
    }

    const removeImage = (index: number) => {
        const updated = images.filter((_, i) => i !== index)
        setImages(updated)
        onUpload?.(updated)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((src, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-border">
                        <Badge variant="gold" size="md" className="absolute top-2 left-2 z-10">Institutional Grade</Badge>
                        <img src={src} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                        <button
                            onClick={() => removeImage(i)}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-dwelzer-navy/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                            title="Remove image"
                        >
                            <X size={16} />
                        </button>
                    </div>
                ))}

                {images.length < maxImages && (
                    <label className={cn(
                        "aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-dwelzer-gold hover:bg-dwelzer-gold/5 transition-all group",
                        isUploading && "animate-pulse cursor-not-allowed"
                    )}>
                        <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            disabled={isUploading}
                            onChange={simulateUpload}
                        />
                        {isUploading ? (
                            <Upload className="text-dwelzer-gold animate-bounce" size={32} />
                        ) : (
                            <>
                                <ImageIcon className="text-text-muted group-hover:text-dwelzer-gold mb-2" size={32} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted group-hover:text-dwelzer-gold">
                                    Upload Assets
                                </span>
                            </>
                        )}
                    </label>
                )}
            </div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Max {maxImages} high-fidelity images. Supported: JPG, PNG, WEBP.
            </p>
        </div>
    )
}
