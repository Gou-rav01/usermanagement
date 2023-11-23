
const Loader = () => {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current rounded-full';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 background-blur-sm flex justify-center items-center">
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
};

export default Loader;