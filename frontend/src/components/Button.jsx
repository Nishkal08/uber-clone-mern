import React from 'react';

const Button = ({text}) => {
  return (
    <button className="inline-block cursor-pointer items-center justify-center rounded-xl border-[1.58px] border-zinc-600 bg-zinc-950 px-4 py-3 font-medium text-slate-200 shadow-md transition-all duration-300 hover:[transform:translateY(-.335rem)] hover:shadow-xl">
      {text}
      {/* <span className="text-slate-300/85"> ─ simple button</span> */}
    </button>
  );
}


export default Button;

