// eslint-disable-next-line react/prop-types
const Title = ({ text1, text2 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-[#1c1c26]">
        {text1}
        <span className="text-[#9d905a] font-medium"> {text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-[#1c1c26]"></p>
    </div>
  );
};

export default Title;
