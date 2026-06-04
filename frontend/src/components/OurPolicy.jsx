import { Truck, RotateCcw, HeartHandshake } from 'lucide-react';

const policies = [
    {
        icon: Truck,
        title: 'Easy Exchange Policy',
        text: 'Simple exchanges on eligible orders.',
    },
    {
        icon: RotateCcw,
        title: '7 Days Return Policy',
        text: 'Seven days to decide with clear returns.',
    },
    {
        icon: HeartHandshake,
        title: 'Customer Support',
        text: 'Helpful support before and after checkout.',
    },
];

const OurPolicy = () => {
    return (
        <section className='grid gap-6 py-16 sm:grid-cols-3 sm:py-20'>
            {policies.map((item) => {
                const IconComponent = item.icon;
                return (
                    <div className='group rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300/80 hover:shadow-md' key={item.title}>
                        <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-50 text-neutral-700 transition-colors duration-300 group-hover:bg-neutral-100/80 group-hover:text-neutral-900'>
                            <IconComponent className='h-7 w-7' />
                        </div>
                        <p className='font-semibold text-neutral-950 tracking-wide text-sm sm:text-base'>{item.title}</p>
                        <p className='mt-2 text-xs sm:text-sm leading-6 text-neutral-500 font-light'>{item.text}</p>
                    </div>
                );
            })}
        </section>
    )
}

export default OurPolicy
