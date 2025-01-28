import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className='max-padd-container pt-[99px]'>
            <div className='max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[655px] w-full rounded-3xl'>
                <div className='relative top-32 xs:top-52'>
                    <span className='medium-18'>Welcome to Blackwill</span>
                    <h1 className='h1 capitalize max-w-[40rem]'>Discover Exceptional Home With BlackWill</h1>
                    <p className='my-10 max-w-[33rem]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum dicta mollitia temporibus? Illum, iusto amet harum architecto animi et unde expedita rerum nesciunt veritatis quo quis deleniti rem modi est.</p>
                    <div className='inline-flex items-center justify-center gap-4 bg-white rounded-xl'>
                        <div className='text-center regular-14 leading-tight pl-5'>
                            <h5 className='uppercase font-bold'> 10% off</h5>
                            <p className='regular-14'>On All Properties</p>
                        </div>
                        <Link href="/listing" className='btn-secondary rounded-xl flexCenter !py-5'>Show now</Link>
                    </div> 
                 </div>

            </div>
        </section>
    )
}

export default Hero
