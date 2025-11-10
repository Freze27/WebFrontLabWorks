export default function Toggle({ value, onChange, options, labels }) {
  const isFirst = value === options[0];

  const handleClick = () => {
    onChange(isFirst ? options[1] : options[0]);
  };

  return (
    <div className="flex flex-col justify-center items-start space-y-2">
      <button
        onClick={handleClick}
        className="relative w-[100px] h-[38px] rounded-[40px] bg-[rgba(217,217,217,1)] cursor-pointer border border-black dark:border-transparent transition-colors duration-300"
      >
        <div
          className={`absolute top-1/2 w-[30px] h-[30px] bg-black rounded-full transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
            isFirst ? "left-[65px]" : "left-1"
          }`}
        ></div>
      </button>

      <p className="font-poppins font-extrabold text-[18px] leading-[100%] mx-auto">
        {isFirst ? labels?.[0] : labels?.[1]}
      </p>
    </div>
  );
}

