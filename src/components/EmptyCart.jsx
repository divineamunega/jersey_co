const EmptyCart = ({ hidden }) => {
  return (
    <div className={`p-8 text-center ${hidden ? "hidden" : ""}`}>
      <p className="mb-4 text-black">Your cart is empty</p>
      <a href="/explore">
        <button className="group mx-auto flex h-10 cursor-pointer items-center gap-2 rounded-full bg-black pr-4 pl-3 transition-all duration-300 ease-in-out hover:bg-transparent hover:pl-2 hover:text-black active:bg-neutral-700">
          <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-black">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
          <span className="text-white group-hover:text-black">
            Continue Shopping
          </span>
        </button>
      </a>
    </div>
  );
};

export default EmptyCart;
