'use client'

import React, { useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import toast from 'react-hot-toast'

export interface ImageUploadProps {
    onUpload?: (urls: string[]) => void
    maxImages?: number
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, maxImages = 5 }) => {
    const [images, setImages] = useState<string[]>([])
    const [isUploading, setIsUploading] = useState(false)

    const uploadFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        setIsUploading(true)

        try {
            const uploaded: string[] = []

            for (const file of Array.from(files).slice(0, maxImages - images.length)) {
                const formData = new FormData()
                formData.append('file', file)

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })

                if (!res.ok) {
                    throw new Error('Upload failed')
                }
                const data = await res.json()
                uploaded.push(data.url)
            }

            const updated = [...images, ...uploaded].slice(0, maxImages)
            setImages(updated)
            onUpload?.(updated)
            toast.success('Images uploaded')
        } catch (err) {
            console.error(err)
            toast.error('Upload failed. Please try again.')
        } finally {
            setIsUploading(false)
            e.target.value = ''
        }
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
                            onChange={uploadFiles}
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
