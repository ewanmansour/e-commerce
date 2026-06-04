const Title = ({ text1, text2 }) => {
    return (
        <div className='mb-4 inline-flex items-center gap-3'>
            <p className='text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500'>{text1} <span className='text-neutral-950'>{text2}</span></p>
            <span className='h-px w-10 bg-neutral-300 sm:w-14'></span>
        </div>
    )
}

export default Title
