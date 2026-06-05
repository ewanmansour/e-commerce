const Title = ({ text1, text2 }) => {
    return (
        <div className="mb-6">
            <p className="inline-flex flex-wrap items-center gap-1 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-neutral-500">
                {text1}
                <span className="text-neutral-900 font-bold">
                    {text2}
                </span>
            </p>
        </div>
    );
};

export default Title;