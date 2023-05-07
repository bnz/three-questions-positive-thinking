export const cx = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');
