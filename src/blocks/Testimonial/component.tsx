import React from 'react'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'
import Link from 'next/link'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({ testimonials }) => {
    return (
        <div className="container mx-auto my-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Testimonials</h2>
            <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                    {testimonials?.map((testimonial, index) => (
                        <CarouselItem key={index} className="basis-full">
                            {' '}
                            {/* Set basis-full for one item per slide */}
                            <div className="border p-6 rounded-lg shadow-sm bg-card">
                                {/* Profile Image */}
                                {testimonial.profile && typeof testimonial.profile === 'object' && (
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                                        <Media
                                            resource={testimonial.profile}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Person Name and Role */}
                                <h3 className="text-lg font-semibold text-center">
                                    {testimonial.person}
                                </h3>
                                <p className="text-sm text-muted-foreground text-center">
                                    {testimonial.role} at
                                    {testimonial.company.website ? (
                                        <Link href={testimonial.company.website} target="_blank">
                                            <span className="text-primary bolder ml-1">
                                                {testimonial.company.name}
                                            </span>
                                        </Link>
                                    ) : (
                                        <span className="text-primary bolder ml-1">
                                            {testimonial.company.name}
                                        </span>
                                    )}
                                </p>

                                {/* Testimonial Message */}
                                <div className="mt-4 text-sm text-center">
                                    <RichText data={testimonial.message} enableGutter={false} />
                                </div>

                                {/* Company Description (if available) */}
                                {testimonial.company.desc && (
                                    <div className="mt-4 text-sm text-muted-foreground">
                                        <RichText
                                            data={testimonial.company.desc}
                                            enableGutter={false}
                                        />
                                    </div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
    )
}
