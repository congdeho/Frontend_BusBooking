export default function classNames(...args) {
  return args
    .reduce((acc, val) => {
      if (typeof val === "string") {
        return acc.concat(val.split(" "));
      }
      return acc.concat(Object.values(val));
    }, [])
    .join(" ");
}

// w-full px-6 py-4 -> ["w-full", "px-6", "py-4"] -> "w-full px-6 py-4"
