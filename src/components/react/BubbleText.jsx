const BubbleText = ({ text, className = "" }) => {
  return (
    <h2 className={`text-center ${className}`}>
      {text.split("").map((child, idx) => (
        <span
          className="transition-all duration-350 hover:font-black hover:text-[rgb(238,242,255)] peer 
          peer-hover:font-medium peer-hover:text-[rgb(199,210,254)]
          peer/curr
          peer-hover/curr:font-medium peer-hover/curr:text-[rgb(199,210,254)]
          peer-next/curr:font-light"
          key={idx}
        >
          {child}
        </span>
      ))}
    </h2>
  );
};

export default BubbleText;
