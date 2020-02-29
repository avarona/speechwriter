const debounce = (func: () => void, time: number) => (
    setTimeout(func, time | 2000)
);

export default debounce;